import { es } from '../content/copy'
import type { Post, PostCard } from '../lib/blog'
import { shareImageUrl } from '../lib/sanity'
import { PATHS, postPath } from './paths'
import { findSeoRoute, type SeoRoute } from './routes'
import { SITE } from './site'

/**
 * SEO for the blog, built from Sanity data with the same `SeoRoute` shape as
 * the static registry, so the prerender, `renderHead`, `socialTags`, the
 * JSON-LD and the client head sync handle posts exactly like any other page.
 */

const BRAND = ` | ${SITE.name}`

/** Shorten at a word boundary, ending in "…". */
export function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ') > max * 0.6 ? cut.lastIndexOf(' ') : cut.length).replace(/[,;:.\s]+$/, '')}…`
}

/** The /blog/ registry entry plus its first page of posts for the Blog schema. */
export function blogIndexRoute(posts: PostCard[], lastmod?: string): SeoRoute {
  return {
    ...findSeoRoute(PATHS.blog),
    blogPosts: posts.map((post) => ({ title: post.title, path: postPath(post.slug), publishedAt: post.publishedAt })),
    lastmod,
  }
}

/** Head, card and schema data for one post. Empty SEO fields fall back to title, excerpt and cover. */
export function postSeoRoute(post: Post): SeoRoute {
  const metaTitle = post.seo?.metaTitle?.trim()
  const metaDescription = post.seo?.metaDescription?.trim()
  const shareSource = post.seo?.ogImage?.asset ? post.seo.ogImage : post.coverImage
  // Sample posts have local photos and no Sanity asset: use the blog's brand card.
  const image = shareSource.asset ? shareImageUrl(shareSource) : findSeoRoute(PATHS.blog).ogImage

  return {
    path: postPath(post.slug),
    title: metaTitle || (post.title.length + BRAND.length <= 60 ? `${post.title}${BRAND}` : post.title),
    description: metaDescription || clip(post.excerpt, 160),
    h1: post.title,
    indexable: true,
    priority: 0.5,
    changefreq: 'monthly',
    schema: ['WebSite', 'ProfessionalService', 'BlogPosting', 'BreadcrumbList'],
    ogType: 'article',
    ogTitle: clip(metaTitle || post.title, 60),
    ogDescription: clip(metaDescription || post.excerpt, 110),
    ogImage: image,
    ogImageAlt: shareSource.alt || post.coverImage.alt || post.title,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      image: image.startsWith('http') ? image : `${SITE.url}${image}`,
    },
    breadcrumbs: [
      { name: es.blog.home, path: PATHS.home },
      { name: es.blog.eyebrow, path: PATHS.blog },
      { name: post.title, path: postPath(post.slug) },
    ],
    lastmod: post._updatedAt,
  }
}
