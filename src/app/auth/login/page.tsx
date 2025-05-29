'use client'

import MainLayout from '@/components/layout/MainLayout'
import { useState } from 'react'
import { User, Lock, Eye, EyeOff, Phone } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const success = await login(formData.email, formData.password)
      
      if (success) {
        alert('Добро пожаловать!')
        router.push('/profile')
      } else {
        alert('Неверный email или пароль')
      }
    } catch (error) {
      alert('Ошибка входа в систему')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Вход в систему</h1>
            <p className="text-gray-600">
              Войдите в свой аккаунт для совершения покупок
            </p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label mb-2">Email</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                <label className="label mb-2">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input pl-10 pr-10 w-full"
                    placeholder="Ваш пароль"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 mr-2" />
                  <span className="text-sm text-gray-600">Запомнить меня</span>
                </label>
                <Link href="/auth/reset" className="text-sm text-primary-600 hover:text-primary-700">
                  Забыли пароль?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full py-3"
                disabled={loading}
              >
                {loading ? 'Вход...' : 'Войти'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Нет аккаунта?{' '}
                <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium">
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </div>

          {/* Демо-данные */}
          <div className="mt-8 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-800">Демо-аккаунты:</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Администратор:</strong><br />
                Email: admin@phoneshop.ru<br />
                Пароль: admin123
              </div>
              <div>
                <strong>Пользователь:</strong><br />
                Email: user@example.com<br />
                Пароль: user123
              </div>
            </div>
          </div>

          {/* Дополнительные способы входа */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Или войдите через</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="btn btn-secondary py-3">
                <Phone className="w-5 h-5 mr-2" />
                Телефон
              </button>
              <button className="btn btn-secondary py-3">
                <span className="mr-2">👤</span>
                Госуслуги
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 