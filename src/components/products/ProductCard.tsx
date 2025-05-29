'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, CreditCard } from 'lucide-react'
import { formatPrice, calculateDiscount } from '@/utils/format'
import PlaceholderImage from '../ui/PlaceholderImage'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    oldPrice?: number
    images: { url: string; alt?: string }[]
    rating?: number
    reviewsCount?: number
    inStock: boolean
    brand: { name: string }
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.oldPrice ? calculateDiscount(product.price, product.oldPrice) : 0
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  const handleAddToFavorites = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product as any)
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
    alert(`${product.name} добавлен в корзину!`)
  }

  return (
    <div className="card group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square p-4 bg-gray-50">
          {/* Скидка */}
          {discount > 0 && (
            <div className="absolute top-2 left-2 z-10">
              <span className="badge badge-danger">
                -{discount}%
              </span>
            </div>
          )}

          {/* Избранное */}
          <button
            onClick={handleAddToFavorites}
            className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Heart className={`w-5 h-5 transition-colors ${
              isFavorite(product.id) 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400 hover:text-red-500'
            }`} />
          </button>

          {/* Изображение */}
          <div className="relative w-full h-full">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <PlaceholderImage 
                text={product.brand.name}
                className="w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
        </div>
      </Link>

      <div className="p-4">
        {/* Бренд */}
        <p className="text-sm text-gray-500 mb-1">{product.brand.name}</p>

        {/* Название */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Рейтинг */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviewsCount || 0})
            </span>
          </div>
        )}

        {/* Цена */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Действия */}
        <div className="flex gap-2">
          {product.inStock ? (
            <>
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary flex-1 px-4 py-2"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                В корзину
              </button>
              <Link 
                href="/checkout"
                className="btn btn-secondary px-4 py-2 flex items-center justify-center"
              >
                <CreditCard className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <button disabled className="btn btn-secondary flex-1 px-4 py-2">
              Нет в наличии
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 