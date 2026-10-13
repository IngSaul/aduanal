import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { canonicalUrl, robotsContent, socialTags } from './head'
import { findSeoRoute } from './routes'

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

/**
 * Keeps title, description, robots, canonical and the social tags in step with
 * client-side navigation. The prerendered HTML already carries them on load.
 */
export function useRouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const route = findSeoRoute(pathname)
    document.title = route.title
    setMeta('description', route.description)
    setMeta('robots', robotsContent(route))
    for (const tag of socialTags(route)) setMeta(tag.key, tag.content, tag.attr)

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
  }, [pathname])
}
