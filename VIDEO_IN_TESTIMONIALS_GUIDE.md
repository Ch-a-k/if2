# 🎥 Как добавить видео в отзывы

## ✅ Теперь поддерживаются 2 типа видео:

1. **Загрузка с компьютера** (MP4, WebM, OGG)
2. **YouTube/Vimeo через URL**

---

## 🎬 Вариант 1: Загрузка видео с компьютера

### Шаги:

1. **Откройте Sanity Studio:** http://localhost:3333
2. **Перейдите:** Social Proof → Testimonials (New)
3. **Создайте или откройте отзыв**
4. **Заполните основные поля:**
   - Quote, Author, Position, Company

5. **Настройте видео:**
   - **Has Media?** → ✅ включить
   - **Media Type** → выберите `Video`
   - **Video Source** → выберите `Upload Video File`
   - **Video File** → нажмите **Upload** и выберите файл с компьютера

6. **Нажмите Publish**

### Поддерживаемые форматы:
- ✅ MP4 (рекомендуется)
- ✅ WebM
- ✅ OGG

### Рекомендации:
- **Размер файла:** до 50 MB
- **Длительность:** 30-120 секунд
- **Разрешение:** 1920x1080 или 1280x720
- **Соотношение сторон:** 16:9 или 4:3

---

## 📺 Вариант 2: YouTube видео

### Шаги:

1. **Получите embed URL с YouTube:**
   
   Стандартная ссылка:
   ```
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```
   
   **Преобразуйте в embed:**
   ```
   https://www.youtube.com/embed/dQw4w9WgXcQ
   ```
   
   **Формула:**
   - Возьмите ID видео (после `v=` или последняя часть короткой ссылки)
   - Подставьте в: `https://www.youtube.com/embed/VIDEO_ID`

2. **В Sanity Studio:**
   - **Has Media?** → ✅ включить
   - **Media Type** → выберите `Video`
   - **Video Source** → выберите `YouTube/Vimeo URL`
   - **Video URL** → вставьте embed URL
     ```
     https://www.youtube.com/embed/dQw4w9WgXcQ
     ```

3. **Нажмите Publish**

### Примеры правильных URL:

✅ **YouTube embed:**
```
https://www.youtube.com/embed/dQw4w9WgXcQ
```

✅ **Vimeo embed:**
```
https://player.vimeo.com/video/123456789
```

❌ **Неправильно (обычная ссылка):**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
```

---

## 🎬 Вариант 3: Vimeo видео

### Шаги:

1. **Получите embed URL с Vimeo:**
   
   Стандартная ссылка:
   ```
   https://vimeo.com/123456789
   ```
   
   **Преобразуйте в embed:**
   ```
   https://player.vimeo.com/video/123456789
   ```

2. **В Sanity Studio:**
   - **Video Source** → `YouTube/Vimeo URL`
   - **Video URL** → вставьте embed URL

---

## 🔍 Как найти embed URL

### YouTube:
1. Откройте видео на YouTube
2. Нажмите **Поделиться** → **Встроить**
3. Скопируйте URL из iframe:
   ```html
   <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
   ```
4. Используйте только URL: `https://www.youtube.com/embed/VIDEO_ID`

### Vimeo:
1. Откройте видео на Vimeo
2. Нажмите **Share** → **Embed**
3. Скопируйте URL из iframe

---

## 💡 Что лучше использовать?

### Загрузка с компьютера ✅
**Плюсы:**
- Полный контроль над видео
- Не зависит от внешних платформ
- Работает всегда

**Минусы:**
- Занимает место в Sanity
- Ограничение по размеру файла

**Используйте для:**
- Короткие видео-отзывы (30-60 сек)
- Когда нужен полный контроль

### YouTube/Vimeo URL ✅
**Плюсы:**
- Не занимает место
- Хорошее качество
- Можно использовать существующие видео

**Минусы:**
- Зависит от внешней платформы
- Если видео удалят - перестанет работать

**Используйте для:**
- Длинные видео (2+ минут)
- Видео уже опубликованные на YouTube
- Экономия места

---

## 🎯 Примеры отзывов с видео

### Пример 1: YouTube видео

```
Quote: "Working with IN-FOMO was amazing!"
Author: "John Smith"
Position: "CEO at"
Company: "TechCorp"

Has Media?: ✅
Media Type: Video
Video Source: YouTube/Vimeo URL
Video URL: https://www.youtube.com/embed/dQw4w9WgXcQ

Has Company Logo?: ✅
Company Logo: [upload logo]
```

### Пример 2: Загруженное видео

```
Quote: "Best development team ever!"
Author: "Anna Johnson"
Position: "CTO at"
Company: "StartupCo"

Has Media?: ✅
Media Type: Video
Video Source: Upload Video File
Video File: [upload testimonial-video.mp4]

Clutch Review Link: https://clutch.co/profile/fomo-0
```

---

## 🔧 Если видео не воспроизводится

### YouTube видео:
1. ✅ Убедитесь, что используете **embed URL**
   - Правильно: `https://www.youtube.com/embed/VIDEO_ID`
   - Неправильно: `https://www.youtube.com/watch?v=VIDEO_ID`

2. ✅ Проверьте, что видео **не private** на YouTube

3. ✅ Проверьте настройки встраивания на YouTube:
   - Откройте видео → Настройки → Разрешить встраивание

### Загруженное видео:
1. ✅ Проверьте формат файла (MP4, WebM, OGG)
2. ✅ Убедитесь, что размер файла < 50 MB
3. ✅ Дождитесь окончания загрузки в Sanity

---

## 📱 Адаптивность

Видео автоматически адаптируется под размер экрана:
- **Desktop:** Видео слева, текст справа
- **Mobile:** Видео сверху, текст снизу

---

## ✨ Дополнительные возможности

### Управление качеством (YouTube)

Можно добавить параметры к embed URL:

**Автозапуск:**
```
https://www.youtube.com/embed/VIDEO_ID?autoplay=1
```

**Отключить похожие видео:**
```
https://www.youtube.com/embed/VIDEO_ID?rel=0
```

**Скрыть элементы управления:**
```
https://www.youtube.com/embed/VIDEO_ID?controls=0
```

**Комбинация:**
```
https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0&controls=1
```

---

## 🎉 Готово!

Теперь вы можете добавлять как загруженные видео, так и видео с YouTube/Vimeo!

**Проверьте результат:** http://localhost:3000

---

**Рекомендация:** Начните с YouTube для длинных видео и используйте загрузку для коротких клиентских отзывов!

