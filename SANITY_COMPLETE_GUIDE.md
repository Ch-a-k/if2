# 🎉 Sanity CMS - Complete Setup

## ✅ Что было создано

### 1. Sanity Studio (http://localhost:3333)

**7 типов контента:**

#### 📋 Team Member
Члены C-Level команды для страницы About
- Name, Role, Category, Order

#### 💼 Specialist Category  
Dedicated специалисты для аутсорса
- Title, Count, Icon, Order

#### 💬 Testimonial
Отзывы клиентов с медиа
- Quote, Author, Position, Company
- Media (Image/Video), Company Logo
- Clutch Link, Case Study Link

#### 🏆 Clutch Badge
Награды и бейджи Clutch
- Title, Image, Order

#### 🎨 Project
Портфолио проектов
- Title, Slug, Excerpt, Description
- Cover Image, Gallery
- Category, Tags, Client, Year
- Featured, Live Link

#### 📝 Blog Post
SEO-оптимизированные статьи
- Title, Slug, Excerpt (160 chars)
- Rich Content (text + images)
- Cover Image, Author
- Category, Tags, SEO Keywords
- Read Time, Featured

#### 👤 Author
Авторы блога
- Name, Slug, Image, Bio, Role

---

## 📁 Структура проекта

```
/studio-in-fomo.-website/
  /schemaTypes/
    teamMember.ts
    specialist.ts
    testimonial.ts
    clutchBadge.ts
    project.ts
    blogPost.ts
    author.ts
    index.ts

/app/
  /blog/
    page.tsx              # Список постов
    /[slug]/
      page.tsx            # Отдельный пост с SEO

/components/
  /blog/
    ShareButtons.tsx      # Social share buttons
    AdjacentPosts.tsx     # Next/Previous navigation
    ContactForm.tsx       # Telegram contact form
  SEO.tsx                 # SEO компонент

/lib/
  sanity.ts               # Конфигурация + типы + queries
```

---

## 🚀 Как использовать

### 1. Запустите Sanity Studio

```bash
cd studio-in-fomo.-website
npm run dev
```

Откройте http://localhost:3333 и добавьте контент.

### 2. Используйте в компонентах

```typescript
import {client, queries, type TeamMember} from '@/lib/sanity'

// Server Component
export default async function MyComponent() {
  const data = await client.fetch<TeamMember[]>(queries.teamMembers)
  
  return <div>{/* render */}</div>
}
```

### 3. Доступные queries

```typescript
queries.teamMembers          // Все члены команды
queries.specialists          // Все специалисты
queries.testimonials         // Все отзывы
queries.clutchBadges         // Все бейджи
queries.projects             // Все проекты
queries.featuredProjects     // Featured проекты (до 6)
queries.projectBySlug(slug)  // Проект по slug
queries.blogPosts            // Все посты блога
queries.featuredBlogPosts    // Featured посты (до 3)
queries.blogPostBySlug(slug) // Пост по slug
queries.adjacentBlogPosts(date) // Соседние посты
```

---

## 📝 Что нужно сделать дальше

### 1. Добавьте контент в Sanity Studio

**Обязательно создайте:**
- [ ] Минимум 1 Author
- [ ] 3-5 Blog Posts
- [ ] 6-10 Projects (отметьте 6 как Featured)
- [ ] Team Members (замените хардкод)
- [ ] Specialists
- [ ] Testimonials
- [ ] Clutch Badges (15 штук)

### 2. Настройте Telegram бота

В файле `/components/blog/ContactForm.tsx`:

```typescript
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN'  // От @BotFather
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'      // ID группы
```

[Инструкция по созданию бота](https://t.me/botfather)

### 3. Конвертируйте компоненты

#### TeamSection → Sanity
```typescript
// components/TeamSection.tsx
import {client, queries, type TeamMember, type Specialist} from '@/lib/sanity'

export const revalidate = 60

export default async function TeamSection() {
  const [teamMembers, specialists] = await Promise.all([
    client.fetch<TeamMember[]>(queries.teamMembers),
    client.fetch<Specialist[]>(queries.specialists),
  ])
  
  // Используйте данные из Sanity вместо хардкода
}
```

#### TestimonialsSection → Sanity
```typescript
import {client, queries, getImageUrl, type Testimonial} from '@/lib/sanity'

const testimonials = await client.fetch<Testimonial[]>(queries.testimonials)
```

#### ClutchAwardsSection → Sanity
```typescript
import {client, queries, getImageUrl, type ClutchBadge} from '@/lib/sanity'

const badges = await client.fetch<ClutchBadge[]>(queries.clutchBadges)
```

#### WorksSection → Sanity
```typescript
import {client, queries, type Project} from '@/lib/sanity'

const projects = await client.fetch<Project[]>(queries.featuredProjects)
```

### 4. Добавьте ссылку на блог

В `components/Header.tsx`:

```typescript
<Link href="/blog" className={styles.navLink}>
  <span>Blog</span>
</Link>
```

### 5. Создайте стили для блога

Необходимо создать CSS модули:
- `/app/blog/page.module.css`
- `/app/blog/[slug]/page.module.css`
- `/components/blog/ShareButtons.module.css`
- `/components/blog/AdjacentPosts.module.css`
- `/components/blog/ContactForm.module.css`

### 6. Deploy Sanity Studio

```bash
cd studio-in-fomo.-website
npm run deploy
```

Studio будет на: `https://in-fomo.sanity.studio`

### 7. Настройте CORS

1. Перейдите на https://sanity.io/manage
2. Выберите проект `wx6ubarj`
3. Settings → API → CORS Origins
4. Добавьте:
   - `http://localhost:3000` (dev)
   - `https://your-domain.com` (production)

---

## 🎯 SEO Features (Блог)

✅ **Meta Tags**
- Title (50-60 chars)
- Description (150-160 chars)
- Keywords
- Canonical URL

✅ **Open Graph** 
- og:title, og:description
- og:image, og:type
- og:url, og:site_name

✅ **Twitter Cards**
- Large image support
- Summary cards

✅ **Schema.org JSON-LD**
- BlogPosting type
- Author info
- Publisher info
- Date published/modified

✅ **Social Sharing**
- Twitter, Facebook, LinkedIn
- Telegram, WhatsApp
- Copy link

✅ **Navigation**
- Previous/Next articles
- With image previews

✅ **Accessibility**
- Semantic HTML
- ARIA labels
- Alt tags
- Keyboard navigation

---

## 📊 Рекомендации

### Контент
- Блог посты: минимум 800-1500 слов
- Используйте H2, H3 для структуры
- Добавляйте качественные изображения (WebP)
- Внутренние ссылки между постами

### SEO
- Уникальные title и description для каждой страницы
- Оптимизируйте изображения (alt tags)
- Используйте семантические URL (slug)
- Добавьте sitemap.xml и robots.txt

### Performance
- Next.js ISR с revalidate: 60
- Image optimization через Next/Image
- CDN для Sanity изображений

---

## 📚 Документация

- **Sanity**: `/studio-in-fomo.-website/README.md`
- **Интеграция**: `/SANITY_GUIDE.md`
- **Блог & Проекты**: `/BLOG_AND_PROJECTS_GUIDE.md`
- **Этот файл**: `/SANITY_COMPLETE_GUIDE.md`

---

## 🆘 Поддержка

**Ошибки Sanity Studio:**
- Проверьте логи в терминале
- Рестартните сервер: `npm run dev`

**Данные не загружаются:**
- Проверьте CORS настройки
- Убедитесь что контент published

**TypeScript ошибки:**
- Обновите типы в `/lib/sanity.ts`
- Проверьте импорты

---

## ✨ Итого

**7 типов контента** управляются через Sanity CMS  
**SEO-оптимизированный блог** с social sharing  
**Динамические проекты** вместо хардкода  
**Telegram интеграция** для обратной связи  
**Полная документация** для работы

🎉 **Готово к использованию!**
