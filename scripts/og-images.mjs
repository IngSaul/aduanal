// Generates the share images (public/og/*.jpg, 1200×630) and the site icons
// (favicon.svg, favicon.ico, apple-touch-icon.png, icon-192/512.png).
//
// Run once with `npm run og:images` and commit the output; the build does not
// regenerate them. `npm run og:images -- og-noticias-v1.jpg` makes only the
// named share images and leaves the icons alone. Needs Chrome/Chromium (screenshots) and ImageMagick
// (`magick`, PNG → JPG/ICO) on the system. When an image changes, bump its
// version in the file name here and in src/seo/routes.ts so networks refetch.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const work = mkdtempSync(join(tmpdir(), 'andeus-og-'))

const NAVY = '#0D1B2A'
const GOLD = '#C89D3C'
const MAX_BYTES = 300 * 1024

/** One image per main page plus a brand default. Short title: two lines at most. */
const OG_IMAGES = [
  { file: 'og-inicio-v1.jpg', title: 'Agencia aduanal en Querétaro', photo: 'hero-puerto-grua-ciudad' },
  { file: 'og-servicios-v1.jpg', title: 'Servicios de comercio exterior', photo: 'terminal-gruas-azules' },
  { file: 'og-nosotros-v1.jpg', title: 'Consultores en comercio exterior', photo: 'terminal-gruas-contraluz' },
  { file: 'og-contacto-v1.jpg', title: 'Hablemos de tu empresa', photo: 'puerto-ciudad-gruas-dia' },
  { file: 'og-noticias-v1.jpg', title: 'Noticias de comercio exterior', photo: 'terminal-amanecer' },
  { file: 'og-default-v1.jpg', title: 'Comercio exterior y logística', photo: 'puerto-gruas-noche' },
]

function findChrome() {
  const candidates = [process.env.CHROME_PATH, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']
  for (const bin of candidates.filter(Boolean)) {
    try {
      execFileSync(bin, ['--version'], { stdio: 'ignore' })
      return bin
    } catch {}
  }
  throw new Error('Chrome/Chromium not found. Set CHROME_PATH.')
}
const chrome = findChrome()

function screenshot(html, width, height, out, transparent = false) {
  const page = join(work, `page-${width}x${height}-${Math.random().toString(36).slice(2)}.html`)
  writeFileSync(page, html)
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--allow-file-access-from-files',
      '--force-device-scale-factor=1',
      `--window-size=${width},${height}`,
      '--virtual-time-budget=8000',
      ...(transparent ? ['--default-background-color=00000000'] : []),
      `--screenshot=${out}`,
      pathToFileURL(page).href,
    ],
    { stdio: 'ignore' },
  )
}

const asset = (path) => pathToFileURL(join(pub, path)).href

/* ------------------------------------------------------------- Share images */

const ogHtml = ({ title, photo }) => `<!doctype html>
<html lang="es-MX"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=block">
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; background: ${NAVY}; }
  body { position: relative; font-family: 'Montserrat', sans-serif; color: #fff; }
  .photo { position: absolute; inset: 0; background: url('${asset(`images/${photo}.webp`)}') center / cover; }
  .veil { position: absolute; inset: 0;
    background: radial-gradient(ellipse 58% 80% at 50% 50%, rgba(13,27,42,.9) 0%, rgba(13,27,42,.74) 50%, rgba(13,27,42,.28) 100%); }
  .etch { position: absolute; inset: 0; opacity: .6;
    background-image: linear-gradient(to right, rgba(255,255,255,.045) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,.045) 1px, transparent 1px);
    background-size: 72px 72px; }
  /* Logo and title stay inside the central 630×630 square, with 60px margins. */
  .safe { position: absolute; top: 0; left: 285px; width: 630px; height: 630px; padding: 60px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .logo { width: 330px; height: auto; }
  .rule { width: 72px; height: 3px; background: ${GOLD}; margin: 34px 0 30px; }
  h1 { font-size: 56px; line-height: 1.12; font-weight: 700; letter-spacing: -0.025em; max-width: 510px; }
  .domain { margin-top: 30px; font-size: 22px; font-weight: 600; letter-spacing: .24em; color: ${GOLD}; text-transform: uppercase; }
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 8px; background: ${GOLD}; }
</style></head>
<body>
  <div class="photo"></div><div class="veil"></div><div class="etch"></div>
  <div class="safe">
    <img class="logo" src="${asset('brand/andeus-logo-blanco.svg')}" alt="">
    <div class="rule"></div>
    <h1>${title}</h1>
    <p class="domain">andeus.mx</p>
  </div>
  <div class="bar"></div>
</body></html>`

const only = process.argv.slice(2)
for (const spec of OG_IMAGES.filter((s) => !only.length || only.includes(s.file))) {
  const png = join(work, `${spec.file}.png`)
  const out = join(pub, 'og', spec.file)
  screenshot(ogHtml(spec), 1200, 630, png)
  let quality = 86
  do {
    execFileSync('magick', [png, '-strip', '-interlace', 'Plane', '-sampling-factor', '4:2:0', '-quality', String(quality), out])
    quality -= 6
  } while (statSync(out).size >= MAX_BYTES && quality > 40)
  console.log(`  ${spec.file}  ${Math.round(statSync(out).size / 1024)} KB`)
}

/* -------------------------------------------------------------------- Icons */

if (only.length) {
  rmSync(work, { recursive: true, force: true })
  process.exit(0)
}

// The swoosh alone, on a navy tile. favicon.svg keeps rounded corners; the PNG
// icons are full-bleed squares, because iOS and Android apply their own mask.
const symbol = readFileSync(join(pub, 'brand', 'andeus-simbolo.svg'), 'utf8')
const symbolInner = symbol.slice(symbol.indexOf('>') + 1, symbol.lastIndexOf('</svg>'))
const tile = (rounded) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
<rect width="64" height="64" rx="${rounded ? 12 : 0}" fill="${NAVY}"/>
<svg x="9" y="10" width="46" height="44" viewBox="161 213 174 161" preserveAspectRatio="xMidYMid meet">${symbolInner}</svg>
</svg>
`
writeFileSync(join(pub, 'favicon.svg'), tile(true))
const squareSvg = join(work, 'tile-square.svg')
writeFileSync(squareSvg, tile(false))

const iconHtml = (svgPath, size) =>
  `<!doctype html><html><body style="margin:0"><img src="${pathToFileURL(svgPath).href}" width="${size}" height="${size}" style="display:block"></body></html>`

for (const [name, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  screenshot(iconHtml(squareSvg, size), size, size, join(pub, name))
  console.log(`  ${name}`)
}

const icoParts = [16, 32, 48].map((size) => {
  const png = join(work, `favicon-${size}.png`)
  screenshot(iconHtml(join(pub, 'favicon.svg'), size), size, size, png, true)
  return png
})
execFileSync('magick', [...icoParts, join(pub, 'favicon.ico')])
console.log('  favicon.ico (16, 32, 48)  favicon.svg')

if (existsSync(work)) rmSync(work, { recursive: true, force: true })
