export interface CartItem {
  id: string
  productId: string
  product: {
    id: string
    name: string
    price: number
    images: { url: string; alt?: string }[]
  }
  quantity: number
}

export interface FilterParams {
  brands?: string[]
  minPrice?: number
  maxPrice?: number
  screenSize?: number[]
  memory?: number[]
  storage?: number[]
  hasNFC?: boolean
  has5G?: boolean
  sortBy?: 'price' | 'popularity' | 'newest' | 'rating'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchParams {
  query?: string
  category?: string
  page?: number
  limit?: number
} 