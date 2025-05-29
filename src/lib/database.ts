import Database from 'better-sqlite3'
import path from 'path'

// Создаем базу данных в папке проекта
const dbPath = path.join(process.cwd(), 'database.sqlite')
const db = new Database(dbPath)

// Интерфейсы
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  phone?: string
  registeredAt: string
  password: string
}

export interface Order {
  id: string
  userId: string
  items: string // JSON строка
  customerInfo: string // JSON строка
  paymentMethod: 'card' | 'cash' | 'online'
  deliveryMethod: 'courier' | 'pickup'
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  notes?: string
  createdAt: string
  updatedAt: string
}

// Создание таблиц
const createTables = () => {
  // Таблица пользователей
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      phone TEXT,
      registeredAt TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `)

  // Таблица заказов
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      items TEXT NOT NULL,
      customerInfo TEXT NOT NULL,
      paymentMethod TEXT NOT NULL,
      deliveryMethod TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      total REAL NOT NULL,
      notes TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `)

  // Создаем администратора по умолчанию
  const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@phoneshop.ru')
  if (!adminExists) {
    const insertAdmin = db.prepare(`
      INSERT INTO users (id, email, firstName, lastName, role, phone, registeredAt, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    insertAdmin.run(
      'admin-1',
      'admin@phoneshop.ru',
      'Администратор',
      'Системы',
      'admin',
      '+7 (800) 123-45-67',
      '2024-01-01T00:00:00.000Z',
      'admin123'
    )
  }

  // Создаем тестового пользователя
  const userExists = db.prepare('SELECT id FROM users WHERE email = ?').get('user@example.com')
  if (!userExists) {
    const insertUser = db.prepare(`
      INSERT INTO users (id, email, firstName, lastName, role, phone, registeredAt, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    insertUser.run(
      'user-1',
      'user@example.com',
      'Иван',
      'Иванов',
      'user',
      '+7 (999) 123-45-67',
      '2024-01-01T00:00:00.000Z',
      'user123'
    )
  }
}

// Инициализация базы данных
createTables()

// Функции для работы с пользователями
export const userQueries = {
  // Найти пользователя по email и паролю
  findByEmailAndPassword: db.prepare('SELECT * FROM users WHERE email = ? AND password = ?'),
  
  // Найти пользователя по email
  findByEmail: db.prepare('SELECT * FROM users WHERE email = ?'),
  
  // Найти пользователя по ID
  findById: db.prepare('SELECT * FROM users WHERE id = ?'),
  
  // Создать нового пользователя
  create: db.prepare(`
    INSERT INTO users (id, email, firstName, lastName, role, phone, registeredAt, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `),
  
  // Получить всех пользователей
  getAll: db.prepare('SELECT * FROM users ORDER BY registeredAt DESC')
}

// Функции для работы с заказами
export const orderQueries = {
  // Создать заказ
  create: db.prepare(`
    INSERT INTO orders (id, userId, items, customerInfo, paymentMethod, deliveryMethod, status, total, notes, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),
  
  // Найти заказ по ID
  findById: db.prepare('SELECT * FROM orders WHERE id = ?'),
  
  // Получить заказы пользователя
  findByUserId: db.prepare('SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC'),
  
  // Получить все заказы
  getAll: db.prepare('SELECT * FROM orders ORDER BY createdAt DESC'),
  
  // Обновить статус заказа
  updateStatus: db.prepare('UPDATE orders SET status = ?, updatedAt = ? WHERE id = ?')
}

export default db 