import Head from 'next/head'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import Badge from '@/components/ui/Badge'
import { useFetch } from '@/hooks/useFetch'
import { fetchVideos, urlFor } from '@/lib/sanity'
import { getAspectRatioStyle, getSanityImageSize } from '@/lib/imageLayout'
import type { Video } from '@/types'
import { FaPlay, FaTimes, FaVideo, FaCalendarAlt } from 'react-icons/fa'

// ── Local static videos from /public/videos/ ──────────────────────────────
const LOCAL_VIDEOS: Array<{
  _id: string
  title: string
  description: string
  category: string
  videoSrc: string   // local MP4 path
  thumbnailFrame?: string  // use gallery image as thumb
  isLocal: true
  date?: string
}> = [
  {
    _id: 'local-v1',
    title: 'KIRAN PUBLIC SCHOOL — School Life',
    description: 'A glimpse into daily life and activities at KIRAN PUBLIC SCHOOL, Barharwa, Siwan.',
    category: 'School Introduction',
    videoSrc: '/videos/video1.mp4',
    isLocal: true,
  },
  {
    _id: 'local-v2',
    title: 'Student Activities',
    description: 'Students engaged in fun and educational activities at our school.',
    category: 'Student Activities',
    videoSrc: '/videos/video2.mp4',
    isLocal: true,
  },
  {
    _id: 'local-v3',
    title: 'School Events',
    description: 'Highlights from school events and celebrations.',
    category: 'School Events',
    videoSrc: '/videos/video3.mp4',
    isLocal: true,
  },
  {
    _id: 'local-v4',
    title: 'Annual Day Celebration',
    description: 'Annual day celebration and cultural performances at KIRAN PUBLIC SCHOOL.',
    category: 'Annual Day',
    videoSrc: '/videos/video4.mp4',
    isLocal: true,
  },
]

function getVideoEmbedUrl(url: string): string {
  if (url.includes('youtu.be')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${id}?autoplay=1`
  }
  if (url.includes('youtube.com/watch')) {
    const id = url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${id}?autoplay=1`
  }
  if (url.includes('youtube.com/embed')) {
    return url.includes('autoplay') ? url : `${url}?autoplay=1`
  }
  if (url.includes('vimeo.com')) {
    const id = url.split('vimeo.com/')[1]?.split('?')[0]
    return `https://player.vimeo.com/video/${id}?autoplay=1`
  }
  return url
}

interface ActiveVideo {
  title: string
  description?: string
  category?: string
  isLocal: boolean
  // For YouTube/Vimeo
  embedUrl?: string
  // For local MP4
  localSrc?: string
}

export default function VideosPage() {
  const { data: videosData, loading, error } = useFetch<Video[]>(() => fetchVideos(), [])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null)

  // Build display: Sanity CMS first, fallback to local MP4s
  const usingSanity = videosData && videosData.length > 0

  const categories = useMemo(() => {
    if (usingSanity) {
      return Array.from(new Set(videosData!.map((v) => v.category).filter(Boolean))) as string[]
    }
    return Array.from(new Set(LOCAL_VIDEOS.map((v) => v.category)))
  }, [videosData, usingSanity])

  const filteredSanityVideos = useMemo(() => {
    if (!videosData) return []
    return !selectedCategory ? videosData : videosData.filter((v) => v.category === selectedCategory)
  }, [videosData, selectedCategory])

  const filteredLocalVideos = useMemo(() => {
    return !selectedCategory
      ? LOCAL_VIDEOS
      : LOCAL_VIDEOS.filter((v) => v.category === selectedCategory)
  }, [selectedCategory])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error loading Videos</h1>
            <p className="text-gray-500">Please check your Sanity CMS connection.</p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Video Gallery — KIRAN PUBLIC SCHOOL | Barharwa, Siwan</title>
        <meta name="description" content="Watch school introduction, annual day, and student activity videos from KIRAN PUBLIC SCHOOL, Barharwa, Siwan." />
      </Head>

      {/* Page Header */}
      <section className="page-header text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <SectionTitle
              title="Video Gallery"
              subtitle="Watch school introductions, events, and student activities"
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
                    All Videos
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

              {/* ── Sanity CMS Videos ── */}
              {usingSanity && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSanityVideos.map((video) => {
                    const thumbnailSize = getSanityImageSize(video.thumbnail, {
                      width: 600,
                      height: 340,
                    })

                    return (
                      <div
                        key={video._id}
                        className="group premium-card overflow-hidden !p-0 cursor-pointer"
                        onClick={() =>
                          setActiveVideo({
                            title: video.title,
                            description: video.description,
                            category: video.category,
                            isLocal: false,
                            embedUrl: getVideoEmbedUrl(video.videoUrl),
                          })
                        }
                      >
                        <div
                          className="relative w-full overflow-hidden rounded-t-2xl bg-black"
                          style={video.thumbnail ? getAspectRatioStyle(thumbnailSize) : undefined}
                        >
                          {video.thumbnail ? (
                            <Image
                              src={urlFor(video.thumbnail).width(900).url()}
                              alt={video.title}
                              width={thumbnailSize.width}
                              height={thumbnailSize.height}
                              style={{ width: '100%', height: 'auto' }}
                              className="natural-gallery-image"
                              loading="lazy"
                              decoding="async"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full aspect-video bg-gradient-to-br from-navy-800 to-primary-900 flex items-center justify-center">
                              <FaVideo className="text-5xl text-white/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                              <FaPlay className="text-navy-700 text-xl ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          {video.category && <Badge label={video.category} variant="primary" size="sm" />}
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2 line-clamp-2">
                            {video.title}
                          </h3>
                          {video.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                              {video.description}
                            </p>
                          )}
                          {video.date && (
                            <p className="text-xs text-gray-400 flex items-center gap-1.5">
                              <FaCalendarAlt className="text-gold-500" />
                              {new Date(video.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* ── Local MP4 Videos (fallback) ── */}
              {!usingSanity && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredLocalVideos.map((video) => (
                    <div
                      key={video._id}
                      className="group premium-card overflow-hidden !p-0 cursor-pointer"
                      onClick={() =>
                        setActiveVideo({
                          title: video.title,
                          description: video.description,
                          category: video.category,
                          isLocal: true,
                          localSrc: video.videoSrc,
                        })
                      }
                    >
                      {/* Video preview thumbnail (native browser preview) */}
                      <div className="relative w-full bg-black overflow-hidden rounded-t-2xl">
                        <video
                          src={video.videoSrc}
                          className="w-full h-auto block"
                          muted
                          preload="metadata"
                          style={{ pointerEvents: 'none' }}
                        />
                        {/* Play overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                            <FaPlay className="text-navy-700 text-2xl ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <Badge label={video.category} variant="primary" size="sm" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {video.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                          <FaVideo className="text-navy-500" />
                          Click to play full video
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(usingSanity ? filteredSanityVideos : filteredLocalVideos).length === 0 && (
                <div className="text-center py-20">
                  <FaVideo className="text-6xl text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No videos in this category.
                  </p>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      {/* ── Video Modal ── */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <FaTimes />
            </button>

            {/* Video Info */}
            <div className="mb-3">
              <h3 className="text-white font-bold text-lg">{activeVideo.title}</h3>
              {activeVideo.category && (
                <Badge label={activeVideo.category} variant="primary" size="sm" />
              )}
            </div>

            {/* Local MP4 Player */}
            {activeVideo.isLocal && activeVideo.localSrc && (
              <div className="relative w-full rounded-2xl overflow-hidden bg-black">
                <video
                  src={activeVideo.localSrc}
                  controls
                  autoPlay
                  className="w-full max-h-[70vh] rounded-2xl"
                  style={{ display: 'block' }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* YouTube / Vimeo Embed */}
            {!activeVideo.isLocal && activeVideo.embedUrl && (
              <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {activeVideo.description && (
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">{activeVideo.description}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
