'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import ProductCard from '@/components/products/ProductCard'
import { useProducts } from '@/contexts/ProductsContext'
import { ChevronDown, Filter, X } from 'lucide-react'

// Данные наушников
const staticProducts = [
  {
    id: 'h1',
    name: 'AirPods Pro 2-го поколения',
    slug: 'airpods-pro-2nd-gen',
    price: 24990,
    oldPrice: 29990,
    images: [{ url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361', alt: 'AirPods Pro 2' }],
    rating: 4.8,
    reviewsCount: 1234,
    inStock: true,
    brand: { name: 'Apple' },
    features: ['Активное шумоподавление', 'Беспроводная зарядка', 'Водозащита IPX4']
  },
  {
    id: 'h2',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    price: 34990,
    oldPrice: 39990,
    images: [{ url: 'https://www.sony.ru/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF', alt: 'Sony WH-1000XM5' }],
    rating: 4.9,
    reviewsCount: 856,
    inStock: true,
    brand: { name: 'Sony' },
    features: ['Активное шумоподавление', 'Bluetooth 5.2', 'Время работы 30 часов']
  },
  {
    id: 'h3',
    name: 'Samsung Galaxy Buds2 Pro',
    slug: 'samsung-galaxy-buds2-pro',
    price: 16990,
    oldPrice: 19990,
    images: [{ url: 'https://images.samsung.com/is/image/samsung/p6pim/levant/2208/gallery/levant-galaxy-buds2-pro-r510-sm-r510nzaaegy-532339068', alt: 'Samsung Galaxy Buds2 Pro' }],
    rating: 4.6,
    reviewsCount: 567,
    inStock: true,
    brand: { name: 'Samsung' },
    features: ['Активное шумоподавление', 'Беспроводная зарядка', 'Водозащита IPX7']
  },
  {
    id: 'h4',
    name: 'Xiaomi Buds 4 Pro',
    slug: 'xiaomi-buds-4-pro',
    price: 8990,
    oldPrice: 12990,
    images: [{ url: 'https://cdn.mos.cms.futurecdn.net/6vQQvQQvQQvQQvQQvQQvQQ.jpg', alt: 'Xiaomi Buds 4 Pro' }],
    rating: 4.4,
    reviewsCount: 234,
    inStock: true,
    brand: { name: 'Xiaomi' },
    features: ['Активное шумоподавление', 'Беспроводная зарядка', 'Время работы 38 часов']
  },
  {
    id: 'h5',
    name: 'JBL Tune 770NC',
    slug: 'jbl-tune-770nc',
    price: 7990,
    images: [{ url: 'https://ru.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw8c8c8c8c/JBL_Tune770NC_ProductImage_Hero_Blue.png', alt: 'JBL Tune 770NC' }],
    rating: 4.3,
    reviewsCount: 189,
    inStock: true,
    brand: { name: 'JBL' },
    features: ['Активное шумоподавление', 'Bluetooth 5.3', 'Время работы 70 часов']
  },
  {
    id: 'h6',
    name: 'Sennheiser Momentum 4 Wireless',
    slug: 'sennheiser-momentum-4',
    price: 29990,
    images: [{ url: 'https://assets.sennheiser.com/img/18106/momentum-4-wireless-black-sq-01-sennheiser.png', alt: 'Sennheiser Momentum 4' }],
    rating: 4.7,
    reviewsCount: 145,
    inStock: false,
    brand: { name: 'Sennheiser' },
    features: ['Адаптивное шумоподавление', 'Bluetooth 5.2', 'Время работы 60 часов']
  }
]

const brands = ['Apple', 'Sony', 'Samsung', 'Xiaomi', 'JBL', 'Sennheiser', 'Bose', 'Audio-Technica']
const priceRanges = [
  { label: 'До 10 000 ₽', min: 0, max: 10000 },
  { label: '10 000 - 20 000 ₽', min: 10000, max: 20000 },
  { label: '20 000 - 30 000 ₽', min: 20000, max: 30000 },
  { label: 'Свыше 30 000 ₽', min: 30000, max: Infinity }
]

export default function HeadphonesPage() {
  const { getProductsByCategory } = useProducts()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof priceRanges[0] | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('popularity')

  // Объединяем статические товары с товарами из админки (категория headphones)
  const adminProducts = getProductsByCategory('headphones')
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
            <li className="text-gray-900">Наушники</li>
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
                  {['Активное шумоподавление', 'Беспроводная зарядка', 'Водозащита IPX4', 'Водозащита IPX7', 'Bluetooth 5.2', 'Bluetooth 5.3'].map(feature => (
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
                <h1 className="text-2xl font-bold">Наушники</h1>
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
                {['Активное шумоподавление', 'Беспроводная зарядка', 'Водозащита IPX4', 'Водозащита IPX7', 'Bluetooth 5.2', 'Bluetooth 5.3'].map(feature => (
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