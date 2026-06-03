import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number | number[]
  margin?: string
  triggerOnce?: boolean
}

export function useInView(options: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (options.triggerOnce) {
            setHasTriggered(true)
          }
        } else if (!options.triggerOnce) {
          setIsInView(false)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.margin || '0px',
      }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [options.threshold, options.margin, options.triggerOnce])

  if (options.triggerOnce && hasTriggered) {
    return { ref, isInView: true }
  }

  return { ref, isInView }
}
