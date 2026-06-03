import { useState, useEffect } from 'react'

interface UseFetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const isSanityConfigured =
  !!SANITY_PROJECT_ID &&
  SANITY_PROJECT_ID !== 'YOUR_PROJECT_ID' &&
  /^[a-z0-9-]+$/.test(SANITY_PROJECT_ID)

export function useFetch<T>(
  fetchFunction: () => Promise<T>,
  dependencies?: any[]
): UseFetchState<T> {
  // If Sanity is not configured, skip the fetch immediately — return null data
  // so local fallbacks (images, videos) are shown right away without any loading state.
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: isSanityConfigured, // false immediately if not configured
    error: null,
  })

  useEffect(() => {
    if (!isSanityConfigured) {
      // No Project ID set — skip fetch, local fallbacks will be used
      setState({ data: null, loading: false, error: null })
      return
    }

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }))
        const result = await fetchFunction()
        setState({ data: result, loading: false, error: null })
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err : new Error('Unknown error'),
        })
      }
    }

    fetchData()
  }, dependencies)

  return state
}
