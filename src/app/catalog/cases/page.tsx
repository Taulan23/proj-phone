'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import ProductCard from '@/components/products/ProductCard'
import { useProducts } from '@/contexts/ProductsContext'
import { ChevronDown, Filter, X } from 'lucide-react'

// Данные чехлов
const staticProducts = [
  {
    id: 'c1',
    name: 'Apple Leather Case iPhone 15 Pro',
    slug: 'apple-leather-case-iphone-15-pro',
    price: 6990,
    oldPrice: 7990,
    images: [{ url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT4J3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1693009279145', alt: 'Apple Leather Case' }],
    rating: 4.7,
    reviewsCount: 456,
    inStock: true,
    brand: { name: 'Apple' },
    features: ['Натуральная кожа', 'MagSafe совместимость', 'Защита камеры']
  },
  {
    id: 'c2',
    name: 'Spigen Tough Armor Samsung Galaxy S24',
    slug: 'spigen-tough-armor-galaxy-s24',
    price: 2990,
    oldPrice: 3490,
    images: [{ url: 'https://spigen.com/cdn/shop/products/galaxy-s24-case-tough-armor-black-01_1024x1024.jpg', alt: 'Spigen Tough Armor' }],
    rating: 4.8,
    reviewsCount: 789,
    inStock: true,
    brand: { name: 'Spigen' },
    features: ['Двойная защита', 'Подставка', 'Защита от падений']
  },
  {
    id: 'c3',
    name: 'UAG Pathfinder iPhone 15',
    slug: 'uag-pathfinder-iphone-15',
    price: 4990,
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0024/9803/5810/products/15-pathfinder-se-black-01_1024x1024.jpg', alt: 'UAG Pathfinder' }],
    rating: 4.6,
    reviewsCount: 234,
    inStock: true,
    brand: { name: 'UAG' },
    features: ['Военный стандарт', 'Защита портов', 'Противоударный']
  },
  {
    id: 'c4',
    name: 'Pitaka MagEZ Case Pro iPhone 15 Pro',
    slug: 'pitaka-magez-case-pro',
    price: 8990,
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0024/9803/5810/products/iphone-15-pro-magez-case-pro-black-twill-01_1024x1024.jpg', alt: 'Pitaka MagEZ Case Pro' }],
    rating: 4.9,
    reviewsCount: 167,
    inStock: true,
    brand: { name: 'Pitaka' },
    features: ['Карбоновое волокно', 'Ультратонкий', 'MagSafe совместимость']
  },
  {
    id: 'c5',
    name: 'OtterBox Defender Xiaomi 14',
    slug: 'otterbox-defender-xiaomi-14',
    price: 3990,
    images: [{ url: 'https://www.otterbox.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-masterCatalog_OtterBox/default/dw8c8c8c8c/hi-res/defender-series-case-for-samsung-galaxy-s24-ultra-black-01.jpg', alt: 'OtterBox Defender' }],
    rating: 4.5,
    reviewsCount: 345,
    inStock: true,
    brand: { name: 'OtterBox' },
    features: ['Максимальная защита', 'Защита от пыли', 'Клипса на пояс']
  },
  {
    id: 'c6',
    name: 'Peak Design Mobile Case iPhone 15',
    slug: 'peak-design-mobile-case',
    price: 5990,
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0024/9803/5810/products/iphone-15-everyday-case-charcoal-01_1024x1024.jpg', alt: 'Peak Design Mobile Case' }],
    rating: 4.4,
    reviewsCount: 123,
    inStock: false,
    brand: { name: 'Peak Design' },
    features: ['Модульная система', 'Крепления', 'Экологичные материалы']
  }
]

const brands = ['Apple', 'Spigen', 'UAG', 'Pitaka', 'OtterBox', 'Peak Design', 'Bellroy', 'Nomad']
const priceRanges = [
  { label: 'До 2 000 ₽', min: 0, max: 2000 },
  { label: '2 000 - 5 000 ₽', min: 2000, max: 5000 },
  { label: '5 000 - 8 000 ₽', min: 5000, max: 8000 },
  { label: 'Свыше 8 000 ₽', min: 8000, max: Infinity }
]

export default function CasesPage() {
  const { getProductsByCategory } = useProducts()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof priceRanges[0] | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('popularity')

  // Объединяем статические товары с товарами из админки (категория cases)
  const adminProducts = getProductsByCategory('cases')
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
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.name)) {
      return false
    }

    if (selectedPriceRange) {
      if (product.price < selectedPriceRange.min || product.price > selectedPriceRange.max) {
        return false
      }
    }

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
      default:
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
            <li><a href="/catalog" className="text-gray-500 hover:text-gray-700">Каталог</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Чехлы</li>
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

              {/* Особенности */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Особенности</h3>
                <div className="space-y-2">
                  {['MagSafe совместимость', 'Защита камеры', 'Противоударный', 'Водозащита', 'Подставка', 'Натуральная кожа'].map(feature => (
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
                <h1 className="text-2xl font-bold">Чехлы</h1>
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
            {(selectedBrands.length > 0 || selectedPriceRange || selectedFeatures.length > 0) && (
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
                {selectedFeatures.map(feature => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {feature}
                    <button
                      onClick={() => toggleFeature(feature)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
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
                <button className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded">
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
            
            {/* Дублируем фильтры для мобильной версии */}
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

            <div className="mb-6">
              <h3 className="font-medium mb-3">Цена</h3>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price-mobile"
                      checked={selectedPriceRange?.label === range.label}
                      onChange={() => setSelectedPriceRange(range)}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Особенности</h3>
              <div className="space-y-2">
                {['MagSafe совместимость', 'Защита камеры', 'Противоударный', 'Водозащита', 'Подставка', 'Натуральная кожа'].map(feature => (
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
              className="btn btn-secondary w-full mb-4"
            >
              Сбросить фильтры
            </button>
            
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="btn btn-primary w-full"
            >
              Применить
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  )
} 