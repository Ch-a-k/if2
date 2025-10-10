# 👥 About Page - Sanity Integration

## ✅ Что сделано

Страница `/about` теперь полностью управляется через Sanity CMS!

### Убраны моковые данные:
❌ Хардкод Team Members  
❌ Хардкод Specialists  
❌ Статичные числа  

### Добавлено управление через CMS:
✅ **Team Members** - C-Level команда из Sanity  
✅ **Specialists** - Dedicated специалисты из Sanity  
✅ **SVG логотипы** - поддержка для категорий специалистов  
✅ **Порядок отображения** - управляемый через Order  
✅ **Динамические данные** - автообновление каждые 60 секунд  

---

## 🎯 Управление контентом

### Team Members (Команда)

В Sanity Studio: **Team → Team Members**

**Добавьте членов команды:**
1. Name - Полное имя
2. Role - Должность (e.g., "Chief Executive Officer")
3. Category - leadership/management/development/design
4. Order - Порядок отображения (10, 20, 30...)

**Пример:**
```
Name: Artur Chuikov
Role: Founder, Chief Executive Officer
Category: leadership
Order: 10
```

### Specialists (Категории специалистов)

В Sanity Studio: **Team → Specialists**

**Две опции для иконки:**

#### Вариант 1: Emoji
1. Icon Type: Emoji
2. Icon: 📱 (один emoji)
3. Title: "Mobile Developers"
4. Count: 3
5. Order: 10

#### Вариант 2: SVG Logo
1. Icon Type: SVG Logo
2. SVG Logo: Загрузите SVG или PNG
3. Title: "React Developers"
4. Count: 5
5. Order: 20

**Примеры специалистов:**
```
📱 Mobile Developers: 3
🎨 UX/UI Designers: 4
⚡ Frontend Developers: 5
⚙️ Backend Developers: 4
🔗 Web3 Developers: 3
✓ QA Engineers: 2
🚀 DevOps Engineers: 2
📊 Project Managers: 3
```

---

## 🎨 Отображение SVG логотипов

### Как работает:
1. Загрузите SVG или PNG в поле "SVG Logo"
2. Изображение автоматически:
   - Конвертируется в белый цвет (filter)
   - Масштабируется до 32x32px
   - Имеет hover эффект
3. На мобильных: 28x28px (tablet) и 24x24px (mobile)

### Рекомендации для логотипов:
- Формат: SVG (предпочтительно) или PNG
- Размер: 64x64px или больше
- Прозрачный фон
- Простая форма (хорошо читается в малом размере)
- Монохромный дизайн (цвет будет заменен на белый)

---

## 📊 Структура компонента

### TeamSection.tsx

**Теперь Server Component:**
```typescript
export default async function TeamSection() {
  const [teamMembers, specialists] = await Promise.all([
    client.fetch<TeamMember[]>(queries.teamMembers),
    client.fetch<Specialist[]>(queries.specialists),
  ])
  
  return (...)
}
```

**Revalidation:**
- Данные обновляются каждые 60 секунд
- ISR (Incremental Static Regeneration)
- Автоматически синхронизируется с Sanity

**Отображение иконок:**
```typescript
{specialist.iconType === 'emoji' ? (
  specialist.icon
) : specialist.svgLogo ? (
  <Image src={...} />
) : (
  '💼' // fallback
)}
```

---

## 🔧 Порядок настройки

### 1. Перезапустите Sanity Studio

```bash
cd studio-in-fomo.-website
npm run dev
```

### 2. Добавьте Team Members

В Studio: **Team → Team Members**

Создайте ваших C-Level:
```
1. Artur Chuikov - CEO (order: 10)
2. Arsen Dumbadze - CIO (order: 20)
3. Artur Voievoda - COO (order: 30)
4. Volodymyr Zeleniuk - CGO (order: 40)
5. Maria Spesyvtseva - CDO (order: 50)
6. Serhii Serhienko - CSO (order: 60)
```

### 3. Добавьте Specialists

В Studio: **Team → Specialists**

**С эмодзи:**
```
📱 Mobile Developers: 3 (order: 10)
🎨 UX/UI Designers: 4 (order: 20)
```

**С SVG:**
```
React Developers: 5 (order: 30)
[загрузите React logo]

Node.js Developers: 4 (order: 40)
[загрузите Node.js logo]
```

### 4. Проверьте результат

Откройте http://localhost:3000/about

---

## 💡 Советы

### Order (Порядок)
- Используйте кратные 10: 10, 20, 30...
- Легко вставлять между: 15 между 10 и 20
- Автосортировка по order → name

### Categories для TeamMember
- **leadership** - для C-Level (CEO, CIO, COO...)
- **management** - для менеджеров
- **development** - для разработчиков
- **design** - для дизайнеров

Визуально различаются градиентами.

### SVG vs Emoji
**Emoji:**
- ✅ Быстро и просто
- ✅ Не нужно искать файлы
- ❌ Ограниченный выбор

**SVG:**
- ✅ Брендированные логотипы (React, Vue, Node...)
- ✅ Профессиональный вид
- ✅ Уникальные иконки
- ❌ Нужно подготовить файлы

---

## 📁 Где взять SVG логотипы

### Бесплатные источники:
- [Simple Icons](https://simpleicons.org/) - логотипы брендов
- [Devicon](https://devicon.dev/) - технологии
- [Iconify](https://icon-sets.iconify.design/) - огромная коллекция
- [SVG Repo](https://www.svgrepo.com/) - разные иконки

### Подготовка:
1. Скачайте SVG
2. Откройте в редакторе
3. Убедитесь что viewBox корректный
4. Сохраните монохромную версию
5. Загрузите в Sanity

---

## 🎨 Визуальные улучшения

### Team Members cards:
- Инициал имени в квадрате
- Gradient по категориям
- Hover эффекты
- Адаптивный layout

### Specialists cards:
- Эмодзи ИЛИ SVG логотип
- Крупные цифры (count)
- Hover эффекты
- Grid layout

### Responsive:
- Desktop: 3-4 колонки (members), auto-fit (specialists)
- Tablet: 2-3 колонки
- Mobile: 1 колонка

---

## 🚀 Итого

✅ **Нет хардкода** - всё из Sanity  
✅ **Гибкие иконки** - Emoji или SVG  
✅ **Управляемый порядок** - через Order поле  
✅ **Автообновление** - ISR каждые 60 секунд  
✅ **Типизация** - TypeScript support  
✅ **Responsive** - работает на всех устройствах  

**Страница About готова! 🎉**

Наполните контент в Studio и увидите результат на сайте!
