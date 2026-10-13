// Audits the prerendered HTML in dist/ against the route registry: SEO head,
// headings, JSON-LD, sitemap, and the Open Graph / Twitter card tags and images.
// Exits with code 1 and lists every problem found. No dependencies.
import { readFile, stat } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { SEO_ROUTES, PRIVATE_PATHS, SITE } = await import(
  pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
)

const errors = []
const fail = (where, message) => errors.push(`${where}: ${message}`)

const decode = (text) =>
  text
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()

const all = (html, regex) => [...html.matchAll(regex)]
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]

const descriptions = new Map()
const indexable = SEO_ROUTES.filter((route) => route.indexable)

/** Width and height from a PNG (IHDR) or JPEG (SOFn) header. */
function imageSize(buffer) {
  if (buffer.readUInt32BE(0) === 0x89504e47) return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) return null
      const marker = buffer[offset + 1]
      const length = buffer.readUInt16BE(offset + 2)
      const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)
      if (isSof) return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) }
      offset += 2 + length
    }
  }
  return null
}

const REQUIRED_SOCIAL = [
  'og:type', 'og:site_name', 'og:locale', 'og:url', 'og:title', 'og:description',
  'og:image', 'og:image:secure_url', 'og:image:type', 'og:image:width', 'og:image:height', 'og:image:alt',
  'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt',
]
const URL_TAGS = ['og:url', 'og:image', 'og:image:secure_url', 'twitter:image']
const checkedImages = new Map()

/** Open Graph and Twitter card checks shared by every page, indexable or not. */
async function checkSocial(where, html, canonical) {
  const tags = new Map()
  for (const [, attr, key, content] of all(html, /<meta (property|name)="((?:og|twitter):[^"]+)" content="([^"]*)"/g)) {
    if (tags.has(key)) fail(where, `${key} appears more than once`)
    tags.set(key, decode(content))
  }
  for (const key of REQUIRED_SOCIAL) if (!tags.get(key)) fail(where, `missing ${key}`)

  for (const key of URL_TAGS) {
    const value = tags.get(key)
    if (value && !value.startsWith(`${SITE.url}/`)) fail(where, `${key} is not an absolute ${SITE.url} URL: ${value}`)
  }
  if (canonical && tags.get('og:url') !== canonical) fail(where, `og:url ${tags.get('og:url')} differs from canonical ${canonical}`)
  if (tags.get('og:locale') && tags.get('og:locale') !== 'es_MX') fail(where, 'og:locale is not es_MX')
  if (tags.get('twitter:card') && tags.get('twitter:card') !== 'summary_large_image') fail(where, 'twitter:card is not summary_large_image')
  if ((tags.get('og:title') ?? '').length > 60) fail(where, `og:title is ${tags.get('og:title').length} characters (max 60)`)
  if ((tags.get('og:description') ?? '').length > 110) fail(where, `og:description is ${tags.get('og:description').length} characters (max 110)`)
  if (tags.get('og:image:width') !== '1200' || tags.get('og:image:height') !== '630') fail(where, 'og:image:width/height are not 1200×630')
  if (tags.get('og:image') !== tags.get('twitter:image')) fail(where, 'og:image and twitter:image differ')

  const image = tags.get('og:image')
  if (!image?.startsWith(`${SITE.url}/`)) return
  const file = join(dist, image.slice(SITE.url.length))
  if (!checkedImages.has(file)) {
    try {
      const buffer = await readFile(file)
      checkedImages.set(file, { size: imageSize(buffer), bytes: (await stat(file)).size })
    } catch {
      checkedImages.set(file, null)
    }
  }
  const info = checkedImages.get(file)
  if (!info) return fail(where, `og:image not found in dist: ${image}`)
  if (!info.size || info.size.width !== 1200 || info.size.height !== 630)
    fail(where, `og:image is ${info.size ? `${info.size.width}×${info.size.height}` : 'unreadable'} (expected 1200×630)`)
  if (info.bytes >= 300 * 1024) fail(where, `og:image weighs ${Math.round(info.bytes / 1024)} KB (must stay under 300 KB)`)
  const type = image.endsWith('.png') ? 'image/png' : 'image/jpeg'
  if (tags.get('og:image:type') !== type) fail(where, `og:image:type ${tags.get('og:image:type')} does not match ${type}`)
}

for (const route of indexable) {
  const where = route.path
  let html
  try {
    html = await readFile(join(dist, route.path, 'index.html'), 'utf8')
  } catch {
    fail(where, 'no prerendered index.html')
    continue
  }

  const titles = all(html, /<title>([\s\S]*?)<\/title>/g)
  if (titles.length !== 1) fail(where, `${titles.length} <title> tags (expected 1)`)

  const h1s = all(html, /<h1[\s>][\s\S]*?<\/h1>/g)
  if (h1s.length !== 1) fail(where, `${h1s.length} <h1> tags (expected 1)`)
  else if (decode(h1s[0][0]) !== route.h1) fail(where, `h1 "${decode(h1s[0][0])}" differs from the registry`)

  const description = all(html, /<meta name="description" content="([^"]*)"/g)
  if (description.length !== 1) fail(where, `${description.length} meta descriptions (expected 1)`)
  else {
    const text = decode(description[0][1])
    if (text.length < 120 || text.length > 170) fail(where, `description is ${text.length} characters (120–170)`)
    if (descriptions.has(text)) fail(where, `description repeats ${descriptions.get(text)}`)
    descriptions.set(text, where)
  }

  const canonicals = all(html, /<link rel="canonical" href="([^"]*)"/g)
  const expected = `${SITE.url}${route.path}`
  if (canonicals.length !== 1) fail(where, `${canonicals.length} canonical links (expected 1)`)
  else if (canonicals[0][1] !== expected) fail(where, `canonical ${canonicals[0][1]} (expected ${expected})`)

  if (!/<meta name="robots" content="index,follow"/.test(html)) fail(where, 'robots meta is not index,follow')

  await checkSocial(where, html, expected)

  for (const [tag] of all(html, /<img\b[^>]*>/g)) {
    if (attr(tag, 'alt') === undefined) fail(where, `<img> without alt: ${tag.slice(0, 80)}`)
  }

  for (const [, json] of all(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json)
    } catch (error) {
      fail(where, `JSON-LD does not parse (${error.message})`)
    }
  }

  if (/localhost|127\.0\.0\.1|example\.com/i.test(html)) fail(where, 'mentions localhost or example.com')
  const foreign = all(html, /https?:\/\/(?:www\.)?andeus\.[a-z.]+/gi)
    .map(([url]) => url)
    .filter((url) => !url.startsWith(SITE.url))
  if (foreign.length) fail(where, `domain other than ${SITE.url}: ${[...new Set(foreign)].join(', ')}`)
}

// The 404 page must never be indexable.
try {
  const notFound = await readFile(join(dist, '404.html'), 'utf8')
  if (!/<meta name="robots" content="noindex/.test(notFound)) fail('404.html', 'missing noindex')
  await checkSocial('404.html', notFound, null)
} catch {
  fail('404.html', 'not generated')
}

// Sitemap: every indexable route, nothing private.
try {
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8')
  const locs = all(sitemap, /<loc>([^<]+)<\/loc>/g).map(([, loc]) => loc)
  for (const route of indexable) {
    if (!locs.includes(`${SITE.url}${route.path}`)) fail('sitemap.xml', `missing ${route.path}`)
  }
  const blocked = [...PRIVATE_PATHS, ...SEO_ROUTES.filter((route) => !route.indexable).map((route) => route.path)]
  for (const loc of locs) {
    if (!loc.startsWith(`${SITE.url}/`)) fail('sitemap.xml', `URL outside ${SITE.url}: ${loc}`)
    if (blocked.some((path) => loc === `${SITE.url}${path}`)) fail('sitemap.xml', `lists a non-indexable URL: ${loc}`)
  }
} catch {
  fail('sitemap.xml', 'not generated')
}

try {
  const robots = await readFile(join(dist, 'robots.txt'), 'utf8')
  if (!robots.includes(`Sitemap: ${SITE.url}/sitemap.xml`)) fail('robots.txt', 'does not reference the sitemap')
  if (!robots.includes('Disallow: /og-preview.html')) fail('robots.txt', 'does not disallow /og-preview.html')
  for (const path of PRIVATE_PATHS) {
    if (!robots.includes(`Disallow: ${path}`)) fail('robots.txt', `does not disallow ${path}`)
  }
} catch {
  fail('robots.txt', 'missing')
}

if (errors.length) {
  console.error(`SEO check failed with ${errors.length} problem(s):`)
  for (const error of errors) console.error(`  ✗ ${error}`)
  process.exit(1)
}
console.log(
  `SEO check passed: ${indexable.length} indexable routes, sitemap, robots.txt, 404 and ${checkedImages.size} share images.`,
)
