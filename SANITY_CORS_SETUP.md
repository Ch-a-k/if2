# Настройка CORS для Sanity

## Проблема
Ошибка: `Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin`

## Решение

### Вариант 1: Через веб-интерфейс Sanity (Рекомендуется)

1. Перейдите на https://www.sanity.io/manage
2. Выберите ваш проект (IN-FOMO. Website CMS)
3. Перейдите в **API** → **CORS Origins**
4. Нажмите **Add CORS origin**
5. Добавьте следующие домены:
   - `http://localhost:3000` (для разработки)
   - `http://localhost:3333` (для Sanity Studio)
   - Ваш production домен (например, `https://in-fomo.com`)
6. Включите опции:
   - ✅ Allow credentials
7. Сохраните

### Вариант 2: Через Sanity CLI

```bash
# Перейдите в папку Studio
cd studio-in-fomo.-website

# Добавьте CORS origin
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add http://localhost:3333 --credentials

# Проверьте список
npx sanity cors list
```

### Вариант 3: Создать API Token (если CORS не помогает)

1. Перейдите на https://www.sanity.io/manage
2. Выберите ваш проект
3. Перейдите в **API** → **Tokens**
4. Нажмите **Add API token**
5. Название: `Website Development`
6. Permissions: **Viewer** (для чтения) или **Editor** (для чтения и записи)
7. Скопируйте токен

8. Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SANITY_TOKEN=your_token_here
```

9. Перезапустите сервер разработки

## После настройки

1. Перезапустите Next.js сервер:
```bash
# Остановите сервер (Ctrl+C) и запустите снова
npm run dev
```

2. Перезапустите Sanity Studio (если запущен):
```bash
cd studio-in-fomo.-website
# Остановите (Ctrl+C) и запустите снова
npm run dev
```

## Проверка

После настройки CORS откройте http://localhost:3000/about и проверьте, что команда загружается без ошибок.

## Важно

- В production обязательно добавьте ваш реальный домен в CORS origins
- Никогда не публикуйте `.env.local` в Git (уже добавлен в `.gitignore`)
- Используйте токен с минимальными необходимыми правами

