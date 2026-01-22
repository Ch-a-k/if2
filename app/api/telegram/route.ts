import { NextRequest, NextResponse } from 'next/server';
import { UserTrackingData, formatTrackingForTelegram } from '@/lib/tracking';
import { client, queries } from '@/lib/sanity';

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isProbablyEmail(email: string) {
  // Intentionally simple – we just want to reject obvious garbage.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwardedFor?.split(',')[0]?.trim() || realIp || 'Unknown';
}

// Best-effort in-memory rate limit (works well on long-lived Node runtimes; on serverless it's still a useful speed bump).
const RATE_BUCKET = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string, { windowMs, max }: { windowMs: number; max: number }) {
  const now = Date.now();
  const key = `ip:${ip}`;
  const existing = RATE_BUCKET.get(key);
  if (!existing || existing.resetAt <= now) {
    RATE_BUCKET.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1, resetAt: now + windowMs };
  }
  if (existing.count >= max) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }
  existing.count += 1;
  RATE_BUCKET.set(key, existing);
  return { ok: true, remaining: Math.max(0, max - existing.count), resetAt: existing.resetAt };
}

function getOriginLike(request: NextRequest) {
  return request.headers.get('origin') || request.headers.get('referer') || '';
}

function isAllowedOrigin(originLike: string) {
  const rawAllowed = process.env.ALLOWED_ORIGINS || process.env.NEXT_PUBLIC_SITE_URL || '';
  const allowed = rawAllowed
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) return true; // don't block by default; rely on Turnstile/rate-limit

  return allowed.some((a) => originLike.startsWith(a));
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { required: false, ok: true as const };

  if (!token) return { required: true, ok: false as const, error: 'Missing Turnstile token' };

  const form = new FormData();
  form.set('secret', secret);
  form.set('response', token);
  if (ip && ip !== 'Unknown') form.set('remoteip', ip);

  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });

  if (!resp.ok) return { required: true, ok: false as const, error: 'Turnstile verify failed' };
  const data = (await resp.json()) as { success?: boolean };
  return { required: true, ok: Boolean(data?.success) as const, error: data?.success ? undefined : 'Turnstile rejected' };
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json({ error: 'Unsupported content-type' }, { status: 415 });
    }

    const body = await request.json();
    const { name, email, message, phone, company, tracking, website, turnstileToken } = body ?? {};

    // Honeypot: bots often fill hidden fields.
    if (typeof website === 'string' && website.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'OK' }, { status: 200 });
    }

    const originLike = getOriginLike(request);
    if (!isAllowedOrigin(originLike)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ip = getClientIp(request);
    const rl = rateLimit(ip, { windowMs: 10 * 60 * 1000, max: 5 }); // 5 requests / 10 minutes / IP
    if (!rl.ok) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const turnstile = await verifyTurnstile(typeof turnstileToken === 'string' ? turnstileToken : undefined, ip);
    if (!turnstile.ok) {
      return NextResponse.json({ error: turnstile.error || 'Bot protection failed' }, { status: 403 });
    }

    if (typeof name !== 'string' || name.trim().length < 2 || name.length > 120) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }
    if (typeof email !== 'string' || email.length > 254 || !isProbablyEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (typeof message !== 'string' || message.trim().length < 5 || message.length > 5000) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    // Получаем настройки из Sanity или из env переменных
    let BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    let CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Пробуем получить из Sanity (приоритет над env)
    try {
      const settings = await client.fetch(queries.siteSettings);
      if (settings?.telegramBotToken) {
        BOT_TOKEN = settings.telegramBotToken;
      }
      if (settings?.telegramChatId) {
        CHAT_ID = settings.telegramChatId;
      }
    } catch (error) {
      console.log('Failed to fetch Telegram settings from Sanity, using env variables');
    }

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Telegram credentials not configured');
      return NextResponse.json(
        { error: 'Telegram not configured' },
        { status: 500 }
      );
    }

    // Форматируем сообщение для Telegram
    let telegramMessage = `🔔 <b>Новая заявка с сайта!</b>\n`;
    telegramMessage += `\n👤 <b>Контактная информация:</b>`;
    telegramMessage += `\n• Имя: ${escapeHtml(name)}`;
    telegramMessage += `\n• Email: ${escapeHtml(email)}`;
    
    if (phone) {
      telegramMessage += `\n• Телефон: ${escapeHtml(String(phone))}`;
    }
    
    if (company) {
      telegramMessage += `\n• Компания: ${escapeHtml(String(company))}`;
    }

    telegramMessage += `\n\n💬 <b>Сообщение:</b>\n${escapeHtml(message)}`;

    // Добавляем tracking информацию
    if (tracking) {
      telegramMessage += formatTrackingForTelegram(tracking as UserTrackingData);
    }

    // Добавляем информацию об IP и геолокации из заголовков запроса
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const city = request.headers.get('x-vercel-ip-city') || 'Unknown';

    if (country !== 'Unknown' || city !== 'Unknown') {
      telegramMessage += `\n\n🌍 <b>Location (from IP):</b>`;
      telegramMessage += `\n• IP: ${ip}`;
      telegramMessage += `\n• Country: ${escapeHtml(country)}`;
      telegramMessage += `\n• City: ${escapeHtml(city)}`;
    }

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      throw new Error('Failed to send to Telegram');
    }

    return NextResponse.json({ 
      success: true,
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

