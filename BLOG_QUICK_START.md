# 📝 Blog Quick Start Guide

## ✅ Что готово

### Страницы
✅ `/app/blog/page.tsx` - список всех постов  
✅ `/app/blog/[slug]/page.tsx` - отдельный пост с SEO  

### Компоненты
✅ `ShareButtons.tsx` - кнопки соцсетей  
✅ `AdjacentPosts.tsx` - навигация между постами  
✅ `ContactForm.tsx` - форма в Telegram  

### Стили (в стиле сайта)
✅ Все CSS модули созданы  
✅ Черный фон, белый текст  
✅ Прозрачные карточки  
✅ Плавные анимации  
✅ Полностью адаптивный дизайн  

---

## 🚀 Запуск за 5 шагов

### 1. Добавьте контент в Sanity Studio

Откройте http://localhost:3333

1. **Создайте автора** (Author):
   - Name: "Your Name"
   - Slug: "your-name"
   - Role: "Content Writer"
   - Image: загрузите фото

2. **Создайте пост** (Blog Post):
   - Title: "Your First Post"
   - Slug: нажмите "Generate"
   - Excerpt: 150-160 символов (для SEO)
   - Content: напишите статью
   - Cover Image: загрузите обложку + Alt text
   - Author: выберите созданного автора
   - Category: выберите категорию
   - Tags: добавьте теги
   - Read Time: например, 5
   - Published At: выберите дату

### 2. Настройте Telegram бота

В файле `/components/blog/ContactForm.tsx`:

```typescript
// Замените эти значения
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN'  // От @BotFather
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'      // ID группы
```

**Как получить:**
1. Создайте бота: https://t.me/botfather
2. Команда `/newbot` → введите имя
3. Получите токен
4. Создайте группу, добавьте бота
5. Узнайте Chat ID через @userinfobot

### 3. Добавьте ссылку в Header

В `/components/Header.tsx` добавьте:

```tsx
<Link href="/blog" className={styles.navLink}>
  <span>Blog</span>
</Link>
```

### 4. Проверьте в браузере

```bash
npm run dev
```

- Список постов: http://localhost:3000/blog
- Отдельный пост: http://localhost:3000/blog/your-post-slug

### 5. Deploy Sanity Studio

```bash
cd studio-in-fomo.-website
npm run build
npm run deploy
```

---

## 📊 SEO Features (уже работают!)

✅ **Meta Tags**: title, description, keywords  
✅ **Open Graph**: для Facebook, LinkedIn  
✅ **Twitter Cards**: с большими изображениями  
✅ **Schema.org**: JSON-LD structured data  
✅ **Canonical URLs**: для избежания дублей  
✅ **Alt tags**: для всех изображений  
✅ **Semantic HTML**: правильная структура  
✅ **Social Sharing**: 6 кнопок (Twitter, FB, LinkedIn, Telegram, WhatsApp, Copy)  

---

## 🎨 Дизайн

Стили полностью соответствуют сайту:
- Черный фон (#000000)
- Белый текст (#ffffff)
- Прозрачные элементы (rgba)
- Inter font
- Плавные hover эффекты
- Адаптивный на все устройства

### Список постов
- Grid layout с карточками
- Hover эффекты (поднимается, увеличивается изображение)
- Категория, время чтения, дата
- Excerpt (краткое описание)

### Страница поста
- Хлебные крошки
- Большой заголовок
- Информация об авторе
- Обложка (16:9)
- Читабельный контент (800px ширина)
- Кнопки поделиться
- Теги
- Навигация к другим постам
- Контактная форма внизу

---

## 📝 Создание контента

### Оптимальные размеры

**Текст:**
- Title: 50-60 символов
- Excerpt: 150-160 символов (для SEO)
- Content: 800-1500 слов
- H2/H3: для структуры

**Изображения:**
- Cover Image: 1200x630px (16:9)
- Content Images: 800px ширина
- Формат: WebP или JPG
- Размер: < 500KB

### SEO Keywords

Добавьте 5-10 ключевых слов:
- Основная тема
- Связанные термины
- Long-tail keywords

### Tags

Используйте 3-5 тегов:
- Категория
- Технологии
- Аудитория

---

## 🔧 Кастомизация

### Изменить количество постов на главной

В `/lib/sanity.ts`:

```typescript
featuredBlogPosts: `*[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...6]`
// Измените 6 на нужное число
```

### Добавить новую категорию

В `/studio-in-fomo.-website/schemaTypes/blogPost.ts`:

```typescript
options: {
  list: [
    {title: 'Your Category', value: 'your-category'},
    // ...
  ],
}
```

### Изменить цвета кнопок

В стилях компонентов измените `rgba` значения.

---

## 📱 Адаптивность

Все адаптируется автоматически:

**Desktop (> 1024px):**
- 3 колонки постов
- Полная ширина контента

**Tablet (768-1024px):**
- 2 колонки постов
- Уменьшенные отступы

**Mobile (< 768px):**
- 1 колонка постов
- Компактный дизайн
- Оптимизированные шрифты

---

## ✨ Дополнительные возможности

### RSS Feed
Добавьте генерацию RSS для подписчиков

### Newsletter
Интегрируйте сбор email

### Comments
Добавьте Disqus или другую систему комментариев

### Related Posts
Покажите похожие статьи

### Table of Contents
Автоматическое оглавление из H2/H3

---

## 🚀 Production Checklist

- [ ] Добавлено минимум 5-10 постов
- [ ] Все изображения оптимизированы
- [ ] Настроен Telegram бот
- [ ] Добавлена ссылка в Header
- [ ] Проверены все мета-теги
- [ ] Deployed Sanity Studio
- [ ] Настроены CORS в Sanity
- [ ] Проверена адаптивность на мобильных
- [ ] Протестированы все ссылки
- [ ] Проверена форма обратной связи

---

## 📚 Полная документация

- `SANITY_COMPLETE_GUIDE.md` - полное руководство по Sanity
- `BLOG_AND_PROJECTS_GUIDE.md` - детальное руководство по блогу
- `SANITY_GUIDE.md` - интеграция Sanity

---

**Готово! Блог полностью работает! 🎉**

Откройте http://localhost:3000/blog и начните публиковать!
