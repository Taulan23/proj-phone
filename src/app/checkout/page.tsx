'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useOrders } from '@/contexts/OrdersContext'
import { formatPrice } from '@/utils/format'
import { ArrowRight, Shield, CreditCard, Truck, MapPin, Phone, Mail, User } from 'lucide-react'

interface OrderForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  paymentMethod: 'card' | 'cash' | 'online'
  deliveryMethod: 'courier' | 'pickup'
  notes: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart, getTotalPrice, getTotalItems } = useCart()
  const { user } = useAuth()
  const { createOrder } = useOrders()
  
  const [formData, setFormData] = useState<OrderForm>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    deliveryMethod: 'courier',
    notes: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const subtotal = getTotalPrice()
  const deliveryFee = formData.deliveryMethod === 'courier' ? 500 : 0
  const discountAmount = subtotal * (discount / 100)
  const total = subtotal + deliveryFee - discountAmount

  const applyPromoCode = () => {
    if (promoCode === 'SALE10') {
      setDiscount(10)
      alert('Промокод применен! Скидка 10%')
    } else if (promoCode === 'FIRST15') {
      setDiscount(15)
      alert('Промокод применен! Скидка 15%')
    } else {
      alert('Недействительный промокод')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.zipCode}`
        },
        paymentMethod: formData.paymentMethod,
        deliveryMethod: formData.deliveryMethod,
        notes: formData.notes,
        total: total
      }

      const order = await createOrder(orderData)
      
      // Очистить корзину
      clearCart()
      
      // Перенаправить на страницу подтверждения заказа
      router.push(`/orders/${order.id}`)
      
    } catch (error) {
      console.error('Ошибка создания заказа:', error)
      const errorMessage = error instanceof Error ? error.message : 'Произошла неизвестная ошибка при создании заказа'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Если корзина пуста, перенаправляем в каталог
  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
            <p className="text-gray-600 mb-8">Добавьте товары для оформления заказа</p>
            <Link href="/catalog" className="btn btn-primary px-8 py-3">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Оформление заказа</h1>
          <nav className="text-sm">
            <ol className="flex items-center gap-2">
              <li><Link href="/cart" className="text-gray-500 hover:text-gray-700">Корзина</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900">Оформление заказа</li>
            </ol>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Форма заказа */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Контактная информация */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Контактная информация
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Имя *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Фамилия *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="input w-full"
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Доставка */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Способ доставки
                </h3>
                
                <div className="space-y-3 mb-4">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="courier"
                      checked={formData.deliveryMethod === 'courier'}
                      onChange={(e) => setFormData({...formData, deliveryMethod: e.target.value as 'courier' | 'pickup'})}
                      className="radio"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Курьерская доставка</div>
                      <div className="text-sm text-gray-600">1-2 дня, 500 ₽</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={(e) => setFormData({...formData, deliveryMethod: e.target.value as 'courier' | 'pickup'})}
                      className="radio"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Самовывоз</div>
                      <div className="text-sm text-gray-600">Бесплатно, готов сегодня</div>
                    </div>
                  </label>
                </div>

                {formData.deliveryMethod === 'courier' && (
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Адрес доставки
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Адрес *</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="input w-full"
                          placeholder="Улица, дом, квартира"
                          required={formData.deliveryMethod === 'courier'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Город *</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="input w-full"
                          required={formData.deliveryMethod === 'courier'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Индекс</label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                          className="input w-full"
                          placeholder="123456"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Способ оплаты */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Способ оплаты
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value as any})}
                      className="radio"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Банковской картой</div>
                      <div className="text-sm text-gray-600">Visa, MasterCard, МИР</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value as any})}
                      className="radio"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Онлайн-оплата</div>
                      <div className="text-sm text-gray-600">СБП, Яндекс.Деньги, QIWI</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value as any})}
                      className="radio"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Наличными при получении</div>
                      <div className="text-sm text-gray-600">Оплата курьеру или в пункте выдачи</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Комментарий к заказу */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Комментарий к заказу</h3>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="input w-full h-24 resize-none"
                  placeholder="Дополнительная информация для курьера..."
                />
              </div>
            </form>
          </div>

          {/* Сводка заказа */}
          <div className="space-y-6">
            {/* Товары в заказе */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Ваш заказ</h3>
              
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          📱
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-gray-600 text-sm">Количество: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Промокод */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Промокод</h3>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Введите промокод"
                  className="input flex-1"
                />
                <button
                  type="button"
                  onClick={applyPromoCode}
                  className="btn btn-secondary px-4"
                >
                  Применить
                </button>
              </div>
              
              {discount > 0 && (
                <p className="text-green-600 text-sm mt-2">
                  Промокод применен! Скидка {discount}%
                </p>
              )}
            </div>

            {/* Итого */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Итого</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Товары ({getTotalItems()}):</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'Бесплатно'}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Скидка ({discount}%):</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>К оплате:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                className="btn btn-primary w-full mt-6"
                disabled={loading || items.length === 0}
              >
                {loading ? (
                  'Оформление...'
                ) : (
                  <>
                    Оформить заказ
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Безопасная оплата и защита данных</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 