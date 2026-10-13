import { createClient, type SanityClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

/**
 * Read-only Sanity access for the "Noticias" blog. The dataset is public, so
 * there is no token: published documents only, served from the CDN.
 */

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? ''
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
export const sanityConfigured = projectId !== ''

/** Pinned so a Content Lake release never changes query results under us. */
const apiVersion = '2025-02-19'

export const sanity: SanityClient | null = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null

const builder = createImageUrlBuilder({ projectId: projectId || 'unset', dataset })

/** An image field as the blog queries return it. */
export type SanityImage = {
  asset?: { _ref: string }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
  caption?: string
  /** Sample posts only (src/lib/blog-fixtures.ts): a photo under public/images. */
  localSrc?: string
}

export const urlFor = (image: SanityImage) => builder.image(image)

/** Original size, encoded in the asset id: image-<hash>-<w>x<h>-<format>. */
function assetSize(image: SanityImage) {
  const match = image.asset?._ref.match(/-(\d+)x(\d+)-[a-z]+$/)
  return match ? { width: Number(match[1]), height: Number(match[2]) } : { width: 1600, height: 900 }
}

export type ImageProps = { src: string; srcSet?: string; sizes?: string; width: number; height: number }

/**
 * `<img>` attributes for a Sanity image: a responsive srcSet in the format the
 * browser prefers (WebP/AVIF via `auto=format`), cropped around the hotspot
 * when `aspect` is given, with explicit width and height.
 */
export function imageProps(
  image: SanityImage,
  { width, aspect, sizes, widths = [480, 768, 1080, 1440] }: { width: number; aspect?: number; sizes: string; widths?: number[] },
): ImageProps {
  const original = assetSize(image)
  const ratio = aspect ?? original.width / original.height
  const height = Math.round(width / ratio)
  if (image.localSrc) return { src: image.localSrc, width, height }

  const at = (w: number) => {
    const url = urlFor(image).width(w).fit('crop').auto('format').quality(80)
    return (aspect ? url.height(Math.round(w / aspect)) : url).url()
  }
  const candidates = widths.filter((w) => w <= original.width)
  return {
    src: at(width),
    srcSet: (candidates.length ? candidates : [original.width]).map((w) => `${at(w)} ${w}w`).join(', '),
    sizes,
    width,
    height,
  }
}

/** 1200×630 JPG of an image, for Open Graph and Twitter cards. */
export const shareImageUrl = (image: SanityImage) =>
  urlFor(image).width(1200).height(630).fit('crop').format('jpg').quality(80).url()
