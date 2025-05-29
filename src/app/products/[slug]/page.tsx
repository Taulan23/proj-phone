'use client'

import { useState } from 'react'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'
import ProductCard from '@/components/products/ProductCard'
import { formatPrice, calculateDiscount } from '@/utils/format'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Shield, 
  Package,
  ChevronRight,
  Check,
  X
} from 'lucide-react'

// Временные данные
const product = {
  id: '1',
  name: 'iPhone 15 Pro Max 256GB',
  slug: 'iphone-15-pro-max-256gb',
  price: 129990,
  oldPrice: 139990,
  sku: 'APL-IP15PM-256',
  inStock: true,
  stockQuantity: 15,
  brand: { name: 'Apple' },
  category: { name: 'Смартфоны', slug: 'smartphones' },
  rating: 4.8,
  reviewsCount: 234,
  description: 'iPhone 15 Pro Max — это вершина инноваций Apple. Титановый корпус aerospace-grade делает его невероятно прочным и легким. Процессор A17 Pro обеспечивает непревзойденную производительность.',
  images: [
    { url: '/images/products/iphone15-1.jpg', alt: 'iPhone 15 Pro Max вид спереди' },
    { url: '/images/products/iphone15-2.jpg', alt: 'iPhone 15 Pro Max вид сзади' },
    { url: '/images/products/iphone15-3.jpg', alt: 'iPhone 15 Pro Max камера' },
    { url: '/images/products/iphone15-4.jpg', alt: 'iPhone 15 Pro Max в руке' },
  ],
  specifications: [
    { group: 'Основные', items: [
      { name: 'Бренд', value: 'Apple' },
      { name: 'Модель', value: 'iPhone 15 Pro Max' },
      { name: 'Год выпуска', value: '2023' },
      { name: 'Операционная система', value: 'iOS 17' },
    ]},
    { group: 'Экран', items: [
      { name: 'Диагональ', value: '6.7"' },
      { name: 'Разрешение', value: '2796×1290' },
      { name: 'Тип матрицы', value: 'OLED Super Retina XDR' },
      { name: 'Частота обновления', value: '120 Гц' },
    ]},
    { group: 'Процессор и память', items: [
      { name: 'Процессор', value: 'Apple A17 Pro' },
      { name: 'Оперативная память', value: '8 ГБ' },
      { name: 'Встроенная память', value: '256 ГБ' },
    ]},
    { group: 'Камера', items: [
      { name: 'Основная камера', value: '48 Мп + 12 Мп + 12 Мп' },
      { name: 'Фронтальная камера', value: '12 Мп' },
      { name: 'Оптическая стабилизация', value: 'Есть' },
      { name: 'Оптический зум', value: '5x' },
    ]},
  ],
  features: ['5G', 'NFC', 'Беспроводная зарядка', 'Защита IP68', 'Face ID'],
}

const relatedProducts = [
  {
    id: '2',
    name: 'iPhone 15 Pro 256GB',
    slug: 'iphone-15-pro-256gb',
    price: 119990,
    images: [{ url: '/images/products/iphone15-pro.jpg' }],
    rating: 4.7,
    reviewsCount: 189,
    inStock: true,
    brand: { name: 'Apple' }
  },
  {
    id: '3',
    name: 'AirPods Pro 2',
    slug: 'airpods-pro-2',
    price: 24990,
    images: [{ url: '/images/products/airpods-pro.jpg' }],
    rating: 4.8,
    reviewsCount: 456,
    inStock: true,
    brand: { name: 'Apple' }
  },
  {
    id: '4',
    name: 'Чехол MagSafe для iPhone 15 Pro Max',
    slug: 'magsafe-case-iphone-15-pro-max',
    price: 5990,
    images: [{ url: '/images/products/magsafe-case.jpg' }],
    rating: 4.5,
    reviewsCount: 78,
    inStock: true,
    brand: { name: 'Apple' }
  },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [quantity, setQuantity] = useState(1)

  const discount = product.oldPrice ? calculateDiscount(product.price, product.oldPrice) : 0

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Главная</a></li>
            <li className="text-gray-400">/</li>
            <li><a href="/catalog" className="text-gray-500 hover:text-gray-700">Каталог</a></li>
            <li className="text-gray-400">/</li>
            <li><a href={`/catalog/${product.category.slug}`} className="text-gray-500 hover:text-gray-700">{product.category.name}</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Галерея изображений */}
          <div>
            <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt}
                fill
                className="object-contain"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="badge badge-danger">-{discount}%</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Информация о товаре */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Артикул: {product.sku}</p>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm">{product.rating}</span>
                </div>
                <a href="#reviews" className="text-sm text-primary-600 hover:underline">
                  {product.reviewsCount} отзывов
                </a>
              </div>
            </div>

            {/* Цена */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
              {product.inStock ? (
                <p className="text-green-600 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  В наличии ({product.stockQuantity} шт.)
                </p>
              ) : (
                <p className="text-red-600 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  Нет в наличии
                </p>
              )}
            </div>

            {/* Основные характеристики */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Основные характеристики</h3>
              <dl className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Диагональ экрана</dt>
                  <dd className="font-medium">6.7"</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Память</dt>
                  <dd className="font-medium">256 ГБ</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Процессор</dt>
                  <dd className="font-medium">Apple A17 Pro</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Камера</dt>
                  <dd className="font-medium">48 Мп + 12 Мп + 12 Мп</dd>
                </div>
              </dl>
            </div>

            {/* Особенности */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Особенности</h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span key={feature} className="badge badge-primary">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Действия */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button className="btn btn-primary flex-1 py-3">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Добавить в корзину
                </button>
                <button className="p-3 border rounded-lg hover:bg-gray-100">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <button className="btn btn-accent w-full py-3">
                Купить в 1 клик
              </button>
              <button className="btn btn-secondary w-full py-3">
                <CreditCard className="w-5 h-5 mr-2" />
                Купить в кредит от 5 416 ₽/мес
              </button>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                <p className="text-sm">Бесплатная доставка</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                <p className="text-sm">Гарантия 1 год</p>
              </div>
              <div className="text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                <p className="text-sm">Возврат 14 дней</p>
              </div>
            </div>
          </div>
        </div>

        {/* Табы с дополнительной информацией */}
        <div className="mb-12">
          <div className="border-b">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'description'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent hover:text-gray-700'
                }`}
              >
                Описание
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'specifications'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent hover:text-gray-700'
                }`}
              >
                Характеристики
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent hover:text-gray-700'
                }`}
              >
                Отзывы ({product.reviewsCount})
              </button>
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <h3>Преимущества iPhone 15 Pro Max</h3>
                <ul>
                  <li>Титановый корпус - прочный и легкий</li>
                  <li>Процессор A17 Pro с 3-нм техпроцессом</li>
                  <li>Улучшенная система камер с 5-кратным оптическим зумом</li>
                  <li>Action Button для быстрого доступа к функциям</li>
                  <li>USB-C с поддержкой USB 3 для быстрой передачи данных</li>
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-8">
                {product.specifications.map((group) => (
                  <div key={group.group}>
                    <h3 className="text-lg font-semibold mb-4">{group.group}</h3>
                    <dl className="space-y-2">
                      {group.items.map((spec) => (
                        <div key={spec.name} className="flex justify-between py-2 border-b">
                          <dt className="text-gray-600">{spec.name}</dt>
                          <dd className="font-medium">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div id="reviews">
                <p className="text-gray-500">Отзывы будут добавлены позже</p>
              </div>
            )}
          </div>
        </div>

        {/* Похожие товары */}
        <section>
          <h2 className="text-2xl font-bold mb-6">С этим товаром покупают</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
} 