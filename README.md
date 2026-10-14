# Andeus Group — sitio web

Sitio de Andeus Group (comercio exterior, logística y despacho aduanal). React + Vite + Tailwind, prerenderizado a HTML estático en el build. Solo el blog «Noticias» es administrable (Sanity); el resto del contenido vive en `src/content/copy.ts`.

- **Demo:** https://aduanal.avalonnova.com (con `noindex` hasta el lanzamiento)
- **Producción:** https://andeus.mx (pendiente de hosting)
- **Studio:** https://andeus.sanity.studio (pendiente de desplegar)

## Pendientes

Lista para pedir las cosas en orden. Marca cada punto al resolverlo y quítalo de aquí cuando ya esté reflejado en el sitio.

### Lo que necesitamos de la clienta (Andeus Group)

En orden de prioridad. Los dos primeros bloquean el lanzamiento.

1. **Hosting de andeus.mx.** Proveedor, tipo de servidor (cPanel/Apache, nginx u otro), forma de acceso (panel, FTP o SSH) y quién administra el DNS. Lo necesitamos para publicar el sitio y configurar la recompilación automática del blog.
2. **Personas que publicarán noticias.** El nombre y el correo de cada una, para invitarlas como Editor al Studio, y una fecha para la capacitación (pidió que les enseñemos a actualizar el sitio).
3. **Código postal de la oficina.** El sitio dice 76090 y el pin de Google Maps que envió dice 76093. Tiene que ser el mismo en el sitio, en Google y en el Perfil de Negocio.
4. **Primeras noticias reales.** Dos o tres para lanzar el blog con contenido: título, texto, fecha y una foto propia por noticia, sin logos de otras empresas ni personas identificables.
5. **Horario de atención** (opcional). Se publica en Google y en los datos estructurados; si no lo da, no se muestra.
6. **Otras redes sociales.** Hoy solo tenemos Instagram. Si existen LinkedIn, Facebook o X, las URLs.
7. **Google.** Si ya tiene un Perfil de Negocio de Google, que nos agregue como administradores. Si no, confirmar que lo creamos con los mismos datos del sitio. Para Search Console, la cuenta de Google con la que quiere administrar el dominio.
8. **Analítica.** Si quiere medir visitas con Google Analytics. Hoy el aviso de privacidad dice que el sitio no usa analítica ni cookies, así que activarla implica actualizar ese texto.
9. **Aprobaciones de texto** (sugerencias SEO, opcionales):
   - Que el título principal de Inicio mencione «agencia aduanal», por ejemplo: «Agencia aduanal y consultoría en comercio exterior en Querétaro».
   - Preguntas frecuentes por servicio, o contenido para páginas propias de los servicios clave (despacho aduanal, certificación NOM, IMMEX), que ayudarían a posicionar.

### Lo que me toca (Avalon Nova)

1. **Desplegar el Studio:** `cd studio && npx sanity deploy`. Después, copiar el `appId` que muestra la consola a `deployment.appId` en `studio/sanity.cli.ts` y hacer commit.
2. **CORS del Studio local:** en sanity.io/manage → API → CORS, agregar `http://localhost:3333` con credenciales.
3. **Limpiar la noticia de prueba** `noticia-de-prueba1`: su portada es la foto con el avión de United (marca de terceros) y el extracto tiene 28 caracteres. Borrarla antes de mostrar el sitio.
4. **Invitar a las editoras** en sanity.io/manage → Members, con el rol Editor, cuando la clienta dé los correos (punto 2), y dar la capacitación.
5. **Cuando haya hosting** (punto 1): configurar el despliegue de `dist/`, el webhook de Sanity (ver «Publicar noticias nuevas») y la configuración del servidor (Apache o nginx), y quitar los `TODO(hosting)`.
6. **Decisiones técnicas abiertas:**
   - Opacidad de las fotos: `Img` aplica `opacity-100` y anula las opacidades de los heroes y las tarjetas, así que las fotos se ven al 100 %. Corregirlo cambia el aspecto actual.
   - Alojar Montserrat en el propio sitio (quitaría unos 850 ms del LCP en móvil). Requiere descargar los archivos de la fuente.
   - Si el repositorio se va a compartir: borrar del historial de git la presentación PDF de la clienta (requiere reescribir el historial y hacer force push).

### Al lanzar en andeus.mx

1. En `src/seo/site.ts`: `allowIndexing: true`. Si ya los tenemos, llenar `googleSiteVerification` y `ga4Id` (este último solo si la clienta aprobó la analítica y se actualizó el aviso de privacidad).
2. `npm run build` y `npm run seo:check`, que deben pasar.
3. Subir `dist/` **sin** `og-preview.html`.
4. Search Console: verificar el dominio, enviar `https://andeus.mx/sitemap.xml` e inspeccionar la URL de inicio.
5. Vistas previas al compartir: pasar cada URL por el [Sharing Debugger de Facebook](https://developers.facebook.com/tools/debug/) («Volver a extraer») y por el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/), y mandarse los enlaces por WhatsApp.
6. Perfil de Negocio de Google con el mismo nombre, dirección y teléfono que el sitio, y pedir reseñas reales a sus clientes.

## Instalación

```bash
npm install
cp .env.example .env            # projectId y dataset de Sanity
(cd studio && npm install)      # solo si vas a trabajar en el Studio
```

`node_modules/` no se versiona.

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
- **Indexación:** mientras el sitio vive en el demo (`https://aduanal.avalonnova.com`), `allowIndexing: false` en `src/seo/site.ts` pone `noindex,follow` en todas las páginas. Al lanzar en andeus.mx: cambiarlo a `true`, `npm run build`, `npm run seo:check` y desplegar.

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
3. **CORS:** *API* → *CORS origins* → sin credenciales: `http://localhost:8443`, `https://aduanal.avalonnova.com` y `https://andeus.mx` (ya agregados). Falta `http://localhost:3333` con credenciales para el Studio local (ver Pendientes).
4. **Desplegar el Studio:** `cd studio && npx sanity deploy` (usa `studioHost: 'andeus'` → https://andeus.sanity.studio). Después del primer deploy, copia el `appId` que muestra la consola a `deployment.appId` en `studio/sanity.cli.ts`.
5. **Invitar a las editoras:** *Members* → *Invite* → cada correo con el rol **Editor** (pueden crear, editar y publicar noticias, no cambiar la configuración del proyecto).

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

## Deploy (demo en el homelab)

El demo https://aduanal.avalonnova.com corre en el homelab con Docker detrás de Traefik (red externa `homelab`). Los archivos de deploy están en la raíz del repositorio:

- `Dockerfile`: dos etapas. `node:22-alpine` corre `npm ci` y `npm run build` (el prerender consulta Sanity en ese momento) y borra `og-preview.html` y `.htaccess`; `nginx:alpine` sirve `dist/`.
- `nginx.conf`: equivalente de `public/.htaccess`: archivos prerenderizados, 301 a barra final, `/blog/<slug>/` sin carpeta → `blog-shell.html` (200), 404 real con `/404.html`, gzip y caché (`/assets/` un año immutable, HTML `no-cache`, imágenes un mes). No fuerza https ni dominio: TLS lo resuelven Traefik/Cloudflare (forzarlo causaría un loop) y las redirecciones son relativas (`absolute_redirect off`).
- `docker-compose.yml`: build args de Sanity (`VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`; no son secretos), labels de Traefik y la red `homelab`.
- `.dockerignore`: deja fuera `node_modules`, `studio`, `.git`, `.env*`, `dist`, `dist-ssr`, `cliente` y logs. El `.env` local no entra a la imagen; las variables llegan por los build args.

Para desplegar, haz push y en el servidor:

```bash
cd /srv/docker/demos/aduanal
git pull
docker compose up -d --build
```

En el log del build debe aparecer `blog: N post(s) from Sanity`, sin el aviso `Sanity did not answer`. Si Sanity no responde, el build sigue y `/blog/` queda vacío.

Como el blog se prerenderiza en el build, una noticia nueva necesita repetir `docker compose up -d --build` para tener su HTML, su vista previa al compartir y su entrada en el sitemap. Mientras tanto se ve igual gracias a `blog-shell.html`.

Prueba local sin Traefik (la red `homelab` no hace falta para construir):

```bash
docker compose build --progress=plain
docker run --rm -d -p 8080:80 --name aduanal-test aduanal-aduanal
for p in / /servicios /servicios/ /blog/ /blog/<slug>/ /blog/no-existe/ /no-existe/; do
  echo "$p $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "http://localhost:8080$p")"
done
docker stop aduanal-test
```

Esperado: `/servicios` → 301 a `/servicios/`; `/blog/no-existe/` → 200 (shell); `/no-existe/` → 404.
