import MainLayout from '@/components/layout/MainLayout'
import { Users, Award, Target, Heart, TrendingUp, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container py-8">
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Главная</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">О компании</li>
          </ol>
        </nav>

        {/* Главный баннер */}
        <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-12 mb-12 text-white overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6">О PhoneShop</h1>
            <p className="text-xl mb-8 max-w-2xl">
              Мы создаем будущее мобильных технологий, предлагая самые современные смартфоны 
              и лучший сервис для наших клиентов с 2015 года.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-sm opacity-90">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm opacity-90">Городов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">9 лет</div>
                <div className="text-sm opacity-90">На рынке</div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* Наша миссия */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
            <p className="text-gray-600 text-lg mb-6">
              Мы стремимся сделать передовые мобильные технологии доступными каждому. 
              Наша цель — не просто продавать смартфоны, а помогать людям оставаться 
              на связи с миром и друг с другом.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-primary-600" />
                <span>Качество превыше всего</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-500" />
                <span>Забота о каждом клиенте</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <span>Постоянное развитие</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Команда экспертов</h3>
              <p className="text-gray-600">
                Более 200 профессионалов работают над тем, чтобы вы получили 
                лучший опыт покупки и использования мобильных устройств.
              </p>
            </div>
          </div>
        </div>

        {/* Наши ценности */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Надежность</h3>
              <p className="text-gray-600">
                Мы гарантируем качество каждого товара и предоставляем 
                полную поддержку после покупки.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Клиентоориентированность</h3>
              <p className="text-gray-600">
                Каждое решение мы принимаем с учетом интересов и потребностей 
                наших клиентов.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Инновации</h3>
              <p className="text-gray-600">
                Мы всегда ищем новые способы улучшить опыт покупки 
                и сервис для наших клиентов.
              </p>
            </div>
          </div>
        </div>

        {/* История компании */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">История компании</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2015
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Основание PhoneShop</h3>
                <p className="text-gray-600">
                  Начали работу как небольшой магазин смартфонов в Москве с командой из 5 человек.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2018
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Запуск интернет-магазина</h3>
                <p className="text-gray-600">
                  Вышли в онлайн и начали доставку по всей России. Открыли 10 магазинов в крупных городах.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2021
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Статус премиум-партнера</h3>
                <p className="text-gray-600">
                  Получили статус официального партнера Apple, Samsung и других ведущих брендов.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2024
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Миллион клиентов</h3>
                <p className="text-gray-600">
                  Достигли отметки в 1 миллион довольных клиентов и открыли 50-й магазин.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Награды и достижения */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Награды и достижения</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card p-6">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Лучший ритейлер 2023</h3>
              <p className="text-sm text-gray-600">По версии Mobile Retail Awards</p>
            </div>

            <div className="card p-6">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Выбор покупателей</h3>
              <p className="text-sm text-gray-600">Рейтинг 4.8/5 на Яндекс.Маркет</p>
            </div>

            <div className="card p-6">
              <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Лучший сервис</h3>
              <p className="text-sm text-gray-600">Премия за качество обслуживания</p>
            </div>

            <div className="card p-6">
              <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Быстрый рост</h3>
              <p className="text-sm text-gray-600">TOP-100 быстрорастущих компаний</p>
            </div>
          </div>
        </div>

        {/* Контакты для партнеров */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Хотите стать нашим партнером?</h2>
          <p className="text-lg mb-6 opacity-90">
            Мы всегда открыты для сотрудничества с производителями и поставщиками мобильных устройств
          </p>
          <a href="/partners" className="btn btn-accent px-8 py-3">
            Узнать больше о партнерстве
          </a>
        </div>
      </div>
    </MainLayout>
  )
} 