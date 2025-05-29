import MainLayout from '@/components/layout/MainLayout'
import { Handshake, TrendingUp, Users, Award, CheckCircle, Mail, Phone, Building } from 'lucide-react'

export default function PartnersPage() {
  return (
    <MainLayout>
      <div className="container py-8">
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Главная</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Партнерам</li>
          </ol>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Партнерство с PhoneShop</h1>
          <p className="text-xl text-gray-600">
            Присоединяйтесь к лидеру рынка мобильной розничной торговли. 
            Выгодные условия сотрудничества для поставщиков и франчайзи.
          </p>
        </div>

        {/* Главный баннер */}
        <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-12 mb-12 text-white overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Станьте частью успеха</h2>
              <p className="text-lg mb-6 opacity-90">
                Мы ищем амбициозных партнеров для развития бизнеса в сфере мобильных технологий. 
                Присоединяйтесь к сети из 50+ магазинов по всей России.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">9 лет</div>
                  <div className="text-sm opacity-80">На рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1M+</div>
                  <div className="text-sm opacity-80">Клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-80">Магазинов</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Handshake className="w-32 h-32 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-semibold">Давайте работать вместе!</h3>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* Виды партнерства */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Виды партнерства</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Франшиза */}
            <div className="card p-8 border-2 border-primary-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Building className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Франшиза</h3>
                  <p className="text-primary-600 font-medium">Откройте собственный магазин</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Готовая бизнес-модель</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Полное обучение и поддержка</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Маркетинговая поддержка</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Эксклюзивная территория</span>
                </div>
              </div>

              <div className="bg-primary-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Условия:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Паушальный взнос</span>
                    <span className="font-medium">от 500 000 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Роялти</span>
                    <span className="font-medium">6% с оборота</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Площадь помещения</span>
                    <span className="font-medium">от 30 м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Срок окупаемости</span>
                    <span className="font-medium">12-18 месяцев</span>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary w-full">
                Подать заявку на франшизу
              </button>
            </div>

            {/* Поставщики */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Поставщики</h3>
                  <p className="text-blue-600 font-medium">Расширьте каналы сбыта</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Широкая дистрибуция</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Стабильные заказы</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Маркетинговая поддержка</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span>Онлайн и офлайн продажи</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Требования:</h4>
                <div className="space-y-1 text-sm">
                  <div>• Официальная дистрибуция</div>
                  <div>• Сертифицированные товары</div>
                  <div>• Конкурентные цены</div>
                  <div>• Гарантийная поддержка</div>
                  <div>• Регулярные поставки</div>
                </div>
              </div>

              <button className="btn btn-secondary w-full">
                Стать поставщиком
              </button>
            </div>
          </div>
        </div>

        {/* Преимущества партнерства */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Почему выбирают нас</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Лидер рынка</h3>
              <p className="text-sm text-gray-600">
                Признанный лидер в сфере продажи мобильных устройств
              </p>
            </div>

            <div className="card p-6 text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Опыт команды</h3>
              <p className="text-sm text-gray-600">
                9 лет успешной работы и глубокая экспертиза в отрасли
              </p>
            </div>

            <div className="card p-6 text-center">
              <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Рост продаж</h3>
              <p className="text-sm text-gray-600">
                Стабильный рост выручки на 25-30% год к году
              </p>
            </div>

            <div className="card p-6 text-center">
              <Handshake className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-sm text-gray-600">
                Постоянная поддержка и консультации для всех партнеров
              </p>
            </div>
          </div>
        </div>

        {/* Этапы сотрудничества */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Как начать сотрудничество</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Заявка</h3>
              <p className="text-sm text-gray-600">
                Подайте заявку через форму или позвоните нам
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Встреча</h3>
              <p className="text-sm text-gray-600">
                Знакомство с командой и обсуждение условий
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Договор</h3>
              <p className="text-sm text-gray-600">
                Подписание партнерского соглашения
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Запуск</h3>
              <p className="text-sm text-gray-600">
                Начало работы и постоянная поддержка
              </p>
            </div>
          </div>
        </div>

        {/* Форма заявки */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Подать заявку на партнерство</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label mb-2">Имя *</label>
                  <input type="text" className="input w-full" placeholder="Ваше имя" required />
                </div>
                <div>
                  <label className="label mb-2">Фамилия *</label>
                  <input type="text" className="input w-full" placeholder="Ваша фамилия" required />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label mb-2">Email *</label>
                  <input type="email" className="input w-full" placeholder="your@email.com" required />
                </div>
                <div>
                  <label className="label mb-2">Телефон *</label>
                  <input type="tel" className="input w-full" placeholder="+7 (999) 123-45-67" required />
                </div>
              </div>
              
              <div>
                <label className="label mb-2">Тип партнерства *</label>
                <select className="input w-full" required>
                  <option value="">Выберите тип</option>
                  <option value="franchise">Франшиза</option>
                  <option value="supplier">Поставщик</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              
              <div>
                <label className="label mb-2">Город</label>
                <input type="text" className="input w-full" placeholder="Ваш город" />
              </div>
              
              <div>
                <label className="label mb-2">Опыт в розничной торговле</label>
                <textarea 
                  className="input w-full" 
                  rows={3} 
                  placeholder="Расскажите о вашем опыте..."
                ></textarea>
              </div>
              
              <div>
                <label className="label mb-2">Дополнительная информация</label>
                <textarea 
                  className="input w-full" 
                  rows={4} 
                  placeholder="Расскажите о ваших планах и целях..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary px-8 py-3">
                Отправить заявку
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Контакты для партнеров</h2>
            
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Департамент развития</h3>
                    <a href="tel:+74951234567" className="text-primary-600 hover:text-primary-700 block">
                      +7 (495) 123-45-67
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Пн-Пт: 09:00-18:00</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email для партнеров</h3>
                    <a href="mailto:partners@phoneshop.ru" className="text-primary-600 hover:text-primary-700 block">
                      partners@phoneshop.ru
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Ответим в течение 24 часов</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Офис</h3>
                    <p className="text-gray-600">
                      г. Москва, ул. Тверская, д. 15, стр. 1<br />
                      БЦ "Премиум Плаза", 10 этаж
                    </p>
                    <p className="text-sm text-gray-500 mt-1">м. Тверская, Пушкинская</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-6">
              <h3 className="font-semibold mb-3">📄 Документы для партнеров</h3>
              <div className="space-y-2">
                <a href="#" className="block text-primary-600 hover:text-primary-700 text-sm">
                  → Презентация франшизы (PDF, 2.5 МБ)
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700 text-sm">
                  → Требования к поставщикам (PDF, 1.2 МБ)
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700 text-sm">
                  → Финансовая модель (Excel, 0.8 МБ)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA баннер */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать партнерство?</h2>
          <p className="text-lg mb-8 opacity-90">
            Свяжитесь с нами сегодня и узнайте, как мы можем работать вместе
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+74951234567" className="btn btn-accent px-8 py-3">
              <Phone className="w-5 h-5 mr-2" />
              Позвонить сейчас
            </a>
            <a href="mailto:partners@phoneshop.ru" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3">
              <Mail className="w-5 h-5 mr-2" />
              Написать письмо
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 