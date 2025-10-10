import { NextRequest, NextResponse } from 'next/server';
import { UserTrackingData, formatTrackingForTelegram } from '@/lib/tracking';
import { client, queries } from '@/lib/sanity';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, phone, company, tracking } = body;

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
    telegramMessage += `\n• Имя: ${name}`;
    telegramMessage += `\n• Email: ${email}`;
    
    if (phone) {
      telegramMessage += `\n• Телефон: ${phone}`;
    }
    
    if (company) {
      telegramMessage += `\n• Компания: ${company}`;
    }

    telegramMessage += `\n\n💬 <b>Сообщение:</b>\n${message}`;

    // Добавляем tracking информацию
    if (tracking) {
      telegramMessage += formatTrackingForTelegram(tracking as UserTrackingData);
    }

    // Добавляем информацию об IP и геолокации из заголовков запроса
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0] || realIp || 'Unknown';
    
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const city = request.headers.get('x-vercel-ip-city') || 'Unknown';

    if (country !== 'Unknown' || city !== 'Unknown') {
      telegramMessage += `\n\n🌍 <b>Location (from IP):</b>`;
      telegramMessage += `\n• IP: ${ip}`;
      telegramMessage += `\n• Country: ${country}`;
      telegramMessage += `\n• City: ${city}`;
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

