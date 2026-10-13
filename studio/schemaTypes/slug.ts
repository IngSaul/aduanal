/**
 * URL-safe slug from a Spanish title: no accents, lowercase, hyphenated.
 * "Publicación de la NOM-051" -> "publicacion-de-la-nom-051". The website's
 * server rules only accept [a-z0-9-] in /blog/<slug>/.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
    .replace(/-+$/g, '')
}

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
