import MainLayout from '@/components/layout/MainLayout'
import { MapPin, Phone, Clock, Car, Train, Bus } from 'lucide-react'

interface Store {
  id: number
  city: string
  name: string
  address: string
  phone: string
  workingHours: string
  metro?: string
  parking: boolean
  services: string[]
}

const stores: Store[] = [
  {
    id: 1,
    city: "Москва",
    name: "PhoneShop Тверская",
    address: "ул. Тверская, д. 15, стр. 1",
    phone: "+7 (495) 123-45-67",
    workingHours: "Пн-Вс: 10:00-21:00",
    metro: "Тверская, Пушкинская",
    parking: true,
    services: ["Ремонт", "Trade-in", "Аксессуары", "Консультации"]
  },
  {
    id: 2,
    city: "Москва", 
    name: "PhoneShop Арбат",
    address: "ул. Старый Арбат, д. 25",
    phone: "+7 (495) 123-45-68",
    workingHours: "Пн-Вс: 10:00-22:00",
    metro: "Арбатская",
    parking: false,
    services: ["Trade-in", "Аксессуары", "Консультации"]
  },
  {
    id: 3,
    city: "Санкт-Петербург",
    name: "PhoneShop Невский",
    address: "Невский проспект, д. 28",
    phone: "+7 (812) 123-45-67",
    workingHours: "Пн-Вс: 10:00-21:00",
    metro: "Невский проспект",
    parking: true,
    services: ["Ремонт", "Trade-in", "Аксессуары", "Консультации"]
  },
  {
    id: 4,
    city: "Екатеринбург",
    name: "PhoneShop Ленина",
    address: "пр. Ленина, д. 45",
    phone: "+7 (343) 123-45-67", 
    workingHours: "Пн-Вс: 10:00-20:00",
    parking: true,
    services: ["Trade-in", "Аксессуары", "Консультации"]
  },
  {
    id: 5,
    city: "Новосибирск",
    name: "PhoneShop Красный",
    address: "Красный проспект, д. 67",
    phone: "+7 (383) 123-45-67",
    workingHours: "Пн-Вс: 10:00-20:00", 
    parking: true,
    services: ["Ремонт", "Аксессуары", "Консультации"]
  },
  {
    id: 6,
    city: "Казань",
    name: "PhoneShop Баумана",
    address: "ул. Баумана, д. 12",
    phone: "+7 (843) 123-45-67",
    workingHours: "Пн-Вс: 10:00-21:00",
    parking: false,
    services: ["Trade-in", "Аксессуары", "Консультации"]
  }
]

export default function StoresPage() {
  return (
    <MainLayout>
      <div className="container py-8">
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Главная</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Адреса магазинов</li>
          </ol>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Наши магазины</h1>
          <p className="text-xl text-gray-600">
            Более 50 магазинов по всей России. Приходите, смотрите, выбирайте!
          </p>
        </div>

        {/* Статистика */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-gray-600">Магазинов</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">25</div>
            <div className="text-gray-600">Городов</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
            <div className="text-gray-600">Оригиналы</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">2-4ч</div>
            <div className="text-gray-600">Готовность заказа</div>
          </div>
        </div>

        {/* Карта (заглушка) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Найти ближайший магазин</h2>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl h-80 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Интерактивная карта</h3>
              <p>Здесь будет карта с отметками всех наших магазинов</p>
            </div>
          </div>
        </div>

        {/* Список магазинов */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Список магазинов</h2>
          
          <div className="space-y-6">
            {stores.map(store => (
              <div key={store.id} className="card p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Основная информация */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{store.name}</h3>
                        <p className="text-gray-600 text-lg">{store.city}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Открыт
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span>{store.address}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <a href={`tel:${store.phone}`} className="text-primary-600 hover:text-primary-700">
                          {store.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span>{store.workingHours}</span>
                      </div>
                      
                      {store.metro && (
                        <div className="flex items-center gap-3">
                          <Train className="w-5 h-5 text-gray-400" />
                          <span>м. {store.metro}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3">
                        <Car className="w-5 h-5 text-gray-400" />
                        <span>
                          {store.parking ? 'Есть парковка' : 'Парковки нет'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Услуги и действия */}
                  <div>
                    <h4 className="font-semibold mb-3">Доступные услуги:</h4>
                    <div className="space-y-2 mb-6">
                      {store.services.map(service => (
                        <div key={service} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <button className="btn btn-primary w-full btn-sm">
                        Проложить маршрут
                      </button>
                      <button className="btn btn-secondary w-full btn-sm">
                        Забронировать товар
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Услуги в магазинах */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Услуги в наших магазинах</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-semibold mb-2">Ремонт</h3>
              <p className="text-sm text-gray-600">
                Профессиональный ремонт смартфонов любой сложности
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold mb-2">Trade-in</h3>
              <p className="text-sm text-gray-600">
                Сдайте старый смартфон и получите скидку на новый
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold mb-2">Аксессуары</h3>
              <p className="text-sm text-gray-600">
                Большой выбор чехлов, пленок и других аксессуаров
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="font-semibold mb-2">Консультации</h3>
              <p className="text-sm text-gray-600">
                Эксперты помогут выбрать идеальный смартфон
              </p>
            </div>
          </div>
        </div>

        {/* Преимущества офлайн покупки */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Почему стоит прийти в магазин?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👀</span>
              </div>
              <h3 className="font-semibold mb-3">Посмотреть вживую</h3>
              <p className="text-gray-600">
                Подержите смартфон в руках, оцените качество экрана и камеры
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-3">Получить сразу</h3>
              <p className="text-gray-600">
                Забирайте покупку в день заказа без ожидания доставки
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-semibold mb-3">Личная консультация</h3>
              <p className="text-gray-600">
                Получите экспертный совет и ответы на все вопросы
              </p>
            </div>
          </div>
        </div>

        {/* Контакты для франшизы */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Хотите открыть магазин PhoneShop в своем городе?</h2>
          <p className="text-lg mb-6 opacity-90">
            Мы ищем надежных партнеров для развития франшизы в регионах
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/partners" className="btn btn-accent px-8 py-3">
              Узнать условия
            </a>
            <a href="tel:+78001234567" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3">
              Позвонить
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 