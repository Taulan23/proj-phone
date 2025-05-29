'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import ProductCard from '@/components/products/ProductCard'
import { useProducts } from '@/contexts/ProductsContext'
import { ChevronDown, Filter, X } from 'lucide-react'

// Данные товаров с реальными изображениями
const staticProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    slug: 'iphone-15-pro-max-256gb',
    price: 129990,
    oldPrice: 139990,
    images: [{ url: 'https://www.dxomark.com/wp-content/uploads/medias/post-155689/Apple-iPhone-15-Pro-Max_-blue-titanium_featured-image-packshot-review.jpg', alt: 'iPhone 15 Pro Max' }],
    rating: 4.8,
    reviewsCount: 234,
    inStock: true,
    brand: { name: 'Apple' },
    features: ['5G', 'NFC', 'Беспроводная зарядка']
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    price: 119990,
    oldPrice: 134990,
    images: [{ url: 'https://images.samsung.com/is/image/samsung/p6pim/levant/2401/gallery/levant-galaxy-s24-ultra-s928-sm-s928bztuegy-thumb-539573052', alt: 'Samsung Galaxy S24 Ultra' }],
    rating: 4.7,
    reviewsCount: 189,
    inStock: true,
    brand: { name: 'Samsung' },
    features: ['5G', 'NFC', 'Беспроводная зарядка']
  },
  {
    id: '3',
    name: 'Xiaomi 14 Pro 512GB',
    slug: 'xiaomi-14-pro-512gb',
    price: 79990,
    oldPrice: 89990,
    images: [{ url: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-pro-1.jpg', alt: 'Xiaomi 14 Pro' }],
    rating: 4.6,
    reviewsCount: 156,
    inStock: true,
    brand: { name: 'Xiaomi' },
    features: ['5G', 'NFC', 'Беспроводная зарядка']
  },
  {
    id: '4',
    name: 'Google Pixel 8 Pro 256GB',
    slug: 'google-pixel-8-pro-256gb',
    price: 89990,
    images: [{ url: 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-1.jpg', alt: 'Google Pixel 8 Pro' }],
    rating: 4.5,
    reviewsCount: 98,
    inStock: true,
    brand: { name: 'Google' },
    features: ['5G', 'NFC', 'Беспроводная зарядка']
  },
  {
    id: '5',
    name: 'OnePlus 12 256GB',
    slug: 'oneplus-12-256gb',
    price: 69990,
    images: [{ url: 'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-1.jpg', alt: 'OnePlus 12' }],
    rating: 4.4,
    reviewsCount: 67,
    inStock: true,
    brand: { name: 'OnePlus' },
    features: ['5G', 'NFC', 'Беспроводная зарядка']
  },
  {
    id: '6',
    name: 'Honor Magic 6 Pro 512GB',
    slug: 'honor-magic-6-pro-512gb',
    price: 84990,
    images: [{ url: 'https://fdn2.gsmarena.com/vv/pics/honor/honor-magic6-pro-1.jpg', alt: 'Honor Magic 6 Pro' }],
    rating: 4.5,
    reviewsCount: 45,
    inStock: false,
    brand: { name: 'Honor' },
    features: ['5G', 'NFC', 'Беспроводная зарядка']
  }
]

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'Honor', 'Realme', 'OPPO']
const priceRanges = [
  { label: 'До 50 000 ₽', min: 0, max: 50000 },
  { label: '50 000 - 100 000 ₽', min: 50000, max: 100000 },
  { label: '100 000 - 150 000 ₽', min: 100000, max: 150000 },
  { label: 'Свыше 150 000 ₽', min: 150000, max: Infinity }
]

export default function CatalogPage() {
  const { getProductsByCategory } = useProducts()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof priceRanges[0] | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('popularity')

  // Объединяем статические товары с товарами из админки (категория smartphones)
  const adminProducts = getProductsByCategory('smartphones')
  const products = [...staticProducts, ...adminProducts]

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedPriceRange(null)
    setSelectedFeatures([])
  }

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    // Фильтр по брендам
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.name)) {
      return false
    }

    // Фильтр по цене
    if (selectedPriceRange) {
      if (product.price < selectedPriceRange.min || product.price > selectedPriceRange.max) {
        return false
      }
    }

    // Фильтр по особенностям
    if (selectedFeatures.length > 0) {
      const hasAllFeatures = selectedFeatures.every(feature => 
        product.features?.includes(feature) || false
      )
      if (!hasAllFeatures) {
        return false
      }
    }

    return true
  })

  // Сортировка товаров
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
        return a.name.localeCompare(b.name)
      default: // popularity
        return b.reviewsCount - a.reviewsCount
    }
  })

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Главная</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Каталог</li>
          </ol>
        </nav>

        <div className="flex gap-8">
          {/* Фильтры - десктоп */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Фильтры</h2>
              
              {/* Бренды */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Бренд</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-primary-600 rounded"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Цена */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Цена</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange?.label === range.label}
                        onChange={() => setSelectedPriceRange(range)}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Дополнительные фильтры */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Особенности</h3>
                <div className="space-y-2">
                  {['5G', 'NFC', 'Беспроводная зарядка'].map(feature => (
                    <label key={feature} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                        className="w-4 h-4 text-primary-600 rounded" 
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={clearFilters}
                className="btn btn-secondary w-full"
              >
                Сбросить фильтры
              </button>
            </div>
          </aside>

          {/* Основной контент */}
          <div className="flex-1">
            {/* Заголовок и сортировка */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Смартфоны</h1>
                <p className="text-gray-600">Найдено {sortedProducts.length} товаров</p>
              </div>
              <div className="flex items-center gap-4">
                {/* Мобильные фильтры */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden btn btn-secondary px-4 py-2"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                </button>

                {/* Сортировка */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 text-sm"
                  >
                    <option value="popularity">По популярности</option>
                    <option value="price-asc">Сначала дешевые</option>
                    <option value="price-desc">Сначала дорогие</option>
                    <option value="rating">По рейтингу</option>
                    <option value="name">По названию</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Активные фильтры */}
            {(selectedBrands.length > 0 || selectedPriceRange) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBrands.map(brand => (
                  <span
                    key={brand}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {brand}
                    <button
                      onClick={() => toggleBrand(brand)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedPriceRange && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {selectedPriceRange.label}
                    <button
                      onClick={() => setSelectedPriceRange(null)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Список товаров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Пагинация */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-2">
                <button className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded">
                  Назад
                </button>
                <button className="px-3 py-2 bg-primary-600 text-white rounded">1</button>
                <button className="px-3 py-2 hover:bg-gray-100 rounded">2</button>
                <button className="px-3 py-2 hover:bg-gray-100 rounded">3</button>
                <span className="px-3 py-2">...</span>
                <button className="px-3 py-2 hover:bg-gray-100 rounded">10</button>
                <button className="px-3 py-2 hover:bg-gray-100 rounded">
                  Вперед
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильные фильтры */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Фильтры</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Здесь дублируется содержимое фильтров */}
          </div>
        </div>
      )}
    </MainLayout>
  )
} 