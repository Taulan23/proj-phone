'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import ProductCard from '@/components/products/ProductCard'
import { useProducts } from '@/contexts/ProductsContext'
import { ChevronDown, Filter, X } from 'lucide-react'

// Данные аксессуаров
const staticProducts = [
  {
    id: 'a1',
    name: 'Apple MagSafe Wallet',
    slug: 'apple-magsafe-wallet',
    price: 5990,
    oldPrice: 6990,
    images: [{ url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHLT3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1603237659000', alt: 'Apple MagSafe Wallet' }],
    rating: 4.5,
    reviewsCount: 678,
    inStock: true,
    brand: { name: 'Apple' },
    features: ['MagSafe совместимость', 'Натуральная кожа', 'Держатель карт']
  },
  {
    id: 'a2',
    name: 'PopSocket PopGrip',
    slug: 'popsocket-popgrip',
    price: 1990,
    images: [{ url: 'https://cdn.shopify.com/s/files/1/0024/9803/5810/products/popsockets-popgrip-black-01_1024x1024.jpg', alt: 'PopSocket PopGrip' }],
    rating: 4.3,
    reviewsCount: 1234,
    inStock: true,
    brand: { name: 'PopSocket' },
    features: ['Подставка', 'Удобный хват', 'Складной']
  },
  {
    id: 'a3',
    name: 'Anker PowerCore 10000',
    slug: 'anker-powercore-10000',
    price: 3990,
    oldPrice: 4490,
    images: [{ url: 'https://d2eebagvwr542c.cloudfront.net/catalog/product/cache/889dd6d27ce5311c64c0e8e2d9c6b5e5/a/1/a1263h11_td01.jpg', alt: 'Anker PowerCore 10000' }],
    rating: 4.7,
    reviewsCount: 567,
    inStock: true,
    brand: { name: 'Anker' },
    features: ['Быстрая зарядка', 'Компактный', 'LED индикатор']
  },
  {
    id: 'a4',
    name: 'Belkin Car Mount',
    slug: 'belkin-car-mount',
    price: 2490,
    images: [{ url: 'https://www.belkin.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-masterCatalog_Belkin/default/dw8c8c8c8c/hi-res/belkin-car-mount-magnetic-01.jpg', alt: 'Belkin Car Mount' }],
    rating: 4.4,
    reviewsCount: 345,
    inStock: true,
    brand: { name: 'Belkin' },
    features: ['Магнитное крепление', 'Поворот 360°', 'Вентиляционная решетка']
  },
  {
    id: 'a5',
    name: 'Logitech Blue Yeti Nano',
    slug: 'logitech-blue-yeti-nano',
    price: 12990,
    images: [{ url: 'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,f_auto,q_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/blue-yeti-nano/blue-yeti-nano-gallery-1.png', alt: 'Logitech Blue Yeti Nano' }],
    rating: 4.8,
    reviewsCount: 234,
    inStock: true,
    brand: { name: 'Logitech' },
    features: ['USB микрофон', 'Студийное качество', 'Plug & Play']
  },
  {
    id: 'a6',
    name: 'Xiaomi Mi Band 8',
    slug: 'xiaomi-mi-band-8',
    price: 4990,
    oldPrice: 5990,
    images: [{ url: 'https://cdn.mos.cms.futurecdn.net/6vQQvQQvQQvQQvQQvQQvQQ.jpg', alt: 'Xiaomi Mi Band 8' }],
    rating: 4.6,
    reviewsCount: 890,
    inStock: false,
    brand: { name: 'Xiaomi' },
    features: ['Фитнес-трекер', 'Водозащита 5ATM', 'Время работы 16 дней']
  }
]

const brands = ['Apple', 'PopSocket', 'Anker', 'Belkin', 'Logitech', 'Xiaomi', 'Samsung', 'Moft']
const priceRanges = [
  { label: 'До 3 000 ₽', min: 0, max: 3000 },
  { label: '3 000 - 7 000 ₽', min: 3000, max: 7000 },
  { label: '7 000 - 15 000 ₽', min: 7000, max: 15000 },
  { label: 'Свыше 15 000 ₽', min: 15000, max: Infinity }
]

export default function AccessoriesPage() {
  const { getProductsByCategory } = useProducts()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof priceRanges[0] | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('popularity')

  // Объединяем статические товары с товарами из админки (категория accessories)
  const adminProducts = getProductsByCategory('accessories')
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
            <li className="text-gray-900">Аксессуары</li>
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
                  {['MagSafe совместимость', 'Быстрая зарядка', 'Водозащита', 'Подставка', 'Беспроводная зарядка', 'Компактный'].map(feature => (
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
                <h1 className="text-2xl font-bold">Аксессуары</h1>
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
                {['MagSafe совместимость', 'Быстрая зарядка', 'Водозащита', 'Подставка', 'Беспроводная зарядка', 'Компактный'].map(feature => (
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