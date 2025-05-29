'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'
import { useOrders } from '@/contexts/OrdersContext'
import { formatPrice } from '@/utils/format'
import { CheckCircle, Package, Truck, Clock, CreditCard, MapPin, Phone, Mail } from 'lucide-react'

const statusConfig = {
  pending: { label: 'Ожидает подтверждения', color: 'text-yellow-600 bg-yellow-100', icon: Clock },
  confirmed: { label: 'Подтвержден', color: 'text-blue-600 bg-blue-100', icon: CheckCircle },
  processing: { label: 'Обрабатывается', color: 'text-purple-600 bg-purple-100', icon: Package },
  shipped: { label: 'Отправлен', color: 'text-indigo-600 bg-indigo-100', icon: Truck },
  delivered: { label: 'Доставлен', color: 'text-green-600 bg-green-100', icon: CheckCircle },
  cancelled: { label: 'Отменен', color: 'text-red-600 bg-red-100', icon: Clock }
}

export default function OrderPage() {
  const params = useParams()
  const { getOrderById } = useOrders()
  
  const order = getOrderById(params.id as string)

  if (!order) {
    return (
      <MainLayout>
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Заказ не найден</h1>
            <p className="text-gray-600 mb-8">Заказ с указанным номером не существует</p>
            <Link href="/profile" className="btn btn-primary px-8 py-3">
              Вернуться в профиль
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  const status = statusConfig[order.status]
  const StatusIcon = status.icon

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="text-gray-500 hover:text-gray-700">Главная</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/profile" className="text-gray-500 hover:text-gray-700">Профиль</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Заказ {order.id}</li>
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Заказ {order.id}</h1>
            <p className="text-gray-600">
              Создан {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${status.color}`}>
            <StatusIcon className="w-5 h-5" />
            <span className="font-medium">{status.label}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Основная информация */}
          <div className="lg:col-span-2 space-y-6">
            {/* Товары в заказе */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Товары в заказе</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          📱
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">Количество: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      <p className="text-sm text-gray-600">{formatPrice(item.price)} за шт.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Информация о доставке */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Truck className="w-6 h-6" />
                Доставка
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Способ доставки:</span>
                  <span className="ml-2">
                    {order.deliveryMethod === 'courier' ? 'Курьерская доставка' : 'Самовывоз'}
                  </span>
                </div>
                {order.deliveryMethod === 'courier' && (
                  <div>
                    <span className="font-medium">Адрес доставки:</span>
                    <span className="ml-2">{order.customerInfo.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Информация об оплате */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Оплата
              </h2>
              <div>
                <span className="font-medium">Способ оплаты:</span>
                <span className="ml-2">
                  {order.paymentMethod === 'card' && 'Банковская карта'}
                  {order.paymentMethod === 'cash' && 'Наличными при получении'}
                  {order.paymentMethod === 'online' && 'Онлайн-оплата'}
                </span>
              </div>
            </div>

            {order.notes && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Комментарий к заказу</h2>
                <p className="text-gray-700">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Итоговая стоимость */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Итого</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Товары:</span>
                  <span>{formatPrice(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>
                    {order.deliveryMethod === 'courier' ? formatPrice(500) : 'Бесплатно'}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>К оплате:</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Контактная информация */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Контакты</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{order.customerInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{order.customerInfo.phone}</span>
                </div>
                {order.deliveryMethod === 'courier' && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <span>{order.customerInfo.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Действия */}
            <div className="space-y-3">
              <Link href="/catalog" className="btn btn-primary w-full">
                Продолжить покупки
              </Link>
              {order.status === 'pending' && (
                <button className="btn btn-secondary w-full">
                  Отменить заказ
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 