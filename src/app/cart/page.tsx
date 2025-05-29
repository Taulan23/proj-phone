'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/utils/format'
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Tag } from 'lucide-react'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SALE10') {
      setAppliedPromo({ code: 'SALE10', discount: 0.1 })
      alert('Промокод применен! Скидка 10%')
    } else if (promoCode.toUpperCase() === 'FIRST15') {
      setAppliedPromo({ code: 'FIRST15', discount: 0.15 })
      alert('Промокод применен! Скидка 15%')
    } else {
      alert('Недействительный промокод')
    }
  }

  const handleClearCart = () => {
    if (confirm('Очистить корзину? Все товары будут удалены.')) {
      clearCart()
      setAppliedPromo(null)
    }
  }

  const subtotal = getTotalPrice()
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0
  const deliveryFee = subtotal > 5000 ? 0 : 299
  const total = subtotal - discount + deliveryFee

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container py-16">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
            <p className="text-gray-600 mb-8">Добавьте товары, чтобы оформить заказ</p>
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
        {/* Хлебные крошки */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="text-gray-500 hover:text-gray-700">Главная</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Корзина</li>
          </ol>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Корзина ({getTotalItems()})</h1>
          <button
            onClick={handleClearCart}
            className="btn btn-secondary text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Очистить корзину
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Товары в корзине */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="card p-4">
                  <div className="flex gap-4">
                    {/* Изображение */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            📱
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Информация о товаре */}
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Количество */}
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 min-w-[50px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Удалить */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Цена */}
                        <div className="text-right">
                          <div className="font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(item.price)} за шт.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Промокод */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Промокод
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Введите промокод"
                  className="input flex-1"
                />
                <button
                  onClick={applyPromoCode}
                  className="btn btn-secondary px-6"
                >
                  Применить
                </button>
              </div>
              {appliedPromo && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-800 text-sm">
                    ✅ Промокод {appliedPromo.code} применен! Скидка {Math.round(appliedPromo.discount * 100)}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Итого */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Итого</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Товары ({getTotalItems()}):</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Скидка ({appliedPromo.code}):</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>
                    {deliveryFee > 0 ? formatPrice(deliveryFee) : 'Бесплатно'}
                  </span>
                </div>
                
                {subtotal <= 5000 && (
                  <div className="text-sm text-gray-600">
                    Бесплатная доставка от {formatPrice(5000)}
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>К оплате:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="btn btn-primary w-full mb-3"
              >
                Оформить заказ
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link
                href="/catalog"
                className="btn btn-secondary w-full"
              >
                Продолжить покупки
              </Link>
              
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <span>🔒</span>
                  <span>Безопасная оплата</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 