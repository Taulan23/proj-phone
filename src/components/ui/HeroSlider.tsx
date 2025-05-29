'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PlaceholderImage from './PlaceholderImage'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  link: string
  buttonText: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    subtitle: 'Новинка',
    description: 'Титановый дизайн. Самый мощный процессор A17 Pro.',
    image: 'https://cdn.dxomark.com/wp-content/uploads/medias/post-155689/Apple-iPhone-15-Pro-Max_-blue-titanium_featured-image-packshot-review.jpg',
    link: '/products/iphone-15-pro-max',
    buttonText: 'Подробнее'
  },
  {
    id: 2,
    title: 'Samsung Galaxy S24 Ultra',
    subtitle: 'Скидка 15%',
    description: 'Искусственный интеллект нового поколения',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqgin-thumb-539573052',
    link: '/products/samsung-galaxy-s24-ultra',
    buttonText: 'Купить со скидкой'
  },
  {
    id: 3,
    title: 'Xiaomi 14 Pro',
    subtitle: 'Предзаказ',
    description: 'Камера Leica. Процессор Snapdragon 8 Gen 3',
    image: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-pro-1.jpg',
    link: '/products/xiaomi-14-pro',
    buttonText: 'Оформить предзаказ'
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
      {/* Слайды */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="w-full h-full object-cover"
              sizes="100vw"
              priority={slide.id === 1}
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container">
                <div className="max-w-lg text-white">
                  <p className="text-accent font-semibold mb-2">{slide.subtitle}</p>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg mb-6">{slide.description}</p>
                  <Link href={slide.link} className="btn btn-accent px-8 py-3">
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Навигация */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Индикаторы */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 