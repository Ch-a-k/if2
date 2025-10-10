# Blog & Projects - Sanity Integration Guide

## 📝 Обзор

Полная система управления блогом и проектами через Sanity CMS с SEO оптимизацией.

## 🎯 Возможности

### Blog Features
✅ Полная SEO оптимизация (meta tags, Open Graph, Twitter Cards)  
✅ Schema.org structured data (BlogPosting)  
✅ Кнопки "Поделиться" (Twitter, Facebook, LinkedIn, Telegram, WhatsApp)  
✅ Навигация между статьями (Previous/Next с превью)  
✅ Контактная форма в конце каждого поста (отправка в Telegram)  
✅ Поддержка изображений в контенте  
✅ Категории и теги  
✅ Время чтения  
✅ Информация об авторе  
✅ Адаптивный дизайн

### Projects Features
✅ Управление портфолио через Sanity  
✅ Featured проекты для главной страницы  
✅ Категории и теги  
✅ Галерея изображений  
✅ Информация о клиенте и год выпуска  
✅ Ссылка на live версию

## 🚀 Быстрый старт

### 1. Добавьте контент в Sanity Studio

Откройте http://localhost:3333 и добавьте:

#### Создайте автора (Author)
- Name
- Slug
- Image
- Bio
- Role

#### Создайте проекты (Projects)
- Title
- Slug
- Excerpt
- Description
- Cover Image
- Category
- Client
- Year
- Featured (для главной)
- Order

#### Создайте блог посты (Blog Posts)
- Title
- Slug  
- Excerpt (макс 160 символов для SEO)
- Content (rich text с изображениями)
- Cover Image
- Author
- Category
- Tags
- SEO Keywords
- Read Time
- Featured

### 2. Настройте Telegram бота

Для контактной формы в конце постов:

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите Bot Token
3. Создайте группу/канал и добавьте бота
4. Получите Chat ID через [@userinfobot](https://t.me/userinfobot)
5. Обновите `/components/blog/ContactForm.tsx`:

```typescript
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN'
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'
```

### 3. Страницы

- **Блог**: `/app/blog/page.tsx` - список всех постов
- **Пост**: `/app/blog/[slug]/page.tsx` - отдельный пост
- **Проекты**: `/app/works/page.tsx` - обновите для получения из Sanity

## 📱 SEO Features

### Meta Tags
- Title
- Description
- Keywords
- Canonical URL
- Open Graph (og:)
- Twitter Cards

### Schema.org Structured Data
Каждый пост включает JSON-LD:
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "description": "...",
  "image": "...",
  "datePublished": "...",
  "author": {...},
  "publisher": {...}
}
```

### Accessibility (a11y)
- Семантическая HTML разметка
- ARIA labels
- Alt теги для изображений
- Правильная структура заголовков (H1-H4)
- Контрастность текста
- Навигация с клавиатуры

## 🎨 Примеры использования

### Получить Featured проекты для главной

```typescript
import {client, queries, type Project} from '@/lib/sanity'

const featuredProjects = await client.fetch<Project[]>(queries.featuredProjects)
```

### Получить все блог посты

```typescript
import {client, queries, type BlogPost} from '@/lib/sanity'

const posts = await client.fetch<BlogPost[]>(queries.blogPosts)
```

### Получить конкретный пост

```typescript
const post = await client.fetch<BlogPost>(
  queries.blogPostBySlug('your-post-slug')
)
```

### Получить соседние посты

```typescript
const adjacentPosts = await client.fetch(
  queries.adjacentBlogPosts(currentPost.publishedAt)
)
```

## 📐 Структура файлов

```
/app
  /blog
    page.tsx              # Список постов
    page.module.css       # Стили списка
    /[slug]
      page.tsx            # Отдельный пост
      page.module.css     # Стили поста

/components
  /blog
    ShareButtons.tsx      # Кнопки поделиться
    ShareButtons.module.css
    AdjacentPosts.tsx     # Навигация между постами
    AdjacentPosts.module.css
    ContactForm.tsx       # Форма обратной связи
    ContactForm.module.css

/lib
  sanity.ts              # Конфигурация Sanity

/studio-in-fomo.-website
  /schemaTypes
    project.ts           # Схема проектов
    blogPost.ts          # Схема блог постов
    author.ts            # Схема авторов
```

## 🔧 Настройка

### Обновите WorksSection для использования Sanity

```typescript
// components/sections/WorksSection.tsx
import {client, queries, getImageUrl, type Project} from '@/lib/sanity'

export const revalidate = 60

export default async function WorksSection() {
  const projects = await client.fetch<Project[]>(queries.featuredProjects)

  return (
    <section className={styles.works}>
      {projects.map((project) => (
        <Link key={project._id} href={`/works/${project.slug.current}`}>
          <Image
            src={getImageUrl(project.coverImage) || ''}
            alt={project.title}
            width={600}
            height={400}
          />
          <h3>{project.title}</h3>
          <p>{project.excerpt}</p>
        </Link>
      ))}
    </section>
  )
}
```

### Добавьте ссылку на блог в Header

```typescript
// components/Header.tsx
<Link href="/blog" className={styles.navLink}>
  <span>Blog</span>
</Link>
```

## 📊 SEO Best Practices

### Title Tags
- Длина: 50-60 символов
- Включите ключевые слова
- Уникальные для каждой страницы

### Meta Description
- Длина: 150-160 символов
- Призыв к действию
- Уникальные для каждой страницы

### Images
- Alt теги для всех изображений
- WebP format для оптимизации
- Responsive images

### Content
- H1 - один на страницу
- Структура H2, H3, H4
- Внутренние ссылки
- External links с rel="noopener"

## 🚀 Deployment

### 1. Deploy Sanity Studio

```bash
cd studio-in-fomo.-website
npm run build
npm run deploy
```

Studio будет доступен на: `https://your-project.sanity.studio`

### 2. Настройте CORS

В Sanity Dashboard:
- Settings → API → CORS Origins
- Добавьте production домен

### 3. Deploy Next.js

Стандартный деплой на Vercel/Netlify с переменными окружения:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=wx6ubarj
NEXT_PUBLIC_SANITY_DATASET=production
```

## 📈 Analytics & Monitoring

Рекомендуется добавить:
- Google Analytics 4
- Google Search Console
- Sitemap.xml генерация
- RSS feed

## 🆘 Troubleshooting

### Изображения не загружаются
Проверьте CORS настройки в Sanity

### Ошибки TypeScript
Убедитесь что все интерфейсы обновлены в `/lib/sanity.ts`

### Telegram бот не отправляет
- Проверьте Bot Token
- Убедитесь что бот добавлен в группу
- Проверьте Chat ID

## 📚 Дополнительные ресурсы

- [Sanity Documentation](https://www.sanity.io/docs)
- [Portable Text](https://portabletext.org/)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
