import MainLayout from '@/components/layout/MainLayout'
import { Truck, Clock, CreditCard, MapPin, Shield, Package } from 'lucide-react'
import Image from 'next/image'

export default function DeliveryPage() {
  return (
    <MainLayout>
      <div className="container py-8">
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Главная</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Доставка и оплата</li>
          </ol>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Доставка и оплата</h1>
          <p className="text-xl text-gray-600">
            Быстрая доставка по всей России. Удобные способы оплаты.
          </p>
        </div>

        {/* Баннер с изображением доставки */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <Truck className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Быстрая доставка</h2>
              <p className="text-lg">По Москве в день заказа, по России за 1-3 дня</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Способы доставки */}
          <div>
            <h2 className="text-2xl font-bold mb-6">🚚 Способы доставки</h2>
            
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Самовывоз</h3>
                    <p className="text-gray-600 mb-3">
                      Заберите заказ из наших магазинов в Москве и других городах
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-green-600 font-medium">Бесплатно</span>
                      <span className="text-gray-500">Готов через 2-4 часа</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Курьерская доставка</h3>
                    <p className="text-gray-600 mb-3">
                      Доставим до двери в удобное для вас время
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>По Москве (в пределах МКАД)</span>
                        <span className="font-medium">299 ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span>За МКАД (+50 км)</span>
                        <span className="font-medium">499 ₽</span>
                      </div>
                      <div className="text-green-600">
                        При заказе от 5 000 ₽ — бесплатно
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Почта России</h3>
                    <p className="text-gray-600 mb-3">
                      Доставка в любую точку России
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium">от 350 ₽</span>
                      <span className="text-gray-500">3-7 рабочих дней</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Способы оплаты */}
          <div>
            <h2 className="text-2xl font-bold mb-6">💳 Способы оплаты</h2>
            
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Банковской картой</h3>
                    <p className="text-gray-600 mb-3">
                      Visa, MasterCard, МИР. Оплата через защищенное соединение
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">Visa</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">MasterCard</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">МИР</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Наличными при получении</h3>
                    <p className="text-gray-600 mb-3">
                      Оплата курьеру или в пункте самовывоза
                    </p>
                    <span className="text-sm text-gray-500">
                      Доступно для заказов до 100 000 ₽
                    </span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Рассрочка</h3>
                    <p className="text-gray-600 mb-3">
                      От 0% на 3, 6, 12 месяцев от банков-партнеров
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">Тинькофф</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">Сбербанк</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Зоны доставки */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🗺️ Зоны доставки</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Москва</h3>
              <p className="text-gray-600 mb-4">В пределах МКАД</p>
              <div className="text-2xl font-bold text-green-600">В день заказа</div>
            </div>
            
            <div className="card p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">МО и СПб</h3>
              <p className="text-gray-600 mb-4">Московская обл. и Санкт-Петербург</p>
              <div className="text-2xl font-bold text-blue-600">1-2 дня</div>
            </div>
            
            <div className="card p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Регионы</h3>
              <p className="text-gray-600 mb-4">Остальная Россия</p>
              <div className="text-2xl font-bold text-purple-600">2-7 дней</div>
            </div>
          </div>
        </div>

        {/* Гарантии */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">🛡️ Наши гарантии</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Безопасность</h3>
              <p className="text-sm text-gray-600">
                Все платежи защищены SSL-шифрованием
              </p>
            </div>
            
            <div className="text-center">
              <Package className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Качество</h3>
              <p className="text-sm text-gray-600">
                Проверяем каждый товар перед отправкой
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Точность</h3>
              <p className="text-sm text-gray-600">
                Доставляем точно в указанное время
              </p>
            </div>
            
            <div className="text-center">
              <Truck className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Отслеживание</h3>
              <p className="text-sm text-gray-600">
                SMS и email уведомления о статусе
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 