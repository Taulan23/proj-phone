'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ProductImage {
  url: string
  alt: string
}

interface ProductBrand {
  name: string
}

interface Product {
  id: string
  name: string
  slug: string
  price: number
  oldPrice?: number
  images: ProductImage[]
  rating: number
  reviewsCount: number
  inStock: boolean
  brand: ProductBrand
  category: string
  description?: string
  specifications?: Record<string, string>
  features?: string[]
  createdAt: string
  updatedAt: string
}

interface ProductsContextType {
  products: Product[]
  getAllProducts: () => Product[]
  getProductById: (productId: string) => Product | undefined
  getProductsByCategory: (category: string) => Product[]
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>
  updateProduct: (productId: string, updates: Partial<Product>) => Promise<void>
  deleteProduct: (productId: string) => Promise<void>
  searchProducts: (query: string) => Product[]
  getTotalProducts: () => number
  getInStockProducts: () => number
  getOutOfStockProducts: () => number
  getProductsByBrand: (brand: string) => Product[]
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

const PRODUCTS_STORAGE_KEY = 'phoneshop_products'

// Демо-товары
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    slug: 'iphone-15-pro-max-256gb',
    price: 129990,
    oldPrice: 139990,
    images: [
      {
        url: 'https://cdn.dxomark.com/wp-content/uploads/medias/post-155689/Apple-iPhone-15-Pro-Max_-blue-titanium_featured-image-packshot-review.jpg',
        alt: 'iPhone 15 Pro Max'
      }
    ],
    rating: 4.8,
    reviewsCount: 234,
    inStock: true,
    brand: { name: 'Apple' },
    category: 'smartphones',
    description: 'Самый продвинутый iPhone с титановым дизайном и процессором A17 Pro.',
    specifications: {
      'Дисплей': '6.7" Super Retina XDR OLED',
      'Процессор': 'Apple A17 Pro',
      'Память': '256GB',
      'Камера': '48MP + 12MP + 12MP',
      'Батарея': '4441 мАч'
    },
    features: ['Face ID', 'Водозащита IP68', 'Беспроводная зарядка', 'MagSafe'],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    price: 119990,
    oldPrice: 134990,
    images: [
      {
        url: 'https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqgin-thumb-539573052',
        alt: 'Samsung Galaxy S24 Ultra'
      }
    ],
    rating: 4.7,
    reviewsCount: 189,
    inStock: true,
    brand: { name: 'Samsung' },
    category: 'smartphones',
    description: 'Флагманский смартфон Samsung с S Pen и AI функциями.',
    specifications: {
      'Дисплей': '6.8" Dynamic AMOLED 2X',
      'Процессор': 'Snapdragon 8 Gen 3',
      'Память': '512GB',
      'Камера': '200MP + 50MP + 12MP + 10MP',
      'Батарея': '5000 мАч'
    },
    features: ['S Pen', 'Водозащита IP68', 'Беспроводная зарядка', '5G'],
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'AirPods Pro (2-го поколения)',
    slug: 'airpods-pro-2nd-gen',
    price: 24990,
    oldPrice: 27990,
    images: [
      {
        url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361',
        alt: 'AirPods Pro 2'
      }
    ],
    rating: 4.9,
    reviewsCount: 456,
    inStock: true,
    brand: { name: 'Apple' },
    category: 'headphones',
    description: 'Беспроводные наушники с активным шумоподавлением нового поколения.',
    specifications: {
      'Тип': 'Внутриканальные',
      'Подключение': 'Bluetooth 5.3',
      'Время работы': 'До 6 часов с ANC',
      'Чип': 'Apple H2'
    },
    features: ['Активное шумоподавление', 'Пространственный звук', 'MagSafe зарядка', 'Водозащита IPX4'],
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Apple MagSafe Charger',
    slug: 'apple-magsafe-charger',
    price: 4990,
    images: [
      {
        url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1603911040000',
        alt: 'Apple MagSafe Charger'
      }
    ],
    rating: 4.6,
    reviewsCount: 123,
    inStock: true,
    brand: { name: 'Apple' },
    category: 'chargers',
    description: 'Беспроводное зарядное устройство с магнитным креплением.',
    specifications: {
      'Мощность': '15W для iPhone',
      'Совместимость': 'iPhone 12 и новее',
      'Длина кабеля': '1 метр',
      'Подключение': 'USB-C'
    },
    features: ['MagSafe совместимость', 'Быстрая зарядка', 'Компактный дизайн'],
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-01-04T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'iPhone 15 Silicone Case',
    slug: 'iphone-15-silicone-case',
    price: 5990,
    images: [
      {
        url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT0X3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1693861933518',
        alt: 'iPhone 15 Silicone Case'
      }
    ],
    rating: 4.4,
    reviewsCount: 89,
    inStock: false,
    brand: { name: 'Apple' },
    category: 'cases',
    description: 'Официальный силиконовый чехол для iPhone 15.',
    specifications: {
      'Материал': 'Силикон',
      'Совместимость': 'iPhone 15',
      'Цвета': 'Несколько вариантов',
      'Особенности': 'MagSafe совместимость'
    },
    features: ['MagSafe совместимость', 'Защита от царапин', 'Мягкая подкладка'],
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-05T00:00:00.000Z'
  }
]

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Загружаем товары из localStorage
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY)
        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts)
          if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
            setProducts(parsedProducts)
            return
          }
        }
        // Если нет сохраненных товаров, используем демо-данные
        setProducts(demoProducts)
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(demoProducts))
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error)
        // В случае ошибки используем демо-данные
        setProducts(demoProducts)
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(demoProducts))
      }
    }

    loadProducts()
  }, [])

  // Сохраняем товары в localStorage при изменении
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
    }
  }, [products])

  const getAllProducts = (): Product[] => {
    return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const getProductById = (productId: string): Product | undefined => {
    return products.find(product => product.id === productId)
  }

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category === category)
  }

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))

      const newProduct: Product = {
        ...productData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setProducts(prev => [newProduct, ...prev])
      return newProduct.id
    } catch (error) {
      console.error('Ошибка добавления товара:', error)
      throw new Error('Не удалось добавить товар')
    }
  }

  const updateProduct = async (productId: string, updates: Partial<Product>): Promise<void> => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))

      setProducts(prev => prev.map(product => 
        product.id === productId 
          ? { ...product, ...updates, updatedAt: new Date().toISOString() }
          : product
      ))
    } catch (error) {
      console.error('Ошибка обновления товара:', error)
      throw new Error('Не удалось обновить товар')
    }
  }

  const deleteProduct = async (productId: string): Promise<void> => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))

      setProducts(prev => prev.filter(product => product.id !== productId))
    } catch (error) {
      console.error('Ошибка удаления товара:', error)
      throw new Error('Не удалось удалить товар')
    }
  }

  const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase()
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brand.name.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      (product.description && product.description.toLowerCase().includes(lowercaseQuery))
    )
  }

  const getTotalProducts = (): number => {
    return products.length
  }

  const getInStockProducts = (): number => {
    return products.filter(product => product.inStock).length
  }

  const getOutOfStockProducts = (): number => {
    return products.filter(product => !product.inStock).length
  }

  const getProductsByBrand = (brand: string): Product[] => {
    return products.filter(product => product.brand.name === brand)
  }

  const value = {
    products,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getTotalProducts,
    getInStockProducts,
    getOutOfStockProducts,
    getProductsByBrand
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
} 