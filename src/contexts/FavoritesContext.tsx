'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface FavoriteProduct {
  id: string
  name: string
  slug: string
  price: number
  oldPrice?: number
  images: Array<{ url: string; alt: string }>
  rating: number
  reviewsCount: number
  inStock: boolean
  brand: { name: string }
}

interface FavoritesContextType {
  favorites: FavoriteProduct[]
  addToFavorites: (product: FavoriteProduct) => void
  removeFromFavorites: (productId: string) => void
  clearFavorites: () => void
  isFavorite: (productId: string) => boolean
  getFavoritesCount: () => number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([])

  useEffect(() => {
    // Загружаем избранное из localStorage при инициализации
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    // Сохраняем избранное в localStorage при изменении
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (product: FavoriteProduct) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === product.id)
      if (!isAlreadyFavorite) {
        return [...prevFavorites, product]
      }
      return prevFavorites
    })
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(product => product.id !== productId)
    )
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  const isFavorite = (productId: string) => {
    return favorites.some(product => product.id === productId)
  }

  const getFavoritesCount = () => {
    return favorites.length
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
    getFavoritesCount
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
} 