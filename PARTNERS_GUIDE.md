# 🤝 Partners Section - Complete Guide

## ✅ Что создано

Красивая секция партнеров с управлением через Sanity CMS!

### Особенности:
✅ Управление через админ панель  
✅ Логотипы любых размеров (длинные, квадратные, высокие)  
✅ Автоматическое выравнивание логотипов  
✅ Черно-белая маска → цвет при hover  
✅ SEO-правильные ссылки (nofollow, noopener, noreferrer)  
✅ Адаптивный grid layout  
✅ Плавные анимации  
✅ До 20+ партнеров  

### Где отображается:
- 🏠 **Главная страница** - перед "Start a Project"
- 📝 **Страница блог-поста** - перед контактной формой
- 🎨 **Страница проекта** - перед контактной формой

---

## 🎨 Дизайн

### Визуальные эффекты:

**По умолчанию:**
- Логотип: черно-белый (grayscale 100%)
- Непрозрачность: 60%
- Единый размер: max 140x60px (desktop)

**При hover:**
- Логотип: цветной (grayscale 0%)
- Непрозрачность: 100%
- Масштаб: +10%
- Subtitle появляется снизу
- Карточка поднимается
- Тень увеличивается

### Нормализация логотипов:

**Все логотипы:**
- Масштабируются пропорционально
- Центрируются в карточке
- Ограничены максимальным размером
- Сохраняют aspect ratio

**Независимо от формы:**
- 📏 Длинные (горизонтальные) - max-width: 140px
- ⬜ Квадратные - max: 60x60px
- 📐 Высокие (вертикальные) - max-height: 60px

---

## 📋 Управление в Sanity

### Добавление партнера

В Studio: **Team & Partners → Partners**

**Поля:**

1. **Partner Name** ⭐ (required)
   - Название компании
   - Для title атрибута и alt текста

2. **Logo** ⭐ (required)
   - Загрузите PNG или SVG
   - Предпочтительно: с прозрачным фоном
   - Рекомендуемый размер: 400x200px или больше

3. **Website URL** ⭐ (required)
   - Полная ссылка на сайт партнера
   - Должна начинаться с http:// или https://

4. **Subtitle** (optional)
   - Краткое описание или категория
   - Например: "Technology Partner", "Design Agency"
   - Появляется при hover

5. **Display Order**
   - Порядок отображения
   - Меньше = раньше
   - Используйте 10, 20, 30...

### Пример:

```
Name: Google Cloud
Logo: [загрузите google-cloud-logo.png]
URL: https://cloud.google.com
Subtitle: Cloud Infrastructure
Order: 10
```

---

## 🎯 Рекомендации

### Подготовка логотипов:

**Формат:**
- PNG (с прозрачным фоном) ✅ Рекомендуется
- SVG (векторный) ✅ Рекомендуется
- JPG (с белым фоном) ⚠️ Приемлемо

**Размер:**
- Минимум: 200x100px
- Рекомендуется: 400x200px
- Максимум: 800x400px
- Размер файла: < 100KB

**Качество:**
- Высокое разрешение для Retina
- Четкие линии
- Без артефактов сжатия

### Оптимальное количество:

**Desktop:**
- 4 колонки
- Рекомендуется: 8, 12, 16, 20 партнеров
- Кратное 4 для ровных рядов

**Tablet (768-1024px):**
- 3 колонки
- Кратное 3: 9, 12, 15...

**Mobile (<768px):**
- 2 колонки
- Кратное 2: 8, 10, 12...

### SEO & Security:

Ссылки автоматически получают атрибуты:
```html
<a 
  href="..." 
  target="_blank"
  rel="nofollow noopener noreferrer"
>
```

**Что это значит:**
- `nofollow` - не передавать PageRank (SEO)
- `noopener` - безопасность (защита от window.opener)
- `noreferrer` - не передавать referrer
- `target="_blank"` - открывается в новой вкладке

---

## 🔧 Кастомизация

### Изменить количество колонок

В `PartnersSection.module.css`:

```css
.partnersGrid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Измените 200px на нужное значение */
}
```

### Изменить размер логотипов

```css
.logo {
  max-width: 140px;  /* Измените ширину */
  max-height: 60px;  /* Измените высоту */
}
```

### Изменить эффект hover

Уберите grayscale для постоянного цвета:

```css
.logo {
  filter: brightness(0) invert(1) opacity(0.8);
  /* Вместо grayscale(100%) */
}

.partnerCard:hover .logo {
  filter: brightness(0) invert(1) opacity(1);
  /* Без grayscale(0%) */
}
```

---

## 💡 Примеры партнеров

### Technology Partners:
- Google Cloud
- AWS
- Microsoft Azure
- Vercel
- MongoDB

### Integration Partners:
- Stripe (payments)
- SendGrid (email)
- Twilio (communications)

### Design/Dev Tools:
- Figma
- Adobe
- GitHub
- Notion

### Industry Partners:
- Клиенты (с разрешением)
- Ассоциации
- Сертификации

---

## 📱 Адаптивность

### Desktop (>1024px)
- Grid: 4 колонки
- Logo: max 140x60px
- Card height: 160px

### Tablet (768-1024px)
- Grid: 3-4 колонки (auto-fill)
- Logo: max 120x50px
- Card height: 140px

### Mobile (<768px)
- Grid: 2-3 колонки
- Logo: max 100x45px
- Card height: 120px

### Small Mobile (<480px)
- Grid: 2 колонки фиксированно
- Logo: max 90x40px
- Card height: 100px

---

## 🚀 Quick Start

### 1. Откройте Sanity Studio

```bash
cd studio-in-fomo.-website
npm run dev
```

http://localhost:3333

### 2. Создайте партнеров

**Team & Partners → Partners → Create**

Добавьте 4-8 партнеров для начала:

```
1. Google (order: 10)
2. Microsoft (order: 20)
3. Amazon (order: 30)
4. Meta (order: 40)
```

### 3. Проверьте результат

- http://localhost:3000/ - главная (внизу)
- http://localhost:3000/blog/[slug] - страница поста
- http://localhost:3000/works/[slug] - страница проекта

---

## 🎨 Стилевые фичи

### Фиксированная высота карточек
- Все карточки одинаковой высоты
- Логотипы центрируются по вертикали и горизонтали
- Не "прыгают" при разных размерах

### Object-fit: contain
- Логотипы масштабируются пропорционально
- Не обрезаются
- Не искажаются

### Умные фильтры
```css
/* Черно-белый по умолчанию */
filter: grayscale(100%) brightness(0) invert(1) opacity(0.6);

/* Цветной при hover */
filter: grayscale(0%) brightness(1) invert(0) opacity(1);
```

---

## ✨ Итого

✅ **Управляемая секция** через CMS  
✅ **Универсальные логотипы** - любой размер/форма  
✅ **SEO-правильно** - nofollow, noopener, noreferrer  
✅ **Красивые эффекты** - grayscale → color  
✅ **Responsive** - адаптируется под все устройства  
✅ **Скрывается** если партнеров нет  
✅ **До 20+ партнеров** - с комфортом  

**Секция партнеров готова! 🎉**

Добавьте логотипы в Studio и они появятся на сайте!
