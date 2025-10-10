# 🔍 Отладка проблемы с видео в отзывах

## Я добавил логирование для диагностики

Теперь нужно посмотреть что выводится в консоли.

---

## 📝 ШАГ 1: Откройте консоль браузера

1. Откройте сайт: http://localhost:3000
2. Нажмите **F12** (или **Cmd+Option+I** на Mac)
3. Перейдите на вкладку **Console**
4. Прокрутите страницу до секции с отзывами

---

## 🔍 ШАГ 2: Найдите в консоли логи

Вы должны увидеть что-то вроде:

```
✅ Testimonials loaded: 2
📝 Testimonial 1: {
  author: "John Smith",
  hasMedia: true,
  mediaType: "video",
  videoSource: "url",
  hasVideoFile: false,
  hasVideoUrl: true,
  videoUrl: "https://www.youtube.com/embed/..."
}
```

И в консоли браузера:

```
🔍 Current testimonial: {
  author: "John Smith",
  hasMedia: true,
  mediaType: "video",
  videoSource: "url",
  hasVideoFile: false,
  hasVideoUrl: true,
  videoUrl: "https://www.youtube.com/embed/..."
}
```

---

## 📸 ШАГ 3: Пришлите скриншот или скопируйте текст

Скопируйте ВСЕ логи из консоли, особенно:
- `✅ Testimonials loaded: ...`
- `📝 Testimonial 1: ...`
- `🔍 Current testimonial: ...`
- `✅ YouTube/Vimeo iframe: ...` (если есть)
- `⚠️ Video selected but no source found` (если есть)

Это поможет понять что именно не работает.

---

## 🔎 ШАГ 4: Проверьте в Sanity Studio

1. Откройте http://localhost:3333
2. Перейдите в **Testimonials (New)**
3. Откройте отзыв с видео
4. Проверьте:

**Чекбоксы:**
- ✅ **Has Media?** - должен быть включен
- **Media Type** - должен быть **Video**
- **Video Source** - должен быть выбран (**Upload Video File** или **YouTube/Vimeo URL**)

**Поля:**
- Если выбран **YouTube/Vimeo URL**:
  - Поле **Video URL** должно быть заполнено
  - URL должен быть в формате: `https://www.youtube.com/embed/VIDEO_ID`
  - НЕ: `https://www.youtube.com/watch?v=VIDEO_ID`

- Если выбран **Upload Video File**:
  - Поле **Video File** должно содержать загруженный файл

**Статус:**
- Документ должен быть **Published** (не Draft!)

---

## 🎯 Возможные проблемы и решения

### Проблема 1: В консоли `hasMedia: false`
**Решение:**
- В Sanity включите чекбокс **Has Media?**
- Нажмите **Publish**

### Проблема 2: В консоли `mediaType: undefined` или `mediaType: "image"`
**Решение:**
- В Sanity выберите **Media Type** → **Video**
- Нажмите **Publish**

### Проблема 3: В консоли `videoSource: undefined`
**Решение:**
- В Sanity выберите **Video Source**:
  - `Upload Video File` или
  - `YouTube/Vimeo URL`
- Нажмите **Publish**

### Проблема 4: В консоли `hasVideoUrl: false` и `hasVideoFile: false`
**Решение:**
- Если выбран **YouTube/Vimeo URL**: заполните поле **Video URL**
- Если выбран **Upload Video File**: загрузите файл в **Video File**
- Нажмите **Publish**

### Проблема 5: В консоли `videoUrl: "https://www.youtube.com/watch?v=..."`
**Решение:**
- Неправильный формат URL!
- Нужно: `https://www.youtube.com/embed/VIDEO_ID`
- Скопируйте ID после `watch?v=` и подставьте в `embed/`

### Проблема 6: В консоли `⚠️ Video selected but no source found`
**Решение:**
- Выберите **Video Source** в Sanity
- Заполните соответствующее поле
- Нажмите **Publish**

### Проблема 7: Статус Draft в Sanity
**Решение:**
- Нажмите **Publish** (не Save Draft!)

---

## 🔧 После исправления в Sanity:

1. Нажмите **Publish**
2. Подождите 10-15 секунд
3. В браузере нажмите **Cmd+Shift+R** (принудительное обновление)
4. Проверьте консоль снова

---

## 📞 Если все проверили, а видео не работает:

Пришлите скриншот или текст из:
1. **Консоль браузера** (F12 → Console)
2. **Настройки отзыва в Sanity** (скриншот полей)

Я увижу в чем проблема и помогу исправить!

---

## ✅ Чеклист для проверки:

- [ ] Открыл консоль браузера (F12)
- [ ] Вижу логи `✅ Testimonials loaded`
- [ ] Вижу логи `📝 Testimonial`
- [ ] Вижу логи `🔍 Current testimonial`
- [ ] Проверил настройки в Sanity Studio
- [ ] **Has Media?** включен
- [ ] **Media Type** = Video
- [ ] **Video Source** выбран
- [ ] Поле видео заполнено (URL или File)
- [ ] Статус = Published (не Draft)
- [ ] Подождал 10 секунд
- [ ] Обновил страницу (Cmd+Shift+R)

---

**Давайте вместе найдем проблему! 🔍**

