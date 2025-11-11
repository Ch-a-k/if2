// Утилиты для трекинга пользователей

export interface UserTrackingData {
  // Основная информация
  timestamp: string;
  timezone: string;
  
  // Браузер и устройство
  userAgent: string;
  browser: string;
  device: string;
  os: string;
  screenResolution: string;
  
  // Источник трафика
  referrer: string;
  landingPage: string;
  currentPage: string;
  
  // UTM метки
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  
  // Поведение на сайте
  pagesVisited: string[];
  timeOnSite: number; // в секундах
  activeTimeOnSite: number; // время реальной активности в секундах
  engagementScore: number; // оценка вовлеченности (0-100)
  
  // Геолокация (если доступна)
  country?: string;
  city?: string;
  ip?: string;
}

// Получить информацию о браузере
function getBrowserInfo(): { browser: string; os: string; device: string } {
  const ua = navigator.userAgent;
  
  // Определение браузера
  let browser = 'Unknown';
  if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edge') === -1 && ua.indexOf('Edg') === -1) browser = 'Chrome';
  else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) browser = 'Safari';
  else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) browser = 'Edge';
  else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) browser = 'Opera';
  
  // Определение ОС
  let os = 'Unknown';
  if (ua.indexOf('Windows') > -1) os = 'Windows';
  else if (ua.indexOf('Mac') > -1) os = 'MacOS';
  else if (ua.indexOf('Linux') > -1) os = 'Linux';
  else if (ua.indexOf('Android') > -1) os = 'Android';
  else if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) os = 'iOS';
  
  // Определение устройства
  let device = 'Desktop';
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    device = 'Mobile';
  } else if (/iPad|Android|Tablet/i.test(ua)) {
    device = 'Tablet';
  }
  
  return { browser, os, device };
}

// Получить UTM метки из URL
function getUTMParams(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
} {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
    utmTerm: params.get('utm_term') || undefined,
    utmContent: params.get('utm_content') || undefined,
  };
}

// Получить посещённые страницы из localStorage
function getVisitedPages(): string[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const visited = localStorage.getItem('visitedPages');
    return visited ? JSON.parse(visited) : [];
  } catch {
    return [];
  }
}

// Сохранить текущую страницу в историю
export function trackPageVisit(page: string) {
  if (typeof window === 'undefined') return;
  
  try {
    const visited = getVisitedPages();
    if (!visited.includes(page)) {
      visited.push(page);
      localStorage.setItem('visitedPages', JSON.stringify(visited));
    }
  } catch (error) {
    console.error('Error tracking page visit:', error);
  }
}

// Получить время начала сессии
function getSessionStartTime(): number {
  if (typeof window === 'undefined') return Date.now();
  
  try {
    const startTime = sessionStorage.getItem('sessionStartTime');
    if (startTime) {
      const parsedTime = parseInt(startTime, 10);
      // Проверяем, что время валидное (не NaN и не в будущем)
      if (!isNaN(parsedTime) && parsedTime <= Date.now()) {
        return parsedTime;
      }
    }
    // Если времени нет или оно невалидное, устанавливаем текущее время
    const now = Date.now();
    sessionStorage.setItem('sessionStartTime', now.toString());
    return now;
  } catch {
    return Date.now();
  }
}

// Получить время на сайте в секундах
function getTimeOnSite(): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const startTime = getSessionStartTime();
    const now = Date.now();
    const diff = now - startTime;
    
    // Проверяем, что разница разумная (не отрицательная и не больше 24 часов)
    if (diff < 0 || diff > 86400000) {
      console.warn('Invalid time difference detected:', diff);
      return 0;
    }
    
    return Math.floor(diff / 1000);
  } catch (error) {
    console.error('Error calculating time on site:', error);
    return 0;
  }
}

// Обновить последнее время активности
export function updateLastActivity() {
  if (typeof window === 'undefined') return;
  
  try {
    const now = Date.now();
    sessionStorage.setItem('lastActivity', now.toString());
  } catch (error) {
    console.error('Error updating last activity:', error);
  }
}

// Получить время активности (с учетом реальных взаимодействий)
function getActiveTimeOnSite(): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const startTime = getSessionStartTime();
    const lastActivity = sessionStorage.getItem('lastActivity');
    
    if (lastActivity) {
      const lastActiveTime = parseInt(lastActivity, 10);
      if (!isNaN(lastActiveTime)) {
        const diff = lastActiveTime - startTime;
        // Проверяем, что разница валидная
        if (diff >= 0 && diff <= 86400000) {
          return Math.floor(diff / 1000);
        }
      }
    }
    
    // Если lastActivity не установлен, используем общее время
    return getTimeOnSite();
  } catch (error) {
    console.error('Error calculating active time:', error);
    return 0;
  }
}

// Рассчитать оценку вовлеченности (0-100)
function calculateEngagementScore(): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const pagesVisited = getVisitedPages().length;
    const timeOnSite = getTimeOnSite();
    const activeTime = getActiveTimeOnSite();
    
    // Факторы вовлеченности:
    // - Количество страниц (до 5 страниц = +20 баллов за каждую)
    // - Время на сайте (до 5 минут = +1 балл за каждые 5 секунд)
    // - Активность (активное время / общее время * 40 баллов)
    
    let score = 0;
    
    // Баллы за страницы (максимум 30)
    score += Math.min(pagesVisited * 6, 30);
    
    // Баллы за время (максимум 30)
    score += Math.min(Math.floor(timeOnSite / 5), 30);
    
    // Баллы за активность (максимум 40)
    if (timeOnSite > 0) {
      const activityRatio = activeTime / timeOnSite;
      score += Math.floor(activityRatio * 40);
    }
    
    return Math.min(Math.round(score), 100);
  } catch (error) {
    console.error('Error calculating engagement score:', error);
    return 0;
  }
}

// Получить landing page
function getLandingPage(): string {
  if (typeof window === 'undefined') return '';
  
  try {
    const landing = sessionStorage.getItem('landingPage');
    if (landing) {
      return landing;
    } else {
      const current = window.location.pathname;
      sessionStorage.setItem('landingPage', current);
      return current;
    }
  } catch {
    return window.location.pathname;
  }
}

// Собрать всю информацию о пользователе
export function collectTrackingData(): UserTrackingData {
  if (typeof window === 'undefined') {
    return {
      timestamp: new Date().toISOString(),
      timezone: 'Unknown',
      userAgent: 'Unknown',
      browser: 'Unknown',
      device: 'Unknown',
      os: 'Unknown',
      screenResolution: 'Unknown',
      referrer: '',
      landingPage: '',
      currentPage: '',
      pagesVisited: [],
      timeOnSite: 0,
      activeTimeOnSite: 0,
      engagementScore: 0,
    };
  }
  
  // Обновляем последнее время активности при сборе данных
  updateLastActivity();
  
  const { browser, os, device } = getBrowserInfo();
  const utmParams = getUTMParams();
  const timeOnSite = getTimeOnSite();
  const activeTime = getActiveTimeOnSite();
  
  return {
    // Основная информация
    timestamp: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    
    // Браузер и устройство
    userAgent: navigator.userAgent,
    browser,
    device,
    os,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    
    // Источник трафика
    referrer: document.referrer || 'Direct',
    landingPage: getLandingPage(),
    currentPage: window.location.pathname,
    
    // UTM метки
    ...utmParams,
    
    // Поведение на сайте
    pagesVisited: getVisitedPages(),
    timeOnSite,
    activeTimeOnSite: activeTime,
    engagementScore: calculateEngagementScore(),
  };
}

// Форматировать tracking data для отправки в Telegram
export function formatTrackingForTelegram(tracking: UserTrackingData): string {
  let message = '\n\n📊 <b>Tracking Information:</b>\n';
  
  // Время и дата
  message += `\n🕐 <b>Time:</b> ${new Date(tracking.timestamp).toLocaleString('en-US')}`;
  message += `\n🌍 <b>Timezone:</b> ${tracking.timezone}`;
  
  // Устройство
  message += `\n\n💻 <b>Device Info:</b>`;
  message += `\n• Device: ${tracking.device}`;
  message += `\n• OS: ${tracking.os}`;
  message += `\n• Browser: ${tracking.browser}`;
  message += `\n• Screen: ${tracking.screenResolution}`;
  
  // Источник трафика
  message += `\n\n🎯 <b>Traffic Source:</b>`;
  message += `\n• Referrer: ${tracking.referrer}`;
  message += `\n• Landing: ${tracking.landingPage}`;
  message += `\n• Current: ${tracking.currentPage}`;
  
  // UTM метки (если есть)
  if (tracking.utmSource || tracking.utmMedium || tracking.utmCampaign) {
    message += `\n\n🏷️ <b>UTM Tags:</b>`;
    if (tracking.utmSource) message += `\n• Source: ${tracking.utmSource}`;
    if (tracking.utmMedium) message += `\n• Medium: ${tracking.utmMedium}`;
    if (tracking.utmCampaign) message += `\n• Campaign: ${tracking.utmCampaign}`;
    if (tracking.utmTerm) message += `\n• Term: ${tracking.utmTerm}`;
    if (tracking.utmContent) message += `\n• Content: ${tracking.utmContent}`;
  }
  
  // Поведение
  message += `\n\n📈 <b>User Behavior:</b>`;
  message += `\n• Time on site: ${Math.floor(tracking.timeOnSite / 60)}m ${tracking.timeOnSite % 60}s`;
  message += `\n• Active time: ${Math.floor(tracking.activeTimeOnSite / 60)}m ${tracking.activeTimeOnSite % 60}s`;
  message += `\n• Engagement: ${tracking.engagementScore}/100`;
  message += `\n• Pages visited: ${tracking.pagesVisited.length}`;
  
  if (tracking.pagesVisited.length > 0) {
    message += `\n• Journey:\n`;
    tracking.pagesVisited.slice(-5).forEach((page, index) => {
      message += `  ${index + 1}. ${page}\n`;
    });
  }
  
  return message;
}

