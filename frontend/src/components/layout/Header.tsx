'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaBars, FaTimes } from 'react-icons/fa'
import Container from './Container'
import { useFetch } from '@/hooks/useFetch'
import { fetchLogo, urlFor } from '@/lib/sanity'
import type { Logo } from '@/types'

// KIRAN PUBLIC SCHOOL — Navigation
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Notices', href: '/notices' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Videos', href: '/videos' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const { data: logoData } = useFetch<Logo>(() => fetchLogo(), [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [router.pathname])

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/'
    return router.pathname.startsWith(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-800'
          : 'bg-white dark:bg-gray-900 shadow-sm'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo / School Name */}
          <Link href="/" className="flex items-center gap-3 group">
            {logoData?.schoolLogo ? (
              // Sanity CMS logo
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={urlFor(logoData.schoolLogo).width(96).height(96).url()}
                  alt={logoData.altText || 'KIRAN PUBLIC SCHOOL Logo'}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              // Local logo file fallback
              <div className="w-12 h-12 relative flex-shrink-0 rounded-xl overflow-hidden bg-white shadow-sm">
                <Image
                  src="/logo/logo.jpeg"
                  alt="KIRAN PUBLIC SCHOOL Logo"
                  fill
                  className="object-contain"
                  priority
                  onError={() => {}}
                />
              </div>
            )}
            <div className="leading-tight">
              <span className="font-bold text-base md:text-lg bg-gradient-to-r from-navy-800 to-primary-600 dark:from-primary-300 dark:to-primary-500 bg-clip-text text-transparent block">
                KIRAN PUBLIC SCHOOL
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
                CBSE · English Medium · Nursery–Class VII
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-1 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative group ${
                  isActive(item.href)
                    ? 'text-navy-700 dark:text-primary-400 bg-navy-50 dark:bg-primary-900/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-navy-700 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-500" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5"
            >
              Enquire Now
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-screen opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-navy-50 dark:bg-primary-900/30 text-navy-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 px-4">
              <Link href="/contact" className="btn-primary w-full justify-center">
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
