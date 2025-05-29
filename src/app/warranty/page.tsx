import MainLayout from '@/components/layout/MainLayout'
import { Shield, RotateCcw, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react'

export default function WarrantyPage() {
  return (
    <MainLayout>
      <div className="container py-8">
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Главная</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Гарантия и возврат</li>
          </ol>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Гарантия и возврат</h1>
          <p className="text-xl text-gray-600">
            Полная информация о гарантийных обязательствах и условиях возврата товаров
          </p>
        </div>

        {/* Основная информация */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Гарантия */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-lg">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Гарантия</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Официальная гарантия</h3>
                  <p className="text-gray-600 text-sm">
                    12 месяцев от производителя на все смартфоны
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Расширенная гарантия</h3>
                  <p className="text-gray-600 text-sm">
                    Дополнительно 6 месяцев от нашего магазина
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Быстрый ремонт</h3>
                  <p className="text-gray-600 text-sm">
                    Диагностика и ремонт в течение 3-7 рабочих дней
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Возврат */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <RotateCcw className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold">Возврат</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">14 дней на возврат</h3>
                  <p className="text-gray-600 text-sm">
                    Без объяснения причин с момента получения
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Полный возврат средств</h3>
                  <p className="text-gray-600 text-sm">
                    100% стоимости товара в течение 5 рабочих дней
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Бесплатный возврат</h3>
                  <p className="text-gray-600 text-sm">
                    Курьер заберет товар бесплатно по Москве
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Условия гарантии */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Условия гарантии</h2>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                Что покрывает гарантия
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Заводские дефекты</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Неисправности компонентов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Программные сбои</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Дефекты экрана</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Проблемы с батареей</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Неисправности камеры</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-600" />
                Что НЕ покрывает гарантия
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Механические повреждения</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Попадание влаги</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Самостоятельный ремонт</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Превышение нормы износа</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Вирусы и вредоносное ПО</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Нарушение условий эксплуатации</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Процедура возврата */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Как оформить возврат</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Свяжитесь с нами</h3>
              <p className="text-sm text-gray-600">
                Позвоните по телефону или напишите в чат
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Получите номер RMA</h3>
              <p className="text-sm text-gray-600">
                Мы выдадим уникальный номер возврата
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Передайте товар</h3>
              <p className="text-sm text-gray-600">
                Курьер заберет или принесите в магазин
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Получите деньги</h3>
              <p className="text-sm text-gray-600">
                Средства вернутся в течение 5 дней
              </p>
            </div>
          </div>
        </div>

        {/* Сроки и условия */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="card p-6 text-center">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Сроки возврата</h3>
            <p className="text-gray-600 mb-4">
              14 календарных дней с момента получения товара покупателем
            </p>
            <div className="text-sm text-gray-500">
              Отсчет начинается с даты доставки
            </div>
          </div>

          <div className="card p-6 text-center">
            <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Документы</h3>
            <p className="text-gray-600 mb-4">
              Обязательно сохраните чек и упаковку товара
            </p>
            <div className="text-sm text-gray-500">
              Без документов возврат невозможен
            </div>
          </div>

          <div className="card p-6 text-center">
            <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Состояние товара</h3>
            <p className="text-gray-600 mb-4">
              Товар должен быть в первоначальном виде
            </p>
            <div className="text-sm text-gray-500">
              Без следов использования и повреждений
            </div>
          </div>
        </div>

        {/* Контакты для возврата */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Нужна помощь с возвратом или гарантией?</h2>
            <p className="text-lg mb-8 opacity-90">
              Наши специалисты помогут оформить возврат или подскажут по гарантийным вопросам
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Телефон</h3>
                <a href="tel:+78001234567" className="text-lg hover:text-accent-300">
                  8 (800) 123-45-67
                </a>
                <p className="text-sm opacity-80 mt-1">Бесплатно по России</p>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:return@phoneshop.ru" className="text-lg hover:text-accent-300">
                  return@phoneshop.ru
                </a>
                <p className="text-sm opacity-80 mt-1">Вопросы возврата</p>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold mb-2">Онлайн-чат</h3>
                <button className="text-lg hover:text-accent-300">
                  Начать чат
                </button>
                <p className="text-sm opacity-80 mt-1">Быстрый ответ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 