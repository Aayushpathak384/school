import type { CardProps } from '@/types'

export default function Card({
  children,
  className = '',
  hover = true,
  glass = false,
}: CardProps) {
  const baseStyles = glass
    ? 'glass-card rounded-2xl p-6'
    : 'bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 p-6'

  const hoverStyles = hover
    ? 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer'
    : 'transition-colors duration-200'

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  )
}
