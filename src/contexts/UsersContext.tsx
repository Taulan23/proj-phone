'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: 'user' | 'admin'
  isBlocked: boolean
  registeredAt: string
  lastLoginAt?: string
  totalOrders: number
  totalSpent: number
}

interface UsersContextType {
  users: User[]
  getAllUsers: () => User[]
  getUserById: (userId: string) => User | undefined
  updateUserRole: (userId: string, role: 'user' | 'admin') => Promise<void>
  blockUser: (userId: string) => Promise<void>
  unblockUser: (userId: string) => Promise<void>
  deleteUser: (userId: string) => Promise<void>
  getTotalUsers: () => number
  getActiveUsers: () => number
  getBlockedUsers: () => number
  getAdminUsers: () => number
}

const UsersContext = createContext<UsersContextType | undefined>(undefined)

const USERS_STORAGE_KEY = 'phoneshop_users'

// Демо-пользователи
const demoUsers: User[] = [
  {
    id: '1',
    email: 'admin@phoneshop.ru',
    firstName: 'Администратор',
    lastName: 'Системы',
    phone: '+7 (800) 123-45-67',
    role: 'admin',
    isBlocked: false,
    registeredAt: '2024-01-01T00:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    totalOrders: 0,
    totalSpent: 0
  },
  {
    id: '2',
    email: 'user@example.com',
    firstName: 'Иван',
    lastName: 'Иванов',
    phone: '+7 (999) 123-45-67',
    role: 'user',
    isBlocked: false,
    registeredAt: '2024-01-15T10:30:00.000Z',
    lastLoginAt: '2024-01-20T15:45:00.000Z',
    totalOrders: 2,
    totalSpent: 249980
  },
  {
    id: '3',
    email: 'test.user@gmail.com',
    firstName: 'Мария',
    lastName: 'Петрова',
    phone: '+7 (999) 987-65-43',
    role: 'user',
    isBlocked: false,
    registeredAt: '2024-01-20T14:20:00.000Z',
    lastLoginAt: '2024-01-25T09:15:00.000Z',
    totalOrders: 1,
    totalSpent: 129990
  },
  {
    id: '4',
    email: 'blocked.user@test.com',
    firstName: 'Заблокированный',
    lastName: 'Пользователь',
    phone: '+7 (999) 000-00-00',
    role: 'user',
    isBlocked: true,
    registeredAt: '2024-01-10T08:00:00.000Z',
    lastLoginAt: '2024-01-12T16:30:00.000Z',
    totalOrders: 0,
    totalSpent: 0
  },
  {
    id: '5',
    email: 'manager@phoneshop.ru',
    firstName: 'Анна',
    lastName: 'Менеджерова',
    phone: '+7 (800) 555-55-55',
    role: 'admin',
    isBlocked: false,
    registeredAt: '2024-01-05T12:00:00.000Z',
    lastLoginAt: '2024-01-26T11:20:00.000Z',
    totalOrders: 0,
    totalSpent: 0
  }
]

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  const { user: currentUser } = useAuth()

  useEffect(() => {
    // Загружаем пользователей из localStorage
    const loadUsers = () => {
      try {
        const savedUsers = localStorage.getItem(USERS_STORAGE_KEY)
        if (savedUsers) {
          const parsedUsers = JSON.parse(savedUsers)
          if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
            setUsers(parsedUsers)
            return
          }
        }
        // Если нет сохраненных пользователей, используем демо-данные
        setUsers(demoUsers)
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(demoUsers))
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error)
        // В случае ошибки используем демо-данные
        setUsers(demoUsers)
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(demoUsers))
      }
    }

    loadUsers()
  }, [])

  // Сохраняем пользователей в localStorage при изменении
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    }
  }, [users])

  const getAllUsers = (): User[] => {
    return users.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
  }

  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId)
  }

  const updateUserRole = async (userId: string, role: 'user' | 'admin'): Promise<void> => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))

      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, role }
          : user
      ))
    } catch (error) {
      console.error('Ошибка обновления роли пользователя:', error)
      throw new Error('Не удалось обновить роль пользователя')
    }
  }

  const blockUser = async (userId: string): Promise<void> => {
    try {
      // Нельзя заблокировать самого себя
      if (currentUser?.id === userId) {
        throw new Error('Нельзя заблокировать самого себя')
      }

      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))

      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, isBlocked: true }
          : user
      ))
    } catch (error) {
      console.error('Ошибка блокировки пользователя:', error)
      throw error
    }
  }

  const unblockUser = async (userId: string): Promise<void> => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))

      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, isBlocked: false }
          : user
      ))
    } catch (error) {
      console.error('Ошибка разблокировки пользователя:', error)
      throw new Error('Не удалось разблокировать пользователя')
    }
  }

  const deleteUser = async (userId: string): Promise<void> => {
    try {
      // Нельзя удалить самого себя
      if (currentUser?.id === userId) {
        throw new Error('Нельзя удалить самого себя')
      }

      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))

      setUsers(prev => prev.filter(user => user.id !== userId))
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error)
      throw error
    }
  }

  const getTotalUsers = (): number => {
    return users.length
  }

  const getActiveUsers = (): number => {
    return users.filter(user => !user.isBlocked).length
  }

  const getBlockedUsers = (): number => {
    return users.filter(user => user.isBlocked).length
  }

  const getAdminUsers = (): number => {
    return users.filter(user => user.role === 'admin').length
  }

  const value = {
    users,
    getAllUsers,
    getUserById,
    updateUserRole,
    blockUser,
    unblockUser,
    deleteUser,
    getTotalUsers,
    getActiveUsers,
    getBlockedUsers,
    getAdminUsers
  }

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext)
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  return context
} 