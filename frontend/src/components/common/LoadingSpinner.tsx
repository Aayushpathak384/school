import type { LoadingSpinnerProps } from '@/types'

export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizeStyles[size]} rounded-full border-gray-200 dark:border-gray-700 border-t-navy-600 dark:border-t-primary-500 animate-spin`}
      />
      {size === 'lg' && (
        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium animate-pulse">
          Loading...
        </p>
      )}
    </div>
  )
}
