import Head from 'next/head'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import Badge from '@/components/ui/Badge'
import { useFetch } from '@/hooks/useFetch'
import { fetchGallery, urlFor } from '@/lib/sanity'
import { getAspectRatioStyle, getSanityImageSize } from '@/lib/imageLayout'
import type { Gallery } from '@/types'
import { FaTimes, FaImages, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'

// ── Local static gallery images from /public/gallery/ ──────────────────────
// Used when Sanity CMS gallery is empty / not configured
const LOCAL_GALLERY: Array<{
  _id: string
  title: string
  category: 'Event Images' | 'Campus Photos' | 'Annual Function' | 'Activity Photos'
  description?: string
  images: Array<{ src: string; alt: string; width: number; height: number }>
  date?: string
}> = [
  {
    _id: 'local-campus',
    title: 'School Campus',
    category: 'Campus Photos',
    description: 'Our school campus and facilities',
    images: [
      { src: '/gallery/gallery1.jpeg', alt: 'KIRAN PUBLIC SCHOOL Campus', width: 718, height: 1600 },
      { src: '/gallery/gallery2.jpeg', alt: 'School Building', width: 718, height: 1600 },
      { src: '/gallery/gallery3.jpeg', alt: 'School Grounds', width: 718, height: 1600 },
      { src: '/gallery/gallery4.jpeg', alt: 'Classrooms', width: 1600, height: 718 },
    ],
  },
  {
    _id: 'local-events',
    title: 'School Events',
    category: 'Event Images',
    description: 'Memorable moments from school events',
    images: [
      { src: '/gallery/gallery5.jpeg', alt: 'School Event', width: 1600, height: 718 },
      { src: '/gallery/gallery6.jpeg', alt: 'Student Activity', width: 1600, height: 718 },
      { src: '/gallery/gallery7.jpeg', alt: 'School Function', width: 1600, height: 718 },
      { src: '/gallery/gallery8.jpeg', alt: 'School Gathering', width: 720, height: 1600 },
    ],
  },
  {
    _id: 'local-activities',
    title: 'Student Activities',
    category: 'Activity Photos',
    description: 'Students engaged in learning and activities',
    images: [
      { src: '/gallery/gallery9.jpeg', alt: 'Student Activity', width: 720, height: 1600 },
      { src: '/gallery/gallery10.jpeg', alt: 'Learning Activity', width: 720, height: 1600 },
      { src: '/gallery/gallery11.jpeg', alt: 'Student Project', width: 718, height: 1600 },
      { src: '/gallery/gallery12.jpeg', alt: 'School Activity', width: 1600, height: 718 },
    ],
  },
  {
    _id: 'local-annual',
    title: 'Annual Function',
    category: 'Annual Function',
    description: 'Annual day celebrations and cultural programmes',
    images: [
      { src: '/gallery/gallery13.jpeg', alt: 'Annual Function', width: 718, height: 1600 },
      { src: '/gallery/gallery14.jpeg', alt: 'Cultural Programme', width: 718, height: 1600 },
    ],
  },
]

interface LightboxState {
  index: number
  src: string
  title: string
}

interface DisplayImage {
  src: string
  alt: string
  width: number
  height: number
}

interface DisplayGallery {
  _id: string
  title: string
  category: string
  description?: string
  images: DisplayImage[]
  date?: string
  isLocal: boolean
}

export default function GalleryPage() {
  const { data: galleryData, loading, error } = useFetch<Gallery[]>(() => fetchGallery(), [])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  // Build display data: Sanity CMS first, fallback to local files
  const displayGalleries: DisplayGallery[] = useMemo(() => {
    if (galleryData && galleryData.length > 0) {
      return galleryData.map((g) => ({
        _id: g._id,
        title: g.title,
        category: g.category,
        description: g.description,
        date: g.date,
        isLocal: false,
        images: g.images.map((img) => {
          const size = getSanityImageSize(img)
          return {
            src: urlFor(img).width(1200).url(),
            alt: g.title,
            width: size.width,
            height: size.height,
          }
        }),
      }))
    }
    return LOCAL_GALLERY.map((g) => ({ ...g, isLocal: true }))
  }, [galleryData])

  const categories = useMemo(
    () => Array.from(new Set(displayGalleries.map((g) => g.category))),
    [displayGalleries]
  )

  const filteredGalleries = useMemo(
    () =>
      !selectedCategory
        ? displayGalleries
        : displayGalleries.filter((g) => g.category === selectedCategory),
    [displayGalleries, selectedCategory]
  )

  // Flat list of all images for lightbox navigation
  const allFlatImages = useMemo(
    () => filteredGalleries.flatMap((g) => g.images.map((img) => ({ ...img, galleryTitle: g.title }))),
    [filteredGalleries]
  )

  const openLightbox = (flatIndex: number) => {
    setLightbox({ index: flatIndex, src: allFlatImages[flatIndex].src, title: allFlatImages[flatIndex].galleryTitle })
  }

  const navigateLightbox = (dir: 'prev' | 'next') => {
    if (!lightbox) return
    const newIndex =
      dir === 'next'
        ? (lightbox.index + 1) % allFlatImages.length
        : (lightbox.index - 1 + allFlatImages.length) % allFlatImages.length
    setLightbox({ index: newIndex, src: allFlatImages[newIndex].src, title: allFlatImages[newIndex].galleryTitle })
  }

  const activeLightboxImage = lightbox ? allFlatImages[lightbox.index] : null

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error loading Gallery</h1>
            <p className="text-gray-500">Please check your Sanity CMS connection.</p>
          </div>
        </Container>
      </div>
    )
  }

  // Running flat index counter across galleries for lightbox
  let flatOffset = 0

  return (
    <>
      <Head>
        <title>Photo Gallery — KIRAN PUBLIC SCHOOL | Events &amp; Campus</title>
        <meta name="description" content="Photo gallery of KIRAN PUBLIC SCHOOL — campus photos, annual function, events, and student activities in Barharwa, Siwan." />
      </Head>

      {/* Page Header */}
      <section className="page-header text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <SectionTitle
              title="Photo Gallery"
              subtitle="Capturing our moments — campus life, events, and celebrations"
              centered={false}
              light
            />
          </div>
        </Container>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-gray-950">
        <Container>
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              {/* Category Filter */}
              {categories.length > 0 && (
                <div className="mb-10 flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`filter-btn ${!selectedCategory ? 'filter-btn-active' : 'filter-btn-inactive'}`}
                  >
                    All Photos
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`filter-btn ${selectedCategory === category ? 'filter-btn-active' : 'filter-btn-inactive'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Gallery Sections */}
              <div className="space-y-16">
                {filteredGalleries.map((gallery) => {
                  const galleryStartOffset = flatOffset
                  flatOffset += gallery.images.length
                  return (
                    <div key={gallery._id}>
                      {/* Section Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-navy-700 to-primary-600 rounded-xl flex items-center justify-center">
                          <FaImages className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {gallery.title}
                          </h2>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge label={gallery.category} variant="primary" size="sm" />
                            {gallery.date && (
                              <span className="text-sm text-gray-500">
                                {new Date(gallery.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
                              </span>
                            )}
                            <span className="text-sm text-gray-400">{gallery.images.length} photos</span>
                          </div>
                          {gallery.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{gallery.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Responsive Masonry Layout */}
                      <div className="masonry-grid">
                        {gallery.images.map((image, idx) => {
                          const flatIdx = galleryStartOffset + idx
                          return (
                            <div
                              key={idx}
                              className="masonry-item natural-image-card group cursor-pointer"
                              style={getAspectRatioStyle(image)}
                              onClick={() => openLightbox(flatIdx)}
                            >
                              <Image
                                src={image.src}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                style={{ width: '100%', height: 'auto' }}
                                className="natural-gallery-image"
                                loading="lazy"
                                decoding="async"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center">
                                    <FaExpand className="text-white" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {filteredGalleries.length === 0 && (
                <div className="text-center py-20">
                  <FaImages className="text-6xl text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No photos in this category.</p>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      {/* ── Lightbox Modal ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <FaTimes />
          </button>

          {/* Prev */}
          {allFlatImages.length > 1 && (
            <button
              className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev') }}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Image */}
          <div
            className="relative mx-5 w-full max-w-5xl sm:mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeLightboxImage?.src || lightbox.src}
              alt={activeLightboxImage?.alt || lightbox.title}
              width={activeLightboxImage?.width || 1600}
              height={activeLightboxImage?.height || 900}
              className="mx-auto h-auto max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              priority
              sizes="100vw"
            />
            <p className="text-white/70 text-center mt-3 text-sm">{lightbox.title}</p>
            <p className="text-white/40 text-center text-xs mt-1">
              {lightbox.index + 1} / {allFlatImages.length}
            </p>
          </div>

          {/* Next */}
          {allFlatImages.length > 1 && (
            <button
              className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next') }}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      )}
    </>
  )
}
