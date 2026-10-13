/**
 * Canonical path of every public page: lowercase, hyphenated and with a
 * trailing slash, because each one is prerendered to `dist/<path>/index.html`.
 * Internal links, canonicals and the sitemap all use these exact strings.
 */
export const PATHS = {
  home: '/',
  services: '/servicios/',
  about: '/nosotros/',
  contact: '/contacto/',
  privacy: '/aviso-de-privacidad/',
  blog: '/blog/',
} as const

export type PublicPath = (typeof PATHS)[keyof typeof PATHS]

/** Canonical path of a blog post. */
export const postPath = (slug: string) => `${PATHS.blog}${slug}/`

/** True for /blog/<slug>/ (not for the /blog/ list itself). */
export const isPostPath = (pathname: string) => /^\/blog\/[^/]+\/?$/.test(pathname)
