'use client'

import MainLayout from '@/components/layout/MainLayout'
import { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  })
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают')
      return
    }

    if (!agreements.terms || !agreements.privacy) {
      alert('Необходимо согласиться с условиями использования и политикой конфиденциальности')
      return
    }

    setLoading(true)
    
    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
      
      if (success) {
        alert('Регистрация успешна! Добро пожаловать!')
        router.push('/profile')
      } else {
        alert('Ошибка регистрации. Возможно, пользователь с таким email уже существует.')
      }
    } catch (error) {
      alert('Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Регистрация</h1>
            <p className="text-gray-600">
              Создайте аккаунт для удобных покупок
            </p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label mb-2">Имя</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      className="input pl-10 w-full"
                      placeholder="Иван"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label mb-2">Фамилия</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Иванов"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    className="input pl-10 w-full"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label mb-2">Телефон</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    className="input pl-10 w-full"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label mb-2">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input pl-10 pr-10 w-full"
                    placeholder="Минимум 6 символов"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="label mb-2">Подтвердите пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="input pl-10 pr-10 w-full"
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Соглашения */}
              <div className="space-y-3">
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-primary-600 mt-1 mr-3"
                    checked={agreements.terms}
                    onChange={(e) => setAgreements({ ...agreements, terms: e.target.checked })}
                    required
                  />
                  <span className="text-sm text-gray-600">
                    Я согласен с{' '}
                    <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                      условиями использования
                    </Link>
                  </span>
                </label>
                
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-primary-600 mt-1 mr-3"
                    checked={agreements.privacy}
                    onChange={(e) => setAgreements({ ...agreements, privacy: e.target.checked })}
                    required
                  />
                  <span className="text-sm text-gray-600">
                    Я согласен с{' '}
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                      политикой конфиденциальности
                    </Link>
                  </span>
                </label>
                
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-primary-600 mt-1 mr-3"
                    checked={agreements.marketing}
                    onChange={(e) => setAgreements({ ...agreements, marketing: e.target.checked })}
                  />
                  <span className="text-sm text-gray-600">
                    Согласен получать маркетинговые рассылки
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full py-3"
                disabled={loading}
              >
                {loading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Уже есть аккаунт?{' '}
                <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Войти
                </Link>
              </p>
            </div>
          </div>

          {/* Преимущества регистрации */}
          <div className="mt-8 bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4 text-primary-800">Преимущества регистрации:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-sm">Быстрое оформление заказов</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-sm">История покупок</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-sm">Персональные скидки</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-sm">Программа лояльности</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-sm">Уведомления о новинках</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 