interface PlaceholderImageProps {
  width?: number
  height?: number
  text?: string
  className?: string
}

export default function PlaceholderImage({ 
  width = 400, 
  height = 300, 
  text = 'Изображение',
  className = ''
}: PlaceholderImageProps) {
  return (
    <div 
      className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">📱</div>
        <div className="text-sm">{text}</div>
      </div>
    </div>
  )
} 