# 🍪 Быстрый старт: Cookie Banner

## ⚡ Как увидеть Cookie Banner ПРЯМО СЕЙЧАС

### Способ 1: Один клик! 🖱️

1. **Откройте файл** `ПОКАЗАТЬ_COOKIE_BANNER.html` (он уже открыт в браузере)
2. **Нажмите кнопку** "🔄 Сбросить Cookie Banner"
3. **Готово!** Сайт откроется автоматически с Cookie Banner

---

### Способ 2: Через консоль (5 секунд)

1. Откройте http://localhost:3000
2. Нажмите **F12**
3. Вставьте в Console:
   ```javascript
   localStorage.removeItem('cookieConsent'); location.reload()
   ```
4. Нажмите Enter

---

## 🎯 Что вы увидите

### На Desktop:
![Cookie Banner Desktop]

**Внизу экрана появится баннер:**
- 🍪 Emoji печенье
- Заголовок "We value your privacy"
- Описание использования cookie
- Ссылки на Cookie Policy и Privacy Policy
- 3 кнопки:
  - ✅ **Accept All** - принять все cookie
  - ❌ **Reject Non-Essential** - только необходимые
  - ⚙️ **Customize** - настроить подробно

### Режим "Customize":
- 4 типа cookie с чекбоксами
- **Strictly Necessary** - всегда включены (нельзя отключить)
- **Analytics** - аналитика (можно отключить)
- **Marketing** - маркетинг (можно отключить)
- **Functional** - функциональные (можно отключить)

---

## 🧪 Тестирование

### Тест всех трёх режимов:

#### 1️⃣ Accept All:
```javascript
localStorage.removeItem('cookieConsent'); location.reload()
// → Нажать "Accept All"
// → Проверить: все cookie = true
```

#### 2️⃣ Reject Non-Essential:
```javascript
localStorage.removeItem('cookieConsent'); location.reload()
// → Нажать "Reject Non-Essential"
// → Проверить: только necessary = true
```

#### 3️⃣ Customize:
```javascript
localStorage.removeItem('cookieConsent'); location.reload()
// → Нажать "Customize"
// → Выбрать только Analytics
// → Нажать "Save Preferences"
// → Проверить: necessary + analytics = true
```

---

## ✅ Проверка сохранения

### Откройте DevTools → Application → Local Storage:

После "Accept All":
```json
{
  "necessary": true,
  "analytics": true,
  "marketing": true,
  "functional": true,
  "timestamp": "2025-01-09T..."
}
```

После "Reject":
```json
{
  "necessary": true,
  "analytics": false,
  "marketing": false,
  "functional": false,
  "timestamp": "2025-01-09T..."
}
```

---

## 📱 Мобильная версия

1. Откройте DevTools (F12)
2. Включите Device Mode (Cmd+Shift+M)
3. Выберите iPhone или Android
4. Очистите localStorage
5. Cookie Banner адаптируется под мобильные

---

## 🔧 Для разработки

### Постоянно показывать баннер (для тестирования):

В `components/CookieBanner.tsx` временно закомментируйте:
```typescript
useEffect(() => {
  // const consent = localStorage.getItem('cookieConsent');
  // if (!consent) {
    setTimeout(() => setIsVisible(true), 1000);
  // }
}, []);
```

Баннер будет появляться всегда!

---

## 🎨 Кастомизация

### Изменить текст:
Файл: `components/CookieBanner.tsx`

```typescript
<h3>We value your privacy</h3>  // ← Измените здесь
<p>We use cookies to...</p>      // ← И здесь
```

### Изменить стили:
Файл: `components/CookieBanner.module.css`

```css
.banner {
  background: /* ваш цвет */;
}

.buttonPrimary {
  background: /* ваш цвет кнопки */;
}
```

---

## 🚀 Готово!

**Cookie Banner установлен и работает!** 🎉

При первом визите пользователя он автоматически появится через 1 секунду после загрузки страницы.

---

**Нужна помощь?** См. полную инструкцию: `КАК_УВИДЕТЬ_COOKIE_BANNER.md`

