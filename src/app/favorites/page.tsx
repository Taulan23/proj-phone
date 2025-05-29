'use client'

import MainLayout from '@/components/layout/MainLayout'
import ProductCard from '@/components/products/ProductCard'
import { useFavorites } from '@/contexts/FavoritesContext'
import { Heart, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()

  const handleClearAll = () => {
    if (confirm('Удалить все товары из избранного?')) {
      clearFavorites()
    }
  }

  if (favorites.length === 0) {
    return (
      <MainLayout>
        <div className="container py-16">
          <div className="text-center">
            <Heart className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <h1 className="text-2xl font-bold mb-4">Избранное пусто</h1>
            <p className="text-gray-600 mb-8">Добавьте товары в избранное, чтобы не потерять их</p>
            <Link href="/catalog" className="btn btn-primary px-8 py-3">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="text-gray-500 hover:text-gray-700">Главная</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Избранное</li>
          </ol>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Избранное ({favorites.length})</h1>
          <button
            onClick={handleClearAll}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Очистить все
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
} 