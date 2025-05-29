'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface Order {
  id: string
  userId: string
  items: OrderItem[]
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
  }
  paymentMethod: 'card' | 'cash' | 'online'
  deliveryMethod: 'courier' | 'pickup'
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  notes?: string
  createdAt: string
  updatedAt: string
}

interface OrdersContextType {
  orders: Order[]
  createOrder: (orderData: Omit<Order, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<Order>
  getUserOrders: () => Order[]
  getAllOrders: () => Order[] // Только для админа
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>
  getOrderById: (orderId: string) => Order | undefined
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

const ORDERS_STORAGE_KEY = 'phoneshop_orders'

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const { user } = useAuth()

  useEffect(() => {
    // Загружаем заказы из localStorage
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders)
          if (Array.isArray(parsedOrders)) {
            setOrders(parsedOrders)
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error)
        localStorage.removeItem(ORDERS_STORAGE_KEY)
      }
    }

    loadOrders()
  }, [])

  // Сохраняем заказы в localStorage при изменении
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
    }
  }, [orders])

  const createOrder = async (orderData: Omit<Order, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    if (!user) {
      throw new Error('Пользователь не авторизован')
    }

    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        userId: user.id,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setOrders(prev => {
        const updatedOrders = [...prev, newOrder]
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders))
        return updatedOrders
      })

      return newOrder
    } catch (error) {
      console.error('Ошибка создания заказа:', error)
      throw new Error('Не удалось создать заказ. Попробуйте еще раз.')
    }
  }

  const getUserOrders = (): Order[] => {
    if (!user) return []
    return orders.filter(order => order.userId === user.id).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  const getAllOrders = (): Order[] => {
    return orders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))

      setOrders(prev => {
        const updatedOrders = prev.map(order => 
          order.id === orderId 
            ? { ...order, status, updatedAt: new Date().toISOString() }
            : order
        )
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders))
        return updatedOrders
      })
    } catch (error) {
      console.error('Ошибка обновления статуса заказа:', error)
      throw new Error('Не удалось обновить статус заказа')
    }
  }

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId)
  }

  const value = {
    orders,
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    getOrderById
  }

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
} 