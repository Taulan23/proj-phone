'use client'

import MainLayout from '@/components/layout/MainLayout'
import { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Trash2, 
  Settings, 
  Package, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface AutoOrder {
  id: string
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
  }
  items: Array<{
    productId: number
    name: string
    price: number
    quantity: number
    image?: string
  }>
  total: number
  status: string
  paymentMethod: string
  deliveryMethod: string
  createdAt: string
  notes?: string
}

export default function AutoOrdersPage() {
  const [autoOrders, setAutoOrders] = useState<AutoOrder[]>([])
  const [loading, setLoading] = useState(false)
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [autoInterval, setAutoInterval] = useState<NodeJS.Timeout | null>(null)
  const [settings, setSettings] = useState({
    interval: 30, // секунды
    maxOrders: 100,
    ordersPerBatch: 1
  })

  useEffect(() => {
    fetchAutoOrders()
  }, [])

  const fetchAutoOrders = async () => {
    try {
      const response = await fetch('/api/orders/auto')
      const data = await response.json()
      if (data.success) {
        setAutoOrders(data.orders)
      }
    } catch (error) {
      console.error('Ошибка загрузки автоматических заказов:', error)
    }
  }

  const createAutoOrder = async (count = 1) => {
    setLoading(true)
    try {
      const response = await fetch('/api/orders/auto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ count })
      })
      
      const data = await response.json()
      if (data.success) {
        await fetchAutoOrders()
        return data.orders
      } else {
        alert('Ошибка создания заказа: ' + data.error)
      }
    } catch (error) {
      alert('Ошибка создания заказа')
    } finally {
      setLoading(false)
    }
  }

  const clearAutoOrders = async () => {
    if (!confirm('Удалить все автоматические заказы?')) return
    
    try {
      const response = await fetch('/api/orders/auto', {
        method: 'DELETE'
      })
      
      const data = await response.json()
      if (data.success) {
        setAutoOrders([])
        alert('Все автоматические заказы удалены')
      }
    } catch (error) {
      alert('Ошибка удаления заказов')
    }
  }

  const startAutoMode = () => {
    if (autoInterval) return
    
    setIsAutoMode(true)
    const interval = setInterval(() => {
      createAutoOrder(settings.ordersPerBatch)
    }, settings.interval * 1000)
    
    setAutoInterval(interval)
  }

  const stopAutoMode = () => {
    if (autoInterval) {
      clearInterval(autoInterval)
      setAutoInterval(null)
    }
    setIsAutoMode(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый'
      case 'confirmed': return 'Подтвержден'
      case 'processing': return 'В обработке'
      case 'shipped': return 'Отправлен'
      case 'delivered': return 'Доставлен'
      case 'cancelled': return 'Отменен'
      default: return 'Неизвестно'
    }
  }

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Автоматические заказы</h1>
            <p className="text-gray-600 mt-1">
              Управление автоматизированными заказами для тестирования
            </p>
          </div>
          <Link href="/admin" className="btn btn-secondary">
            Назад в админ-панель
          </Link>
        </div>

        {/* Панель управления */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Статистика */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">Всего заказов</h3>
            </div>
            <p className="text-2xl font-bold">{autoOrders.length}</p>
          </div>

          {/* Статус автоматизации */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${isAutoMode ? 'bg-green-100' : 'bg-gray-100'}`}>
                {isAutoMode ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <h3 className="font-semibold">Автоматизация</h3>
            </div>
            <p className={`text-sm font-medium ${isAutoMode ? 'text-green-600' : 'text-gray-600'}`}>
              {isAutoMode ? 'Активна' : 'Остановлена'}
            </p>
          </div>

          {/* Настройки */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold">Интервал</h3>
            </div>
            <p className="text-sm text-gray-600">{settings.interval} сек</p>
          </div>

          {/* Последний заказ */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold">Последний заказ</h3>
            </div>
            <p className="text-sm text-gray-600">
              {autoOrders.length > 0 
                ? new Date(autoOrders[0]?.createdAt).toLocaleTimeString('ru-RU')
                : 'Нет заказов'
              }
            </p>
          </div>
        </div>

        {/* Управление */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Управление автоматизацией</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Ручное создание */}
            <div>
              <h3 className="font-semibold mb-3">Ручное создание заказов</h3>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => createAutoOrder(1)}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Создание...' : 'Создать 1 заказ'}
                </button>
                <button
                  onClick={() => createAutoOrder(5)}
                  disabled={loading}
                  className="btn btn-secondary"
                >
                  Создать 5 заказов
                </button>
                <button
                  onClick={() => createAutoOrder(10)}
                  disabled={loading}
                  className="btn btn-secondary"
                >
                  Создать 10 заказов
                </button>
              </div>
            </div>

            {/* Автоматическое создание */}
            <div>
              <h3 className="font-semibold mb-3">Автоматическое создание</h3>
              <div className="flex gap-3 mb-4">
                {!isAutoMode ? (
                  <button
                    onClick={startAutoMode}
                    className="btn btn-success"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Запустить автоматизацию
                  </button>
                ) : (
                  <button
                    onClick={stopAutoMode}
                    className="btn btn-danger"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Остановить автоматизацию
                  </button>
                )}
                
                <button
                  onClick={clearAutoOrders}
                  className="btn btn-danger"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Очистить все
                </button>
              </div>
            </div>
          </div>

          {/* Настройки автоматизации */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold mb-4">Настройки автоматизации</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="label mb-2">Интервал (секунды)</label>
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={settings.interval}
                  onChange={(e) => setSettings({...settings, interval: parseInt(e.target.value)})}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="label mb-2">Заказов за раз</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.ordersPerBatch}
                  onChange={(e) => setSettings({...settings, ordersPerBatch: parseInt(e.target.value)})}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="label mb-2">Максимум заказов</label>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  value={settings.maxOrders}
                  onChange={(e) => setSettings({...settings, maxOrders: parseInt(e.target.value)})}
                  className="input w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Список заказов */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Последние автоматические заказы</h2>
            <button
              onClick={fetchAutoOrders}
              className="btn btn-secondary btn-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Обновить
            </button>
          </div>

          {autoOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Нет автоматических заказов</h3>
              <p className="text-gray-500 mb-6">Создайте первый автоматический заказ</p>
              <button
                onClick={() => createAutoOrder(1)}
                className="btn btn-primary"
              >
                Создать заказ
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {autoOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Заказ #{order.id}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {order.customerInfo.firstName} {order.customerInfo.lastName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(order.createdAt).toLocaleString('ru-RU')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <p className="text-lg font-semibold mt-1">{order.total.toLocaleString('ru-RU')} ₽</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Товары */}
                    <div>
                      <h4 className="font-medium mb-2">Товары:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                            <div className="w-10 h-10 bg-white rounded overflow-hidden flex-shrink-0">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                  📱
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              <p className="text-xs text-gray-600">
                                {item.quantity} × {item.price.toLocaleString('ru-RU')} ₽
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Информация о доставке */}
                    <div>
                      <h4 className="font-medium mb-2">Доставка:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Адрес:</strong> {order.customerInfo.address}</p>
                        <p><strong>Телефон:</strong> {order.customerInfo.phone}</p>
                        <p><strong>Email:</strong> {order.customerInfo.email}</p>
                        <p><strong>Способ доставки:</strong> {order.deliveryMethod === 'courier' ? 'Курьер' : 'Самовывоз'}</p>
                        <p><strong>Оплата:</strong> {order.paymentMethod === 'card' ? 'Картой' : 'Наличными'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Link 
                      href={`/orders/${order.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Посмотреть заказ
                    </Link>
                    <button className="btn btn-secondary btn-sm">
                      Изменить статус
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
} 