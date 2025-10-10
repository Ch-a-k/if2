# 📝 Инструкция по добавлению отзывов (Testimonials)

## ✅ Готово!

Testimonials теперь полностью управляются через Sanity Admin Panel. Все моковые данные удалены.

## 🎯 Как добавить отзыв

### 1. Откройте Sanity Studio

```
http://localhost:3333
```

### 2. Перейдите в "Testimonials (New)"

В левом меню найдите **Social Proof** → **Testimonials (New)**

### 3. Нажмите "Create" и заполните поля

#### Обязательные поля:

- **Quote** - Текст отзыва
  - Пример: "They are an excellent agency and this is coming from someone who has changed agencies 4 times."

- **Author Name** - Имя автора
  - Пример: "Anastasios Anastasiadis"

- **Position/Title** - Должность (обычно с "at" в конце)
  - Пример: "CEO at"
  - Пример: "Product Manager at"

- **Company Name** - Название компании
  - Пример: "Norma"
  - Пример: "TechStart"

#### Опциональные поля:

##### Медиа (Фото или Видео)

- **Has Media?** - Включите, если есть фото или видео
  - Если включено, появятся дополнительные поля:
  
  - **Media Type** - Выберите тип:
    - `Image` - для фотографий
    - `Video` - для видео
  
  - **Image** - Загрузите фото (если выбран Image)
    - Рекомендуемый размер: 400x600px или 2:3 соотношение
    - Форматы: JPG, PNG, WebP
  
  - **Video Source** - Выберите источник видео:
    - `Upload Video File` - Загрузить с компьютера
    - `YouTube/Vimeo URL` - Вставить ссылку
  
  - **Video File** - Загрузите файл (если выбран Upload Video File)
    - Форматы: MP4, WebM, OGG
    - Размер: до 50 MB
    - Рекомендуемое разрешение: 1920x1080
  
  - **Video URL** - Вставьте embed URL (если выбран YouTube/Vimeo URL)
    - YouTube: `https://www.youtube.com/embed/VIDEO_ID`
    - Vimeo: `https://player.vimeo.com/video/VIDEO_ID`
    - ⚠️ **Важно:** Используйте embed URL, не обычную ссылку!

##### Логотип компании

- **Has Company Logo?** - Включите, если хотите показать логотип
  - Если включено:
  
  - **Company Logo** - Загрузите логотип
    - Рекомендуемый размер: 160x48px
    - Формат: PNG с прозрачностью (предпочтительно)
    - Логотип должен быть одноцветным или контрастным

##### Ссылки

- **Clutch Review Link** - Ссылка на отзыв на Clutch.co
  - Пример: `https://clutch.co/profile/fomo-0`
  - Если заполнено, появится кнопка "Read on Clutch"

- **Case Study Project** - Выберите проект из списка
  - Это добавит кнопку "View Case" с ссылкой на проект
  - Убедитесь, что проект уже создан

##### Порядок отображения

- **Display Order** - Число для сортировки (1, 2, 3...)
  - Меньшее число = показывается раньше
  - Если не заполнено, отзыв появится в конце

### 4. Сохраните (Publish)

Нажмите **Publish** в правом верхнем углу.

## 📋 Примеры отзывов

### Пример 1: С фото, логотипом и обеими ссылками

```
Quote: "They are an excellent agency and this is coming from someone who has changed agencies 4 times."
Author: "Anastasios Anastasiadis"
Position: "CEO at"
Company: "Norma"
Has Media?: ✅ Yes
  Media Type: Image
  Image: [Upload photo of client]
Has Company Logo?: ✅ Yes
  Company Logo: [Upload Norma logo]
Clutch Review Link: https://clutch.co/profile/fomo-0
Case Study Project: Select "Norma" project
Display Order: 1
```

### Пример 2: Без медиа, только текст

```
Quote: "Working with IN-FOMO. transformed our digital presence completely."
Author: "Sarah Johnson"
Position: "CEO at"
Company: "TechStart"
Has Media?: ❌ No
Has Company Logo?: ❌ No
Clutch Review Link: https://clutch.co/profile/fomo-0
Display Order: 2
```

### Пример 3: С видео вместо фото

```
Quote: "The team delivered an exceptional product on time and within budget."
Author: "Michael Chen"
Position: "Product Manager at"
Company: "FinFlow"
Has Media?: ✅ Yes
  Media Type: Video
  Video URL: https://www.youtube.com/embed/dQw4w9WgXcQ
Has Company Logo?: ❌ No
Case Study Project: Select "FinFlow" project
Display Order: 3
```

### Пример 4: Минимальный отзыв (только текст)

```
Quote: "Highly recommend IN-FOMO. for any digital project!"
Author: "Anna Kowalski"
Position: "Marketing Director at"
Company: "BrandCo"
Has Media?: ❌ No
Has Company Logo?: ❌ No
Display Order: 4
```

## 🎨 Как это отображается на сайте

- Отзывы показываются в карусели (слайдере)
- Навигация стрелками влево/вправо
- Индикаторы внизу для быстрого переключения
- Если есть фото/видео - отображается слева
- Текст всегда справа
- Логотип компании заменяет текстовое название компании
- Кнопки "Read on Clutch" и "View Case" появляются только если заполнены ссылки

## 🔄 Обновление данных

После добавления/изменения отзывов:

1. Данные обновятся автоматически в течение **60 секунд** (ISR)
2. Или обновите страницу в браузере для немедленного просмотра

## ❓ Частые вопросы

### Сколько отзывов можно добавить?
- Неограниченно! Рекомендуем 3-10 для лучшего UX

### Обязательно ли добавлять фото?
- Нет, отзыв может быть только текстовым

### Можно ли использовать видео с YouTube?
- Да! Используйте embed URL: `https://www.youtube.com/embed/VIDEO_ID`

### Что делать если нет логотипа компании?
- Просто не включайте "Has Company Logo?" - будет показано текстовое название

### Как изменить порядок отзывов?
- Измените поле "Display Order" - меньшие числа отображаются первыми

### Отзыв не появляется на сайте?
1. Убедитесь, что нажали **Publish** (не Save Draft)
2. Подождите 60 секунд или обновите страницу
3. Проверьте консоль браузера на ошибки

## 🎯 Проверка

После добавления отзывов откройте:

```
http://localhost:3000
```

Прокрутите до секции "What our clients say" и проверьте:
- ✅ Отзывы переключаются стрелками
- ✅ Фото/видео отображаются корректно
- ✅ Логотипы компаний видны
- ✅ Ссылки работают
- ✅ Отзывы в правильном порядке

---

**Готово! Теперь вы можете управлять отзывами через админ-панель! 🎉**

