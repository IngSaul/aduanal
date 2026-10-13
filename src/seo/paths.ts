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
} as const

export type PublicPath = (typeof PATHS)[keyof typeof PATHS]
