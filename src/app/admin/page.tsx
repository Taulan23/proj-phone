'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'
import { useAuth } from '@/contexts/AuthContext'
import { useOrders } from '@/contexts/OrdersContext'
import { useUsers } from '@/contexts/UsersContext'
import { useProducts } from '@/contexts/ProductsContext'
import { formatPrice } from '@/utils/format'
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  Truck,
  ArrowLeft,
  Shield,
  ShieldCheck,
  Ban,
  Unlock,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Plus,
  Search,
  Filter,
  X
} from 'lucide-react'

const statusConfig = {
  pending: { label: 'Ожидает подтверждения', color: 'text-yellow-600 bg-yellow-100', icon: Clock },
  confirmed: { label: 'Подтвержден', color: 'text-blue-600 bg-blue-100', icon: CheckCircle },
  processing: { label: 'Обрабатывается', color: 'text-purple-600 bg-purple-100', icon: Package },
  shipped: { label: 'Отправлен', color: 'text-indigo-600 bg-indigo-100', icon: Truck },
  delivered: { label: 'Доставлен', color: 'text-green-600 bg-green-100', icon: CheckCircle },
  cancelled: { label: 'Отменен', color: 'text-red-600 bg-red-100', icon: Clock }
}

const categories = [
  { value: 'smartphones', label: 'Смартфоны' },
  { value: 'headphones', label: 'Наушники' },
  { value: 'cases', label: 'Чехлы' },
  { value: 'chargers', label: 'Зарядные устройства' },
  { value: 'accessories', label: 'Аксессуары' }
]

export default function AdminPage() {
  const router = useRouter()
  const { user, isAdmin } = useAuth()
  const { getAllOrders, updateOrderStatus } = useOrders()
  const { 
    getAllUsers, 
    updateUserRole, 
    blockUser, 
    unblockUser, 
    deleteUser,
    getTotalUsers,
    getActiveUsers,
    getBlockedUsers,
    getAdminUsers
  } = useUsers()
  const {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getTotalProducts,
    getInStockProducts,
    getOutOfStockProducts,
    searchProducts
  } = useProducts()
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'users' | 'products'>('dashboard')
  const [loading, setLoading] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [productSearchQuery, setProductSearchQuery] = useState('')
  
  // Состояние формы товара
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    price: '',
    oldPrice: '',
    description: '',
    brand: '',
    category: 'smartphones',
    imageUrl: '',
    inStock: true,
    features: '',
    specifications: ''
  })

  // Проверка валидности JSON
  const isValidJSON = (str: string): boolean => {
    if (!str.trim()) return true // Пустая строка считается валидной
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  }

  const isSpecificationsValid = isValidJSON(productForm.specifications)

  const allOrders = getAllOrders()
  const allUsers = getAllUsers()
  const allProducts = getAllProducts()

  // Поиск товаров
  const filteredProducts = productSearchQuery 
    ? searchProducts(productSearchQuery)
    : allProducts

  // Проверка прав доступа
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }
    
    if (!isAdmin()) {
      router.push('/')
      return
    }
  }, [user, isAdmin, router])

  if (!user || !isAdmin()) {
    return null
  }

  // Статистика заказов
  const totalOrders = allOrders.length
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = allOrders.filter(order => order.status === 'pending').length
  const deliveredOrders = allOrders.filter(order => order.status === 'delivered').length

  // Статистика пользователей
  const totalUsers = getTotalUsers()
  const activeUsers = getActiveUsers()
  const blockedUsers = getBlockedUsers()
  const adminUsers = getAdminUsers()

  // Статистика товаров
  const totalProducts = getTotalProducts()
  const inStockProducts = getInStockProducts()
  const outOfStockProducts = getOutOfStockProducts()

  const handleStatusChange = async (orderId: string, newStatus: any) => {
    await updateOrderStatus(orderId, newStatus)
  }

  const handleUserRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      setLoading(true)
      await updateUserRole(userId, newRole)
      alert('Роль пользователя успешно изменена')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка изменения роли'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleBlockUser = async (userId: string) => {
    try {
      setLoading(true)
      await blockUser(userId)
      alert('Пользователь заблокирован')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка блокировки пользователя'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleUnblockUser = async (userId: string) => {
    try {
      setLoading(true)
      await unblockUser(userId)
      alert('Пользователь разблокирован')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка разблокировки пользователя'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.')) {
      return
    }

    try {
      setLoading(true)
      await deleteUser(userId)
      alert('Пользователь удален')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка удаления пользователя'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Обработчики для товаров
  const openProductModal = (productId?: string) => {
    if (productId) {
      const product = allProducts.find(p => p.id === productId)
      if (product) {
        setProductForm({
          name: product.name,
          slug: product.slug,
          price: product.price.toString(),
          oldPrice: product.oldPrice?.toString() || '',
          description: product.description || '',
          brand: product.brand.name,
          category: product.category,
          imageUrl: product.images[0]?.url || '',
          inStock: product.inStock,
          features: product.features?.join(', ') || '',
          specifications: JSON.stringify(product.specifications || {}, null, 2)
        })
        setSelectedProductId(productId)
      }
    } else {
      setProductForm({
        name: '',
        slug: '',
        price: '',
        oldPrice: '',
        description: '',
        brand: '',
        category: 'smartphones',
        imageUrl: '',
        inStock: true,
        features: '',
        specifications: ''
      })
      setSelectedProductId(null)
    }
    setIsProductModalOpen(true)
  }

  const closeProductModal = () => {
    setIsProductModalOpen(false)
    setSelectedProductId(null)
    setProductForm({
      name: '',
      slug: '',
      price: '',
      oldPrice: '',
      description: '',
      brand: '',
      category: 'smartphones',
      imageUrl: '',
      inStock: true,
      features: '',
      specifications: ''
    })
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Валидация JSON для характеристик
      let parsedSpecifications = {}
      if (productForm.specifications.trim()) {
        try {
          parsedSpecifications = JSON.parse(productForm.specifications)
        } catch (jsonError) {
          alert('Ошибка в формате характеристик. Проверьте правильность JSON.')
          setLoading(false)
          return
        }
      }

      const productData = {
        name: productForm.name,
        slug: productForm.slug || productForm.name.toLowerCase().replace(/\s+/g, '-'),
        price: parseInt(productForm.price),
        oldPrice: productForm.oldPrice ? parseInt(productForm.oldPrice) : undefined,
        description: productForm.description,
        brand: { name: productForm.brand },
        category: productForm.category,
        images: [{ url: productForm.imageUrl, alt: productForm.name }],
        inStock: productForm.inStock,
        rating: 4.5,
        reviewsCount: 0,
        features: productForm.features.split(',').map(f => f.trim()).filter(f => f),
        specifications: parsedSpecifications
      }

      if (selectedProductId) {
        await updateProduct(selectedProductId, productData)
        alert('Товар успешно обновлен')
      } else {
        await addProduct(productData)
        alert('Товар успешно добавлен')
      }

      closeProductModal()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка сохранения товара'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар? Это действие нельзя отменить.')) {
      return
    }

    try {
      setLoading(true)
      await deleteProduct(productId)
      alert('Товар удален')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка удаления товара'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Админ-панель</h1>
            <p className="text-gray-600">Управление магазином</p>
          </div>
          <Link href="/profile" className="btn btn-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад в профиль
          </Link>
        </div>

        {/* Навигация */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Дашборд
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Заказы ({totalOrders})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Пользователи ({totalUsers})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Товары ({totalProducts})
          </button>
        </div>

        {/* Дашборд */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Статистика заказов */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Статистика заказов</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Всего заказов</p>
                      <p className="text-2xl font-bold">{totalOrders}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Общая выручка</p>
                      <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Ожидают обработки</p>
                      <p className="text-2xl font-bold">{pendingOrders}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Доставлено</p>
                      <p className="text-2xl font-bold">{deliveredOrders}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Статистика пользователей */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Статистика пользователей</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Всего пользователей</p>
                      <p className="text-2xl font-bold">{totalUsers}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Активные</p>
                      <p className="text-2xl font-bold">{activeUsers}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <UserCheck className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Заблокированные</p>
                      <p className="text-2xl font-bold">{blockedUsers}</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <Ban className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Администраторы</p>
                      <p className="text-2xl font-bold">{adminUsers}</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <ShieldCheck className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Статистика товаров */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Статистика товаров</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Всего товаров</p>
                      <p className="text-2xl font-bold">{totalProducts}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">В наличии</p>
                      <p className="text-2xl font-bold">{inStockProducts}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Нет в наличии</p>
                      <p className="text-2xl font-bold">{outOfStockProducts}</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <X className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Последние заказы */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Последние заказы</h2>
              {allOrders.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Заказов пока нет</p>
              ) : (
                <div className="space-y-4">
                  {allOrders.slice(0, 5).map(order => {
                    const status = statusConfig[order.status]
                    const StatusIcon = status.icon

                    return (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <h4 className="font-medium">{order.id}</h4>
                            <p className="text-sm text-gray-600">
                              {order.customerInfo.firstName} {order.customerInfo.lastName}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${status.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{status.label}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(order.total)}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Заказы */}
        {activeTab === 'orders' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Управление заказами</h2>
            {allOrders.length === 0 ? (
              <p className="text-gray-600 text-center py-8">Заказов пока нет</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">ID заказа</th>
                      <th className="text-left py-3 px-4">Клиент</th>
                      <th className="text-left py-3 px-4">Сумма</th>
                      <th className="text-left py-3 px-4">Статус</th>
                      <th className="text-left py-3 px-4">Дата</th>
                      <th className="text-left py-3 px-4">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map(order => {
                      const status = statusConfig[order.status]
                      const StatusIcon = status.icon

                      return (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">
                                {order.customerInfo.firstName} {order.customerInfo.lastName}
                              </p>
                              <p className="text-sm text-gray-600">{order.customerInfo.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-semibold">{formatPrice(order.total)}</td>
                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="pending">Ожидает подтверждения</option>
                              <option value="confirmed">Подтвержден</option>
                              <option value="processing">Обрабатывается</option>
                              <option value="shipped">Отправлен</option>
                              <option value="delivered">Доставлен</option>
                              <option value="cancelled">Отменен</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                          </td>
                          <td className="py-3 px-4">
                            <Link href={`/orders/${order.id}`} className="text-primary-600 hover:text-primary-700">
                              <Eye className="w-4 h-4" />
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Пользователи */}
        {activeTab === 'users' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Управление пользователями</h2>
            {allUsers.length === 0 ? (
              <p className="text-gray-600 text-center py-8">Пользователей пока нет</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Пользователь</th>
                      <th className="text-left py-3 px-4">Роль</th>
                      <th className="text-left py-3 px-4">Статус</th>
                      <th className="text-left py-3 px-4">Заказы</th>
                      <th className="text-left py-3 px-4">Потрачено</th>
                      <th className="text-left py-3 px-4">Регистрация</th>
                      <th className="text-left py-3 px-4">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map(userItem => (
                      <tr key={userItem.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">
                              {userItem.firstName} {userItem.lastName}
                            </p>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {userItem.email}
                              </div>
                              {userItem.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {userItem.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={userItem.role}
                            onChange={(e) => handleUserRoleChange(userItem.id, e.target.value as 'user' | 'admin')}
                            disabled={loading || userItem.id === user.id}
                            className="text-sm border rounded px-2 py-1"
                          >
                            <option value="user">Пользователь</option>
                            <option value="admin">Администратор</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            userItem.isBlocked 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {userItem.isBlocked ? 'Заблокирован' : 'Активен'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">{userItem.totalOrders}</td>
                        <td className="py-3 px-4 font-semibold">{formatPrice(userItem.totalSpent)}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(userItem.registeredAt).toLocaleDateString('ru-RU')}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {userItem.isBlocked ? (
                              <button
                                onClick={() => handleUnblockUser(userItem.id)}
                                disabled={loading || userItem.id === user.id}
                                className="text-green-600 hover:text-green-700 disabled:opacity-50"
                                title="Разблокировать"
                              >
                                <Unlock className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleBlockUser(userItem.id)}
                                disabled={loading || userItem.id === user.id}
                                className="text-yellow-600 hover:text-yellow-700 disabled:opacity-50"
                                title="Заблокировать"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(userItem.id)}
                              disabled={loading || userItem.id === user.id}
                              className="text-red-600 hover:text-red-700 disabled:opacity-50"
                              title="Удалить"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Товары */}
        {activeTab === 'products' && (
          <div>
            {/* Заголовок и поиск */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Управление товарами</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-64"
                  />
                </div>
                <button
                  onClick={() => openProductModal()}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Добавить товар
                </button>
              </div>
            </div>

            {/* Таблица товаров */}
            <div className="card p-6">
              {filteredProducts.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  {productSearchQuery ? 'Товары не найдены' : 'Товаров пока нет'}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Товар</th>
                        <th className="text-left py-3 px-4">Цена</th>
                        <th className="text-left py-3 px-4">Категория</th>
                        <th className="text-left py-3 px-4">Бренд</th>
                        <th className="text-left py-3 px-4">Наличие</th>
                        <th className="text-left py-3 px-4">Рейтинг</th>
                        <th className="text-left py-3 px-4">Создан</th>
                        <th className="text-left py-3 px-4">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Image
                                src={product.images[0]?.url || '/placeholder.jpg'}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                              />
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-600">{product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-semibold">{formatPrice(product.price)}</p>
                              {product.oldPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.oldPrice)}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                              {categories.find(c => c.value === product.category)?.label || product.category}
                            </span>
                          </td>
                          <td className="py-3 px-4">{product.brand.name}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.inStock 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.inStock ? 'В наличии' : 'Нет в наличии'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <span>{product.rating}</span>
                              <span className="text-gray-400">({product.reviewsCount})</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {new Date(product.createdAt).toLocaleDateString('ru-RU')}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openProductModal(product.id)}
                                className="text-primary-600 hover:text-primary-700"
                                title="Редактировать"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                                title="Удалить"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Модальное окно товара */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {selectedProductId ? 'Редактировать товар' : 'Добавить товар'}
                </h3>
                <button onClick={closeProductModal}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Название*</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <input
                      type="text"
                      value={productForm.slug}
                      onChange={(e) => setProductForm(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Автоматически из названия"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Цена*</label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Старая цена</label>
                    <input
                      type="number"
                      value={productForm.oldPrice}
                      onChange={(e) => setProductForm(prev => ({ ...prev, oldPrice: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Бренд*</label>
                    <input
                      type="text"
                      required
                      value={productForm.brand}
                      onChange={(e) => setProductForm(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Категория*</label>
                    <select
                      required
                      value={productForm.category}
                      onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URL изображения*</label>
                  <input
                    type="url"
                    required
                    value={productForm.imageUrl}
                    onChange={(e) => setProductForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Описание</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Особенности (через запятую)</label>
                  <input
                    type="text"
                    value={productForm.features}
                    onChange={(e) => setProductForm(prev => ({ ...prev, features: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Face ID, Водозащита IP68, Беспроводная зарядка"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium">
                      Характеристики (JSON)
                      {productForm.specifications.trim() && (
                        <span className={`ml-2 text-xs ${
                          isSpecificationsValid ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isSpecificationsValid ? '✓ Валидный JSON' : '✗ Невалидный JSON'}
                        </span>
                      )}
                    </label>
                    {productForm.specifications.trim() && isSpecificationsValid && (
                      <button
                        type="button"
                        onClick={() => {
                          try {
                            const formatted = JSON.stringify(JSON.parse(productForm.specifications), null, 2)
                            setProductForm(prev => ({ ...prev, specifications: formatted }))
                          } catch (e) {
                            // Игнорируем ошибки форматирования
                          }
                        }}
                        className="text-xs text-primary-600 hover:text-primary-700"
                      >
                        Форматировать
                      </button>
                    )}
                  </div>
                  <textarea
                    value={productForm.specifications}
                    onChange={(e) => setProductForm(prev => ({ ...prev, specifications: e.target.value }))}
                    className={`w-full border rounded-lg px-3 py-2 h-32 font-mono text-sm ${
                      productForm.specifications.trim() && !isSpecificationsValid 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                    placeholder='{"Дисплей": "6.7 inch", "Процессор": "A17 Pro"}'
                  />
                  {productForm.specifications.trim() && !isSpecificationsValid && (
                    <p className="text-red-600 text-xs mt-1">
                      Пожалуйста, введите валидный JSON формат
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <label htmlFor="inStock" className="text-sm font-medium">В наличии</label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading || !isSpecificationsValid}
                    className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Сохранение...' : (selectedProductId ? 'Обновить' : 'Добавить')}
                  </button>
                  <button
                    type="button"
                    onClick={closeProductModal}
                    className="btn btn-secondary"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
} 