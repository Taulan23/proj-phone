'use client'

import MainLayout from '@/components/layout/MainLayout'
import { CreditCard, Smartphone, Building, Shield, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function PaymentPage() {
  const paymentMethods = [
    {
      id: 'card',
      name: 'Банковские карты',
      icon: <CreditCard className="w-8 h-8" />,
      description: 'Visa, MasterCard, МИР',
      commission: 'Без комиссии',
      time: 'Мгновенно'
    },
    {
      id: 'sbp',
      name: 'Система быстрых платежей',
      icon: <Smartphone className="w-8 h-8" />,
      description: 'Оплата по номеру телефона',
      commission: 'Без комиссии',
      time: 'Мгновенно'
    },
    {
      id: 'bank',
      name: 'Банковский перевод',
      icon: <Building className="w-8 h-8" />,
      description: 'Перевод на расчетный счет',
      commission: 'По тарифам банка',
      time: '1-3 рабочих дня'
    }
  ]

  const securityFeatures = [
    'SSL-шифрование данных',
    'Соответствие стандарту PCI DSS',
    'Двухфакторная аутентификация',
    'Мониторинг транзакций 24/7'
  ]

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="text-gray-500 hover:text-gray-700">Главная</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Оплата</li>
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Способы оплаты</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите удобный способ оплаты. Все платежи защищены современными системами безопасности
          </p>
        </div>

        {/* Способы оплаты */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {paymentMethods.map((method) => (
            <div key={method.id} className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-primary-600 mb-4 flex justify-center">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{method.name}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Комиссия:</span>
                  <span className="font-medium">{method.commission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Время зачисления:</span>
                  <span className="font-medium">{method.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Безопасность */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold">Безопасность платежей</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Процесс оплаты */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Как происходит оплата</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Выбор товара',
                description: 'Добавьте товары в корзину и перейдите к оформлению заказа'
              },
              {
                step: '2',
                title: 'Заполнение данных',
                description: 'Укажите контактную информацию и адрес доставки'
              },
              {
                step: '3',
                title: 'Выбор способа оплаты',
                description: 'Выберите удобный способ оплаты из доступных вариантов'
              },
              {
                step: '4',
                title: 'Подтверждение',
                description: 'Подтвердите заказ и получите уведомление об оплате'
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Часто задаваемые вопросы */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Часто задаваемые вопросы</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                question: 'Безопасно ли платить картой на сайте?',
                answer: 'Да, все платежи защищены SSL-шифрованием и соответствуют международным стандартам безопасности PCI DSS.'
              },
              {
                question: 'Можно ли вернуть деньги за товар?',
                answer: 'Да, возврат денежных средств осуществляется в течение 7-14 рабочих дней на карту, с которой была произведена оплата.'
              },
              {
                question: 'Взимается ли комиссия за оплату?',
                answer: 'Оплата банковскими картами и через СБП происходит без комиссии. Комиссия может взиматься только банком-эмитентом карты.'
              },
              {
                question: 'Что делать, если платеж не прошел?',
                answer: 'Обратитесь в службу поддержки по телефону 8 (800) 123-45-67 или напишите на support@phoneshop.ru'
              }
            ].map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Поддержка */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Нужна помощь?</h2>
          <p className="text-gray-600 mb-6">
            Наша служба поддержки работает круглосуточно и готова помочь с любыми вопросами по оплате
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+78001234567" className="btn btn-primary">
              Позвонить: 8 (800) 123-45-67
            </a>
            <a href="mailto:support@phoneshop.ru" className="btn btn-secondary">
              Написать: support@phoneshop.ru
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 