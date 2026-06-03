import Link from 'next/link'
import type { ButtonProps } from '@/types'

export default function Button({
  label,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon,
}: ButtonProps) {
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'inline-flex items-center justify-center gap-2 px-4 py-2 text-navy-700 dark:text-primary-400 hover:bg-navy-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-all duration-200',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  const combinedClassName = `${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {icon && icon}
        {label}
      </Link>
    )
  }

  return (
    <button onClick={onClick} disabled={disabled} className={combinedClassName}>
      {icon && icon}
      {label}
    </button>
  )
}
