import type { SectionTitleProps } from '@/types'

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {/* Accent line */}
      <div className={`w-12 h-1 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 mb-4 ${centered ? 'mx-auto' : ''}`} />

      <h2
        className={`text-3xl md:text-4xl font-bold mb-3 ${
          light
            ? 'text-white'
            : 'text-gray-900 dark:text-white'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${
            light
              ? 'text-blue-100'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
