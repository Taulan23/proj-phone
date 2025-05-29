import MainLayout from '@/components/layout/MainLayout'
import HeroSlider from '@/components/ui/HeroSlider'
import ProductCard from '@/components/products/ProductCard'
import Link from 'next/link'
import { Smartphone, Headphones, BatteryCharging, ShieldCheck, Package, CreditCard } from 'lucide-react'

// Временные данные для демонстрации
const popularProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    slug: 'iphone-15-pro-max-256gb',
    price: 129990,
    oldPrice: 139990,
    images: [{ url: 'https://cdn.dxomark.com/wp-content/uploads/medias/post-155689/Apple-iPhone-15-Pro-Max_-blue-titanium_featured-image-packshot-review.jpg', alt: 'iPhone 15 Pro Max' }],
    rating: 4.8,
    reviewsCount: 234,
    inStock: true,
    brand: { name: 'Apple' }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    price: 119990,
    oldPrice: 134990,
    images: [{ url: 'https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqgin-thumb-539573052', alt: 'Samsung Galaxy S24 Ultra' }],
    rating: 4.7,
    reviewsCount: 189,
    inStock: true,
    brand: { name: 'Samsung' }
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
    brand: { name: 'Xiaomi' }
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
    brand: { name: 'Google' }
  }
]

const categories = [
  { name: 'Смартфоны', icon: Smartphone, href: '/catalog/smartphones', color: 'bg-blue-500' },
  { name: 'Наушники', icon: Headphones, href: '/catalog/headphones', color: 'bg-purple-500' },
  { name: 'Зарядки', icon: BatteryCharging, href: '/catalog/chargers', color: 'bg-green-500' },
  { name: 'Чехлы', icon: ShieldCheck, href: '/catalog/cases', color: 'bg-orange-500' },
]

const features = [
  {
    icon: Package,
    title: 'Бесплатная доставка',
    description: 'При заказе от 5000 ₽'
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия качества',
    description: 'Официальная гарантия на все товары'
  },
  {
    icon: CreditCard,
    title: 'Удобная оплата',
    description: 'Оплата картой, наличными или в кредит'
  }
]

export default function HomePage() {
  return (
    <MainLayout>
      {/* Слайдер */}
      <section className="mb-8">
        <HeroSlider />
      </section>

      {/* Категории */}
      <section className="container mb-12">
        <h2 className="text-2xl font-bold mb-6">Популярные категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Популярные товары */}
      <section className="container mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Популярные товары</h2>
          <Link href="/catalog" className="text-primary-600 hover:text-primary-700">
            Все товары →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-gray-100 py-12 mb-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Баннер с призывом к действию */}
      <section className="container mb-12">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 md:p-12 text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Получите скидку 10% на первый заказ!</h2>
            <p className="text-lg mb-6">Подпишитесь на нашу рассылку и будьте в курсе новинок и акций</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button type="submit" className="btn btn-accent px-8 py-3">
                Подписаться
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
