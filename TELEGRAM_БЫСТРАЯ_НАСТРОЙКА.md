# 📱 Telegram Bot - Быстрая настройка (5 минут)

## ⚡ За 5 минут получите заявки в Telegram с полным трекингом

---

## 🤖 Шаг 1: Создать бота (2 минуты)

1. Откройте **@BotFather** в Telegram
2. Напишите `/newbot`
3. Придумайте название: `IN-FOMO. Forms`
4. Придумайте username: `infomo_forms_bot`
5. **Скопируйте токен** (длинная строка вида `1234567890:ABCdef...`)

---

## 👥 Шаг 2: Создать группу (2 минуты)

1. Создайте **Новую группу** в Telegram
2. Назовите: `IN-FOMO. Заявки`
3. **Добавьте бота** в группу (найдите `@infomo_forms_bot`)
4. Сделайте бота **администратором** (хотя бы с правом отправки сообщений)

---

## 🆔 Шаг 3: Получить Chat ID (1 минута)

1. Добавьте **@RawDataBot** в вашу группу
2. Он отправит JSON — найдите `"id": -1001234567890`
3. **Скопируйте этот ID** (с минусом!)
4. Удалите @RawDataBot

---

## 🔧 Шаг 4: Настройка (2 способа)

### ✅ Способ 1: Через Sanity Admin (РЕКОМЕНДУЕТСЯ)

1. Откройте **Sanity Studio**: http://localhost:3333
2. Перейдите в **⚙️ Settings** → **Site Settings**
3. Заполните поля:
   - **Telegram Bot Token** = ваш токен от @BotFather
   - **Telegram Chat ID** = -ваш_chat_id (с минусом!)
4. Нажмите **Publish**

**✨ Плюсы:**
- Можно менять без редеплоя
- Удобно управлять
- Все настройки в одном месте

### ⚙️ Способ 2: Через `.env.local` (fallback)

Создайте файл `.env.local` в корне проекта:

```bash
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklmNOPqrstUVwxyz
TELEGRAM_CHAT_ID=-1001234567890
```

**Приоритет:** Sanity > .env

Если заполнено в Sanity — используется Sanity.  
Если нет — используется `.env.local`.

---

## 🚀 Шаг 5: Тест (30 секунд)

1. Перезапустите сервер: `npm run dev`
2. Откройте http://localhost:3000/contact
3. Заполните и отправьте форму
4. **Проверьте Telegram** — должно прийти сообщение! 🎉

---

## 📊 Что приходит в Telegram?

```
🔔 Новая заявка с сайта!

👤 Контактная информация:
• Имя: John Doe
• Email: john@example.com

💬 Сообщение:
I want to build an app

📊 Tracking Information:

🕐 Time: 10/01/2025, 14:30:45
🌍 Timezone: Europe/Warsaw

💻 Device Info:
• Device: Desktop
• OS: MacOS
• Browser: Chrome
• Screen: 1920x1080

🎯 Traffic Source:
• Referrer: google.com
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

## 🎯 Production (Vercel)

1. Откройте **Vercel** → ваш проект → **Settings** → **Environment Variables**
2. Добавьте:
   - `TELEGRAM_BOT_TOKEN` = `ваш_токен`
   - `TELEGRAM_CHAT_ID` = `-ваш_chat_id`
3. **Redeploy**

---

## ❓ Не работает?

### Проверьте:
- ✅ Бот добавлен в группу и является администратором
- ✅ Chat ID начинается с **минуса** (для группы)
- ✅ Токен правильный (из @BotFather)
- ✅ `.env.local` создан в корне проекта
- ✅ Сервер перезапущен после создания `.env.local`

---

## 📚 Подробная инструкция

См. **`TELEGRAM_SETUP_GUIDE.md`** для:
- Настройки кнопок в сообщениях
- Отправки в несколько групп
- Детального объяснения трекинга
- UTM меток и аналитики

---

**Готово!** 🎉 Теперь все заявки приходят в Telegram с максимальной информацией о клиенте!

