import type { CSSProperties } from 'react'
import type { ImageDimensions, SanityImage } from '@/types'

export interface NaturalImageSize {
  width: number
  height: number
}

export const DEFAULT_GALLERY_IMAGE_SIZE: NaturalImageSize = {
  width: 1200,
  height: 900,
}

export function getSanityImageSize(
  image?: SanityImage | null,
  fallback: NaturalImageSize = DEFAULT_GALLERY_IMAGE_SIZE
): NaturalImageSize {
  const dimensions: ImageDimensions | undefined =
    image?.dimensions || image?.asset?.metadata?.dimensions

  if (dimensions?.width && dimensions?.height) {
    return {
      width: dimensions.width,
      height: dimensions.height,
    }
  }

  return fallback
}

export function getAspectRatioStyle(
  dimensions?: Partial<NaturalImageSize> | null
): CSSProperties | undefined {
  if (!dimensions?.width || !dimensions?.height) {
    return undefined
  }

  return {
    aspectRatio: `${dimensions.width} / ${dimensions.height}`,
  }
}
