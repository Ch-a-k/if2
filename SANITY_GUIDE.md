# Sanity CMS Integration Guide

## 🎯 Обзор

Sanity CMS интегрирован для управления динамическим контентом:
- 👥 Члены команды (Team Members)
- 💼 Dedicated Specialists
- 💬 Отзывы клиентов (Testimonials)
- 🏆 Награды Clutch (Clutch Badges)

## 🚀 Быстрый старт

### 1. Запуск Sanity Studio

```bash
cd studio-in-fomo.-website
npm run dev
```

Откройте http://localhost:3333 для управления контентом.

### 2. Первый вход

Войдите используя Google, GitHub или email.

## 📊 Использование в Next.js компонентах

### Team Members (Страница About)

Обновите `/components/TeamSection.tsx`:

```typescript
import {client, queries, type TeamMember} from '@/lib/sanity'

export default async function TeamSection() {
  const teamMembers = await client.fetch<TeamMember[]>(queries.teamMembers)

  return (
    <section className={styles.teamSection}>
      {/* ... */}
      <div className={styles.teamGrid}>
        {teamMembers.map((member) => (
          <div key={member._id} className={styles.memberCard}>
            <div className={styles.memberInitial}>
              {member.name.charAt(0)}
            </div>
            <div className={styles.memberInfo}>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

### Specialists (Страница About)

```typescript
import {client, queries, type Specialist} from '@/lib/sanity'

const specialists = await client.fetch<Specialist[]>(queries.specialists)

{specialists.map((specialist) => (
  <div key={specialist._id} className={styles.specialistCard}>
    <div className={styles.specialistIcon}>{specialist.icon}</div>
    <div className={styles.specialistInfo}>
      <div className={styles.specialistCount}>{specialist.count}</div>
      <div className={styles.specialistTitle}>{specialist.title}</div>
    </div>
  </div>
))}
```

### Testimonials (Главная страница)

```typescript
import {client, queries, getImageUrl, type Testimonial} from '@/lib/sanity'
import Image from 'next/image'

const testimonials = await client.fetch<Testimonial[]>(queries.testimonials)

{testimonials.map((testimonial) => (
  <div key={testimonial._id} className={styles.testimonialCard}>
    {testimonial.media && (
      <div className={styles.mediaSection}>
        {testimonial.media.type === 'image' ? (
          <Image
            src={getImageUrl(testimonial.media.file) || ''}
            alt={testimonial.author}
            width={400}
            height={600}
          />
        ) : (
          <video src={getImageUrl(testimonial.media.file) || ''} controls />
        )}
      </div>
    )}
    
    <div className={styles.textSection}>
      <p className={styles.quote}>{testimonial.quote}</p>
      <div className={styles.authorName}>{testimonial.author}</div>
      <div className={styles.authorPosition}>
        {testimonial.position} {testimonial.company}
      </div>
      
      {testimonial.clutchLink && (
        <a href={testimonial.clutchLink}>Read on Clutch</a>
      )}
      
      {testimonial.caseStudyLink && (
        <a href={testimonial.caseStudyLink}>View Case</a>
      )}
    </div>
  </div>
))}
```

### Clutch Badges (Главная страница)

```typescript
import {client, queries, getImageUrl, type ClutchBadge} from '@/lib/sanity'

const badges = await client.fetch<ClutchBadge[]>(queries.clutchBadges)

{badges.map((badge) => (
  <a
    key={badge._id}
    href="http://clutch.co/profile/fomo-0"
    className={styles.badgeCard}
  >
    <Image
      src={getImageUrl(badge.image) || ''}
      alt={badge.title}
      width={200}
      height={200}
      className={styles.grayscaleImage}
    />
    <p>{badge.title}</p>
  </a>
))}
```

## 🔄 Конвертация в Server Components

Для использования с Server Components (рекомендуется):

1. Удалите `'use client'` из компонентов
2. Используйте `async function` для компонентов
3. Добавьте revalidation для ISR:

```typescript
export const revalidate = 60 // Revalidate every 60 seconds

export default async function TeamSection() {
  const teamMembers = await client.fetch<TeamMember[]>(queries.teamMembers)
  // ...
}
```

## 📝 Пример полной интеграции

### 1. Создайте async компонент:

```typescript
// components/TeamSection.tsx
import {client, queries, type TeamMember, type Specialist} from '@/lib/sanity'
import styles from './TeamSection.module.css'

export const revalidate = 60

export default async function TeamSection() {
  const [teamMembers, specialists] = await Promise.all([
    client.fetch<TeamMember[]>(queries.teamMembers),
    client.fetch<Specialist[]>(queries.specialists),
  ])

  return (
    <section className={styles.teamSection}>
      {/* Render team members */}
      {/* Render specialists */}
    </section>
  )
}
```

### 2. Используйте в странице:

```typescript
// app/about/page.tsx
import TeamSection from '@/components/TeamSection'

export default function AboutPage() {
  return (
    <div>
      <TeamSection />
    </div>
  )
}
```

## 🎨 Работа с изображениями

### Оптимизация изображений:

```typescript
import {urlFor} from '@/lib/sanity'

// С параметрами качества
const imageUrl = urlFor(image)
  .width(800)
  .height(600)
  .quality(90)
  .format('webp')
  .url()

// Next.js Image компонент
<Image
  src={imageUrl}
  alt="Description"
  width={800}
  height={600}
  className={styles.image}
/>
```

## 🔧 Troubleshooting

### Кеширование данных

Если данные не обновляются:

```typescript
// Отключите CDN для development
useCdn: false

// Используйте revalidation
export const revalidate = 0 // Disable cache
```

### CORS ошибки

Добавьте домен в Sanity Settings:
1. Перейдите на https://sanity.io/manage
2. Выберите проект
3. Settings → API → CORS Origins
4. Добавьте `http://localhost:3000` и production домен

## 📚 Дополнительные ресурсы

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/sanity-nextjs-guide)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

## 🎯 Следующие шаги

1. Добавьте данные в Sanity Studio (http://localhost:3333)
2. Конвертируйте компоненты в Server Components
3. Протестируйте отображение данных
4. Деплойте Sanity Studio: `npm run deploy` в папке `studio-in-fomo.-website`
