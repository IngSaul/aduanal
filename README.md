# Andeus Group — sitio web

Sitio de Andeus Group (comercio exterior, logística y despacho aduanal). React + Vite + Tailwind, prerenderizado a HTML estático en el build.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en el puerto 8443 (SPA, sin prerender). |
| `npm run build` | Build del cliente, build SSR (`dist-ssr/`), consulta a Sanity y prerender de cada ruta (incluidos `/blog/` y cada noticia) a `dist/<ruta>/index.html`, más `dist/404.html`, `dist/blog-shell.html` y `dist/sitemap.xml`. Si Sanity no responde, el build sigue con `/blog/` vacío y lo avisa en consola. |
| `npm run seo:check` / `npm run og:check` | Audita los HTML de `dist/` (title, h1, description, canonical, alt, JSON-LD, sitemap, dominio, etiquetas Open Graph/Twitter y las imágenes para compartir). Correr después del build. |
| `npm run og:images` | Regenera las imágenes para compartir (`public/og/`) y los íconos. Solo cuando cambian; requiere Chrome/Chromium e ImageMagick en el sistema. |
| `npm run preview` | Sirve `dist/` para revisarlo. |

Se publica el contenido de `dist/`, **excepto `dist/og-preview.html`**, que es solo para revisar las tarjetas en local (robots.txt lo bloquea y `.htaccess` responde 404). `dist-ssr/` solo se usa durante el build.

## SEO

- `src/seo/site.ts`: nombre, dominio, teléfono, correo, dirección y redes (NAP). El footer, contacto y el schema leen de aquí.
- `src/seo/routes.ts`: title, description, h1, indexable, prioridad del sitemap, schema e imagen OG de cada ruta. Una ruta pública nueva se agrega aquí, en `src/seo/paths.ts` y en `src/routes.tsx`.
- `src/seo/head.ts` y `src/seo/schema.ts`: generan el `<head>` y el JSON-LD que el prerender inyecta en `<!--app-head-->`.
- Search Console y GA4 quedan apagados: se activan llenando `googleSiteVerification` y `ga4Id` en `site.ts`.

## Open Graph (vista previa al compartir)

- Cada ruta de `src/seo/routes.ts` tiene `ogTitle` (≤ 60), `ogDescription` (≤ 110), `ogImage` y `ogImageAlt`; las páginas noindex usan la tarjeta de marca `og-default`.
- Las imágenes 1200×630 viven en `public/og/` y se versionan en git. Se generan con `npm run og:images` (plantilla en `scripts/og-images.mjs`). Si una cambia, sube la versión del nombre (`-v2`) en el script y en `routes.ts`: las redes guardan en caché la vista previa anterior.
- Íconos: `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` y `site.webmanifest`, generados del símbolo del logo (`public/brand/andeus-simbolo.svg`, extraído de `logo.ai`).

## Blog «Noticias» (Sanity)

Solo el blog es administrable; el resto del sitio sigue en `src/content/copy.ts`.

- **Frontend:** `src/lib/sanity.ts` (cliente de solo lectura, sin token), `src/lib/blog.ts` (consultas GROQ: solo noticias con `publishedAt` ya cumplido), `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx` y `src/components/blog/`.
- **Variables:** `VITE_SANITY_PROJECT_ID` y `VITE_SANITY_DATASET` en `.env` (ver `.env.example`). Nunca pongas un token: todo lo `VITE_*` termina en el navegador.
- **Prerender:** el build consulta Sanity, prerenderiza `/blog/` (primeras 9) y cada `/blog/<slug>/`, e inyecta los datos en `window.__BLOG_DATA__` para hidratar sin un segundo fetch. Metadatos, Open Graph (`og:type` article, portada recortada a 1200×630), JSON-LD (`BlogPosting`, `BreadcrumbList`, `Blog`) y sitemap salen de `src/seo/blog.ts`.
- **Datos de prueba:** `VITE_BLOG_FIXTURES=true npm run dev` muestra noticias de ejemplo en desarrollo. `BLOG_FIXTURES=1 npm run build` las prerenderiza para revisar en local; **ese `dist/` no se publica**.

### Studio (`/studio`)

```bash
cd studio
npm install
npm run dev      # http://localhost:3333
npm run deploy   # publica en https://andeus.sanity.studio
```

El Studio solo muestra **Noticias** y **Categorías**, en español.

### Puesta en marcha de Sanity (una sola vez)

1. **Proyecto:** ya existe (`cu9ucb18`, dataset `production`). Si se crea otro: https://www.sanity.io/manage → *Create project* → dataset `production`, y actualiza `.env` y `studio/env.ts`.
2. **Dataset público:** *Datasets* → `production` → *Visibility: Public*. El sitio lee sin token.
3. **CORS:** *API* → *CORS origins* → agrega sin credenciales: `http://localhost:8443`, el dominio del demo (TODO: URL del demo) y `https://andeus.mx`. Para el Studio local, `http://localhost:3333` con credenciales.
4. **Desplegar el Studio:** `cd studio && npx sanity deploy` (usa `studioHost: 'andeus'` → https://andeus.sanity.studio). Después del primer deploy, copia el `appId` que muestra la consola a `deployment.appId` en `studio/sanity.cli.ts`.
5. **Invitar a la clienta:** *Members* → *Invite* → su correo con el rol **Editor** (puede crear, editar y publicar noticias, no cambiar la configuración del proyecto).

### Publicar noticias nuevas (webhook)

Cada build prerenderiza las noticias publicadas hasta ese momento. Para que una noticia nueva tenga su HTML, su vista previa al compartir y su entrada en el sitemap, hay que recompilar y desplegar:

1. En Sanity: *API* → *Webhooks* → *Create webhook*.
   - URL: el *deploy hook* del hosting (TODO(hosting): definir cuando se conozca el hosting; en Netlify/Vercel es un "Build hook", en un VPS un endpoint que corra `npm run build` y copie `dist/`).
   - Dataset `production`, disparadores *Create*, *Update* y *Delete*, filtro `_type == "post"`, método POST.
2. Mientras no exista el webhook, una noticia nueva **sí se ve** en el sitio gracias al fallback de `/blog/*` (la renderiza el navegador), pero no tiene vista previa al compartir ni está en el sitemap hasta el siguiente build.

## Servidor de producción

Todas las rutas públicas están prerenderizadas, así que no hay fallback de SPA general: una URL inexistente responde 404 real con `/404.html`. La única excepción es `/blog/<slug>/`: si el post se publicó después del último build, el servidor entrega `blog-shell.html` y el navegador lo renderiza (sin vista previa al compartir hasta el siguiente build).

### Apache / cPanel

`public/.htaccess` ya va dentro de `dist/`: HTTPS y dominio sin www con 301, barra final, 404, compresión y caché.

### nginx

Equivalente para nginx:

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name www.andeus.mx;
    return 301 https://andeus.mx$request_uri;
}

server {
    listen 80;
    server_name andeus.mx;
    return 301 https://andeus.mx$request_uri;
}

server {
    listen 443 ssl http2;
    server_name andeus.mx;
    root /var/www/andeus/dist;
    index index.html;

    # Carpetas prerenderizadas: /servicios -> /servicios/ (nginx lo hace con 301).
    location / {
        try_files $uri $uri/ =404;
    }

    location = /industrias { return 301 https://andeus.mx/; }
    location = /industrias/ { return 301 https://andeus.mx/; }
    location = /og-preview.html { return 404; }

    # Posts newer than the last build: client-rendered shell. Built posts are folders.
    location ~ ^/blog/[a-z0-9-]+/?$ { try_files $uri $uri/ /blog-shell.html; }
    location = /blog-shell.html { internal; }

    error_page 404 /404.html;

    gzip on;
    gzip_types text/css text/plain text/xml application/javascript application/json application/ld+json application/xml image/svg+xml;
    # brotli on; brotli_types ...;   # si el módulo ngx_brotli está instalado

    location ~* \.html$ { add_header Cache-Control "no-cache"; }
    location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
    location ~* \.(webp|avif|png|jpe?g|svg|ico)$ { add_header Cache-Control "public, max-age=2592000"; }
}
```
