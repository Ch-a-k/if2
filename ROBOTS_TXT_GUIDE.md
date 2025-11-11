# robots.txt - Руководство и Валидация ✅

## Исправлено: Ошибка "Unknown directive"

### ❌ Проблема:
Строка 29 содержала недопустимую директиву:
```
Content-signal: search=yes,ai-train=no
```

**Почему это ошибка:**
- `Content-signal` не является стандартной директивой robots.txt
- robots.txt поддерживает только: `User-agent`, `Allow`, `Disallow`, `Sitemap`, `Crawl-delay`
- Комментарии должны начинаться с `#`

### ✅ Решение:
Удалена недопустимая директива и оптимизирована структура файла.

---

## Правильная структура robots.txt

### Разрешённые директивы:

1. **User-agent:** - Указывает бота/краулера
   ```
   User-agent: *
   User-agent: Googlebot
   ```

2. **Allow:** - Разрешает доступ к URL
   ```
   Allow: /
   Allow: /public/
   ```

3. **Disallow:** - Запрещает доступ к URL
   ```
   Disallow: /api/
   Disallow: /admin/
   ```

4. **Sitemap:** - Указывает расположение sitemap
   ```
   Sitemap: https://example.com/sitemap.xml
   ```

5. **Crawl-delay:** - Задержка между запросами (опционально)
   ```
   Crawl-delay: 10
   ```

6. **Комментарии:** - Начинаются с `#`
   ```
   # Это комментарий
   ```

---

## Текущая конфигурация (Валидная ✅)

### Основные правила:
- **Все боты:** Доступ ко всему сайту, кроме `/api/`, `/admin/`, `/_next/`
- **AI краулеры:** Специальный доступ к `/llm.txt` для контекста
- **Sitemap:** https://in-fomo.com/sitemap.xml

### Поддерживаемые AI краулеры:
- GPTBot (OpenAI)
- ChatGPT-User (OpenAI)
- Google-Extended (Google AI)
- CCBot (Common Crawl)
- anthropic-ai (Anthropic)
- Claude-Web (Anthropic)
- ClaudeBot (Anthropic)
- Applebot-Extended (Apple Intelligence)
- PerplexityBot (Perplexity AI)
- Amazonbot (Amazon)
- cohere-ai (Cohere)

---

## Проверка валидности robots.txt

### Онлайн инструменты:
1. **Google Search Console**
   - https://search.google.com/search-console
   - Tools → robots.txt Tester

2. **Bing Webmaster Tools**
   - https://www.bing.com/webmasters
   - Diagnostics & Tools → robots.txt Tester

3. **Robots.txt Validator**
   - https://www.websiteplanet.com/webtools/robots-txt/

### Локальная проверка:
```bash
# Просмотр файла
cat public/robots.txt

# Проверка синтаксиса
curl https://in-fomo.com/robots.txt
```

---

## Лучшие практики

### ✅ Делать:
- Использовать только стандартные директивы
- Группировать правила по User-agent
- Добавлять комментарии для понимания
- Указывать полный URL для Sitemap
- Тестировать изменения перед деплоем

### ❌ Не делать:
- Использовать несуществующие директивы (например, `Content-signal`)
- Блокировать важные ресурсы (CSS, JS для рендеринга)
- Использовать robots.txt для скрытия конфиденциальных данных
- Забывать про регистрозависимость путей
- Смешивать правила для разных User-agent

---

## Примеры конфигураций

### Полный запрет сайта:
```
User-agent: *
Disallow: /
```

### Запрет только для конкретного бота:
```
User-agent: BadBot
Disallow: /

User-agent: *
Allow: /
```

### Разрешение только главной страницы:
```
User-agent: *
Allow: /$
Disallow: /
```

### Запрет определённых файлов:
```
User-agent: *
Disallow: /*.pdf$
Disallow: /*.doc$
```

---

## Тестирование после изменений

1. **Сохраните изменения** в `public/robots.txt`
2. **Деплой** на production
3. **Проверьте доступность:**
   ```bash
   curl https://in-fomo.com/robots.txt
   ```
4. **Валидация в Google Search Console:**
   - URL: https://search.google.com/search-console
   - Инструменты → Тестер robots.txt
5. **Проверьте отсутствие ошибок** в отчёте Lighthouse

---

## FAQ

**Q: Нужно ли перезапускать сервер после изменений?**
A: Нет, robots.txt — статический файл в `public/`, доступен сразу.

**Q: Как быстро Google увидит изменения?**
A: Обычно в течение 24 часов. Можно ускорить через Search Console.

**Q: Защищает ли robots.txt от парсинга?**
A: Нет, это только рекомендация для добросовестных ботов. Используйте другие методы защиты.

**Q: Можно ли использовать wildcards?**
A: Да, `*` (любые символы) и `$` (конец URL) поддерживаются большинством ботов.

---

**Дата обновления:** 11 ноября 2025  
**Статус:** ✅ Валидный robots.txt без ошибок

