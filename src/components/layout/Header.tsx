'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart,
  Phone,
  MapPin,
  ChevronDown
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, isLoggedIn, logout, isAdmin } = useAuth()
  const { getTotalItems } = useCart()
  const { getFavoritesCount } = useFavorites()

  const categories = [
    { name: 'Смартфоны', href: '/catalog/smartphones' },
    { name: 'Аксессуары', href: '/catalog/accessories' },
    { name: 'Чехлы', href: '/catalog/cases' },
    { name: 'Наушники', href: '/catalog/headphones' },
    { name: 'Зарядные устройства', href: '/catalog/chargers' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Верхняя панель */}
      <div className="bg-gray-100 py-2">
        <div className="container">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Москва</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <a href="tel:+78001234567" className="hover:text-primary-600">
                  8 (800) 123-45-67
                </a>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/stores" className="hover:text-primary-600">Магазины</Link>
              <Link href="/delivery" className="hover:text-primary-600">Доставка</Link>
              <Link href="/payment" className="hover:text-primary-600">Оплата</Link>
              <Link href="/about" className="hover:text-primary-600">О компании</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Основная навигация */}
      <div className="py-4">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            {/* Логотип */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">PhoneShop</h1>
            </Link>

            {/* Каталог */}
            <div className="hidden lg:block">
              <div className="relative group">
                <button className="btn btn-primary px-6 py-2.5 flex items-center gap-2">
                  <Menu className="w-5 h-5" />
                  <span>Каталог</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <nav className="py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block px-4 py-2 hover:bg-gray-100 hover:text-primary-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Поиск */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <form className="relative">
                <input
                  type="search"
                  placeholder="Поиск товаров..."
                  className="input w-full pl-10 pr-4"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary px-4 py-1.5"
                >
                  Найти
                </button>
              </form>
            </div>

            {/* Действия пользователя */}
            <div className="flex items-center gap-2">
              {/* Поиск на мобильных */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Search className="w-6 h-6" />
              </button>

              {/* Избранное */}
              <Link href="/favorites" className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Heart className="w-6 h-6" />
                {getFavoritesCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getFavoritesCount()}
                  </span>
                )}
              </Link>

              {/* Корзина */}
              <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative">
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* Профиль */}
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <User className="w-6 h-6" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <nav className="py-2">
                    {isLoggedIn ? (
                      <>
                        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 hover:text-primary-600">
                          Мой профиль
                        </Link>
                        <Link href="/favorites" className="block px-4 py-2 hover:bg-gray-100 hover:text-primary-600">
                          Избранное
                        </Link>
                        {isAdmin() && (
                          <>
                            <hr className="my-2" />
                            <Link href="/admin" className="block px-4 py-2 hover:bg-gray-100 hover:text-primary-600 text-red-600">
                              Админ-панель
                            </Link>
                          </>
                        )}
                        <hr className="my-2" />
                        <button 
                          onClick={() => {
                            if (confirm('Вы уверены, что хотите выйти?')) {
                              logout()
                              window.location.href = '/auth/login'
                            }
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-primary-600 text-red-600"
                        >
                          Выйти
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/login" className="block px-4 py-2 hover:bg-gray-100 hover:text-primary-600">
                          Войти
                        </Link>
                        <Link href="/auth/register" className="block px-4 py-2 hover:bg-gray-100 hover:text-primary-600">
                          Регистрация
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
              </div>

              {/* Мобильное меню */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Мобильный поиск */}
          {isSearchOpen && (
            <div className="md:hidden mt-4 animate-slide-down">
              <form className="relative">
                <input
                  type="search"
                  placeholder="Поиск товаров..."
                  className="input w-full pl-10 pr-4"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="lg:hidden border-t animate-slide-down">
          <nav className="container py-4">
            <div className="space-y-2">
              <div>
                <p className="font-semibold mb-2">Каталог</p>
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="block py-2 pl-4 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="pt-4 border-t">
                <Link href="/stores" className="block py-2 hover:text-primary-600">Магазины</Link>
                <Link href="/delivery" className="block py-2 hover:text-primary-600">Доставка</Link>
                <Link href="/payment" className="block py-2 hover:text-primary-600">Оплата</Link>
                <Link href="/about" className="block py-2 hover:text-primary-600">О компании</Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
} 