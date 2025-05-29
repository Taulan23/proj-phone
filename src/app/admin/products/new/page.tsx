'use client'

import MainLayout from '@/components/layout/MainLayout'
import { useState } from 'react'
import { 
  Save, ArrowLeft, Upload, Plus, X, Star, Package, 
  Tag, Smartphone, Image as ImageIcon 
} from 'lucide-react'
import Link from 'next/link'

interface ProductForm {
  name: string
  brand: string
  model: string
  category: string
  price: string
  originalPrice: string
  description: string
  shortDescription: string
  stock: string
  status: 'active' | 'inactive'
  featured: boolean
  tags: string[]
  specifications: { [key: string]: string }
  images: string[]
}

const initialForm: ProductForm = {
  name: '',
  brand: '',
  model: '',
  category: '',
  price: '',
  originalPrice: '',
  description: '',
  shortDescription: '',
  stock: '',
  status: 'active',
  featured: false,
  tags: [],
  specifications: {
    'Диагональ экрана': '',
    'Разрешение экрана': '',
    'Процессор': '',
    'Оперативная память': '',
    'Встроенная память': '',
    'Основная камера': '',
    'Фронтальная камера': '',
    'Операционная система': '',
    'Аккумулятор': '',
    'Вес': '',
    'Цвета': ''
  },
  images: []
}

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'Huawei', 'Realme', 'OPPO', 'Vivo']
const categories = ['Смартфоны', 'Планшеты', 'Аксессуары', 'Наушники', 'Смарт-часы']

export default function NewProductPage() {
  const [formData, setFormData] = useState<ProductForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Новый товар:', formData)
      alert('Товар успешно добавлен!')
      
      // Перенаправление на страницу товаров
      window.location.href = '/admin/products'
    } catch (error) {
      alert('Ошибка при добавлении товара')
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey.trim()]: newSpecValue.trim()
        }
      }))
      setNewSpecKey('')
      setNewSpecValue('')
    }
  }

  const removeSpecification = (key: string) => {
    const { [key]: removed, ...rest } = formData.specifications
    setFormData(prev => ({
      ...prev,
      specifications: rest
    }))
  }

  const updateSpecification = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }))
  }

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/admin/products" 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Добавить новый товар</h1>
            <p className="text-gray-600 mt-1">
              Заполните все необходимые поля для создания товара
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Основная информация */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Основная информация</h3>
                
                <div className="grid gap-4">
                  <div>
                    <label className="label mb-2">Название товара *</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="iPhone 15 Pro 128GB"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label mb-2">Бренд *</label>
                      <select
                        className="input w-full"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        required
                      >
                        <option value="">Выберите бренд</option>
                        {brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label mb-2">Модель</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="15 Pro"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label mb-2">Категория *</label>
                    <select
                      className="input w-full"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label mb-2">Краткое описание</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Флагманский смартфон с тройной камерой"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="label mb-2">Полное описание</label>
                    <textarea
                      className="input w-full"
                      rows={6}
                      placeholder="Подробное описание товара..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Цены и остатки */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Цены и остатки</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="label mb-2">Цена *</label>
                    <div className="relative">
                      <input
                        type="number"
                        className="input w-full pr-8"
                        placeholder="119990"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₽</span>
                    </div>
                  </div>

                  <div>
                    <label className="label mb-2">Старая цена</label>
                    <div className="relative">
                      <input
                        type="number"
                        className="input w-full pr-8"
                        placeholder="129990"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₽</span>
                    </div>
                  </div>

                  <div>
                    <label className="label mb-2">Количество *</label>
                    <div className="relative">
                      <input
                        type="number"
                        className="input w-full pr-12"
                        placeholder="50"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">шт.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Характеристики */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Характеристики</h3>
                
                <div className="space-y-4">
                  {Object.entries(formData.specifications).map(([key, value]) => (
                    <div key={key} className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          className="input w-full"
                          placeholder="Характеристика"
                          value={key}
                          readOnly
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          className="input w-full"
                          placeholder="Значение"
                          value={value}
                          onChange={(e) => updateSpecification(key, e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecification(key)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  {/* Добавить новую характеристику */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="input flex-1"
                      placeholder="Название характеристики"
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                    />
                    <input
                      type="text"
                      className="input flex-1"
                      placeholder="Значение"
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={addSpecification}
                      className="btn btn-secondary"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Теги */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Теги</h3>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="input flex-1"
                      placeholder="Добавить тег"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="btn btn-secondary"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Статус */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Статус товара</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="label mb-2">Статус публикации</label>
                    <select
                      className="input w-full"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    >
                      <option value="active">Активен</option>
                      <option value="inactive">Неактивен</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <div>
                      <span className="font-medium">Рекомендуемый товар</span>
                      <p className="text-sm text-gray-600">Показывать в топе</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Изображения */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Изображения</h3>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-medium text-gray-600 mb-2">Загрузите изображения</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Перетащите файлы сюда или нажмите для выбора
                    </p>
                    <button type="button" className="btn btn-secondary">
                      <Upload className="w-5 h-5 mr-2" />
                      Выбрать файлы
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Рекомендуемый размер: 800x800px. Форматы: JPG, PNG, WebP
                  </p>
                </div>
              </div>

              {/* Действия */}
              <div className="card p-6">
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>Сохранение...</>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Сохранить товар
                      </>
                    )}
                  </button>
                  
                  <Link 
                    href="/admin/products"
                    className="btn btn-secondary w-full text-center"
                  >
                    Отмена
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  )
} 