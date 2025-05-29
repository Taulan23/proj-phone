'use client'

import MainLayout from '@/components/layout/MainLayout'
import { useState } from 'react'
import { 
  Plus, Edit, Trash2, Search, Filter, Eye, Package, 
  Star, TrendingUp, AlertCircle, Check 
} from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  category: string
  stock: number
  status: 'active' | 'inactive' | 'out_of_stock'
  rating: number
  sales: number
  image?: string
  featured: boolean
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro 128GB',
    brand: 'Apple',
    price: 119990,
    originalPrice: 129990,
    category: 'Смартфоны',
    stock: 15,
    status: 'active',
    rating: 4.8,
    sales: 45,
    featured: true
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 139990,
    category: 'Смартфоны',
    stock: 8,
    status: 'active',
    rating: 4.7,
    sales: 32,
    featured: true
  },
  {
    id: 3,
    name: 'Xiaomi 13T Pro',
    brand: 'Xiaomi',
    price: 45990,
    originalPrice: 49990,
    category: 'Смартфоны',
    stock: 23,
    status: 'active',
    rating: 4.5,
    sales: 28,
    featured: false
  },
  {
    id: 4,
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 89990,
    category: 'Смартфоны',
    stock: 0,
    status: 'out_of_stock',
    rating: 4.6,
    sales: 15,
    featured: false
  },
  {
    id: 5,
    name: 'OnePlus 11',
    brand: 'OnePlus',
    price: 59990,
    category: 'Смартфоны',
    stock: 12,
    status: 'inactive',
    rating: 4.4,
    sales: 8,
    featured: false
  }
]

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'out_of_stock': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активен'
      case 'inactive': return 'Неактивен'
      case 'out_of_stock': return 'Нет в наличии'
      default: return 'Неизвестно'
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-600', text: 'Нет в наличии' }
    if (stock <= 5) return { color: 'text-orange-600', text: 'Мало в наличии' }
    return { color: 'text-green-600', text: 'В наличии' }
  }

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'activate':
        setProducts(prev => prev.map(p => 
          selectedProducts.includes(p.id) ? { ...p, status: 'active' as const } : p
        ))
        break
      case 'deactivate':
        setProducts(prev => prev.map(p => 
          selectedProducts.includes(p.id) ? { ...p, status: 'inactive' as const } : p
        ))
        break
      case 'delete':
        if (confirm(`Удалить ${selectedProducts.length} товаров?`)) {
          setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)))
        }
        break
    }
    setSelectedProducts([])
  }

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Управление товарами</h1>
            <p className="text-gray-600 mt-1">
              Всего товаров: {products.length} | Активных: {products.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/products/new" className="btn btn-primary">
              <Plus className="w-5 h-5 mr-2" />
              Добавить товар
            </Link>
            <button className="btn btn-secondary">
              <Package className="w-5 h-5 mr-2" />
              Импорт
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего товаров</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Активных</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Нет в наличии</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.stock === 0).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Топ товаров</p>
                <p className="text-2xl font-bold text-purple-600">
                  {products.filter(p => p.featured).length}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск по названию или бренду..."
                  className="input pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Все статусы</option>
                <option value="active">Активные</option>
                <option value="inactive">Неактивные</option>
                <option value="out_of_stock">Нет в наличии</option>
              </select>
              
              <button className="btn btn-secondary">
                <Filter className="w-5 h-5 mr-2" />
                Фильтры
              </button>
            </div>
          </div>

          {/* Bulk actions */}
          {selectedProducts.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">
                  Выбрано товаров: {selectedProducts.length}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleBulkAction('activate')}
                    className="btn btn-sm btn-secondary"
                  >
                    Активировать
                  </button>
                  <button 
                    onClick={() => handleBulkAction('deactivate')}
                    className="btn btn-sm btn-secondary"
                  >
                    Деактивировать
                  </button>
                  <button 
                    onClick={() => handleBulkAction('delete')}
                    className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products table */}
        <div className="card p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left py-3 px-4">Товар</th>
                  <th className="text-left py-3 px-4">Цена</th>
                  <th className="text-left py-3 px-4">Остаток</th>
                  <th className="text-left py-3 px-4">Статус</th>
                  <th className="text-left py-3 px-4">Продажи</th>
                  <th className="text-left py-3 px-4">Рейтинг</th>
                  <th className="text-left py-3 px-4">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock)
                  return (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-2">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="rounded"
                        />
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            📱
                          </div>
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.brand}</p>
                            {product.featured && (
                              <span className="inline-flex items-center gap-1 text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full mt-1">
                                <Star className="w-3 h-3" />
                                Топ
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div>
                          <span className="font-semibold">{product.price.toLocaleString('ru-RU')} ₽</span>
                          {product.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {product.originalPrice.toLocaleString('ru-RU')} ₽
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div>
                          <span className="font-medium">{product.stock} шт.</span>
                          <div className={`text-sm ${stockStatus.color}`}>
                            {stockStatus.text}
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                          {getStatusText(product.status)}
                        </span>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{product.sales}</span>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{product.rating}</span>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Link 
                            href={`/products/${product.id}`}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            title="Посмотреть товар"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link 
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                            title="Редактировать"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => {
                              if (confirm('Удалить этот товар?')) {
                                setProducts(prev => prev.filter(p => p.id !== product.id))
                              }
                            }}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            title="Удалить"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Товары не найдены
              </h3>
              <p className="text-gray-500 mb-6">
                Попробуйте изменить поисковый запрос или фильтры
              </p>
              <Link href="/admin/products/new" className="btn btn-primary">
                Добавить первый товар
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
} 