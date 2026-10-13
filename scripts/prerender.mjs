// Prerenders every public route into dist/<path>/index.html, writes
// dist/404.html, dist/sitemap.xml and the local-only dist/og-preview.html.
// Runs after the client and SSR builds.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const server = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)
const { render, renderHead, socialTags, SEO_ROUTES, NOT_FOUND_ROUTE, SITE } = server

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

// Share-card preview, one WhatsApp/Facebook-style card per route. Local only:
// robots.txt disallows it and .htaccess answers 404 for it in production.
const esc = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
const cards = [...SEO_ROUTES, NOT_FOUND_ROUTE].map((route) => {
  const tag = Object.fromEntries(socialTags(route).map((t) => [t.key, t.content]))
  const local = tag['og:image'].replace(SITE.url, '')
  return `<article class="card">
    <img src="${local}" alt="${esc(tag['og:image:alt'])}" width="1200" height="630">
    <div class="meta">
      <p class="domain">${new URL(tag['og:url']).host}</p>
      <h2>${esc(tag['og:title'])}</h2>
      <p>${esc(tag['og:description'])}</p>
      <p class="path">${route.path} · ${local}</p>
    </div>
  </article>`
})
await writeFile(
  join(dist, 'og-preview.html'),
  `<!doctype html>
<html lang="es-MX"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>Vista previa para compartir</title>
<style>
  body { margin: 0; padding: 32px 16px; background: #e5ddd5; font-family: system-ui, sans-serif; }
  main { display: grid; gap: 24px; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); max-width: 1100px; margin: auto; }
  .card { background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
  .card img { display: block; width: 100%; height: auto; }
  .meta { padding: 10px 14px 14px; background: #f0f2f5; }
  .meta h2 { margin: 2px 0 4px; font-size: 16px; color: #050505; }
  .meta p { margin: 0; font-size: 14px; color: #65676b; }
  .domain { text-transform: uppercase; font-size: 12px !important; }
  .path { margin-top: 8px !important; font: 12px ui-monospace, monospace !important; }
</style></head>
<body><main>
${cards.join('\n')}
</main></body></html>
`,
)
console.log('  og-preview.html (local only)')
