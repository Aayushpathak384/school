import Head from 'next/head'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import RichText from '@/components/common/RichText'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useFetch } from '@/hooks/useFetch'
import { useInView } from '@/hooks/useInView'
import { fetchAbout, fetchLogo, urlFor } from '@/lib/sanity'
import { getAspectRatioStyle, getSanityImageSize } from '@/lib/imageLayout'
import type { About, Logo } from '@/types'
import { getIconComponent } from '@/lib/iconMapper'
import { FaQuoteLeft, FaCheckCircle } from 'react-icons/fa'

// KIRAN PUBLIC SCHOOL — Default highlights (used if CMS not configured)
const DEFAULT_HIGHLIGHTS = [
  {
    icon: 'monitor',
    title: 'Smart Classrooms',
    description: 'Technology-enabled interactive learning environments with projectors and digital boards.',
  },
  {
    icon: 'desktop',
    title: 'Computer Education',
    description: 'Dedicated computer lab providing digital literacy and programming fundamentals.',
  },
  {
    icon: 'graduation-cap',
    title: 'Experienced Teachers',
    description: 'Highly qualified, dedicated educators committed to each student\'s individual growth.',
  },
  {
    icon: 'trophy',
    title: 'Sports Facilities',
    description: 'Spacious playgrounds and sports activities that promote physical fitness and teamwork.',
  },
  {
    icon: 'flask',
    title: 'Science Activities',
    description: 'Hands-on science experiments and fairs that make learning engaging and practical.',
  },
]

const SCHOOL_INFO = [
  { label: 'Curriculum', value: 'CBSE Based' },
  { label: 'Medium', value: 'English' },
  { label: 'Classes', value: 'Nursery to Class VIII' },
  { label: 'Location', value: 'Barharwa, Siwan, Bihar' },
]

export default function AboutPage() {
  const { data: aboutData, loading, error } = useFetch<About>(() => fetchAbout(), [])
  const { data: logoData } = useFetch<Logo>(() => fetchLogo(), [])

  const { ref: highlightsRef, isInView: highlightsInView } = useInView({ triggerOnce: true })
  const { ref: principalRef, isInView: principalInView } = useInView({ triggerOnce: true })
  const { ref: mvRef, isInView: mvInView } = useInView({ triggerOnce: true })

  const highlights =
    aboutData?.highlights && aboutData.highlights.length > 0
      ? aboutData.highlights
      : DEFAULT_HIGHLIGHTS

  // Use CMS logo or fall back to about.schoolLogo
  const displayLogo = logoData?.schoolLogo || aboutData?.schoolLogo
  const principalImageSize = getSanityImageSize(aboutData?.principalImage, {
    width: 360,
    height: 480,
  })

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error loading About page</h1>
            <p className="text-gray-600 dark:text-gray-400">{error.message}</p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>About Us — KIRAN PUBLIC SCHOOL | CBSE School Barharwa, Siwan</title>
        <meta
          name="description"
          content="Learn about KIRAN PUBLIC SCHOOL — our mission, vision, history, and school highlights. CBSE Based English Medium school in Barharwa, Siwan offering classes from Nursery to Class VIII."
        />
      </Head>

      {/* Page Header */}
      <section className="page-header text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <SectionTitle
              title="About Our School"
              subtitle="A commitment to excellence in CBSE education, nurturing young minds in Barharwa, Siwan."
              centered={false}
              light
            />
          </div>
        </Container>
      </section>

      {loading ? (
        <div className="section-padding flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          {/* ── School Identity Banner ── */}
          <section className="section-padding-sm bg-white dark:bg-gray-900">
            <Container>
              <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-navy-50 to-primary-50 dark:from-navy-950/50 dark:to-primary-950/50 rounded-3xl p-8 md:p-12">
                {/* Logo — Sanity CMS first, local file second, monogram last */}
                {displayLogo ? (
                  <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 relative bg-white rounded-2xl shadow-card p-3">
                    <Image
                      src={urlFor(displayLogo).width(200).url()}
                      alt={logoData?.altText || 'KIRAN PUBLIC SCHOOL Logo'}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 relative bg-white rounded-2xl shadow-card p-3">
                    <Image
                      src="/logo/logo.jpeg"
                      alt="KIRAN PUBLIC SCHOOL Logo"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    {aboutData?.schoolName || 'KIRAN PUBLIC SCHOOL'}
                  </h1>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {SCHOOL_INFO.map((info) => (
                      <div
                        key={info.label}
                        className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 text-center"
                      >
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{info.label}</p>
                        <p className="text-sm font-bold text-navy-700 dark:text-primary-400">
                          {info.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* ── Mission & Vision ── */}
          {(aboutData?.mission || aboutData?.vision) && (
            <section ref={mvRef} className="section-padding bg-slate-50 dark:bg-gray-950">
              <Container>
                <SectionTitle title="Our Purpose" subtitle="The values and goals that guide us every day" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {aboutData.mission && (
                    <div
                      className={`premium-card transition-all duration-700 ${
                        mvInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                      }`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-navy-700 to-primary-600 rounded-xl flex items-center justify-center mb-5">
                        <span className="text-white text-xl font-bold">M</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-navy-800 dark:text-primary-300">
                        Our Mission
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {aboutData.mission}
                      </p>
                    </div>
                  )}
                  {aboutData.vision && (
                    <div
                      className={`premium-card transition-all duration-700 ${
                        mvInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                      }`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-xl flex items-center justify-center mb-5">
                        <span className="text-white text-xl font-bold">V</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gold-700 dark:text-gold-400">
                        Our Vision
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {aboutData.vision}
                      </p>
                    </div>
                  )}
                </div>
              </Container>
            </section>
          )}

          {/* ── School Highlights ── */}
          <section ref={highlightsRef} className="section-padding bg-white dark:bg-gray-900">
            <Container>
              <SectionTitle title="Why Choose Kiran?" subtitle="Our key facilities and strengths" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {highlights.map((highlight, index) => {
                  const IconComponent = getIconComponent(highlight.icon || '')
                  return (
                    <div
                      key={index}
                      className={`premium-card group transition-all duration-700 ${
                        highlightsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-navy-700 to-primary-600 rounded-2xl flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 transition-transform">
                        {IconComponent ? (
                          <IconComponent className="text-white text-xl" />
                        ) : (
                          <span className="text-white text-xl">⭐</span>
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

          {/* ── School History ── */}
          {aboutData?.schoolHistory && aboutData.schoolHistory.length > 0 && (
            <section className="section-padding bg-slate-50 dark:bg-gray-950">
              <Container>
                <SectionTitle title="Our History" subtitle="A journey of excellence and growth" />
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-card border border-gray-100 dark:border-gray-700">
                  <RichText content={aboutData.schoolHistory} />
                </div>
              </Container>
            </section>
          )}

          {/* ── Principal's Message ── */}
          {aboutData?.principalMessage && aboutData.principalMessage.length > 0 && (
            <section
              ref={principalRef}
              className={`section-padding bg-white dark:bg-gray-900 transition-all duration-700 ${
                principalInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Container>
                <SectionTitle title="Principal's Message" subtitle="A word from our school leadership" />
                <div className="max-w-5xl mx-auto">
                  <div className="bg-gradient-to-br from-navy-50 to-primary-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-8 md:p-12 border border-navy-100 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row gap-10 items-start">
                      {/* Principal Photo */}
                      {aboutData.principalImage && (
                        <div className="flex-shrink-0 text-center">
                          <div
                            className="natural-image-card mx-auto w-full max-w-[18rem] md:mx-0"
                            style={getAspectRatioStyle(principalImageSize)}
                          >
                            <Image
                              src={urlFor(aboutData.principalImage).width(480).url()}
                              alt={aboutData.principalName || 'Principal'}
                              width={principalImageSize.width}
                              height={principalImageSize.height}
                              style={{ width: '100%', height: 'auto' }}
                              className="natural-gallery-image"
                              loading="lazy"
                              decoding="async"
                              sizes="(max-width: 768px) 18rem, 16rem"
                            />
                          </div>
                          {aboutData.principalName && (
                            <div className="mt-4">
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                {aboutData.principalName}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Principal</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Message */}
                      <div className="flex-1">
                        <FaQuoteLeft className="text-4xl text-navy-200 dark:text-navy-700 mb-4" />
                        <RichText content={aboutData.principalMessage} />
                        {!aboutData.principalImage && aboutData.principalName && (
                          <div className="mt-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-navy-700 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                              {aboutData.principalName[0]}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white">
                                {aboutData.principalName}
                              </p>
                              <p className="text-sm text-gray-500">Principal — KIRAN PUBLIC SCHOOL</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          )}

          {/* Fallback if no Sanity data */}
          {!aboutData && !loading && (
            <section className="section-padding">
              <Container>
                {/* Show default school info even without CMS */}
                <div className="max-w-3xl mx-auto">
                  <SectionTitle
                    title="About KIRAN PUBLIC SCHOOL"
                    subtitle="A premier CBSE school in Barharwa, Siwan"
                  />
                  <div className="bg-gradient-to-br from-navy-50 to-primary-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 border border-navy-100 dark:border-gray-700">
                    <div className="space-y-4">
                      {SCHOOL_INFO.map((info) => (
                        <div key={info.label} className="flex items-center gap-3">
                          <FaCheckCircle className="text-primary-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">
                            <strong>{info.label}:</strong> {info.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                      📝 Add detailed content from your <strong>Sanity CMS dashboard</strong> under the "About Page" section.
                    </p>
                  </div>
                </div>
              </Container>
            </section>
          )}
        </>
      )}
    </>
  )
}
