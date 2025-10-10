# 🎨 SVG Code Guide - Добавление SVG через код

## ✅ Что изменено

Теперь вы можете вставлять SVG код напрямую в админ панель!

### Specialists - Icon Type: SVG

**Было:**
- Загрузка SVG файла

**Стало:**
- Вставка SVG кода в текстовое поле
- Любой SVG код (из библиотек, генераторов и т.д.)

---

## 📝 Как добавить SVG

### 1. Откройте Sanity Studio

http://localhost:3333 → **Team & Partners → Specialists**

### 2. Создайте или редактируйте Specialist

1. Title: "React Developers"
2. Count: 5
3. **Icon Type: SVG** ← выберите
4. **SVG Code** ← появится текстовое поле

### 3. Вставьте SVG код

Пример React иконки:

```svg
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
  <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" stroke-width="1" fill="none"/>
  <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" stroke-width="1" fill="none" transform="rotate(60 12 12)"/>
  <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" stroke-width="1" fill="none" transform="rotate(120 12 12)"/>
</svg>
```

### 4. Сохраните

Нажмите **Publish** и SVG появится на сайте!

---

## 🔍 Где взять SVG код

### 1. Heroicons
https://heroicons.com/

```svg
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="..."/>
</svg>
```

### 2. Feather Icons
https://feathericons.com/

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="..."/>
</svg>
```

### 3. Simple Icons (бренды)
https://simpleicons.org/

Скопируйте SVG код любого бренда:
- React, Vue, Angular
- Node.js, Python, Go
- AWS, Google Cloud, Azure

### 4. Devicon
https://devicon.dev/

Технологические иконки с SVG кодом.

### 5. Iconify
https://icon-sets.iconify.design/

Огромная коллекция с возможностью копировать SVG.

---

## 🎨 Как работает

### Рендеринг SVG:

```typescript
{specialist.svgCode ? (
  <div 
    className={styles.svgWrapper}
    dangerouslySetInnerHTML={{__html: specialist.svgCode}}
  />
) : (
  '💼' // fallback
)}
```

### CSS фильтры:

```css
.svgWrapper svg {
  width: 100%;
  height: 100%;
  filter: brightness(0) invert(1); /* Белый цвет */
  opacity: 0.8;
}

/* При hover */
.specialistCard:hover .svgWrapper svg {
  opacity: 1;
  transform: scale(1.1);
}
```

### Размеры (автоматически):
- Desktop: 32x32px
- Tablet: 28x28px
- Mobile: 24x24px

---

## 💡 Примеры SVG кода

### React
```svg
<svg viewBox="0 0 24 24" fill="currentColor">
  <circle cx="12" cy="12" r="2"/>
  <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor"/>
  <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" transform="rotate(60 12 12)"/>
  <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" transform="rotate(120 12 12)"/>
</svg>
```

### Node.js
```svg
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 1.5l10 5.5v11L12 22.5 2 18V7l10-5.5z"/>
</svg>
```

### Mobile Phone
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="5" y="2" width="14" height="20" rx="2"/>
  <line x1="12" y1="18" x2="12" y2="18"/>
</svg>
```

### Design/Figma
```svg
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M8 2h4v6H8a3 3 0 010-6zm0 6h4v6H8a3 3 0 010-6zm8-6a3 3 0 110 6h-4V2h4zm0 12a3 3 0 11-3 3V14a3 3 0 013 0z"/>
</svg>
```

### Code/Programming
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <polyline points="16 18 22 12 16 6"/>
  <polyline points="8 6 2 12 8 18"/>
</svg>
```

---

## ⚠️ Важно

### SVG должен быть безопасным:
- ✅ Только SVG теги
- ✅ Без `<script>` тегов
- ✅ Без event handlers (onclick и т.д.)
- ✅ Простой чистый SVG

### Оптимизация SVG:

Используйте [SVGOMG](https://jakearchibald.github.io/svgomg/):
1. Вставьте ваш SVG
2. Нажмите "Optimize"
3. Скопируйте результат

### ViewBox важен!

Убедитесь что есть `viewBox`:
```svg
<svg viewBox="0 0 24 24">
  <!-- content -->
</svg>
```

Без viewBox SVG может отображаться неправильно.

---

## 🎯 Best Practices

### 1. Используйте currentColor

```svg
<svg fill="currentColor">
  <!-- Цвет наследуется от CSS -->
</svg>
```

Или:

```svg
<svg stroke="currentColor" fill="none">
  <!-- Для outline иконок -->
</svg>
```

### 2. Стандартный viewBox

Используйте `viewBox="0 0 24 24"` для консистентности.

### 3. Минимизация

Удалите лишние атрибуты:
- xmlns можно убрать (браузер добавит)
- width/height не нужны (CSS управляет)
- id, class не нужны

### 4. Одноцветные иконки

Для лучшего эффекта grayscale используйте одноцветные SVG.

---

## 📊 Сравнение: Emoji vs SVG

### Emoji 😀
**Плюсы:**
- ✅ Быстро
- ✅ Не нужен код
- ✅ Всегда работает

**Минусы:**
- ❌ Ограниченный выбор
- ❌ Не брендированные
- ❌ Зависит от ОС

### SVG Code 🎨
**Плюсы:**
- ✅ Брендированные логотипы
- ✅ Профессиональный вид
- ✅ Полный контроль
- ✅ Кастомизация
- ✅ Бесконечный выбор

**Минусы:**
- ❌ Нужно найти/создать
- ❌ Может быть сложный код
- ❌ Нужна оптимизация

---

## ✨ Примеры использования

### Frontend Technologies:
```
React Developers: 5
[React SVG logo]

Vue.js Developers: 3
[Vue SVG logo]

Angular Developers: 2
[Angular SVG logo]
```

### Backend Technologies:
```
Node.js Developers: 4
[Node.js SVG logo]

Python Developers: 3
[Python SVG logo]

PHP Developers: 2
[PHP SVG logo]
```

### Design Tools:
```
Figma Designers: 4
[Figma SVG logo]

Adobe Designers: 2
[Adobe SVG logo]
```

---

## 🚀 Quick Start

### 1. Выберите иконку

Зайдите на https://heroicons.com/ или https://simpleicons.org/

### 2. Скопируйте SVG код

Нажмите на иконку → Copy SVG

### 3. Вставьте в Sanity

Team & Partners → Specialists → SVG Code field

### 4. Проверьте

http://localhost:3000/about - секция Dedicated Specialists

---

## 🎉 Готово!

Теперь вы можете использовать любые SVG иконки для категорий специалистов!

**Преимущества:**
✅ Брендированные логотипы (React, Vue, Node...)  
✅ Профессиональный вид  
✅ Полная кастомизация  
✅ Белый цвет автоматически (filter)  
✅ Hover эффекты  

**Попробуйте прямо сейчас в Studio! 🚀**
