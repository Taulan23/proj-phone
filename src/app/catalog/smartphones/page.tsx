import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'

export default function SmartphonesPage() {
  return (
    <MainLayout>
      <div className="container py-8">
        <nav className="text-sm mb-6">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="text-gray-500 hover:text-gray-700">Главная</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/catalog" className="text-gray-500 hover:text-gray-700">Каталог</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">Смартфоны</li>
          </ol>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Смартфоны</h1>
          <p className="text-gray-600 text-lg">
            Большой выбор современных смартфонов от ведущих производителей. 
            Apple iPhone, Samsung Galaxy, Xiaomi, Google Pixel и другие популярные модели.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-8">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">📱</h2>
                <h3 className="text-2xl font-bold mb-2">Новейшие смартфоны</h3>
                <p className="text-lg opacity-90">Последние модели с передовыми технологиями</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">🍎 iPhone</h3>
                <p className="text-gray-600 mb-4">
                  Легендарные смартфоны Apple с iOS, Face ID и камерами Pro
                </p>
                <Link href="/catalog/smartphones?brand=apple" className="btn btn-primary">
                  Смотреть iPhone
                </Link>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">🌟 Samsung Galaxy</h3>
                <p className="text-gray-600 mb-4">
                  Флагманские модели с AMOLED экранами и S Pen
                </p>
                <Link href="/catalog/smartphones?brand=samsung" className="btn btn-primary">
                  Смотреть Samsung
                </Link>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">⚡ Xiaomi</h3>
                <p className="text-gray-600 mb-4">
                  Мощные смартфоны с отличным соотношением цена/качество
                </p>
                <Link href="/catalog/smartphones?brand=xiaomi" className="btn btn-primary">
                  Смотреть Xiaomi
                </Link>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">🎯 Google Pixel</h3>
                <p className="text-gray-600 mb-4">
                  Чистый Android и лучшая вычислительная фотография
                </p>
                <Link href="/catalog/smartphones?brand=google" className="btn btn-primary">
                  Смотреть Pixel
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">🔥 Популярные категории</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/catalog/smartphones?price=0-50000" className="flex justify-between hover:text-primary-600">
                    <span>До 50 000 ₽</span>
                    <span className="text-gray-400">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/catalog/smartphones?price=50000-100000" className="flex justify-between hover:text-primary-600">
                    <span>50 000 - 100 000 ₽</span>
                    <span className="text-gray-400">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/catalog/smartphones?price=100000-150000" className="flex justify-between hover:text-primary-600">
                    <span>Премиум (100 000+ ₽)</span>
                    <span className="text-gray-400">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/catalog/smartphones?features=5g" className="flex justify-between hover:text-primary-600">
                    <span>С поддержкой 5G</span>
                    <span className="text-gray-400">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/catalog/smartphones?screen=6.5+" className="flex justify-between hover:text-primary-600">
                    <span>Большой экран 6.5"+</span>
                    <span className="text-gray-400">→</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">💡 Популярные функции</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Беспроводная зарядка</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-sm">NFC для оплаты</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-sm">Множественные камеры</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-sm">Быстрая зарядка</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/catalog" className="btn btn-accent px-8 py-3">
            Посмотреть все смартфоны в каталоге
          </Link>
        </div>
      </div>
    </MainLayout>
  )
} 