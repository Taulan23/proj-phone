# Админ-панель PhoneShop

## Обзор
Полнофункциональная админ-панель для управления интернет-магазином PhoneShop.

## Доступ
- URL: `http://localhost:3001/admin`
- Требуется роль администратора
- Проверка прав доступа на основе AuthContext

## Функционал

### 1. Дашборд
**Статистика заказов:**
- Общее количество заказов
- Общая выручка
- Заказы ожидающие обработки
- Доставленные заказы

**Статистика пользователей:**
- Общее количество пользователей
- Активные пользователи
- Заблокированные пользователи
- Администраторы

**Статистика товаров:**
- Общее количество товаров
- Товары в наличии
- Товары не в наличии

**Последние заказы:**
- Показывает 5 последних заказов
- Статус заказов с цветными индикаторами
- Быстрый переход к детальному просмотру

### 2. Управление заказами
**Функции:**
- Просмотр всех заказов в табличном виде
- Изменение статуса заказов:
  - Ожидает подтверждения
  - Подтвержден
  - Обрабатывается
  - Отправлен
  - Доставлен
  - Отменен
- Просмотр деталей заказа
- Информация о клиенте

**Данные заказа:**
- ID заказа
- Информация о клиенте (имя, email)
- Сумма заказа
- Текущий статус
- Дата создания

### 3. Управление пользователями
**Функции:**
- Просмотр всех пользователей
- Изменение роли пользователя (user/admin)
- Блокировка/разблокировка пользователей
- Удаление пользователей
- Защита от самоблокировки/удаления

**Данные пользователя:**
- ФИО и контактная информация
- Email и телефон
- Текущая роль
- Статус (активен/заблокирован)
- Количество заказов
- Общая сумма покупок
- Дата регистрации

### 4. Управление товарами ⭐ **НОВОЕ**
**Функции:**
- Просмотр всех товаров с изображениями
- Добавление новых товаров
- Редактирование существующих товаров
- Удаление товаров
- Поиск по товарам
- Фильтрация по категориям

**Данные товара:**
- Название и slug
- Цена и старая цена (скидки)
- Изображение товара
- Описание
- Бренд и категория
- Статус наличия
- Рейтинг и количество отзывов
- Особенности (массив строк)
- Технические характеристики (JSON)
- Дата создания/обновления

**Модальное окно редактирования:**
- Полная форма с валидацией
- Поддержка JSON для характеристик
- Автогенерация slug из названия
- Чекбокс для статуса наличия
- Выбор категории из списка

## Технические детали

### Контексты
1. **AuthContext** - управление авторизацией и проверка прав
2. **OrdersContext** - управление заказами
3. **UsersContext** - управление пользователями  
4. **ProductsContext** - управление товарами ⭐ **НОВОЕ**

### Хранение данных
- Все данные сохраняются в localStorage
- Автоматическая синхронизация при изменениях
- Демо-данные при первом запуске

### Категории товаров
- `smartphones` - Смартфоны
- `headphones` - Наушники
- `cases` - Чехлы
- `chargers` - Зарядные устройства
- `accessories` - Аксессуары

### Статусы заказов
- `pending` - Ожидает подтверждения
- `confirmed` - Подтвержден
- `processing` - Обрабатывается
- `shipped` - Отправлен
- `delivered` - Доставлен
- `cancelled` - Отменен

## Безопасность
- Проверка роли администратора на каждой странице
- Защита от самоблокировки/удаления админов
- Валидация данных форм
- Подтверждение удаления

## UI/UX
- Адаптивный дизайн для всех экранов
- Цветные индикаторы статусов
- Модальные окна для редактирования
- Поиск и фильтрация в реальном времени
- Загрузочные состояния
- Уведомления об операциях

## Использование
1. Авторизуйтесь как администратор
2. Перейдите в `/admin`
3. Используйте табы для переключения между разделами
4. Для товаров: используйте поиск и кнопку "Добавить товар"
5. Редактируйте товары кликом по иконке редактирования
6. Удаляйте с подтверждением

## Демо-данные
При первом запуске создаются демо-данные:
- 2 администратора и 3 обычных пользователя
- 5 товаров разных категорий
- Несколько тестовых заказов

---
**Версия:** 1.0.0  
**Дата обновления:** 27.01.2025  
**Статус:** ✅ Полностью функционально 