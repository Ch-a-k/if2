# 🎥 Правильный формат YouTube URL

## ❌ НЕПРАВИЛЬНО:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

```
https://youtu.be/dQw4w9WgXcQ
```

**Эти URL НЕ БУДУТ РАБОТАТЬ!** ⛔

---

## ✅ ПРАВИЛЬНО:

```
https://www.youtube.com/embed/dQw4w9WgXcQ
```

**Только такой формат будет работать!** ✅

---

## 🔄 Как преобразовать URL

### Способ 1: Автоматически (на YouTube)

1. Откройте видео на YouTube
2. Нажмите кнопку **Поделиться** (под видео)
3. Нажмите **Встроить** (или **Embed**)
4. Скопируйте URL из кода:
   ```html
   <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
   ```
5. Используйте только URL: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### Способ 2: Вручную

**Обычная ссылка:**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                              ↑
                         Это VIDEO_ID
```

**Короткая ссылка:**
```
https://youtu.be/dQw4w9WgXcQ
                 ↑
            Это VIDEO_ID
```

**Преобразуйте в embed:**
```
https://www.youtube.com/embed/dQw4w9WgXcQ
                              ↑
                    Подставьте VIDEO_ID
```

---

## 📋 Примеры:

### Пример 1:
**Было:**
```
https://www.youtube.com/watch?v=jNQXAC9IVRw
```

**Стало:**
```
https://www.youtube.com/embed/jNQXAC9IVRw
```

### Пример 2:
**Было:**
```
https://youtu.be/jNQXAC9IVRw
```

**Стало:**
```
https://www.youtube.com/embed/jNQXAC9IVRw
```

### Пример 3:
**Было:**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s
```

**Стало:**
```
https://www.youtube.com/embed/dQw4w9WgXcQ
```
(параметры типа `&t=30s` можно оставить или убрать)

---

## 🎯 Vimeo URL

### ❌ НЕПРАВИЛЬНО:
```
https://vimeo.com/123456789
```

### ✅ ПРАВИЛЬНО:
```
https://player.vimeo.com/video/123456789
```

---

## 🔧 Где вставлять в Sanity:

1. Откройте http://localhost:3333
2. Social Proof → Testimonials (New)
3. Создайте или откройте отзыв
4. **Has Media?** → ✅
5. **Media Type** → Video
6. **Video Source** → **YouTube/Vimeo URL**
7. **Video URL** → вставьте правильный URL:
   ```
   https://www.youtube.com/embed/VIDEO_ID
   ```
8. **Publish**

---

## ✅ Проверка

После вставки правильного URL:

1. **Publish** в Sanity
2. Подождите 10 секунд
3. Обновите страницу (Cmd+Shift+R)
4. Откройте консоль браузера (F12)
5. Должны увидеть:
   ```
   ✅ YouTube/Vimeo iframe: https://www.youtube.com/embed/...
   ```

Если видите это - видео должно работать! 🎉

---

## 💡 Дополнительные параметры

Можно добавить параметры к embed URL:

### Автозапуск:
```
https://www.youtube.com/embed/VIDEO_ID?autoplay=1
```

### Скрыть похожие видео:
```
https://www.youtube.com/embed/VIDEO_ID?rel=0
```

### Начать с определенного времени (30 секунд):
```
https://www.youtube.com/embed/VIDEO_ID?start=30
```

### Комбинация параметров:
```
https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0&start=30
```

---

## 🚨 Важно!

**Формат URL критически важен!**

- ❌ `youtube.com/watch?v=` - НЕ РАБОТАЕТ
- ❌ `youtu.be/` - НЕ РАБОТАЕТ  
- ✅ `youtube.com/embed/` - РАБОТАЕТ

**Используйте только embed формат!**

---

## 📸 Визуальная инструкция:

```
┌─────────────────────────────────────────────────┐
│  YouTube видео страница                          │
│                                                  │
│  [Поделиться] ← Нажмите                         │
│    ↓                                             │
│  [Встроить / Embed] ← Нажмите                   │
│    ↓                                             │
│  <iframe src="https://www.youtube.com/embed/ID"> │
│                  ↑ Скопируйте этот URL          │
└─────────────────────────────────────────────────┘
```

---

**Теперь видео будет работать! 🎬**

