import { photo } from '../content/copy'
import type { SeoRoute } from './routes'
import { buildSchema } from './schema'
import { SITE } from './site'

/** Absolute canonical URL of a route. */
export const canonicalUrl = (route: SeoRoute) => `${SITE.url}${route.path}`

export const robotsContent = (route: SeoRoute) => (route.indexable ? 'index,follow' : 'noindex,follow')

/** A social tag: Open Graph uses `property`, Twitter uses `name`. */
export type SocialTag = { attr: 'property' | 'name'; key: string; content: string }

/**
 * Open Graph and Twitter card tags for a route, all absolute https URLs: the
 * production domain, or the Sanity image CDN for a post's cover. Noindex pages
 * share the brand card and point to the home.
 */
export function socialTags(route: SeoRoute): SocialTag[] {
  const title = route.ogTitle ?? route.title
  const description = route.ogDescription ?? route.description
  const image = route.ogImage.startsWith('https://') ? route.ogImage : `${SITE.url}${route.ogImage}`
  const url = route.indexable ? canonicalUrl(route) : `${SITE.url}/`
  const og = (key: string, content: string): SocialTag => ({ attr: 'property', key, content })
  const tw = (key: string, content: string): SocialTag => ({ attr: 'name', key, content })

  return [
    og('og:type', route.ogType ?? 'website'),
    og('og:site_name', SITE.name),
    og('og:locale', 'es_MX'),
    og('og:url', url),
    og('og:title', title),
    og('og:description', description),
    og('og:image', image),
    og('og:image:secure_url', image),
    og('og:image:type', 'image/jpeg'),
    og('og:image:width', '1200'),
    og('og:image:height', '630'),
    og('og:image:alt', route.ogImageAlt),
    ...(route.ogType === 'article' && route.article
      ? [
          og('article:published_time', route.article.publishedTime),
          og('article:modified_time', route.article.modifiedTime),
        ]
      : []),
    tw('twitter:card', 'summary_large_image'),
    ...(SITE.xHandle ? [tw('twitter:site', SITE.xHandle)] : []),
    tw('twitter:title', title),
    tw('twitter:description', description),
    tw('twitter:image', image),
    tw('twitter:image:alt', route.ogImageAlt),
  ]
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** JSON that cannot close its own `<script>` tag. */
const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c')

/** The per-route part of `<head>`, injected by the prerender at `<!--app-head-->`. */
export function renderHead(route: SeoRoute): string {
  const tags = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${robotsContent(route)}" />`,
  ]

  if (route.indexable) tags.push(`<link rel="canonical" href="${canonicalUrl(route)}" />`)

  for (const tag of socialTags(route)) {
    tags.push(`<meta ${tag.attr}="${tag.key}" content="${escapeHtml(tag.content)}" />`)
  }

  if (route.lcpImage) {
    tags.push(
      `<link rel="preload" as="image" href="${photo(route.lcpImage)}" type="image/webp" fetchpriority="high" />`,
    )
  }

  if (SITE.googleSiteVerification) {
    tags.push(`<meta name="google-site-verification" content="${escapeHtml(SITE.googleSiteVerification)}" />`)
  }

  if (SITE.ga4Id) {
    const id = escapeHtml(SITE.ga4Id)
    tags.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');</script>`,
    )
  }

  const schema = buildSchema(route)
  if (schema) tags.push(`<script type="application/ld+json">${safeJson(schema)}</script>`)

  return tags.join('\n    ')
}
