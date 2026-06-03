import Head from 'next/head'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Button from '@/components/common/Button'
import SectionTitle from '@/components/common/SectionTitle'
import LoadingSpinner from '@/components/common/LoadingSpinner'

import Badge from '@/components/ui/Badge'
import StatsCounter from '@/components/sections/StatsCounter'
import HeroBannerCarousel from '@/components/sections/HeroBannerCarousel'
import { useFetch } from '@/hooks/useFetch'
import { useInView } from '@/hooks/useInView'
import { fetchHomepage, fetchNotices, fetchGallery, fetchAbout, fetchBanners, urlFor } from '@/lib/sanity'
import { getAspectRatioStyle, getSanityImageSize } from '@/lib/imageLayout'
import type { Homepage, Notice, Gallery, About, Banners } from '@/types'
import { FaArrowRight, FaCalendarAlt, FaFilePdf } from 'react-icons/fa'
import { getIconComponent } from '@/lib/iconMapper'
import Image from 'next/image'

// KIRAN PUBLIC SCHOOL — Default highlights (if not set in CMS)
const DEFAULT_HIGHLIGHTS = [
  {
    icon: 'FaHeart',
    title: 'Art Classes',
    description: 'Creative spaces where students explore drawing, painting, sketching, and various art forms to develop imagination, creativity, and artistic skills.',
  },
  {
    icon: 'FaMusic',
    title: 'Dance Classes',
    description: 'Engaging dance sessions that help students develop rhythm, coordination, confidence, creativity, and physical fitness in a fun learning environment.',
  },
  {
    icon: 'FaChalkboardUser',
    title: 'Experienced Teachers',
    description: 'Highly qualified, dedicated educators committed to each student\'s academic growth and overall development.',
  },
  {
    icon: 'FaFootball',
    title: 'Sports Facilities',
    description: 'Well-maintained playgrounds and sports facilities that promote physical fitness and team spirit.',
  },
  {
    icon: 'FaFlask',
    title: 'Science Activities',
    description: 'Practical experiments and science fairs that make learning fun and foster scientific curiosity.',
  },
]

// Local gallery preview images (shown when Sanity gallery not configured)
const LOCAL_GALLERY_PREVIEW = [
  { src: '/gallery/gallery1.jpeg', alt: 'KIRAN PUBLIC SCHOOL Campus', label: 'Campus Photos', width: 718, height: 1600 },
  { src: '/gallery/gallery5.jpeg', alt: 'School Events', label: 'Event Images', width: 1600, height: 718 },
  { src: '/gallery/gallery9.jpeg', alt: 'Student Activities', label: 'Activity Photos', width: 720, height: 1600 },
  { src: '/gallery/gallery2.jpeg', alt: 'School Building', label: 'Campus Photos', width: 718, height: 1600 },
  { src: '/gallery/gallery6.jpeg', alt: 'School Function', label: 'Event Images', width: 1600, height: 718 },
  { src: '/gallery/gallery13.jpeg', alt: 'Annual Function', label: 'Annual Function', width: 718, height: 1600 },
]

export default function Home() {
  const { data: homepageData } = useFetch<Homepage>(
    () => fetchHomepage(), []
  )
  const { data: bannersData } = useFetch<Banners>(
    () => fetchBanners(), []
  )
  const { data: noticesData, loading: noticesLoading } = useFetch<Notice[]>(
    () => fetchNotices(), []
  )
  const { data: galleryData, loading: galleryLoading } = useFetch<Gallery[]>(
    () => fetchGallery(), []
  )
  const { data: aboutData } = useFetch<About>(
    () => fetchAbout(), []
  )

  const { ref: noticesRef, isInView: noticesInView } = useInView({ triggerOnce: true })
  const { ref: highlightsRef, isInView: highlightsInView } = useInView({ triggerOnce: true })
  const { ref: galleryRef, isInView: galleryInView } = useInView({ triggerOnce: true })

  const latestNotices = noticesData?.slice(0, 3) || []
  const galleryImages = galleryData?.slice(0, 6) || []
  const highlights =
    aboutData?.highlights && aboutData.highlights.length > 0
      ? aboutData.highlights
      : DEFAULT_HIGHLIGHTS

  return (
    <>
      <Head>
        <title>KIRAN PUBLIC SCHOOL — CBSE School in Barharwa, Siwan</title>
        <meta
          name="description"
          content="KIRAN PUBLIC SCHOOL — A CBSE Based English Medium school in Barharwa, Siwan offering classes from Nursery to Class VIII. Quality education in a nurturing environment."
        />
        <meta property="og:title" content="KIRAN PUBLIC SCHOOL — Barharwa, Siwan" />
        <meta
          property="og:description"
          content="CBSE English Medium school in Barharwa, Siwan. Classes Nursery to Class VIII."
        />
        <meta property="og:type" content="website" />
      </Head>

      {/* ====== HERO BANNER CAROUSEL ====== */}
      {/* Always rendered — uses local /public/banners/ when Sanity not configured */}
      <HeroBannerCarousel
        banners={bannersData}
        heroTitle={homepageData?.heroTitle}
        heroTagline={homepageData?.heroTagline}
        welcomeMessage={homepageData?.welcomeMessage}
        ctaButtons={homepageData?.ctaButtons}
      />

      {/* ====== STATS COUNTER ====== */}
      <StatsCounter
        students={homepageData?.stats?.students ?? 200}
        teachers={homepageData?.stats?.teachers ?? 20}
        years={homepageData?.stats?.yearsEstablished ?? 10}
        awards={homepageData?.stats?.awards ?? 15}
      />

      {/* ====== SCHOOL HIGHLIGHTS ====== */}
      <section ref={highlightsRef} className="section-padding bg-white dark:bg-gray-900">
        <Container>
          <SectionTitle
            title="Why Choose Kiran Public School?"
            subtitle="Quality facilities and dedicated faculty to give your child the best CBSE education"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.slice(0, 6).map((highlight, index) => {
              const IconComponent = getIconComponent(highlight.icon || '')
              return (
                <div
                  key={index}
                  className={`group premium-card transition-all duration-700 ${highlightsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-navy-50 to-blue-50 dark:from-navy-900/50 dark:to-primary-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                    {IconComponent ? (
                      <IconComponent className="text-navy-700 dark:text-primary-400 text-3xl drop-shadow-sm" />
                    ) : (
                      <span className="text-3xl">⭐</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                    {highlight.description}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ====== LATEST NOTICES ====== */}
      <section
        ref={noticesRef}
        className={`section-padding bg-slate-50 dark:bg-gray-950 transition-all duration-700 ${noticesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <Container>
          <div className="flex items-end justify-between mb-12">
            <SectionTitle
              title="Latest Notices"
              subtitle="Stay updated with school announcements"
              centered={false}
            />
            <Link
              href="/notices"
              className="hidden md:flex items-center gap-2 text-navy-700 dark:text-primary-400 font-semibold hover:gap-3 transition-all duration-200 text-sm"
            >
              View All <FaArrowRight />
            </Link>
          </div>

          {noticesLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {latestNotices.length > 0 ? (
                  latestNotices.map((notice) => (
                    <div key={notice._id} className="premium-card group relative overflow-hidden pl-6">
                      {/* Accent left border */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-navy-600 to-primary-500 group-hover:w-2 transition-all duration-300" />

                      <div className="flex items-center gap-2 mb-4 pt-1">
                        {notice.isImportant && (
                          <Badge label="⚠️ Important" variant="danger" size="sm" />
                        )}
                        {notice.category && (
                          <Badge label={notice.category} variant="info" size="sm" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {notice.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-4">
                        <FaCalendarAlt className="text-gold-500" />
                        {new Date(notice.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      {notice.pdfAttachment && (
                        <a
                          href={notice.pdfAttachment.asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-semibold hover:underline"
                        >
                          <FaFilePdf /> Download PDF
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center col-span-full text-gray-500 py-12">
                    No notices yet. Add notices from your Sanity CMS dashboard.
                  </p>
                )}
              </div>
              <div className="text-center">
                <Button label="View All Notices" href="/notices" variant="outline" size="lg" />
              </div>
            </>
          )}
        </Container>
      </section>

      {/* ====== GALLERY PREVIEW ====== */}
      <section
        ref={galleryRef}
        className={`section-padding bg-white dark:bg-gray-900 transition-all duration-700 ${galleryInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <Container>
          <div className="flex items-end justify-between mb-12">
            <SectionTitle
              title="School Gallery"
              subtitle="Capturing our best memories — campus, events, and activities"
              centered={false}
            />
            <Link
              href="/gallery"
              className="hidden md:flex items-center gap-2 text-navy-700 dark:text-primary-400 font-semibold hover:gap-3 transition-all duration-200 text-sm"
            >
              View All <FaArrowRight />
            </Link>
          </div>

          {galleryLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : galleryImages.length > 0 ? (
            // Sanity CMS gallery
            <>
              <div className="masonry-grid mb-8">
                {galleryImages.map((gallery) => {
                  const image = gallery.images?.[0]
                  if (!image) return null

                  const size = getSanityImageSize(image)

                  return (
                    <Link
                      key={gallery._id}
                      href="/gallery"
                      className="masonry-item natural-image-card group cursor-pointer"
                      style={getAspectRatioStyle(size)}
                    >
                      <div className="relative w-full overflow-hidden">
                        <Image
                          src={urlFor(image).width(900).url()}
                          alt={gallery.title}
                          width={size.width}
                          height={size.height}
                          style={{ width: '100%', height: 'auto' }}
                          className="natural-gallery-image"
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white font-semibold text-sm">{gallery.title}</p>
                            <Badge label={gallery.category} variant="primary" size="sm" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className="text-center">
                <Button label="View Full Gallery" href="/gallery" variant="outline" size="lg" />
              </div>
            </>
          ) : (
            // Local static gallery fallback
            <>
              <div className="masonry-grid mb-8">
                {LOCAL_GALLERY_PREVIEW.map((img, i) => (
                  <Link
                    key={i}
                    href="/gallery"
                    className="masonry-item natural-image-card group cursor-pointer"
                    style={getAspectRatioStyle(img)}
                  >
                    <div className="relative w-full overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        style={{ width: '100%', height: 'auto' }}
                        className="natural-gallery-image"
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-semibold text-sm">{img.alt}</p>
                          <Badge label={img.label} variant="primary" size="sm" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <Button label="View Full Gallery" href="/gallery" variant="outline" size="lg" />
              </div>
            </>
          )}

        </Container>
      </section>

      {/* ====== CALL TO ACTION ====== */}
      <section className="section-padding bg-gradient-to-r from-navy-800 to-primary-700">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Seeking Admission?
            </h2>
            <p className="text-xl text-blue-100 mb-3">
              CBSE Based · English Medium · Nursery to Class VIII
            </p>
            <p className="text-lg text-blue-200 mb-10">
              Give your child a strong educational foundation. Contact KIRAN PUBLIC SCHOOL today to learn about admissions and fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-navy-800 font-bold rounded-xl hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.25)] text-lg"
              >
                Contact Us <FaArrowRight className="text-sm" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-transparent border-2 border-white/80 text-white font-bold rounded-xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-lg hover:border-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
