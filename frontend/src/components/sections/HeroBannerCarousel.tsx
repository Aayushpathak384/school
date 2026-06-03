import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronLeft, FaChevronRight, FaChevronRight as FaArrow } from 'react-icons/fa'
import { urlFor } from '@/lib/sanity'
import type { Banners } from '@/types'

interface HeroBannerCarouselProps {
  banners: Banners | null
  heroTitle?: string
  heroTagline?: string
  welcomeMessage?: string
  ctaButtons?: Array<{ label: string; link: string; style: 'primary' | 'secondary' }>
}

// ── Static local banners from /public/banners/ ──────────────────────────────
// Used when Sanity CMS is not yet configured
const LOCAL_BANNERS = [
  { src: '/banners/background_image_school.png', alt: 'KIRAN PUBLIC SCHOOL Campus' },
]

interface DisplayBanner {
  src: string
  alt: string
  caption?: string
  isLocal: boolean
}

export default function HeroBannerCarousel({
  banners,
  heroTitle,
  heroTagline,
  welcomeMessage,
  ctaButtons,
}: HeroBannerCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Build display list: prefer Sanity CMS banners, fallback to local files
  const displayBanners: DisplayBanner[] =
    banners?.images && banners.images.length > 0
      ? banners.images.map((b) => ({
          src: urlFor(b.image).width(1920).height(1080).url(),
          alt: b.altText || 'KIRAN PUBLIC SCHOOL Banner',
          caption: b.caption,
          isLocal: false,
        }))
      : LOCAL_BANNERS.map((b) => ({ ...b, isLocal: true }))

  const count = displayBanners.length
  const autoplayMs = (banners?.autoplayInterval ?? 5) * 1000

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrent(index)
        setIsTransitioning(false)
      }, 300)
    },
    [isTransitioning]
  )

  const next = useCallback(() => goTo((current + 1) % count), [current, count, goTo])
  const prev = useCallback(() => goTo((current - 1 + count) % count), [current, count, goTo])

  // Autoplay
  useEffect(() => {
    if (count <= 1) return
    intervalRef.current = setInterval(next, autoplayMs)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [next, autoplayMs, count])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next])

  const resetAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (count > 1) intervalRef.current = setInterval(next, autoplayMs)
  }

  const handlePrev = () => { prev(); resetAutoplay() }
  const handleNext = () => { next(); resetAutoplay() }
  const handleDot = (i: number) => { goTo(i); resetAutoplay() }

  const currentBanner = displayBanners[current]

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950"
      aria-label="Hero Banner"
    >
      {/* ── Banner Image ── */}
      {displayBanners.map((banner, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current && !isTransitioning ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            fill
            className="object-cover object-center"
            priority={i === 0}
            quality={90}
          />
        </div>
      ))}

      {/* ── Dark overlay for text readability ── */}
      <div className="absolute inset-0 hero-overlay" />

      {/* ── Decorative animated blobs ── */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-500 pointer-events-none" />

      {/* ── Hero Text Content ── */}
      <div
        className={`relative z-20 text-center text-white px-4 max-w-5xl mx-auto transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8 animate-fade-in shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-sm font-semibold text-white tracking-wide uppercase">
            {heroTagline || 'CBSE Board • English Medium • Barharwa, Siwan'}
          </span>
        </div>

        {/* Caption from banner (if any) */}
        {currentBanner?.caption && (
          <p className="text-gold-300 text-sm font-semibold uppercase tracking-widest mb-3 animate-fade-in">
            {currentBanner.caption}
          </p>
        )}

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black mb-6 leading-[1.1] animate-fade-in-up drop-shadow-2xl text-white">
          {heroTitle || 'Welcome to'}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 drop-shadow-lg">
            KIRAN PUBLIC SCHOOL
          </span>
        </h1>

        {/* Welcome message */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-200 drop-shadow-md">
          {welcomeMessage ||
            'Nurturing young minds with quality CBSE education in a caring and inspiring environment.'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          {ctaButtons && ctaButtons.length > 0 ? (
            ctaButtons.map((btn) => (
              <Link
                key={btn.link}
                href={btn.link}
                className={
                  btn.style === 'primary'
                    ? 'btn-primary text-base px-8 py-4'
                    : 'btn-secondary text-base px-8 py-4'
                }
              >
                {btn.label}
                <FaArrow className="text-sm" />
              </Link>
            ))
          ) : (
            <>
              <Link href="/about" className="btn-primary text-base px-8 py-4">
                Learn About Us <FaArrow className="text-sm" />
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                Enquire Now
              </Link>
            </>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 flex flex-col items-center gap-2 animate-bounce-gentle opacity-60">
          <span className="text-xs text-blue-200 uppercase tracking-widest">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center pt-1">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* ── Prev / Next Arrows ── */}
      {count > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous banner"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next banner"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
          >
            <FaChevronRight />
          </button>
        </>
      )}

      {/* ── Dot Indicators ── */}
      {count > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {displayBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Go to banner ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 h-2.5 bg-white'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Banner counter ── */}
      {count > 1 && (
        <div className="absolute top-6 right-6 z-20 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
          <span className="text-white text-xs font-medium">
            {current + 1} / {count}
          </span>
        </div>
      )}
    </section>
  )
}
