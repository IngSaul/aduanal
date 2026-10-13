import { photo } from '../content/copy'
import type { SeoRoute } from './routes'
import { buildSchema } from './schema'
import { SITE } from './site'

/** Absolute canonical URL of a route. */
export const canonicalUrl = (route: SeoRoute) => `${SITE.url}${route.path}`

export const robotsContent = (route: SeoRoute) => (route.indexable ? 'index,follow' : 'noindex,follow')

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** JSON that cannot close its own `<script>` tag. */
const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c')

/**
 * The per-route part of `<head>`, injected by the prerender at `<!--app-head-->`.
 * Open Graph tags are added by a later step and are deliberately absent.
 */
export function renderHead(route: SeoRoute): string {
  const tags = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${robotsContent(route)}" />`,
  ]

  if (route.indexable) tags.push(`<link rel="canonical" href="${canonicalUrl(route)}" />`)

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
