import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { canonicalUrl, robotsContent } from './head'
import { findSeoRoute } from './routes'

/** Find or create a `<head>` element matched by `selector`. */
function headElement<T extends HTMLElement>(selector: string, create: () => T): T {
  const existing = document.head.querySelector<T>(selector)
  if (existing) return existing
  const element = create()
  document.head.appendChild(element)
  return element
}

function setMeta(name: string, content: string) {
  headElement(`meta[name="${name}"]`, () => {
    const meta = document.createElement('meta')
    meta.name = name
    return meta
  }).content = content
}

/**
 * Keeps title, description, robots and canonical in step with client-side
 * navigation. The prerendered HTML already carries the same values on load.
 */
export function useRouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const route = findSeoRoute(pathname)
    document.title = route.title
    setMeta('description', route.description)
    setMeta('robots', robotsContent(route))

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
