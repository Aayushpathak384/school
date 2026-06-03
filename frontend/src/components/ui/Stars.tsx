import { FaStar } from 'react-icons/fa'

interface StarsProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
}

export default function Stars({
  rating,
  maxRating = 5,
  size = 'md',
}: StarsProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <div className={`flex gap-1 ${sizeClasses[size]}`}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}
