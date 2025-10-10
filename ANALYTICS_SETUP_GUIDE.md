# 📊 Analytics & Tracking Setup Guide

## ✅ Что настроено

### 1. **Google Tag Manager (GTM)**
- ✅ Компонент создан: `components/GoogleTagManager.tsx`
- ✅ Управление через Sanity CMS
- ✅ Fallback на `.env` переменную

### 2. **Hotjar**
- ✅ Tracking Code интегрирован
- ✅ Site ID: `6543563`
- ✅ Автоматическая инициализация

### 3. **Cloudflare Web Analytics**
- ✅ Поддержка добавлена
- ✅ Управление через Sanity или `.env`

### 4. **Cookie Consent Integration**
- ✅ Скрипты инициализируются только после согласия пользователя
- ✅ GDPR compliant

---

## 🚀 Как настроить

### Шаг 1: Добавьте GTM ID в Sanity

1. Откройте **Sanity Studio**: http://localhost:3333
2. Перейдите в **⚙️ Settings** → **Site Settings**
3. Заполните поле **"Google Tag Manager ID"**:
   ```
   GTM-XXXXXXX
   ```
4. Нажмите **Publish**

### Шаг 2: Настройте Cloudflare (опционально)

1. Создайте аккаунт на https://dash.cloudflare.com/
2. Перейдите в **Analytics** → **Web Analytics**
3. Скопируйте ваш **Site Token**
4. Добавьте в **Sanity Studio** → **Settings** → **Site Settings**:
   ```
   your-cloudflare-token-here
   ```

### Шаг 3: Hotjar уже настроен ✅

Hotjar автоматически работает с Site ID: **6543563**

Если нужно изменить ID:
- Откройте `components/Analytics.tsx`
- Найдите строку: `hjid: 6543563`
- Замените на ваш Hotjar Site ID

---

## ⚙️ Альтернативная настройка через .env

Создайте файл `.env.local` в корне проекта:

```bash
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Cloudflare Web Analytics
NEXT_PUBLIC_CLOUDFLARE_TOKEN=your-cloudflare-token-here

# Site URL (для OG meta)
NEXT_PUBLIC_SITE_URL=https://in-fomo.com
```

**Приоритет:**
1. Сначала проверяется Sanity CMS
2. Если нет в Sanity → используется `.env`

---

## 📁 Структура компонентов

```
/components
  ├── GoogleTagManager.tsx   # GTM интеграция
  ├── Analytics.tsx          # Hotjar + Cloudflare
  └── CookieBanner.tsx       # GDPR Cookie Consent

/app
  ├── layout.tsx             # Все компоненты подключены здесь
  └── api/settings/route.ts  # API для получения настроек из Sanity
```

---

## 🔒 GDPR Compliance

### Как работает Cookie Consent:

1. **Пользователь заходит** → видит Cookie Banner
2. **Выбирает согласие**:
   - ✅ Accept All → все скрипты загружаются
   - ❌ Reject → только необходимые
   - ⚙️ Customize → выбирает что разрешить

3. **Скрипты инициализируются** только после согласия:
```typescript
// Analytics.tsx
const consent = localStorage.getItem('cookieConsent');
if (consent) {
  const { analytics } = JSON.parse(consent);
  if (analytics) {
    initHotjar(); // ✅ Загружается только если разрешено
  }
}
```

---

## 🧪 Проверка работы

### 1. GTM
1. Откройте сайт
2. Нажмите `F12` → `Network`
3. Найдите запрос к `googletagmanager.com`
4. Проверьте что ваш GTM ID присутствует

### 2. Hotjar
1. Откройте сайт
2. `F12` → `Console`
3. Выполните: `window.hj`
4. Должна быть функция (не `undefined`)

### 3. Cloudflare
1. Откройте сайт
2. `F12` → `Network`
3. Найдите `cloudflareinsights.com/beacon.min.js`

---

## 📊 OG Image & Meta Tags

### Настройка в Sanity:

1. **Sanity Studio** → **Settings** → **Site Settings**
2. Загрузите **OG Image** (1200x630px)
3. Заполните:
   - **Site Title**
   - **Site Description** (max 160 символов)
4. Publish

### Автоматические мета-теги:

```html
<!-- Open Graph -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="..." />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

---

## 🎯 Что делать дальше

### Обязательно:
1. ✅ Добавьте GTM ID в Sanity
2. ✅ Загрузите OG Image (1200x630px)
3. ✅ Заполните Site Title и Description

### Рекомендуется:
4. ✅ Настройте Cloudflare Analytics
5. ✅ Проверьте работу всех скриптов
6. ✅ Протестируйте Cookie Consent

### Опционально:
7. ✅ Настройте конверсии в GTM
8. ✅ Добавьте дополнительные tracking события
9. ✅ Настройте цели в Hotjar

---

## 🐛 Troubleshooting

### GTM не загружается:
- Проверьте GTM ID в Sanity
- Проверьте консоль на ошибки
- Убедитесь что Cookie Consent дан

### Hotjar не работает:
- Проверьте Site ID (должен быть `6543563`)
- Убедитесь что Analytics cookies разрешены
- Проверьте `window.hj` в консоли

### Cloudflare не работает:
- Проверьте токен в Sanity
- Проверьте `.env.local` если не используете Sanity
- Убедитесь что скрипт загружен (Network tab)

---

## 📚 Дополнительные ресурсы

- **GTM**: https://tagmanager.google.com/
- **Hotjar**: https://www.hotjar.com/
- **Cloudflare**: https://www.cloudflare.com/web-analytics/
- **OG Image Generator**: https://www.opengraph.xyz/

---

**Готово!** 🎉 Ваш сайт теперь полностью оснащён аналитикой и tracking.

Не забудьте заполнить Site Settings в Sanity Studio!

