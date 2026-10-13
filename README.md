# Andeus Group — sitio web

Sitio de Andeus Group (comercio exterior, logística y despacho aduanal). React + Vite + Tailwind, prerenderizado a HTML estático en el build.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en el puerto 8443 (SPA, sin prerender). |
| `npm run build` | Build del cliente, build SSR (`dist-ssr/`), prerender de cada ruta a `dist/<ruta>/index.html`, `dist/404.html` y `dist/sitemap.xml`. |
| `npm run seo:check` | Audita los HTML de `dist/` (title, h1, description, canonical, alt, JSON-LD, sitemap, dominio). Correr después del build. |
| `npm run preview` | Sirve `dist/` para revisarlo. |

Se publica el contenido de `dist/`. `dist-ssr/` solo se usa durante el build.

## SEO

- `src/seo/site.ts`: nombre, dominio, teléfono, correo, dirección y redes (NAP). El footer, contacto y el schema leen de aquí.
- `src/seo/routes.ts`: title, description, h1, indexable, prioridad del sitemap, schema e imagen OG de cada ruta. Una ruta pública nueva se agrega aquí, en `src/seo/paths.ts` y en `src/routes.tsx`.
- `src/seo/head.ts` y `src/seo/schema.ts`: generan el `<head>` y el JSON-LD que el prerender inyecta en `<!--app-head-->`.
- Search Console y GA4 quedan apagados: se activan llenando `googleSiteVerification` y `ga4Id` en `site.ts`.

## Servidor de producción

Todas las rutas públicas están prerenderizadas, así que no hay fallback de SPA: una URL inexistente responde 404 real con `/404.html`.

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

    error_page 404 /404.html;

    gzip on;
    gzip_types text/css text/plain text/xml application/javascript application/json application/ld+json application/xml image/svg+xml;
    # brotli on; brotli_types ...;   # si el módulo ngx_brotli está instalado

    location ~* \.html$ { add_header Cache-Control "no-cache"; }
    location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
    location ~* \.(webp|avif|png|jpe?g|svg|ico)$ { add_header Cache-Control "public, max-age=2592000"; }
}
```
