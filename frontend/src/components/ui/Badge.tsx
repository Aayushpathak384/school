type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gold'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  size?: BadgeSize
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-navy-100 dark:bg-navy-900/50 text-navy-700 dark:text-navy-300 ring-1 ring-navy-200 dark:ring-navy-700',
  success: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-700',
  warning: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-700',
  danger: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-700',
  info: 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 ring-1 ring-sky-200 dark:ring-sky-700',
  gold: 'bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-300 ring-1 ring-gold-200 dark:ring-gold-700',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2.5 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
}

export default function Badge({ label, variant = 'primary', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {label}
    </span>
  )
}
