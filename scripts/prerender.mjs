// Prerenders every public route into dist/<path>/index.html, writes
// dist/404.html and dist/sitemap.xml. Runs after the client and SSR builds.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const server = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)
const { render, renderHead, SEO_ROUTES, NOT_FOUND_ROUTE, SITE } = server

const template = await readFile(join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> / <!--app-html--> markers')
}

const fill = (head, html) =>
  template.replace('<!--app-head-->', () => head).replace('<!--app-html-->', () => html)

async function writePage(file, contents) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, contents)
}

for (const route of SEO_ROUTES) {
  const { html, status } = await render(route.path)
  if (status !== 200) throw new Error(`${route.path} rendered with status ${status}`)
  await writePage(join(dist, route.path, 'index.html'), fill(renderHead(route), html))
  console.log(`  prerendered ${route.path}`)
}

// Any unmatched URL falls through to the splat route, which renders NotFound.
const missing = await render('/__pagina-inexistente__/')
await writePage(join(dist, '404.html'), fill(renderHead(NOT_FOUND_ROUTE), missing.html))
console.log('  prerendered 404.html')

const lastmod = new Date().toISOString().slice(0, 10)
const urls = SEO_ROUTES.filter((route) => route.indexable).map(
  (route) => `  <url>
    <loc>${SITE.url}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`,
)
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`,
)
console.log(`  sitemap.xml with ${urls.length} URLs`)
