# ✅ Telegram интеграция готова!

## 🎉 Что создано

### 1. 📊 Система полного трекинга
**Файл:** `lib/tracking.ts`

Отслеживает:
- ⏰ Время и дата заявки
- 💻 Устройство (браузер, ОС, экран)
- 🎯 Источник (откуда пришёл, landing page)
- 🏷️ UTM метки (source, medium, campaign)
- 📈 Поведение (время на сайте, путь по страницам)
- 🌍 Геолокация (страна, город, IP)

### 2. 🤖 API Endpoint для Telegram
**Файл:** `app/api/telegram/route.ts`

- Принимает данные формы + tracking
- Форматирует красивое сообщение с HTML
- Отправляет в Telegram группу
- Добавляет геолокацию из Vercel headers

### 3. 📝 Обновлённые формы

**Обновлено:**
- `app/contact/page.tsx` - главная контактная форма
- `components/blog/ContactForm.tsx` - форма в блоге

**Добавлено:**
- Сбор tracking данных
- Отправка через API
- Статусы отправки (success/error)
- Стили для сообщений

---

## ⚡ Быстрый старт (5 минут)

### Шаг 1: Создать Telegram бота

1. @BotFather → `/newbot`
2. Название: `IN-FOMO. Forms`
3. Username: `infomo_forms_bot`
4. **Скопируйте токен**

### Шаг 2: Создать группу

1. Новая группа: `IN-FOMO. Заявки`
2. Добавить бота
3. Сделать администратором

### Шаг 3: Получить Chat ID

1. Добавить @RawDataBot в группу
2. Скопировать `"id": -1001234567890`
3. Удалить @RawDataBot

### Шаг 4: Настройка

**Способ 1 (Рекомендуется):** Через Sanity Admin

1. http://localhost:3333
2. **Settings** → **Site Settings**
3. Заполните **Telegram Bot Token** и **Telegram Chat ID**
4. Publish

**Способ 2 (Fallback):** Через `.env.local`

```bash
TELEGRAM_BOT_TOKEN=ваш_токен_от_BotFather
TELEGRAM_CHAT_ID=-ваш_chat_id_группы
```

**Приоритет:** Sanity > .env

### Шаг 5: Тест

```bash
npm run dev
```

Откройте http://localhost:3000/contact и отправьте форму!

---

## 📱 Пример сообщения в Telegram

```
🔔 Новая заявка с сайта!

👤 Контактная информация:
• Имя: John Doe
• Email: john@example.com

💬 Сообщение:
I'm interested in your services

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

## 🚀 Production (Vercel)

1. **Vercel** → Settings → **Environment Variables**
2. Добавьте:
   - `TELEGRAM_BOT_TOKEN` = ваш токен
   - `TELEGRAM_CHAT_ID` = -ваш_chat_id
3. **Redeploy**

---

## 📁 Созданные файлы

```
/lib
  └── tracking.ts                      # Утилиты трекинга

/app/api
  └── telegram/route.ts                # API для отправки

/app/contact
  ├── page.tsx                         # Обновлено
  └── page.module.css                  # Добавлены стили

/components/blog
  └── ContactForm.tsx                  # Обновлено

Инструкции:
  ├── TELEGRAM_БЫСТРАЯ_НАСТРОЙКА.md   # 5 минут
  ├── TELEGRAM_SETUP_GUIDE.md         # Подробно
  └── TELEGRAM_ГОТОВО.md              # Этот файл
```

---

## 🎯 Что отслеживается

### При каждой заявке вы узнаете:

✅ **Кто клиент:**
- Имя, email, сообщение

✅ **Откуда пришёл:**
- Google? Facebook? Direct?
- Какая рекламная кампания привела (UTM)
- Landing page (первая страница)

✅ **Что делал на сайте:**
- Сколько времени провёл
- Какие страницы посмотрел
- Полный путь по сайту

✅ **Где находится:**
- Страна, город (из IP)
- Часовой пояс

✅ **С какого устройства:**
- Desktop/Mobile/Tablet
- Браузер, ОС
- Разрешение экрана

---

## 💡 Как использовать

### UTM метки для рекламы

**Google Ads:**
```
https://in-fomo.com/?utm_source=google&utm_medium=cpc&utm_campaign=winter_2025
```

**Facebook:**
```
https://in-fomo.com/?utm_source=facebook&utm_medium=social&utm_campaign=launch
```

**Email:**
```
https://in-fomo.com/?utm_source=newsletter&utm_medium=email
```

### Анализ эффективности

Теперь вы точно знаете:
- Какая реклама работает (UTM source)
- Какие страницы важны (путь клиента)
- Какие устройства используют (mobile/desktop)
- Откуда больше клиентов (страна)

---

## 📚 Дополнительные возможности

См. **`TELEGRAM_SETUP_GUIDE.md`** для:

- Добавления кнопок в сообщениях
- Отправки в несколько групп
- Настройки уведомлений
- Интеграции с CRM

---

## ❓ Частые вопросы

**Q: Безопасно ли?**  
A: Да! Токен хранится только на сервере, не в клиенте.

**Q: Сколько это стоит?**  
A: Telegram Bot API полностью бесплатен!

**Q: Можно ли добавить поле "Телефон"?**  
A: Да! Добавьте в форму и в `handleSubmit` передайте `phone`.

**Q: Работает ли offline трекинг?**  
A: Нет, только когда пользователь онлайн.

**Q: GDPR compliant?**  
A: Да! Пользователь сам отправляет форму и видит cookie banner.

---

## 🎉 Готово!

Ваша система готова к работе!

**Следующие шаги:**
1. ✅ Настройте `.env.local` (см. Шаг 4 выше)
2. ✅ Протестируйте локально
3. ✅ Добавьте env variables в Vercel
4. ✅ Деплой!

**Нужна помощь?**
- Краткая инструкция: `TELEGRAM_БЫСТРАЯ_НАСТРОЙКА.md`
- Подробная: `TELEGRAM_SETUP_GUIDE.md`
- Главный README: `README_RU.md`

---

**Теперь каждая заявка = максимум информации о клиенте!** 🚀

