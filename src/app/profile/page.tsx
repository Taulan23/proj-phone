'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'
import { useAuth } from '@/contexts/AuthContext'
import { useOrders } from '@/contexts/OrdersContext'
import { formatPrice } from '@/utils/format'
import { 
  User, 
  Package, 
  Settings, 
  LogOut, 
  Eye, 
  Clock,
  CheckCircle,
  Truck,
  Mail,
  Phone,
  Edit
} from 'lucide-react'

const statusConfig = {
  pending: { label: 'Ожидает подтверждения', color: 'text-yellow-600 bg-yellow-100', icon: Clock },
  confirmed: { label: 'Подтвержден', color: 'text-blue-600 bg-blue-100', icon: CheckCircle },
  processing: { label: 'Обрабатывается', color: 'text-purple-600 bg-purple-100', icon: Package },
  shipped: { label: 'Отправлен', color: 'text-indigo-600 bg-indigo-100', icon: Truck },
  delivered: { label: 'Доставлен', color: 'text-green-600 bg-green-100', icon: CheckCircle },
  cancelled: { label: 'Отменен', color: 'text-red-600 bg-red-100', icon: Clock }
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout, isAdmin } = useAuth()
  const { getUserOrders } = useOrders()
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'settings'>('orders')

  const userOrders = getUserOrders()

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!user) {
    router.push('/auth/login')
    return null
  }

  const handleLogout = () => {
    if (confirm('Вы уверены, что хотите выйти?')) {
      logout()
      router.push('/')
    }
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Боковое меню */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              {/* Информация о пользователе */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
                {isAdmin() && (
                  <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Администратор
                  </span>
                )}
              </div>

              {/* Навигация */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-primary-50 text-primary-600 border border-primary-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>Мои заказы</span>
                  {userOrders.length > 0 && (
                    <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {userOrders.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-primary-50 text-primary-600 border border-primary-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Личные данные</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-primary-50 text-primary-600 border border-primary-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Настройки</span>
                </button>

                {isAdmin() && (
                  <Link
                    href="/admin"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-red-50 text-red-600"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Админ-панель</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-red-50 text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Выйти</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            {/* Мои заказы */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Мои заказы</h1>
                  <Link href="/catalog" className="btn btn-primary">
                    Сделать заказ
                  </Link>
                </div>

                {userOrders.length === 0 ? (
                  <div className="card p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">У вас пока нет заказов</h3>
                    <p className="text-gray-600 mb-6">
                      Перейдите в каталог и выберите товары для покупки
                    </p>
                    <Link href="/catalog" className="btn btn-primary">
                      Перейти в каталог
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map(order => {
                      const status = statusConfig[order.status]
                      const StatusIcon = status.icon

                      return (
                        <div key={order.id} className="card p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">Заказ {order.id}</h3>
                              <p className="text-gray-600 text-sm">
                                {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${status.color}`}>
                                <StatusIcon className="w-4 h-4" />
                                <span className="text-sm font-medium">{status.label}</span>
                              </div>
                              <Link
                                href={`/orders/${order.id}`}
                                className="btn btn-secondary btn-sm"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Подробнее
                              </Link>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium mb-2">Товары ({order.items.length}):</h4>
                              <div className="space-y-2">
                                {order.items.slice(0, 2).map((item, index) => (
                                  <div key={index} className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                      {item.image ? (
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          width={40}
                                          height={40}
                                          className="w-full h-full object-contain p-1"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                          📱
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium truncate">{item.name}</p>
                                      <p className="text-xs text-gray-600">
                                        {item.quantity} шт. × {formatPrice(item.price)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                                {order.items.length > 2 && (
                                  <p className="text-sm text-gray-600">
                                    и еще {order.items.length - 2} товар(ов)
                                  </p>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Детали заказа:</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Доставка:</span>
                                  <span>
                                    {order.deliveryMethod === 'courier' ? 'Курьер' : 'Самовывоз'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Оплата:</span>
                                  <span>
                                    {order.paymentMethod === 'card' && 'Карта'}
                                    {order.paymentMethod === 'cash' && 'Наличные'}
                                    {order.paymentMethod === 'online' && 'Онлайн'}
                                  </span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                  <span>Итого:</span>
                                  <span>{formatPrice(order.total)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Личные данные */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Личные данные</h1>
                  <button className="btn btn-secondary">
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </button>
                </div>

                <div className="card p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя
                      </label>
                      <div className="input bg-gray-50 cursor-not-allowed">
                        {user.firstName}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Фамилия
                      </label>
                      <div className="input bg-gray-50 cursor-not-allowed">
                        {user.lastName}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <div className="input bg-gray-50 cursor-not-allowed">
                        {user.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Телефон
                      </label>
                      <div className="input bg-gray-50 cursor-not-allowed">
                        {user.phone || 'Не указан'}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Роль
                      </label>
                      <div className="input bg-gray-50 cursor-not-allowed">
                        {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Дата регистрации
                      </label>
                      <div className="input bg-gray-50 cursor-not-allowed">
                        {new Date(user.registeredAt).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Настройки */}
            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Настройки</h1>

                <div className="space-y-6">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4">Уведомления</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="checkbox" defaultChecked />
                        <span>Уведомления о статусе заказа</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="checkbox" defaultChecked />
                        <span>Новости и акции</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="checkbox" />
                        <span>SMS-уведомления</span>
                      </label>
                    </div>
                  </div>

                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4">Безопасность</h3>
                    <div className="space-y-4">
                      <button className="btn btn-secondary w-full md:w-auto">
                        Изменить пароль
                      </button>
                      <button className="btn btn-secondary w-full md:w-auto">
                        Настройки конфиденциальности
                      </button>
                    </div>
                  </div>

                  <div className="card p-6 border-red-200">
                    <h3 className="text-lg font-semibold mb-4 text-red-600">Опасная зона</h3>
                    <p className="text-gray-600 mb-4">
                      Удаление аккаунта приведет к безвозвратной потере всех данных.
                    </p>
                    <button className="btn bg-red-600 hover:bg-red-700 text-white">
                      Удалить аккаунт
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 