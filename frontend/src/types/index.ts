import React from 'react'

// ─── Sanity Base Types ────────────────────────────────────────────────────────
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref?: string
    _id?: string
    _type?: 'reference' | 'sanity.imageAsset'
    url?: string
    metadata?: {
      dimensions?: ImageDimensions
    }
  }
  dimensions?: ImageDimensions
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface ImageDimensions {
  width: number
  height: number
  aspectRatio?: number
}

// ─── Sanity Document Types ────────────────────────────────────────────────────

export interface Homepage {
  _id: string
  _type: 'homepage'
  heroTitle?: string
  heroTagline?: string
  welcomeMessage?: string
  ctaButtons?: Array<{
    label: string
    link: string
    style: 'primary' | 'secondary'
  }>
  stats?: {
    students?: number
    teachers?: number
    yearsEstablished?: number
    awards?: number
  }
}

/** Banner carousel images for the homepage hero section */
export interface BannerItem {
  image: SanityImage
  caption?: string
  altText?: string
}

export interface Banners {
  _id: string
  _type: 'banners'
  title?: string
  images: BannerItem[]
  autoplayInterval?: number
}

/** School logo singleton — managed via Sanity CMS */
export interface Logo {
  _id: string
  _type: 'logo'
  schoolLogo: SanityImage
  altText?: string
  logoTagline?: string
}

export interface About {
  _id: string
  _type: 'about'
  schoolName?: string
  schoolLogo?: SanityImage
  mission?: string
  vision?: string
  schoolHistory?: any[]
  principalMessage?: any[]
  principalName?: string
  principalImage?: SanityImage
  highlights?: Array<{
    title: string
    description: string
    icon?: string
  }>
}

export interface Notice {
  _id: string
  _type: 'notice'
  title: string
  description?: any[]
  date: string
  isImportant?: boolean
  category?: string
  pdfAttachment?: {
    asset: {
      url: string
    }
  }
}

export interface Gallery {
  _id: string
  _type: 'gallery'
  title: string
  category: 'Event Images' | 'Campus Photos' | 'Annual Function' | 'Activity Photos'
  description?: string
  images: SanityImage[]
  date?: string
  order?: number
}

export interface Video {
  _id: string
  _type: 'video'
  title: string
  description?: string
  category?: string
  videoUrl: string
  thumbnail?: SanityImage
  date?: string
  order?: number
}

export interface Contact {
  _id: string
  _type: 'contact'
  phone?: string
  whatsappNumber?: string
  whatsappMessage?: string
  email?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  googleMapsEmbed?: string
  officeHours?: Array<{
    day: string
    time: string
  }>
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}

// ─── Component Props ──────────────────────────────────────────────────────────

export interface ButtonProps {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

export interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}
