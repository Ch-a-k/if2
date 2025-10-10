# 📋 Legal Pages & GDPR Compliance Guide

## ✅ Что создано

### 1️⃣ **Юридические страницы**

#### Privacy Policy (Политика конфиденциальности)
- **URL**: `/privacy`
- **Содержит**:
  - Описание собираемых данных
  - Правовые основания обработки (GDPR)
  - Права пользователей (доступ, удаление, изменение)
  - Безопасность данных
  - **Дисклеймеры** для снижения ответственности

#### Terms of Service (Условия использования)
- **URL**: `/terms`
- **Содержит**:
  - Правила использования сайта
  - Интеллектуальная собственность
  - Отказ от гарантий
  - **Ограничение ответственности**
  - Применимое право (Польша)

#### Cookie Policy (Политика Cookie)
- **URL**: `/cookies`
- **Содержит**:
  - Типы используемых cookie
  - Управление cookie
  - GDPR соответствие
  - Информация о третьих сторонах

---

### 2️⃣ **GDPR Cookie Consent Banner**

#### Функционал
✅ Появляется при первом визите  
✅ Три режима согласия:
- **Accept All** - принять все cookie
- **Reject Non-Essential** - только необходимые cookie
- **Customize** - гибкая настройка

#### Типы Cookie
1. **Strictly Necessary** (обязательные) - нельзя отключить
2. **Analytics** (аналитика) - можно отключить
3. **Marketing** (маркетинг) - можно отключить
4. **Functional** (функциональные) - можно отключить

#### Хранение согласия
- Сохраняется в `localStorage` браузера
- Ключ: `cookieConsent`
- Включает временную метку

---

## 🎨 Стили

Все страницы используют единый стиль:
- **Тёмный фон** (в стиле сайта)
- **Анимации** появления секций
- **Hover эффекты** для интерактивности
- **Responsive дизайн** (мобильная адаптация)

---

## ⚠️ Дисклеймеры

### Почему они важны?
Все страницы содержат **максимальные дисклеймеры** для снижения вашей юридической ответственности:

✅ "Provided for informational purposes only"  
✅ "No warranties or guarantees"  
✅ "TO THE MAXIMUM EXTENT PERMITTED BY LAW"  
✅ "Consult qualified legal professional"

---

## 🔧 Что нужно настроить

### 1. Email адреса
В файлах замените placeholder email'ы:

**Privacy Policy** (`app/privacy/page.tsx`):
```tsx
Email: privacy@in-fomo.com  // Замените на реальный
```

**Terms** (`app/terms/page.tsx`):
```tsx
Email: info@in-fomo.com    // Замените на реальный
```

**Cookies** (`app/cookies/page.tsx`):
```tsx
Email: privacy@in-fomo.com  // Замените на реальный
```

### 2. Юридические детали
📌 **Рекомендуем проконсультироваться с юристом** для адаптации под ваши конкретные условия.

### 3. Интеграция аналитики
В `CookieBanner.tsx` функция `initializeScripts()` - здесь подключайте:
- Google Analytics
- Facebook Pixel
- Другие скрипты отслеживания

```typescript
const initializeScripts = (consent: any) => {
  if (consent.analytics && typeof window !== 'undefined') {
    // Ваш код для Google Analytics
    // window.gtag('consent', 'update', {
    //   'analytics_storage': 'granted'
    // });
  }
  
  if (consent.marketing && typeof window !== 'undefined') {
    // Ваш код для маркетинговых пикселей
  }
};
```

---

## 📱 Проверка

### Desktop
1. Откройте http://localhost:3000
2. Должен появиться Cookie Banner
3. Протестируйте все три кнопки
4. Перейдите на `/privacy`, `/terms`, `/cookies`

### Mobile
1. Откройте DevTools (F12)
2. Включите Mobile View
3. Проверьте адаптивность баннера и страниц

### LocalStorage
Откройте консоль и проверьте:
```javascript
localStorage.getItem('cookieConsent')
```

Для сброса (чтобы баннер появился снова):
```javascript
localStorage.removeItem('cookieConsent')
location.reload()
```

---

## 🌍 GDPR Compliance

### ✅ Что реализовано
- Явное согласие пользователя перед установкой cookie
- Гранулярный контроль типов cookie
- Возможность отказаться от неосновных cookie
- Прозрачная информация о сборе данных
- Легкий доступ к политикам

### 🔗 Ссылки в Footer
Cookie Banner и юридические страницы уже добавлены в футер сайта.

---

## 📄 Структура файлов

```
/app
  /privacy
    page.tsx              # Privacy Policy страница
    legal.module.css      # Общие стили для юридических страниц
  /terms
    page.tsx              # Terms of Service страница
  /cookies
    page.tsx              # Cookie Policy страница
  layout.tsx              # Обновлен (добавлен CookieBanner)

/components
  CookieBanner.tsx        # GDPR Cookie Consent компонент
  CookieBanner.module.css # Стили для баннера
```

---

## 🚀 Следующие шаги

1. ✅ Замените placeholder email'ы на реальные
2. ✅ Проверьте все страницы на правильность информации
3. ✅ Добавьте Google Analytics и другие скрипты в `initializeScripts()`
4. ✅ **(Рекомендуется)** Проконсультируйтесь с юристом
5. ✅ Протестируйте на разных устройствах

---

## 💡 Советы

### Для полного GDPR compliance:
1. **Ведите журнал согласий** (когда, кто, какие cookie одобрены)
2. **Регулярно обновляйте** политики
3. **Обеспечьте легкий доступ** к изменению настроек cookie
4. **Реагируйте быстро** на запросы пользователей о данных

### Автоматическое появление настроек cookie:
Вы можете добавить ссылку "Cookie Settings" в футер для повторного открытия настроек:
```typescript
localStorage.removeItem('cookieConsent')
window.dispatchEvent(new Event('storage'))
```

---

**Готово!** 🎉 Ваш сайт теперь соответствует базовым требованиям GDPR.

*Disclaimer: Эта документация предоставлена для информационных целей и не является юридической консультацией.*

