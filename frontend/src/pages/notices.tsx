import Head from 'next/head'
import { useState, useMemo } from 'react'
import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import Badge from '@/components/ui/Badge'
import RichText from '@/components/common/RichText'
import { useFetch } from '@/hooks/useFetch'
import { fetchAllNotices } from '@/lib/sanity'
import type { Notice } from '@/types'
import { FaFilePdf, FaSearch, FaBell, FaCalendarAlt } from 'react-icons/fa'

const getCategoryColor = (category?: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' => {
  switch (category) {
    case 'Admission': return 'info'
    case 'Exam': return 'danger'
    case 'Event': return 'success'
    case 'Holiday': return 'warning'
    default: return 'primary'
  }
}

export default function NoticesPage() {
  const { data: noticesData, loading, error } = useFetch<Notice[]>(() => fetchAllNotices(), [])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showOnlyImportant, setShowOnlyImportant] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = useMemo(() => {
    if (!noticesData) return []
    return Array.from(new Set(noticesData.map((n) => n.category).filter(Boolean))) as string[]
  }, [noticesData])

  const filteredNotices = useMemo(() => {
    if (!noticesData) return []
    return noticesData.filter((notice) => {
      const matchesCategory = !selectedCategory || notice.category === selectedCategory
      const matchesImportant = !showOnlyImportant || notice.isImportant
      const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesImportant && matchesSearch
    })
  }, [noticesData, selectedCategory, showOnlyImportant, searchQuery])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error loading Notices</h1>
            <p className="text-gray-500">Please check your Sanity CMS connection.</p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Notice Board — KIRAN PUBLIC SCHOOL | Barharwa, Siwan</title>
        <meta name="description" content="Latest notices and announcements from KIRAN PUBLIC SCHOOL, Barharwa, Siwan. Stay updated with school news, exam schedules, events, and important circulars." />
      </Head>

      {/* Page Header */}
      <section className="page-header text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <SectionTitle
              title="Notice Board"
              subtitle="Stay updated with the latest school announcements and notifications"
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
              {/* Search & Filter Panel */}
              <div className="mb-10 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-700 space-y-5">
                {/* Search */}
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notices by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-11"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  {/* Category Filter */}
                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`filter-btn ${!selectedCategory ? 'filter-btn-active' : 'filter-btn-inactive'}`}
                      >
                        All
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

                  {/* Important Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer ml-auto flex-shrink-0">
                    <div
                      className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
                        showOnlyImportant ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                      onClick={() => setShowOnlyImportant(!showOnlyImportant)}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                          showOnlyImportant ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Important Only
                    </span>
                  </label>
                </div>
              </div>

              {/* Results count */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Showing <strong className="text-gray-900 dark:text-white">{filteredNotices.length}</strong> of{' '}
                <strong className="text-gray-900 dark:text-white">{noticesData?.length || 0}</strong> notices
              </p>

              {/* Notices List */}
              <div className="space-y-4">
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice) => (
                    <div
                      key={notice._id}
                      className={`bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-200 hover:shadow-card p-6 ${
                        notice.isImportant
                          ? 'border-l-4 border-l-red-500 border-gray-100 dark:border-gray-700'
                          : 'border-gray-100 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                          notice.isImportant
                            ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'
                            : 'bg-navy-100 dark:bg-navy-900/50 text-navy-600 dark:text-navy-400'
                        }`}>
                          <FaBell />
                        </div>

                        <div className="flex-1">
                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {notice.isImportant && (
                              <Badge label="⚠️ Important" variant="danger" size="sm" />
                            )}
                            {notice.category && (
                              <Badge label={notice.category} variant={getCategoryColor(notice.category)} size="sm" />
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {notice.title}
                          </h3>

                          {/* Date */}
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-3">
                            <FaCalendarAlt className="text-gold-500" />
                            {new Date(notice.date).toLocaleDateString('en-IN', {
                              year: 'numeric', month: 'long', day: 'numeric',
                            })}
                          </p>

                          {/* Description */}
                          {notice.description && (
                            <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                              <RichText content={notice.description} />
                            </div>
                          )}

                          {/* PDF */}
                          {notice.pdfAttachment && (
                            <a
                              href={notice.pdfAttachment.asset.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900 transition font-semibold text-sm"
                            >
                              <FaFilePdf /> Download PDF
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <FaBell className="text-6xl text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      {searchQuery || selectedCategory || showOnlyImportant
                        ? 'No notices match your filters.'
                        : 'No notices yet. Add them from your Sanity CMS dashboard.'}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  )
}
