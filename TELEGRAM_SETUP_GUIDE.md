# 📱 Telegram Bot Setup Guide - Полная настройка

## ✅ Что создано

Система отправки заявок с сайта в Telegram с **ПОЛНЫМ трекингом**:

### 📊 Tracking включает:
- ⏰ **Время и дата** заявки
- 💻 **Устройство**: браузер, ОС, разрешение экрана
- 🎯 **Источник трафика**: откуда пришёл, landing page, referrer
- 🏷️ **UTM метки**: utm_source, utm_medium, utm_campaign, utm_term, utm_content
- 📈 **Поведение**: время на сайте, посещённые страницы (путь пользователя)
- 🌍 **Геолокация**: страна, город, IP адрес (через Vercel headers)

---

## 🤖 Шаг 1: Создание Telegram Бота

### 1.1 Откройте BotFather в Telegram

1. Найдите **@BotFather** в Telegram
2. Напишите `/start`
3. Напишите `/newbot`
4. Придумайте название бота (например: "IN-FOMO. Forms")
5. Придумайте username бота (должен заканчиваться на `bot`, например: `infomo_forms_bot`)

### 1.2 Получите токен бота

После создания вы получите сообщение вида:

```
Done! Congratulations on your new bot. You will find it at t.me/infomo_forms_bot

Use this token to access the HTTP API:
1234567890:ABCdefGHIjklmNOPqrstUVwxyz123456789

Keep your token secure and store it safely, it can be used by anyone to control your bot.
```

**⚠️ ВАЖНО:** Сохраните этот токен! Это ваш `TELEGRAM_BOT_TOKEN`

---

## 👥 Шаг 2: Создание Telegram группы

### 2.1 Создайте группу

1. В Telegram нажмите **➕ Новая группа**
2. Назовите группу (например: "IN-FOMO. Заявки")
3. Добавьте себя и других участников, которым нужно видеть заявки

### 2.2 Добавьте бота в группу

1. Откройте созданную группу
2. Нажмите на название группы → **Добавить участника**
3. Найдите своего бота (например: `@infomo_forms_bot`)
4. Добавьте его в группу

### 2.3 Дайте боту права администратора

1. В группе нажмите на название → **Администраторы**
2. Нажмите **Добавить администратора**
3. Выберите вашего бота
4. Включите минимальные права (достаточно "Отправлять сообщения")

---

## 🆔 Шаг 3: Получение Chat ID группы

### Способ 1: Через бота @RawDataBot (САМЫЙ ПРОСТОЙ)

1. Добавьте **@RawDataBot** в вашу группу
2. Он автоматически отправит JSON с информацией
3. Найдите строку `"id": -1001234567890` — это ваш `CHAT_ID`
4. Удалите @RawDataBot из группы (больше не нужен)

### Способ 2: Через API Telegram

1. Напишите любое сообщение в группу
2. Откройте в браузере:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
   (замените `<YOUR_BOT_TOKEN>` на ваш токен)

3. Найдите в ответе:
   ```json
   "chat": {
     "id": -1001234567890,
     "title": "IN-FOMO. Заявки",
     "type": "group"
   }
   ```

4. Значение `"id"` — это ваш `CHAT_ID`

**⚠️ ВАЖНО:** 
- Chat ID группы всегда начинается с **минуса** (например: `-1001234567890`)
- Для приватной группы Chat ID начинается с `-100`

---

## 🔧 Шаг 4: Настройка переменных окружения

### 4.1 Локальная разработка

Создайте или обновите файл `.env.local` в корне проекта:

```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklmNOPqrstUVwxyz123456789
TELEGRAM_CHAT_ID=-1001234567890

# Site URL (для production)
NEXT_PUBLIC_SITE_URL=https://in-fomo.com
```

### 4.2 Production (Vercel)

1. Откройте ваш проект на Vercel
2. Перейдите в **Settings** → **Environment Variables**
3. Добавьте две переменные:

| Name | Value | Environment |
|------|-------|-------------|
| `TELEGRAM_BOT_TOKEN` | 1234567890:ABCdef... | Production |
| `TELEGRAM_CHAT_ID` | -1001234567890 | Production |

4. Нажмите **Save**
5. **Redeploy** проект для применения изменений

---

## 🧪 Шаг 5: Тестирование

### 5.1 Локальный тест

1. Запустите dev сервер:
   ```bash
   npm run dev
   ```

2. Откройте http://localhost:3000/contact

3. Заполните форму и отправьте

4. Проверьте Telegram группу — должно прийти сообщение! 🎉

### 5.2 Что проверить в сообщении

Telegram сообщение должно содержать:

```
🔔 Новая заявка с сайта!

👤 Контактная информация:
• Имя: John Doe
• Email: john@example.com

💬 Сообщение:
I'm interested in your services...

📊 Tracking Information:

🕐 Time: 1/9/2025, 11:30:45 PM
🌍 Timezone: Europe/Warsaw

💻 Device Info:
• Device: Desktop
• OS: MacOS
• Browser: Chrome
• Screen: 1920x1080

🎯 Traffic Source:
• Referrer: https://google.com
• Landing: /
• Current: /contact

🏷️ UTM Tags:
• Source: google
• Medium: cpc
• Campaign: winter_2025

📈 User Behavior:
• Time on site: 3m 45s
• Pages visited: 4
• Journey:
  1. /
  2. /works
  3. /about
  4. /contact

🌍 Location (from IP):
• IP: 123.45.67.89
• Country: PL
• City: Warsaw
```

---

## 📊 Tracking объяснение

### Откуда берутся данные:

1. **Device Info** - `navigator.userAgent`, `window.screen`
2. **Traffic Source** - `document.referrer`, `window.location`
3. **UTM метки** - URL параметры (`?utm_source=google&...`)
4. **User Behavior** - `localStorage`, `sessionStorage`
5. **Location** - Vercel headers (`x-vercel-ip-country`, `x-vercel-ip-city`)

### Как работает трекинг:

```typescript
// При открытии каждой страницы сохраняется в localStorage
trackPageVisit('/contact');

// При отправке формы собираются все данные
const tracking = collectTrackingData();

// Отправляется на сервер вместе с формой
fetch('/api/telegram', {
  body: JSON.stringify({
    name, email, message,
    tracking  // ← вся информация о пользователе
  })
});
```

---

## 🔒 Безопасность

### ✅ Что мы делаем правильно:

1. **Токен бота** хранится только на сервере (`.env`, не в клиенте)
2. **API endpoint** защищён от прямого доступа
3. **Tracking** работает анонимно (без персональных данных)
4. **GDPR compliant** - пользователь сам отправляет форму

### ⚠️ Что НЕ делать:

- ❌ Не храните `TELEGRAM_BOT_TOKEN` в клиентском коде
- ❌ Не коммитьте `.env.local` в Git
- ❌ Не делайте `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN`

---

## 🎯 UTM метки - примеры использования

### Как создавать UTM ссылки:

**Google Ads:**
```
https://in-fomo.com/?utm_source=google&utm_medium=cpc&utm_campaign=winter_2025&utm_term=web+development
```

**Facebook Ads:**
```
https://in-fomo.com/?utm_source=facebook&utm_medium=social&utm_campaign=launch_promo
```

**Email рассылка:**
```
https://in-fomo.com/?utm_source=newsletter&utm_medium=email&utm_campaign=december_news
```

**Instagram Bio:**
```
https://in-fomo.com/?utm_source=instagram&utm_medium=social&utm_content=bio_link
```

### Генератор UTM ссылок:
https://ga-dev-tools.google/campaign-url-builder/

---

## 🚀 Расширенные возможности

### Добавить Telegram кнопки (inline keyboard)

Обновите `/app/api/telegram/route.ts`:

```typescript
body: JSON.stringify({
  chat_id: CHAT_ID,
  text: telegramMessage,
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: [
      [
        { text: '✅ Answered', callback_data: 'answered' },
        { text: '⏰ Later', callback_data: 'later' }
      ],
      [
        { text: '📧 Send Email', url: `mailto:${email}` }
      ]
    ]
  }
})
```

### Добавить уведомления (notification sound)

```typescript
body: JSON.stringify({
  chat_id: CHAT_ID,
  text: telegramMessage,
  parse_mode: 'HTML',
  disable_notification: false  // ← звук включен
})
```

### Отправлять в несколько групп

```typescript
const CHAT_IDS = [
  process.env.TELEGRAM_SALES_CHAT_ID,
  process.env.TELEGRAM_SUPPORT_CHAT_ID,
];

for (const chatId of CHAT_IDS) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    body: JSON.stringify({ chat_id: chatId, text: message })
  });
}
```

---

## 📝 Файлы проекта

```
/lib
  └── tracking.ts              # Утилиты для трекинга

/app/api
  └── telegram/route.ts        # API endpoint для отправки

/app/contact
  └── page.tsx                 # Контактная форма (обновлена)

/components/blog
  └── ContactForm.tsx          # Форма в блоге (обновлена)
```

---

## ❓ Troubleshooting

### Сообщения не приходят:

1. ✅ Проверьте токен бота в `.env.local`
2. ✅ Проверьте Chat ID (должен начинаться с минуса для группы)
3. ✅ Убедитесь что бот добавлен в группу и является администратором
4. ✅ Проверьте console в DevTools на ошибки
5. ✅ Попробуйте отправить тестовое сообщение через Postman:
   ```
   POST https://api.telegram.org/bot<TOKEN>/sendMessage
   {
     "chat_id": "<CHAT_ID>",
     "text": "Test message"
   }
   ```

### Tracking не работает:

1. ✅ Проверьте что JavaScript включен
2. ✅ Проверьте localStorage/sessionStorage в DevTools
3. ✅ Убедитесь что `trackPageVisit()` вызывается на каждой странице

---

## 🎉 Готово!

Ваша система готова! Теперь **каждая заявка** будет приходить в Telegram с полной информацией о пользователе.

### Что вы получаете:

- ✅ Мгновенные уведомления о новых заявках
- ✅ Полная информация о каждом клиенте
- ✅ Понимание откуда идёт трафик (UTM)
- ✅ Видите путь клиента по сайту
- ✅ Знаете на каком устройстве сидел клиент
- ✅ Геолокация клиента

**Теперь вы можете конвертировать лиды более эффективно!** 🚀

