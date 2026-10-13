// Audits the prerendered HTML in dist/ against the route registry.
// Exits with code 1 and lists every problem found. No dependencies.
import { readFile } from 'node:fs/promises'
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
console.log(`SEO check passed: ${indexable.length} indexable routes, sitemap, robots.txt and 404.`)
