import MainLayout from '@/components/layout/MainLayout'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'

export default function ContactsPage() {
  return (
    <MainLayout>
      <div className="container py-8">
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Главная</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Контакты</li>
          </ol>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Контакты</h1>
          <p className="text-xl text-gray-600">
            Мы всегда готовы помочь вам. Свяжитесь с нами любым удобным способом.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Основные контакты */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Основные контакты</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Телефон</h3>
                    <div className="space-y-1">
                      <a href="tel:+78001234567" className="block text-primary-600 hover:text-primary-700">
                        8 (800) 123-45-67
                      </a>
                      <p className="text-sm text-gray-600">Бесплатно по России</p>
                      <a href="tel:+74951234567" className="block text-gray-600">
                        +7 (495) 123-45-67
                      </a>
                      <p className="text-sm text-gray-600">Для Москвы</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <div className="space-y-1">
                      <a href="mailto:info@phoneshop.ru" className="block text-primary-600 hover:text-primary-700">
                        info@phoneshop.ru
                      </a>
                      <p className="text-sm text-gray-600">Общие вопросы</p>
                      <a href="mailto:support@phoneshop.ru" className="block text-gray-600">
                        support@phoneshop.ru
                      </a>
                      <p className="text-sm text-gray-600">Техподдержка</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Главный офис</h3>
                    <p className="text-gray-600 mb-2">
                      г. Москва, ул. Тверская, д. 15, стр. 1<br />
                      БЦ "Премиум Плаза", 10 этаж
                    </p>
                    <p className="text-sm text-gray-500">Метро: Тверская, Пушкинская</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Время работы</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Пн-Пт:</span> 09:00 - 21:00</p>
                      <p><span className="font-medium">Сб-Вс:</span> 10:00 - 20:00</p>
                      <p className="text-gray-500 mt-2">Горячая линия работает круглосуточно</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Форма обратной связи */}
            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-6">Форма обратной связи</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label mb-2">Имя *</label>
                    <input type="text" className="input w-full" placeholder="Ваше имя" required />
                  </div>
                  <div>
                    <label className="label mb-2">Email *</label>
                    <input type="email" className="input w-full" placeholder="your@email.com" required />
                  </div>
                </div>
                
                <div>
                  <label className="label mb-2">Телефон</label>
                  <input type="tel" className="input w-full" placeholder="+7 (999) 123-45-67" />
                </div>
                
                <div>
                  <label className="label mb-2">Тема обращения *</label>
                  <select className="input w-full" required>
                    <option value="">Выберите тему</option>
                    <option value="order">Вопрос по заказу</option>
                    <option value="product">Вопрос о товаре</option>
                    <option value="delivery">Доставка</option>
                    <option value="warranty">Гарантия и возврат</option>
                    <option value="cooperation">Сотрудничество</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                
                <div>
                  <label className="label mb-2">Сообщение *</label>
                  <textarea 
                    className="input w-full" 
                    rows={5} 
                    placeholder="Опишите ваш вопрос подробно..."
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary px-8 py-3">
                  <Send className="w-5 h-5 mr-2" />
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Дополнительно</h2>
            
            {/* Социальные сети */}
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Мы в соцсетях</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                  <div className="w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center text-sm">
                    VK
                  </div>
                  <span>ВКонтакте</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                  <div className="w-8 h-8 bg-blue-400 rounded text-white flex items-center justify-center text-sm">
                    TG
                  </div>
                  <span>Telegram</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                  <div className="w-8 h-8 bg-red-500 rounded text-white flex items-center justify-center text-sm">
                    YT
                  </div>
                  <span>YouTube</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white flex items-center justify-center text-sm">
                    IG
                  </div>
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            {/* Онлайн-чат */}
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Онлайн-поддержка</h3>
              <p className="text-gray-600 mb-4">
                Наш онлайн-консультант готов ответить на ваши вопросы
              </p>
              <button className="btn btn-accent w-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                Начать чат
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Среднее время ответа: 2 минуты
              </p>
            </div>

            {/* Часто задаваемые вопросы */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Популярные вопросы</h3>
              <div className="space-y-3">
                <a href="/faq" className="block text-sm text-primary-600 hover:text-primary-700">
                  → Как оформить возврат?
                </a>
                <a href="/faq" className="block text-sm text-primary-600 hover:text-primary-700">
                  → Сроки доставки по России
                </a>
                <a href="/faq" className="block text-sm text-primary-600 hover:text-primary-700">
                  → Условия гарантии
                </a>
                <a href="/faq" className="block text-sm text-primary-600 hover:text-primary-700">
                  → Способы оплаты
                </a>
                <a href="/faq" className="block text-sm text-primary-600 hover:text-primary-700">
                  → Программа лояльности
                </a>
              </div>
              <a href="/faq" className="btn btn-secondary w-full mt-4">
                Все вопросы и ответы
              </a>
            </div>
          </div>
        </div>

        {/* Карта (заглушка) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Как нас найти</h2>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-3" />
              <p className="text-lg font-medium">Интерактивная карта</p>
              <p className="text-sm">г. Москва, ул. Тверская, д. 15, стр. 1</p>
            </div>
          </div>
        </div>

        {/* Банер с призывом */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Не нашли ответ на свой вопрос?</h2>
          <p className="text-lg mb-6 opacity-90">
            Свяжитесь с нами любым удобным способом — мы обязательно поможем!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+78001234567" className="btn btn-accent px-6 py-3">
              <Phone className="w-5 h-5 mr-2" />
              Позвонить
            </a>
            <a href="mailto:info@phoneshop.ru" className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3">
              <Mail className="w-5 h-5 mr-2" />
              Написать
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 