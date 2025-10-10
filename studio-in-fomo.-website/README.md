# IN-FOMO. Sanity Studio

Content Management System для IN-FOMO. website.

## 🚀 Быстрый старт

### Запуск локально

```bash
cd studio-in-fomo.-website
npm run dev
```

Откройте http://localhost:3333 в браузере.

### Первый вход

При первом входе используйте тот же метод авторизации (Google, GitHub или email), который использовали при установке CLI.

## 📋 Типы контента

### 1. Team Member (Члены команды)
Управление C-Level командой на странице About.

**Поля:**
- **Name** - Имя (обязательно)
- **Role** - Должность (обязательно)
- **Category** - Категория: Leadership, Management, Development, Design
- **Order** - Порядок отображения (меньше = выше)

### 2. Specialist Category (Категории специалистов)
Управление dedicated team specialists на странице About.

**Поля:**
- **Title** - Название (например, "Mobile Developers")
- **Count** - Количество специалистов
- **Icon** - Эмодзи иконка (один символ)
- **Order** - Порядок отображения

### 3. Testimonial (Отзывы)
Управление отзывами клиентов на главной странице.

**Поля:**
- **Quote** - Текст отзыва (обязательно)
- **Author** - Имя автора (обязательно)
- **Position** - Должность (обязательно)
- **Company** - Компания (обязательно)
- **Media** - Фото или видео (опционально)
  - Type: Image или Video
  - File: Загрузка файла
- **Company Logo** - Логотип компании (опционально)
- **Clutch Link** - Ссылка на отзыв на Clutch (опционально)
- **Case Study Link** - Ссылка на кейс, например /works/project-name (опционально)
- **Order** - Порядок отображения

### 4. Clutch Badge (Награды Clutch)
Управление бейджами Clutch на главной странице.

**Поля:**
- **Title** - Название награды (обязательно)
- **Badge Image** - Изображение награды (обязательно)
- **Order** - Порядок отображения

## 🔧 Подключение к Next.js

Для подключения Sanity к вашему Next.js приложению:

1. Установите зависимости в основном проекте:
```bash
npm install next-sanity @sanity/image-url
```

2. Создайте файл `lib/sanity.ts` с конфигурацией:
```typescript
import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'wx6ubarj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

3. Используйте в компонентах:
```typescript
import {client} from '@/lib/sanity'

// Получить всех членов команды
const teamMembers = await client.fetch(
  `*[_type == "teamMember"] | order(order asc)`
)

// Получить отзывы
const testimonials = await client.fetch(
  `*[_type == "testimonial"] | order(order asc)`
)
```

## 📝 Рекомендации

1. **Order (Порядок):** Используйте числа кратные 10 (10, 20, 30...) чтобы было удобно добавлять элементы между существующими.

2. **Медиа файлы:** 
   - Для изображений используйте PNG или JPG
   - Для видео используйте MP4
   - Оптимизируйте размер файлов перед загрузкой

3. **Логотипы компаний:** Загружайте PNG с прозрачным фоном для лучшего отображения.

4. **Эмодзи иконки:** Используйте один символ эмодзи для каждой категории специалистов.

## 🌐 Деплой

Для деплоя Sanity Studio на production:

```bash
npm run build
npm run deploy
```

Studio будет доступен по адресу: https://your-project.sanity.studio

## 📚 Документация

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity + Next.js](https://www.sanity.io/guides/sanity-nextjs-guide)