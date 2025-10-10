# Следующие шаги

## ✅ Что уже сделано

1. ✅ Настроен CORS для Sanity API
2. ✅ Обновлены все компоненты для работы с Sanity
3. ✅ Добавлена обработка ошибок во всех компонентах
4. ✅ Компоненты теперь корректно работают даже если данные не загружены

## 📝 Что нужно сделать сейчас

### 1. Добавить контент в Sanity Studio

Откройте Sanity Studio: http://localhost:3333

#### 1.1. Team & Partners

**Team Members (C-level):**
- Откройте **Team Members**
- Добавьте членов команды:
  - Name: Полное имя
  - Role: Должность (например, Chief Technology Officer)
  - Category: executive, technology, design, marketing, operations
  - Order: Порядок отображения (1, 2, 3...)

**Dedicated Specialists:**
- Откройте **Dedicated Specialists**
- Добавьте категории специалистов:
  - Title: Название (например, "Mobile Developers")
  - Count: Количество специалистов (например, 3)
  - Icon Type: Выберите "emoji" или "svg"
    - Если emoji: введите эмодзи в поле Icon (📱, 🎨, 💻)
    - Если svg: вставьте SVG код в поле SVG Code
  - Order: Порядок отображения

**Partners:**
- Откройте **Partners**
- Добавьте партнеров:
  - Name: Название компании
  - Logo: Загрузите логотип (PNG с прозрачностью, белый или черный)
  - URL: Ссылка на сайт партнера
  - Subtitle: Краткое описание (опционально)
  - Order: Порядок отображения

#### 1.2. Social Proof

**Clutch Badges:**
- Откройте **Clutch Badges**
- Добавьте награды (всего можно добавить до 15):
  - Title: Название награды (например, "TOP USER EXPERIENCE COMPANY")
  - Image: Загрузите изображение награды (PNG, 200x200px или больше)
  - Order: Порядок отображения (1-15)

**Testimonials:**
- Откройте **Testimonials**
- Добавьте отзывы клиентов:
  - Quote: Текст отзыва
  - Author: Имя автора
  - Position: Должность (например, "CEO at")
  - Company: Название компании
  - Has Media?: Если есть фото или видео, поставьте галочку
    - Media Type: image или video
    - Media Image: Загрузите фото (если выбран image)
    - Media Video URL: URL видео (если выбран video)
  - Has Company Logo?: Если есть логотип компании
    - Company Logo: Загрузите логотип
  - Clutch Link: Ссылка на отзыв на Clutch (опционально)
  - Case Study Slug: Slug проекта для ссылки "View Case" (опционально)

#### 1.3. Portfolio & Blog

**Categories:**
- Откройте **Categories**
- Создайте категории для блога и проектов:
  - Title: Название категории
  - Slug: URL-friendly slug
  - Description: Описание
  - Type: blog, project или both
  - Color: HEX код цвета (#FF6B6B)

**Authors (для блога):**
- Откройте **Authors**
- Добавьте авторов:
  - Name: Полное имя
  - Slug: URL-friendly slug
  - Image: Фото автора
  - Bio: Короткая биография
  - Role: Должность

**Projects:**
- Откройте **Projects**
- Добавьте проекты:
  - Title, Slug, Excerpt
  - Description: Полное описание (Rich Text)
  - Cover Image, Logo, Hero Image
  - Services: Список услуг
  - Gallery: Галерея изображений
  - Process: Этапы работы
  - Category: Выберите категорию
  - Tags: Теги проекта
  - Client, Year, Link
  - Featured?: Показывать на главной странице
  - Order: Порядок отображения

**Blog Posts:**
- Откройте **Blog Posts**
- Добавьте статьи:
  - Title, Slug, Excerpt
  - Content: Контент статьи (Rich Text)
  - Cover Image
  - Author: Выберите автора
  - Category: Выберите категорию
  - Tags: Теги статьи
  - SEO Keywords: Ключевые слова для SEO
  - Read Time: Время чтения (в минутах)
  - Published At: Дата публикации
  - Featured?: Показывать на главной странице

### 2. Проверьте сайт

После добавления контента в Sanity:

1. Откройте http://localhost:3000
2. Проверьте все секции:
   - ✅ Hero Section
   - ✅ Clutch Awards (если добавили badges)
   - ✅ Our Core Values
   - ✅ Featured Projects (если отметили проекты как Featured)
   - ✅ Testimonials (если добавили отзывы)
   - ✅ Partners (если добавили партнеров)
   - ✅ CTA Section

3. Откройте http://localhost:3000/about
   - ✅ Team Members
   - ✅ Dedicated Specialists

4. Откройте http://localhost:3000/works
   - ✅ Список всех проектов

5. Откройте http://localhost:3000/blog
   - ✅ Список всех статей

### 3. Добавьте изображения

Для правильного отображения изображений:

1. **Для локальных файлов** (testimonials, placeholder):
   - Используйте папку `/public/`
   - Например: `/public/testimonials/photo-1.jpg`

2. **Для Sanity изображений**:
   - Загружайте через Sanity Studio
   - Sanity автоматически оптимизирует изображения

### 4. SVG логотипы для Dedicated Specialists

См. инструкцию в файле `SVG_CODE_GUIDE.md`

## 🚀 Деплой Sanity Studio (опционально)

Когда все готово к production:

```bash
cd studio-in-fomo.-website
npm run deploy
```

Это развернет Sanity Studio на поддомене:
`https://your-project.sanity.studio`

## ⚙️ Настройка для Production

1. **Добавьте production домен в CORS:**
   ```bash
   cd studio-in-fomo.-website
   npx sanity cors add https://your-domain.com --credentials
   ```

2. **Обновите Next.js config:**
   - В `next.config.mjs` уже настроен Sanity CDN
   - Проверьте переменные окружения

3. **Включите ISR (уже настроено):**
   - Все компоненты с Sanity используют `revalidate: 60`
   - Данные обновляются каждые 60 секунд

## 🐛 Если что-то не работает

1. Убедитесь, что оба сервера запущены:
   - Next.js: http://localhost:3000
   - Sanity Studio: http://localhost:3333

2. Проверьте CORS:
   ```bash
   cd studio-in-fomo.-website
   npx sanity cors list
   ```
   Должны быть:
   - http://localhost:3000
   - http://localhost:3333

3. Очистите кеш Next.js:
   ```bash
   rm -rf .next
   npm run dev
   ```

4. Проверьте консоль браузера на ошибки

## 📚 Документация

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

---

**Готово! Ваш сайт готов к наполнению контентом! 🎉**

