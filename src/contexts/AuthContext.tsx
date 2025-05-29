'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  loading: boolean
  isAdmin: () => boolean
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Проверяем сохраненные данные пользователя при загрузке
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        // Проверяем, является ли сохраненное значение валидным JSON
        const parsedUser = JSON.parse(savedUser)
        // Дополнительная проверка на то, что это объект пользователя
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.id && parsedUser.email) {
          setUser(parsedUser)
        } else {
          // Если данные невалидны, очищаем localStorage
          localStorage.removeItem('user')
        }
      } catch (error) {
        // Если JSON невалиден, очищаем localStorage
        console.warn('Невалидные данные пользователя в localStorage:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Попытка входа:', { email, password })
      
      // Проверка демо-аккаунтов
      if (email === 'admin@phoneshop.ru' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          email: 'admin@phoneshop.ru',
          firstName: 'Администратор',
          lastName: 'Системы',
          role: 'admin'
        }
        setUser(adminUser)
        localStorage.setItem('user', JSON.stringify(adminUser))
        return true
      } else if (email === 'user@example.com' && password === 'user123') {
        const regularUser: User = {
          id: '2',
          email: 'user@example.com',
          firstName: 'Иван',
          lastName: 'Иванов',
          role: 'user'
        }
        setUser(regularUser)
        localStorage.setItem('user', JSON.stringify(regularUser))
        return true
      }
      
      // Проверка зарегистрированных пользователей
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      console.log('Зарегистрированные пользователи:', registeredUsers)
      
      const foundUser = registeredUsers.find((user: any) => 
        user.email === email && user.password === password
      )
      
      console.log('Найденный пользователь:', foundUser)
      
      if (foundUser) {
        const userToLogin: User = {
          id: foundUser.id,
          email: foundUser.email,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          role: 'user'
        }
        setUser(userToLogin)
        localStorage.setItem('user', JSON.stringify(userToLogin))
        console.log('Успешный вход:', userToLogin)
        return true
      }
      
      console.log('Пользователь не найден')
      return false
    } catch (error) {
      console.error('Ошибка входа:', error)
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Попытка регистрации:', userData)
      
      // Проверяем, что пользователь с таким email не существует
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const existingUser = registeredUsers.find((user: any) => user.email === userData.email)
      
      if (existingUser) {
        console.log('Пользователь с таким email уже существует')
        return false // Пользователь уже существует
      }
      
      const newUserId = Date.now().toString()
      
      // Сохраняем пользователя с паролем для проверки при входе
      const userWithPassword = {
        id: newUserId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        password: userData.password // Сохраняем пароль для проверки при входе
      }
      
      registeredUsers.push(userWithPassword)
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
      
      console.log('Пользователь зарегистрирован и сохранен:', userWithPassword)
      
      // Создаем объект пользователя без пароля для текущей сессии
      const newUser: User = {
        id: newUserId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user'
      }
      
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      console.log('Пользователь залогинен:', newUser)
      return true
    } catch (error) {
      console.error('Ошибка регистрации:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    localStorage.removeItem('favorites')
  }

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    loading,
    isAdmin: () => user?.role === 'admin' || false
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 