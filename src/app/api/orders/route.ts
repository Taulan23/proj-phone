import { NextRequest, NextResponse } from 'next/server'
import { orderQueries } from '@/lib/database'

interface OrderItem {
  productId: number
  name: string
  price: number
  quantity: number
  image?: string
}

interface Order {
  id: string
  userId?: string
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
  }
  items: OrderItem[]
  total: number
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: 'card' | 'cash' | 'transfer'
  deliveryMethod: 'courier' | 'pickup' | 'post'
  createdAt: string
  notes?: string
}

// Моковая база данных заказов
let orders: Order[] = [
  {
    id: '#12345',
    customerInfo: {
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@example.com',
      phone: '+7 (999) 123-45-67',
      address: 'г. Москва, ул. Примерная, д. 1, кв. 10'
    },
    items: [
      {
        productId: 1,
        name: 'iPhone 15 Pro 128GB',
        price: 119990,
        quantity: 1
      }
    ],
    total: 119990,
    status: 'delivered',
    paymentMethod: 'card',
    deliveryMethod: 'courier',
    createdAt: '2024-05-20T10:00:00Z'
  },
  {
    id: '#12344',
    customerInfo: {
      firstName: 'Мария',
      lastName: 'Петрова',
      email: 'maria@example.com',
      phone: '+7 (999) 123-45-68',
      address: 'г. Санкт-Петербург, пр. Невский, д. 25, кв. 5'
    },
    items: [
      {
        productId: 2,
        name: 'Samsung Galaxy S24',
        price: 89990,
        quantity: 1
      }
    ],
    total: 89990,
    status: 'processing',
    paymentMethod: 'card',
    deliveryMethod: 'courier',
    createdAt: '2024-05-22T14:30:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    let orders
    if (userId) {
      orders = orderQueries.findByUserId.all(userId)
    } else {
      orders = orderQueries.getAll.all()
    }

    // Парсим JSON поля для всех заказов
    const parsedOrders = orders.map((order: any) => ({
      ...order,
      items: JSON.parse(order.items),
      customerInfo: JSON.parse(order.customerInfo)
    }))

    return NextResponse.json({
      success: true,
      orders: parsedOrders
    })

  } catch (error) {
    console.error('Ошибка получения заказов:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const orderId = `ORDER-${Date.now()}`
    const now = new Date().toISOString()

    // Сохраняем заказ в базу данных
    orderQueries.create.run(
      orderId,
      orderData.userId,
      JSON.stringify(orderData.items),
      JSON.stringify(orderData.customerInfo),
      orderData.paymentMethod,
      orderData.deliveryMethod,
      'pending',
      orderData.total,
      orderData.notes || null,
      now,
      now
    )

    // Получаем созданный заказ
    const order = orderQueries.findById.get(orderId) as any
    
    // Парсим JSON поля
    const parsedOrder = {
      ...order,
      items: JSON.parse(order.items),
      customerInfo: JSON.parse(order.customerInfo)
    }

    return NextResponse.json({
      success: true,
      order: parsedOrder
    })

  } catch (error) {
    console.error('Ошибка создания заказа:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 