import MainLayout from '@/components/layout/MainLayout'
import { CreditCard, Calculator, CheckCircle, Clock, Users, Percent } from 'lucide-react'

export default function CreditPage() {
  return (
    <MainLayout>
      <div className="container py-8">
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Главная</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Кредит и рассрочка</li>
          </ol>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Кредит и рассрочка</h1>
          <p className="text-xl text-gray-600">
            Покупайте смартфоны в рассрочку 0% или оформляйте выгодный кредит от наших банков-партнеров
          </p>
        </div>

        {/* Основные предложения */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Рассрочка 0% */}
          <div className="card p-8 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-lg">
                <Percent className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Рассрочка 0%</h2>
                <p className="text-green-600 font-medium">Переплата 0 рублей</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>На 3, 6, 12 или 24 месяца</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Одобрение за 3 минуты</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Минимум документов</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>От 18 лет</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Пример расчета:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>iPhone 15 Pro 128GB</span>
                  <span className="font-medium">119 990 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Рассрочка на 12 месяцев</span>
                  <span className="font-medium">9 999 ₽/мес</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Переплата</span>
                  <span className="font-bold">0 ₽</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-full">
              Оформить рассрочку 0%
            </button>
          </div>

          {/* Кредит */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Кредит</h2>
                <p className="text-blue-600 font-medium">От 4.9% годовых</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>На срок до 5 лет</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Сумма до 1 000 000 ₽</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Досрочное погашение без комиссий</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Решение за 15 минут</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Пример расчета:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Samsung Galaxy S24 Ultra</span>
                  <span className="font-medium">139 990 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Кредит на 24 месяца под 9.9%</span>
                  <span className="font-medium">6 420 ₽/мес</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Переплата</span>
                  <span className="font-medium">14 090 ₽</span>
                </div>
              </div>
            </div>

            <button className="btn btn-secondary w-full">
              Рассчитать кредит
            </button>
          </div>
        </div>

        {/* Банки-партнеры */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Наши банки-партнеры</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">Т</span>
              </div>
              <h3 className="font-semibold mb-2">Тинькофф Банк</h3>
              <p className="text-sm text-gray-600 mb-3">Рассрочка 0% до 24 месяцев</p>
              <div className="text-xs text-gray-500">От 4.9% годовых</div>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">С</span>
              </div>
              <h3 className="font-semibold mb-2">Сбербанк</h3>
              <p className="text-sm text-gray-600 mb-3">Рассрочка 0% до 12 месяцев</p>
              <div className="text-xs text-gray-500">От 5.5% годовых</div>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">А</span>
              </div>
              <h3 className="font-semibold mb-2">Альфа-Банк</h3>
              <p className="text-sm text-gray-600 mb-3">Рассрочка 0% до 18 месяцев</p>
              <div className="text-xs text-gray-500">От 6.9% годовых</div>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">ВТБ</span>
              </div>
              <h3 className="font-semibold mb-2">ВТБ</h3>
              <p className="text-sm text-gray-600 mb-3">Рассрочка 0% до 10 месяцев</p>
              <div className="text-xs text-gray-500">От 7.9% годовых</div>
            </div>
          </div>
        </div>

        {/* Как оформить */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Как оформить рассрочку</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Выберите товар</h3>
              <p className="text-sm text-gray-600">
                Добавьте смартфон в корзину и перейдите к оформлению
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Выберите банк</h3>
              <p className="text-sm text-gray-600">
                Выберите подходящий банк и условия рассрочки
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Заполните анкету</h3>
              <p className="text-sm text-gray-600">
                Укажите паспортные данные и контактную информацию
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Получите товар</h3>
              <p className="text-sm text-gray-600">
                После одобрения заберите смартфон или дождитесь доставки
              </p>
            </div>
          </div>
        </div>

        {/* Условия одобрения */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Условия одобрения</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary-600" />
                <div>
                  <h3 className="font-semibold">Возраст</h3>
                  <p className="text-gray-600 text-sm">От 18 до 70 лет</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary-600" />
                <div>
                  <h3 className="font-semibold">Гражданство</h3>
                  <p className="text-gray-600 text-sm">Гражданство РФ</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary-600" />
                <div>
                  <h3 className="font-semibold">Стаж работы</h3>
                  <p className="text-gray-600 text-sm">От 3 месяцев на текущем месте</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-primary-600" />
                <div>
                  <h3 className="font-semibold">Доход</h3>
                  <p className="text-gray-600 text-sm">Стабильный подтвержденный доход</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Необходимые документы</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Паспорт РФ</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Второй документ (права, СНИЛС, заграпаспорт)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Справка о доходах (для некоторых банков)</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <h3 className="font-semibold mb-2">💡 Совет</h3>
              <p className="text-sm text-gray-600">
                Для быстрого одобрения рекомендуем иметь при себе справку о доходах или 
                выписку из банка за последние 3 месяца.
              </p>
            </div>
          </div>
        </div>

        {/* Калькулятор */}
        <div className="card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-primary-600" />
            Калькулятор рассрочки
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="label mb-2">Стоимость товара</label>
              <input 
                type="text" 
                className="input w-full" 
                placeholder="119 990 ₽"
                defaultValue="119990"
              />
            </div>
            
            <div>
              <label className="label mb-2">Срок рассрочки</label>
              <select className="input w-full">
                <option value="3">3 месяца</option>
                <option value="6">6 месяцев</option>
                <option value="12" selected>12 месяцев</option>
                <option value="18">18 месяцев</option>
                <option value="24">24 месяца</option>
              </select>
            </div>
            
            <div>
              <label className="label mb-2">Первоначальный взнос</label>
              <input 
                type="text" 
                className="input w-full" 
                placeholder="0 ₽"
                defaultValue="0"
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Результат расчета:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600">Ежемесячный платеж</div>
                <div className="text-2xl font-bold text-primary-600">9 999 ₽</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Общая сумма</div>
                <div className="text-xl font-semibold">119 990 ₽</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Переплата</div>
                <div className="text-xl font-semibold text-green-600">0 ₽</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA секция */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы купить смартфон в рассрочку?</h2>
          <p className="text-lg mb-8 opacity-90">
            Выберите понравившийся смартфон и оформите рассрочку 0% прямо сейчас
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/catalog" className="btn btn-accent px-8 py-3">
              Выбрать смартфон
            </a>
            <button className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3">
              Проконсультироваться
            </button>
          </div>
          
          <p className="text-sm opacity-80 mt-6">
            Или позвоните по телефону <a href="tel:+78001234567" className="font-semibold">8 (800) 123-45-67</a>
          </p>
        </div>
      </div>
    </MainLayout>
  )
} 