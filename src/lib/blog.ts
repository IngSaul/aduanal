import type { PortableTextBlock } from '@portabletext/react'
import { sanity, type SanityImage } from './sanity'

/**
 * GROQ queries and types for the "Noticias" blog. Only published posts whose
 * `publishedAt` has arrived are ever returned, so editors can schedule posts.
 */

export const PAGE_SIZE = 9

export type PostCard = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  coverImage: SanityImage
  category?: { title: string; slug: string } | null
}

/** An image placed inside the post body. */
export type BodyImage = SanityImage & { _type: 'image'; _key: string }

export type Post = PostCard & {
  _updatedAt: string
  body: (PortableTextBlock | BodyImage)[]
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: SanityImage } | null
}

export type PostPage = { posts: PostCard[]; total: number }

const VISIBLE = /* groq */ `_type == "post" && defined(slug.current) && publishedAt <= now()`

const CARD = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage{ asset, hotspot, crop, alt },
  category->{ title, "slug": slug.current }
`

const FULL = /* groq */ `
  ${CARD},
  _updatedAt,
  body,
  seo{ metaTitle, metaDescription, ogImage{ asset, hotspot, crop } }
`

const PAGE_QUERY = /* groq */ `{
  "posts": *[${VISIBLE}] | order(publishedAt desc) [$start...$end] { ${CARD} },
  "total": count(*[${VISIBLE}])
}`

const POST_QUERY = /* groq */ `*[${VISIBLE} && slug.current == $slug][0]{ ${FULL} }`

const ALL_QUERY = /* groq */ `*[${VISIBLE}] | order(publishedAt desc) { ${FULL} }`

/** Dev server only: `VITE_BLOG_FIXTURES=true` serves the sample posts. Dropped from production bundles. */
async function devFixtures(): Promise<Post[] | null> {
  if (import.meta.env.DEV && import.meta.env.VITE_BLOG_FIXTURES === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 600)) // make loading states visible
    return (await import('./blog-fixtures')).FIXTURE_POSTS
  }
  return null
}

export const toCard = ({ _id, title, slug, publishedAt, excerpt, coverImage, category }: Post): PostCard => ({
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  coverImage,
  category: category ?? null,
})

export async function fetchPostPage(start: number, count = PAGE_SIZE): Promise<PostPage> {
  const fixtures = await devFixtures()
  if (fixtures) return { posts: fixtures.slice(start, start + count).map(toCard), total: fixtures.length }
  if (!sanity) return { posts: [], total: 0 }
  return sanity.fetch<PostPage>(PAGE_QUERY, { start, end: start + count })
}

export async function fetchPost(slug: string): Promise<Post | null> {
  const fixtures = await devFixtures()
  if (fixtures) return fixtures.find((post) => post.slug === slug) ?? null
  if (!sanity) return null
  return sanity.fetch<Post | null>(POST_QUERY, { slug })
}

/** Every visible post with its full body. Used by the build-time prerender. */
export async function fetchAllPosts(): Promise<Post[]> {
  if (!sanity) return []
  return sanity.fetch<Post[]>(ALL_QUERY)
}

/** "12 de octubre de 2026". Fixed time zone so server and browser agree. */
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Mexico_City',
  }).format(new Date(iso))
