import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  CreditCard,
  Truck,
  Shield,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">О компании</h3>
            <p className="mb-4 text-sm">
              PhoneShop - ведущий интернет-магазин смартфонов и аксессуаров. 
              Мы предлагаем только оригинальную продукцию с официальной гарантией.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Покупателям */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Покупателям</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  Каталог товаров
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-white transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-white transition-colors">
                  Гарантия и возврат
                </Link>
              </li>
              <li>
                <Link href="/credit" className="hover:text-white transition-colors">
                  Кредит и рассрочка
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Часто задаваемые вопросы
                </Link>
              </li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-white transition-colors">
                  Адреса магазинов
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Вакансии
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white transition-colors">
                  Партнерам
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+78001234567" className="hover:text-white transition-colors">
                    8 (800) 123-45-67
                  </a>
                  <p className="text-xs">Бесплатно по России</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@phoneshop.ru" className="hover:text-white transition-colors">
                  info@phoneshop.ru
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Пн-Пт: 9:00 - 21:00</p>
                  <p>Сб-Вс: 10:00 - 20:00</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>г. Москва, ул. Примерная, д. 1</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Преимущества */}
      <div className="border-t border-gray-800">
        <div className="container py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-primary-500" />
              <div>
                <p className="text-white font-medium">Быстрая доставка</p>
                <p className="text-xs">По всей России</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary-500" />
              <div>
                <p className="text-white font-medium">Гарантия качества</p>
                <p className="text-xs">Официальная гарантия</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-primary-500" />
              <div>
                <p className="text-white font-medium">Удобная оплата</p>
                <p className="text-xs">Любым способом</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-8 h-8 text-primary-500" />
              <div>
                <p className="text-white font-medium">Поддержка 24/7</p>
                <p className="text-xs">Всегда на связи</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Копирайт */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2024 PhoneShop. Все права защищены.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Пользовательское соглашение
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}