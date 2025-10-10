# 🎨 Favicon Installation Guide

## 📁 Куда положить файлы

Поместите ваши favicon файлы в папку **`/public/`** (корень public):

```
/public
  ├── favicon.ico          # Основной favicon (32x32 или 16x16)
  ├── favicon.svg          # SVG версия (предпочтительно)
  ├── apple-touch-icon.png # Для iOS (180x180)
  ├── icon-192.png         # Android (192x192)
  ├── icon-512.png         # Android (512x512)
  └── manifest.json        # Web App Manifest (опционально)
```

---

## 📋 Минимальный набор

### Обязательно:
1. **`favicon.ico`** - 32x32px или 16x16px
2. **`apple-touch-icon.png`** - 180x180px (для iOS)

### Рекомендуется:
3. **`favicon.svg`** - векторная версия
4. **`icon-192.png`** - 192x192px
5. **`icon-512.png`** - 512x512px

---

## 🎨 Как создать favicon

### Онлайн генераторы:
1. **Favicon.io** - https://favicon.io/
2. **RealFaviconGenerator** - https://realfavicongenerator.net/
3. **Favicon Generator** - https://www.favicon-generator.org/

### Загрузите ваш логотип (PNG/SVG) и скачайте все размеры

---

## 🔧 Что уже настроено

В `app/layout.tsx` уже добавлены ссылки на favicon:

```tsx
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

---

## ✅ Быстрый старт

1. Создайте favicon на https://favicon.io/
2. Скачайте ZIP архив
3. Скопируйте файлы в `/public/`
4. Готово! ✨

---

## 📱 Web App Manifest (опционально)

Создайте `/public/manifest.json`:

```json
{
  "name": "IN-FOMO.",
  "short_name": "IN-FOMO",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#000000",
  "background_color": "#000000",
  "display": "standalone"
}
```

И добавьте в `layout.tsx`:
```tsx
<link rel="manifest" href="/manifest.json" />
```

---

**Готово!** Ваш сайт теперь имеет красивые иконки на всех устройствах. 🎉

