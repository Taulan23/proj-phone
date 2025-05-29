import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Создаем категории
  const smartphones = await prisma.category.create({
    data: {
      name: 'Смартфоны',
      slug: 'smartphones',
      description: 'Современные смартфоны ведущих производителей',
    },
  })

  const accessories = await prisma.category.create({
    data: {
      name: 'Аксессуары',
      slug: 'accessories',
      description: 'Аксессуары для смартфонов',
      children: {
        create: [
          { name: 'Чехлы', slug: 'cases', description: 'Защитные чехлы для смартфонов' },
          { name: 'Наушники', slug: 'headphones', description: 'Беспроводные и проводные наушники' },
          { name: 'Зарядные устройства', slug: 'chargers', description: 'Зарядки и кабели' },
        ],
      },
    },
  })

  // Создаем бренды
  const apple = await prisma.brand.create({
    data: { name: 'Apple', slug: 'apple' },
  })

  const samsung = await prisma.brand.create({
    data: { name: 'Samsung', slug: 'samsung' },
  })

  const xiaomi = await prisma.brand.create({
    data: { name: 'Xiaomi', slug: 'xiaomi' },
  })

  const google = await prisma.brand.create({
    data: { name: 'Google', slug: 'google' },
  })

  // Создаем продукты
  const iphone15ProMax = await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      description: 'iPhone 15 Pro Max — это вершина инноваций Apple. Титановый корпус aerospace-grade делает его невероятно прочным и легким.',
      price: 129990,
      oldPrice: 139990,
      sku: 'APL-IP15PM-256',
      inStock: true,
      stockQuantity: 15,
      categoryId: smartphones.id,
      brandId: apple.id,
      screenSize: 6.7,
      memory: 8,
      storage: 256,
      hasNFC: true,
      has5G: true,
      color: 'Титановый черный',
      batteryCapacity: 4422,
      images: {
        create: [
          { url: '/images/products/iphone15-1.jpg', alt: 'iPhone 15 Pro Max вид спереди', order: 0 },
          { url: '/images/products/iphone15-2.jpg', alt: 'iPhone 15 Pro Max вид сзади', order: 1 },
        ],
      },
      specifications: {
        create: [
          { name: 'Процессор', value: 'Apple A17 Pro', group: 'Основные' },
          { name: 'Диагональ экрана', value: '6.7"', group: 'Экран' },
          { name: 'Разрешение', value: '2796×1290', group: 'Экран' },
          { name: 'Основная камера', value: '48 Мп + 12 Мп + 12 Мп', group: 'Камера' },
        ],
      },
    },
  })

  const samsungS24 = await prisma.product.create({
    data: {
      name: 'Samsung Galaxy S24 Ultra 512GB',
      slug: 'samsung-galaxy-s24-ultra-512gb',
      description: 'Samsung Galaxy S24 Ultra - флагман с искусственным интеллектом нового поколения',
      price: 119990,
      oldPrice: 134990,
      sku: 'SAM-S24U-512',
      inStock: true,
      stockQuantity: 20,
      categoryId: smartphones.id,
      brandId: samsung.id,
      screenSize: 6.8,
      memory: 12,
      storage: 512,
      hasNFC: true,
      has5G: true,
      color: 'Титановый серый',
      batteryCapacity: 5000,
      images: {
        create: [
          { url: '/images/products/samsung-s24.jpg', alt: 'Samsung Galaxy S24 Ultra', order: 0 },
        ],
      },
    },
  })

  const xiaomi14Pro = await prisma.product.create({
    data: {
      name: 'Xiaomi 14 Pro 512GB',
      slug: 'xiaomi-14-pro-512gb',
      description: 'Xiaomi 14 Pro с камерой Leica и процессором Snapdragon 8 Gen 3',
      price: 79990,
      oldPrice: 89990,
      sku: 'XIA-14P-512',
      inStock: true,
      stockQuantity: 25,
      categoryId: smartphones.id,
      brandId: xiaomi.id,
      screenSize: 6.73,
      memory: 12,
      storage: 512,
      hasNFC: true,
      has5G: true,
      color: 'Черный',
      batteryCapacity: 4880,
      images: {
        create: [
          { url: '/images/products/xiaomi14.jpg', alt: 'Xiaomi 14 Pro', order: 0 },
        ],
      },
    },
  })

  // Создаем пользователей
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@phoneshop.ru',
      password: await bcrypt.hash('admin123', 10),
      name: 'Администратор',
      role: 'ADMIN',
    },
  })

  const testUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: await bcrypt.hash('user123', 10),
      name: 'Тестовый пользователь',
      role: 'USER',
      phone: '+7 (999) 123-45-67',
    },
  })

  // Создаем промокоды
  await prisma.promocode.create({
    data: {
      code: 'SALE10',
      description: 'Скидка 10% на все товары',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 дней
      isActive: true,
    },
  })

  await prisma.promocode.create({
    data: {
      code: 'FIRST15',
      description: 'Скидка 15% на первый заказ',
      discountType: 'PERCENTAGE',
      discountValue: 15,
      minOrderAmount: 10000,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // +60 дней
      isActive: true,
      usageLimit: 1,
    },
  })

  // Создаем акции
  const blackFriday = await prisma.promotion.create({
    data: {
      name: 'Черная пятница',
      description: 'Скидки до 30% на избранные товары',
      type: 'SALE',
      value: 30,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 дней
      isActive: true,
    },
  })

  // Связываем товары с акциями
  await prisma.productPromotion.create({
    data: {
      productId: iphone15ProMax.id,
      promotionId: blackFriday.id,
    },
  })

  // Создаем комбо-предложения
  const iphoneCombo = await prisma.comboOffer.create({
    data: {
      name: 'iPhone + AirPods со скидкой',
      description: 'При покупке iPhone 15 Pro Max получите скидку 20% на AirPods',
      discount: 20,
      discountType: 'PERCENTAGE',
      isActive: true,
    },
  })

  // Создаем отзывы
  await prisma.review.create({
    data: {
      productId: iphone15ProMax.id,
      userId: testUser.id,
      rating: 5,
      title: 'Отличный смартфон!',
      content: 'Очень доволен покупкой. Камера просто космос, батарея держит весь день.',
      pros: 'Камера, производительность, дизайн',
      cons: 'Цена',
      isVerified: true,
    },
  })

  console.log('База данных успешно заполнена начальными данными!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 