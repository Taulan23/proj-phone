'use client'

import MainLayout from '@/components/layout/MainLayout'
import { ChevronDown, Search, HelpCircle, Package, CreditCard, Truck, RotateCcw } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Как оформить заказ?",
    answer: "Выберите товар, добавьте в корзину, перейдите к оформлению заказа, укажите данные доставки и оплаты, подтвердите заказ. Мы свяжемся с вами для подтверждения.",
    category: "order"
  },
  {
    id: 2,
    question: "Какие способы оплаты доступны?",
    answer: "Мы принимаем оплату банковскими картами (Visa, MasterCard, МИР), наличными при получении, через электронные кошельки, а также предлагаем рассрочку от банков-партнеров.",
    category: "payment"
  },
  {
    id: 3,
    question: "Сколько времени занимает доставка?",
    answer: "По Москве в пределах МКАД - в день заказа или на следующий день. По России - от 1 до 7 рабочих дней в зависимости от региона. Точные сроки уточняются при оформлении заказа.",
    category: "delivery"
  },
  {
    id: 4,
    question: "Можно ли вернуть товар?",
    answer: "Да, вы можете вернуть товар в течение 14 дней с момента получения без объяснения причин. Товар должен быть в оригинальной упаковке, без повреждений и следов использования.",
    category: "return"
  },
  {
    id: 5,
    question: "Какая гарантия на смартфоны?",
    answer: "На все смартфоны предоставляется официальная гарантия производителя - обычно 1 год. Также действует расширенная гарантия нашего магазина на 6 месяцев дополнительно.",
    category: "warranty"
  },
  {
    id: 6,
    question: "Как отследить заказ?",
    answer: "После отправки заказа мы присылаем SMS и email с трек-номером. Вы можете отследить посылку на сайте транспортной компании или в личном кабинете на нашем сайте.",
    category: "delivery"
  },
  {
    id: 7,
    question: "Есть ли программа лояльности?",
    answer: "Да! За каждую покупку начисляются бонусы (3% от суммы заказа), которыми можно оплачивать до 50% стоимости следующих покупок. Также действуют персональные скидки для постоянных клиентов.",
    category: "order"
  },
  {
    id: 8,
    question: "Можно ли забрать заказ самостоятельно?",
    answer: "Конечно! У нас есть пункты самовывоза в Москве и других городах. Самовывоз бесплатный, заказ готов через 2-4 часа после оформления.",
    category: "delivery"
  }
]

const categories = [
  { id: 'all', name: 'Все вопросы', icon: HelpCircle },
  { id: 'order', name: 'Заказ', icon: Package },
  { id: 'payment', name: 'Оплата', icon: CreditCard },
  { id: 'delivery', name: 'Доставка', icon: Truck },
  { id: 'return', name: 'Возврат', icon: RotateCcw },
  { id: 'warranty', name: 'Гарантия', icon: Package }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Главная</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Часто задаваемые вопросы</li>
          </ol>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Часто задаваемые вопросы</h1>
          <p className="text-xl text-gray-600">
            Ответы на самые популярные вопросы о покупке, доставке и гарантии
          </p>
        </div>

        {/* Поиск */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              className="input pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Категории */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Категории</h2>
            <div className="space-y-2">
              {categories.map(category => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{category.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Контакты */}
            <div className="card p-6 mt-8">
              <h3 className="font-semibold mb-3">Не нашли ответ?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Свяжитесь с нашей службой поддержки
              </p>
              <div className="space-y-2">
                <a href="tel:+78001234567" className="btn btn-primary btn-sm w-full">
                  Позвонить
                </a>
                <a href="/contacts" className="btn btn-secondary btn-sm w-full">
                  Написать
                </a>
              </div>
            </div>
          </div>

          {/* Список вопросов */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFAQ.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Вопросы не найдены</p>
                  <p className="text-sm text-gray-400">
                    Попробуйте изменить поисковый запрос или выбрать другую категорию
                  </p>
                </div>
              ) : (
                filteredFAQ.map(item => (
                  <div key={item.id} className="card">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-lg pr-4">{item.question}</h3>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${
                          openItems.includes(item.id) ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {openItems.includes(item.id) && (
                      <div className="px-6 pb-6">
                        <div className="border-t pt-4">
                          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Полезные ссылки */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-3">📋 Условия покупки</h3>
                <p className="text-gray-600 mb-4">
                  Подробная информация о гарантии, возврате и обмене товаров
                </p>
                <a href="/warranty" className="text-primary-600 hover:text-primary-700">
                  Читать условия →
                </a>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-3">🚚 Доставка и оплата</h3>
                <p className="text-gray-600 mb-4">
                  Все способы доставки, зоны покрытия и варианты оплаты
                </p>
                <a href="/delivery" className="text-primary-600 hover:text-primary-700">
                  Подробнее →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Банер с контактами */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Остались вопросы?</h2>
          <p className="text-lg mb-6 opacity-90">
            Наша служба поддержки работает 24/7 и готова помочь вам
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+78001234567" className="btn btn-accent px-6 py-3">
              8 (800) 123-45-67
            </a>
            <a href="/contacts" className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3">
              Форма обратной связи
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 