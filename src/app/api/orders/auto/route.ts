import { NextRequest, NextResponse } from 'next/server'

// Автоматизированный пользователь
const autoUser = {
  firstName: 'Автоматизированный',
  lastName: 'Пользователь',
  email: 'auto@phoneshop.ru',
  phone: '+7 (999) 000-00-00',
  address: 'г. Москва, ул. Автоматизации, д. 1, кв. 1'
}

// Список товаров для автоматических заказов
const autoProducts = [
  {
    productId: 1,
    name: 'iPhone 15 Pro 128GB Титановый черный',
    price: 119990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-black-titanium-select?wid=470&hei=556&fmt=png-alpha&.v=1693009279821'
  },
  {
    productId: 2,
    name: 'iPhone 15 Pro 256GB Титановый синий',
    price: 129990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-blue-titanium-select?wid=470&hei=556&fmt=png-alpha&.v=1693009279821'
  },
  {
    productId: 3,
    name: 'iPhone 15 Pro 512GB Титановый белый',
    price: 149990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-white-titanium-select?wid=470&hei=556&fmt=png-alpha&.v=1693009279821'
  },
  {
    productId: 4,
    name: 'iPhone 15 Pro Max 256GB Титановый натуральный',
    price: 139990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-natural-titanium-select?wid=470&hei=556&fmt=png-alpha&.v=1693009279821'
  },
  {
    productId: 5,
    name: 'AirPods Pro 2 с USB-C',
    price: 24990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=470&hei=556&fmt=png-alpha&.v=1693009279821'
  },
  {
    productId: 6,
    name: 'Чехол MagSafe для iPhone 15 Pro',
    price: 5990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT223?wid=470&hei=556&fmt=png-alpha&.v=1693009279821'
  }
]

// Хранилище заказов (в реальном приложении это была бы база данных)
let orders: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { count = 1 } = await request.json()
    
    const createdOrders = []
    
    for (let i = 0; i < count; i++) {
      // Генерируем случайный заказ
      const randomProducts = autoProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1) // 1-3 товара
      
      const items = randomProducts.map(product => ({
        ...product,
        quantity: Math.floor(Math.random() * 2) + 1 // 1-2 штуки
      }))
      
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      
      // Генерация ID заказа
      const orderId = (Math.floor(Math.random() * 90000) + 10000).toString()
      
      const order = {
        id: orderId,
        customerInfo: {
          ...autoUser,
          // Добавляем случайность в адрес
          address: `${autoUser.address.split(',')[0]}, ул. ${['Тестовая', 'Автоматическая', 'Демонстрационная'][Math.floor(Math.random() * 3)]}, д. ${Math.floor(Math.random() * 100) + 1}, кв. ${Math.floor(Math.random() * 200) + 1}`
        },
        items,
        total,
        status: ['new', 'confirmed', 'processing'][Math.floor(Math.random() * 3)],
        paymentMethod: ['card', 'cash'][Math.floor(Math.random() * 2)],
        deliveryMethod: ['courier', 'pickup'][Math.floor(Math.random() * 2)],
        createdAt: new Date().toISOString(),
        notes: 'Автоматически созданный заказ для тестирования'
      }
      
      orders.push(order)
      createdOrders.push(order)
      
      // Имитация задержки между заказами
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Создано ${count} автоматических заказов`,
      orders: createdOrders
    })
  } catch (error) {
    console.error('Ошибка создания автоматических заказов:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка создания автоматических заказов' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      orders: orders.slice(-10), // Последние 10 заказов
      total: orders.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка получения автоматических заказов' },
      { status: 500 }
    )
  }
}

// Endpoint для очистки автоматических заказов
export async function DELETE() {
  try {
    orders = []
    return NextResponse.json({
      success: true,
      message: 'Все автоматические заказы удалены'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка удаления заказов' },
      { status: 500 }
    )
  }
} 