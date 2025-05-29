# PhoneShop - Интернет-магазин смартфонов

Современный интернет-магазин смартфонов и аксессуаров, построенный на Next.js 15, TypeScript, Prisma и PostgreSQL.

## Функциональность

- 🛍️ Каталог товаров с фильтрацией и сортировкой
- 🔍 Поиск по товарам
- 🛒 Корзина с расчетом стоимости
- 💳 Оформление заказа
- 👤 Личный кабинет пользователя
- ⭐ Отзывы и рейтинги
- 🎯 Акции и промокоды
- 📱 Адаптивный дизайн
- 🔐 Аутентификация и авторизация
- 👨‍💼 Админ-панель

## Технологии

- **Frontend**: Next.js 15, React 19, TypeScript
- **Стилизация**: Tailwind CSS
- **База данных**: PostgreSQL + Prisma ORM
- **Аутентификация**: NextAuth.js
- **UI компоненты**: Radix UI, Lucide Icons
- **Формы**: React Hook Form + Zod

## Установка и запуск

### Требования

- Node.js 18+
- PostgreSQL
- npm или yarn

### Шаги установки

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/phone-shop.git
cd phone-shop
```

2. Установите зависимости:
```bash
npm install --legacy-peer-deps
```

3. Создайте файл `.env` в корне проекта:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/phone_shop"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
JWT_SECRET="your-jwt-secret-key"
```

4. Создайте базу данных и примените миграции:
```bash
npm run prisma:push
npm run prisma:generate
```

5. Заполните базу данных начальными данными:
```bash
npm run prisma:seed
```

6. Запустите проект в режиме разработки:
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

```
phone-shop/
├── src/
│   ├── app/              # Страницы приложения (App Router)
│   ├── components/       # React компоненты
│   ├── lib/             # Утилиты и конфигурации
│   ├── types/           # TypeScript типы
│   ├── utils/           # Вспомогательные функции
│   └── context/         # React Context
├── prisma/
│   ├── schema.prisma    # Схема базы данных
│   └── seed.ts         # Скрипт заполнения БД
├── public/             # Статические файлы
└── ...
```

## Тестовые данные

После выполнения seed скрипта будут созданы:

- **Администратор**: admin@phoneshop.ru / admin123
- **Пользователь**: user@example.com / user123
- **Промокоды**: SALE10 (скидка 10%), FIRST15 (скидка 15% на первый заказ)

## Основные страницы

- `/` - Главная страница
- `/catalog` - Каталог товаров
- `/products/[slug]` - Страница товара
- `/cart` - Корзина
- `/profile` - Личный кабинет
- `/admin` - Админ-панель

## API Endpoints

- `GET /api/products` - Получить список товаров
- `POST /api/cart` - Добавить товар в корзину
- `PUT /api/cart` - Обновить количество товара
- `DELETE /api/cart` - Удалить товар из корзины
- `POST /api/orders` - Создать заказ

## Скрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка для продакшена
- `npm run start` - Запуск продакшен сборки
- `npm run prisma:studio` - Открыть Prisma Studio
- `npm run prisma:migrate` - Применить миграции
- `npm run prisma:seed` - Заполнить БД тестовыми данными

## Лицензия

MIT
