# 🚀 Деплой на Hostinger + Привязка домена

## 📋 Оглавление

1. [Проверка типа хостинга](#проверка-типа-хостинга)
2. [Рекомендуемый способ (Vercel + домен)](#рекомендуемый-способ-vercel--домен)
3. [Альтернатива (VPS Hostinger)](#альтернатива-vps-hostinger)
4. [Разделение сервисов](#разделение-сервисов)
5. [Привязка домена](#привязка-домена)

---

## 🔍 Проверка типа хостинга

### Что у вас на Hostinger?

**Вариант 1: Shared Hosting (обычный хостинг)**
- ❌ Не подходит для Next.js
- ✅ Подходит только для статических сайтов
- 💡 Решение: используйте Vercel для Next.js + привяжите домен

**Вариант 2: VPS Hosting (виртуальный сервер)**
- ✅ Подходит для Next.js
- ✅ Можно установить Node.js
- ✅ Полный контроль над сервером

**Как проверить:**
1. Зайдите в панель Hostinger (hPanel)
2. Если видите "File Manager", "PHP Version" - это Shared
3. Если видите SSH доступ, root доступ - это VPS

---

## ✅ Рекомендуемый способ (Vercel + домен)

### Почему это лучше:

✅ **Бесплатно** для некоммерческих проектов  
✅ **Автоматический деплой** из GitHub  
✅ **CDN** по всему миру  
✅ **SSL сертификат** автоматически  
✅ **Не смешивается** с Telegram ботом и Odoo  
✅ **Проще в обслуживании**

### Архитектура:

```
Hostinger VPS:
├── Telegram Bot (порт 3001)
├── Odoo (порт 8069)
└── Nginx (порт 80/443)

Vercel:
└── IN-FOMO. Website (ваш Next.js сайт)

Домен:
├── in-fomo.com → Vercel (сайт)
├── bot.in-fomo.com → Hostinger:3001 (бот)
└── crm.in-fomo.com → Hostinger:8069 (Odoo)
```

---

## 🎯 Пошаговая инструкция (Vercel + домен)

### Шаг 1: Деплой на Vercel (5 минут)

#### 1.1 Создайте аккаунт Vercel

1. Перейдите на https://vercel.com
2. **Sign Up** с GitHub аккаунтом
3. Дайте доступ к вашему репозиторию

#### 1.2 Импортируйте проект

1. В Vercel нажмите **Add New** → **Project**
2. Выберите репозиторий `Ch-a-k/if2`
3. Нажмите **Import**

#### 1.3 Настройте переменные окружения

Добавьте Environment Variables:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=wx6ubarj
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_TOKEN=ваш_токен_sanity

# Site URL
NEXT_PUBLIC_SITE_URL=https://in-fomo.com

# Telegram (опционально, можно через Sanity)
TELEGRAM_BOT_TOKEN=ваш_telegram_token
TELEGRAM_CHAT_ID=-ваш_chat_id

# Analytics (опционально, можно через Sanity)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_CLOUDFLARE_TOKEN=ваш_cloudflare_token
```

#### 1.4 Деплой

1. Нажмите **Deploy**
2. Ждите 2-3 минуты
3. Получите URL вида: `your-project.vercel.app`

---

### Шаг 2: Привязка домена к Vercel (10 минут)

#### 2.1 Добавьте домен в Vercel

1. В проекте Vercel → **Settings** → **Domains**
2. Введите ваш домен: `in-fomo.com`
3. Нажмите **Add**
4. Vercel покажет DNS записи, которые нужно добавить

#### 2.2 Настройте DNS в Hostinger

1. Зайдите в **Hostinger hPanel**
2. Перейдите в **Domains** → ваш домен → **DNS / Name Servers**
3. Измените **Name Servers** на Vercel (рекомендуется):

```
Name Server 1: ns1.vercel-dns.com
Name Server 2: ns2.vercel-dns.com
```

**ИЛИ** добавьте DNS записи вручную:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### 2.3 Подождите распространения DNS (15 минут - 48 часов)

Обычно работает через 15-30 минут.

Проверка:
```bash
dig in-fomo.com
nslookup in-fomo.com
```

---

### Шаг 3: Настройка поддоменов (опционально)

Если хотите разделить сервисы по поддоменам:

#### 3.1 Создайте поддомены в Hostinger

1. **Domains** → **Subdomains** → **Create Subdomain**
2. Создайте:
   - `bot.in-fomo.com` → для Telegram бота
   - `crm.in-fomo.com` → для Odoo

#### 3.2 Настройте Nginx на Hostinger VPS

Если у вас VPS, создайте конфиги:

**`/etc/nginx/sites-available/bot.in-fomo.com`:**
```nginx
server {
    listen 80;
    server_name bot.in-fomo.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**`/etc/nginx/sites-available/crm.in-fomo.com`:**
```nginx
server {
    listen 80;
    server_name crm.in-fomo.com;

    location / {
        proxy_pass http://localhost:8069;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте:
```bash
sudo ln -s /etc/nginx/sites-available/bot.in-fomo.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/crm.in-fomo.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 3.3 SSL сертификаты для поддоменов

```bash
sudo certbot --nginx -d bot.in-fomo.com -d crm.in-fomo.com
```

---

## 🖥️ Альтернатива: VPS Hostinger (сложнее)

Если у вас VPS и хотите всё на Hostinger:

### Архитектура на VPS:

```
Hostinger VPS (один сервер):
├── Next.js сайт (порт 3000)
├── Telegram Bot (порт 3001)
├── Odoo (порт 8069)
└── Nginx (порт 80/443)
    ├── in-fomo.com → :3000 (Next.js)
    ├── bot.in-fomo.com → :3001 (Telegram Bot)
    └── crm.in-fomo.com → :8069 (Odoo)
```

### Пошаговая инструкция для VPS:

#### Шаг 1: Подключитесь по SSH

```bash
ssh root@ваш_ip_сервера
```

#### Шаг 2: Установите Node.js 18+

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Проверка
```

#### Шаг 3: Установите PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

#### Шаг 4: Клонируйте проект

```bash
cd /var/www
git clone https://github.com/Ch-a-k/if2.git in-fomo-website
cd in-fomo-website
```

#### Шаг 5: Установите зависимости

```bash
npm install
```

#### Шаг 6: Создайте `.env.local`

```bash
nano .env.local
```

Вставьте:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=wx6ubarj
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_TOKEN=ваш_токен
NEXT_PUBLIC_SITE_URL=https://in-fomo.com
TELEGRAM_BOT_TOKEN=ваш_токен
TELEGRAM_CHAT_ID=-ваш_chat_id
```

#### Шаг 7: Соберите проект

```bash
npm run build
```

#### Шаг 8: Запустите с PM2

```bash
pm2 start npm --name "in-fomo-website" -- start
pm2 save
pm2 startup
```

#### Шаг 9: Настройте Nginx

```bash
sudo nano /etc/nginx/sites-available/in-fomo.com
```

Вставьте:
```nginx
server {
    listen 80;
    server_name in-fomo.com www.in-fomo.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Активируйте:
```bash
sudo ln -s /etc/nginx/sites-available/in-fomo.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Шаг 10: SSL сертификат

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d in-fomo.com -d www.in-fomo.com
```

#### Шаг 11: Проверка

```bash
pm2 list  # Должен быть online
curl http://localhost:3000  # Должен вернуть HTML
```

---

## 🔀 Разделение сервисов

### Убедитесь что порты не конфликтуют:

```bash
# Проверьте какие порты заняты
sudo netstat -tulpn | grep LISTEN

# Должно быть примерно так:
# :80    nginx
# :443   nginx
# :3000  Next.js сайт (in-fomo-website)
# :3001  Telegram Bot
# :8069  Odoo
```

### Если конфликт портов:

Измените порт Next.js в `package.json`:
```json
{
  "scripts": {
    "start": "next start -p 3002"
  }
}
```

Или через переменную окружения:
```bash
PORT=3002 pm2 start npm --name "in-fomo-website" -- start
```

---

## 🌍 Привязка домена (DNS)

### В Hostinger hPanel:

1. **Domains** → ваш домен → **DNS / Name Servers**

2. **Если используете Vercel** (рекомендуется):
   - Измените Name Servers на Vercel

3. **Если используете VPS Hostinger**:
   - A Record: `@` → `IP_вашего_VPS`
   - A Record: `www` → `IP_вашего_VPS`
   - A Record: `bot` → `IP_вашего_VPS`
   - A Record: `crm` → `IP_вашего_VPS`

---

## 🚀 Автоматические обновления

### Для Vercel:
✅ Автоматически! Каждый `git push` → автоматический деплой

### Для VPS:

Создайте скрипт обновления:

```bash
nano /var/www/in-fomo-website/update.sh
```

```bash
#!/bin/bash
cd /var/www/in-fomo-website
git pull origin main
npm install
npm run build
pm2 restart in-fomo-website
```

Сделайте исполняемым:
```bash
chmod +x /var/www/in-fomo-website/update.sh
```

Обновление:
```bash
cd /var/www/in-fomo-website
./update.sh
```

---

## ✅ Финальная проверка

### Чеклист:

- [ ] Сайт открывается по домену (https://in-fomo.com)
- [ ] SSL сертификат работает (зелёный замок)
- [ ] Формы отправляют в Telegram
- [ ] Sanity Studio работает (http://localhost:3333 или deployed)
- [ ] Telegram бот работает отдельно
- [ ] Odoo работает отдельно
- [ ] Все сервисы на разных портах

---

## ❓ Частые проблемы

### Проблема 1: "502 Bad Gateway"

**Причина:** Next.js не запущен  
**Решение:**
```bash
pm2 list
pm2 restart in-fomo-website
pm2 logs in-fomo-website
```

### Проблема 2: Домен не работает

**Причина:** DNS ещё не распространился  
**Решение:** Подождите 15-30 минут, проверьте:
```bash
nslookup in-fomo.com
```

### Проблема 3: SSL не работает

**Причина:** Certbot не смог получить сертификат  
**Решение:**
```bash
sudo certbot renew --dry-run
sudo certbot --nginx -d in-fomo.com
```

### Проблема 4: Конфликт портов

**Причина:** Порт уже занят другим сервисом  
**Решение:**
```bash
sudo lsof -i :3000  # Найти что занимает порт
sudo kill -9 PID    # Убить процесс
```

---

## 📊 Рекомендации

### ✅ Используйте Vercel для Next.js если:
- У вас Shared Hosting на Hostinger
- Не хотите заниматься администрированием сервера
- Нужна максимальная скорость и надёжность
- Бюджет ограничен (Vercel бесплатен для личных проектов)

### ✅ Используйте VPS Hostinger если:
- У вас уже VPS
- Хотите всё на одном сервере
- Готовы администрировать сервер
- Нужен полный контроль

---

## 📚 Дополнительные ресурсы

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Hostinger Tutorials:** https://www.hostinger.com/tutorials/
- **PM2 Docs:** https://pm2.keymetrics.io/

---

## 🎉 Готово!

Ваш сайт теперь в production с привязанным доменом!

**Следующие шаги:**
1. ✅ Заполните контент в Sanity
2. ✅ Протестируйте все формы
3. ✅ Настройте аналитику (GTM, Hotjar)
4. ✅ Настройте резервное копирование

---

**Нужна помощь?** Напишите какой вариант выбрали и на каком этапе возникли сложности.

