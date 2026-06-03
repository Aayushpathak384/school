// Utility functions for the application

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Extract video ID from YouTube or Vimeo URL
 */
export const extractVideoId = (url: string): { id: string; type: 'youtube' | 'vimeo' } | null => {
  // YouTube URL formats
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) {
    return { id: youtubeMatch[1], type: 'youtube' }
  }

  // Vimeo URL format
  const vimeoRegex = /vimeo\.com\/(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch) {
    return { id: vimeoMatch[1], type: 'vimeo' }
  }

  return null
}

/**
 * Get embedded video URL
 */
export const getEmbeddedVideoUrl = (url: string): string => {
  const video = extractVideoId(url)
  if (!video) return url

  if (video.type === 'youtube') {
    return `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`
  } else if (video.type === 'vimeo') {
    return `https://player.vimeo.com/video/${video.id}`
  }

  return url
}

/**
 * Truncate text to specified length with ellipsis
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Get WhatsApp link with optional message
 */
export const getWhatsAppLink = (phoneNumber: string, message?: string): string => {
  let link = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`
  if (message) {
    link += `?text=${encodeURIComponent(message)}`
  }
  return link
}

/**
 * Scroll to element smoothly
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
