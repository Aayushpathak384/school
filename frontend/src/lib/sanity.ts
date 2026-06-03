import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Validate that projectId only contains valid characters (a-z, 0-9, dashes)
const isValidProjectId = projectId && /^[a-z0-9-]+$/.test(projectId)

let _client: SanityClient | null = null

function getClient(): SanityClient {
  if (!_client) {
    if (!isValidProjectId) {
      // Return a dummy client that will fail gracefully
      _client = createClient({
        projectId: 'placeholder',
        dataset: 'production',
        apiVersion,
        useCdn: false,
      })
    } else {
      _client = createClient({
        projectId: projectId!,
        dataset,
        apiVersion,
        useCdn: true,
      })
    }
  }
  return _client
}

export const client = {
  fetch: (query: string, params?: Record<string, any>) => getClient().fetch(query, params),
}

const builder = imageUrlBuilder(
  createClient({
    projectId: isValidProjectId ? projectId! : 'placeholder',
    dataset,
    apiVersion,
    useCdn: true,
  })
)

export const urlFor = (source: any) => builder.image(source)

// ─── Reusable fetch with graceful error handling ───────────────────────────────
export async function fetchData(query: string, params: Record<string, any> = {}): Promise<any> {
  if (!isValidProjectId) {
    console.warn(
      '[Sanity] Project ID not configured. Add NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local\n' +
      'Get your project ID from: https://sanity.io/manage'
    )
    return null
  }
  try {
    const sanityClient = createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
    })
    const data = await sanityClient.fetch(query, params)
    return data
  } catch (error) {
    console.error('[Sanity] Error fetching data:', error)
    return null
  }
}

// ─── Content Fetchers ─────────────────────────────────────────────────────────

export async function fetchHomepage() {
  return fetchData(`*[_type == "homepage"][0]`)
}

export async function fetchAbout() {
  return fetchData(`*[_type == "about"][0]{
    ...,
    schoolLogo {
      ...,
      "dimensions": asset->metadata.dimensions
    },
    principalImage {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }`)
}

/** Fetch banner carousel images for homepage hero */
export async function fetchBanners() {
  return fetchData(`*[_type == "banners"][0]{
    _id,
    title,
    autoplayInterval,
    images[] {
      image,
      caption,
      altText
    }
  }`)
}

/** Fetch school logo singleton from CMS */
export async function fetchLogo() {
  return fetchData(`*[_type == "logo"][0]{
    ...,
    schoolLogo {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }`)
}

export async function fetchNotices() {
  return fetchData(`*[_type == "notice"] | order(date desc)[0...6] {
    _id,
    title,
    date,
    isImportant,
    category,
    pdfAttachment { asset -> { url } }
  }`)
}

export async function fetchAllNotices() {
  return fetchData(`*[_type == "notice"] | order(date desc) {
    _id,
    title,
    description,
    date,
    isImportant,
    category,
    pdfAttachment { asset -> { url } }
  }`)
}

export async function fetchGallery() {
  return fetchData(`*[_type == "gallery"] | order(order asc) {
    ...,
    images[] {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }`)
}

export async function fetchGalleryByCategory(category: string) {
  return fetchData(`*[_type == "gallery" && category == $category] | order(order asc) {
    ...,
    images[] {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }`, { category })
}

export async function fetchVideos() {
  return fetchData(`*[_type == "video"] | order(order asc) {
    ...,
    thumbnail {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }`)
}

export async function fetchContact() {
  return fetchData(`*[_type == "contact"][0]`)
}
