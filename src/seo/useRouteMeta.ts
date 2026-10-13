import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { canonicalUrl, robotsContent, socialTags } from './head'
import { isPostPath } from './paths'
import { findSeoRoute, type SeoRoute } from './routes'

/** Find or create a `<head>` element matched by `selector`. */
function headElement<T extends HTMLElement>(selector: string, create: () => T): T {
  const existing = document.head.querySelector<T>(selector)
  if (existing) return existing
  const element = create()
  document.head.appendChild(element)
  return element
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  headElement(`meta[${attr}="${name}"]`, () => {
    const meta = document.createElement('meta')
    meta.setAttribute(attr, name)
    return meta
  }).content = content
}

/** Write a route's title, description, robots, canonical and social tags into `<head>`. */
export function applyRouteMeta(route: SeoRoute) {
  document.title = route.title
  setMeta('description', route.description)
  setMeta('robots', robotsContent(route))

  // Drop social tags the new route does not use (e.g. article:* after a post).
  const tags = socialTags(route)
  const keys = new Set(tags.map((tag) => tag.key))
  document.head
    .querySelectorAll<HTMLMetaElement>('meta[property^="og:"], meta[property^="article:"], meta[name^="twitter:"]')
    .forEach((meta) => {
      if (!keys.has(meta.getAttribute('property') ?? meta.name)) meta.remove()
    })
  for (const tag of tags) setMeta(tag.key, tag.content, tag.attr)

  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (route.indexable) {
    headElement('link[rel="canonical"]', () => {
      const link = document.createElement('link')
      link.rel = 'canonical'
      return link
    }).href = canonicalUrl(route)
  } else {
    canonical?.remove()
  }
}

/**
 * Keeps the head in step with client-side navigation. The prerendered HTML
 * already carries the same values on load. Blog posts depend on fetched data,
 * so BlogPost applies their head itself once the post is known.
 */
export function useRouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!isPostPath(pathname)) applyRouteMeta(findSeoRoute(pathname))
  }, [pathname])
}
