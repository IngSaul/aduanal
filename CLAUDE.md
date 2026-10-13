# CLAUDE.md

## Context

- This repo is a client project for Avalon Nova avalonnova.com (a demo for a customs agency).
- The client is Andeus Group (comercio exterior, logística y despacho aduanal, Querétaro). The site is Spanish only.
- Vite + React + Tailwind. `npm run dev` serves on port 8443; `npm run build` must pass before handing work back.

## Content

- Every string lives in `src/content/copy.ts` (read through `useCopy()`); components hold no copy. Section eyebrows are numbered (`01 — …`), so renumber the page when a section is added or removed.
- Never mention the client's customers anywhere on the site — no names, logos or "empresas que confían en nosotros" sections. The client has no consent to show them. The same goes for third-party brands that are legible in photos.

## SEO and prerender

- `npm run build` = client build + SSR build (`dist-ssr/`) + `scripts/prerender.mjs`, which writes every public route to `dist/<path>/index.html`, plus `404.html` and `sitemap.xml`. Run `npm run seo:check` after it; it must pass.
- Page metadata lives only in `src/seo/routes.ts` (title 50–60 chars ending in "| Andeus Group", description 140–160, h1 read from the copy, schema, sitemap fields, empty `ogImage` for the OG step). NAP data lives only in `src/seo/site.ts`; `copy.ts` derives `CONTACT` from it.
- Canonical paths have a trailing slash and come from `PATHS` in `src/seo/paths.ts` — use it for every internal link. A new public page needs an entry in `paths.ts`, `seo/routes.ts` and `src/routes.tsx`.
- The app hydrates prerendered HTML: no `window`/`document` outside effects, no random or time-dependent render output. Above-the-fold `Reveal`s use `onLoad` (CSS-only animation) so the LCP never waits for JS; the hero `Img` uses `priority`.
- Never invent business data in schema (no ratings, hours, prices or people). Open TODOs are marked `TODO(negocio)` / `TODO(hosting)`.
- Open Graph lives in the same registry (`ogTitle` ≤ 60, `ogDescription` ≤ 110, `ogImage`, `ogImageAlt`); `socialTags()` in `src/seo/head.ts` feeds both the prerender and the client sync. Share images are committed in `public/og/` and made by `npm run og:images` (headless Chrome + ImageMagick) — never at build time. Bump the `-vN` in the file name whenever an image changes.

## Blog (Sanity)

- Only the "Noticias" blog is CMS-managed (Sanity project `cu9ucb18`, dataset `production`, public, read-only from the site — never a token in `VITE_*`). Everything else stays in `copy.ts`. Studio lives in `/studio` with its own package.json; frontend deps are only `@sanity/client`, `@portabletext/react`, `@sanity/image-url`.
- Blog data reaches pages through `BlogDataProvider` (`src/lib/blogData.tsx`): the prerender fetches it, renders with it and embeds `window.__BLOG_DATA__`; hooks use it as initial state on that path and fetch on client navigation. Keep server and client output identical (dates use a fixed `America/Mexico_City` time zone).
- Post SEO comes from `src/seo/blog.ts` as `SeoRoute`s, so it flows through the same `renderHead`/`socialTags`/`buildSchema`. `useRouteMeta` skips `/blog/<slug>/`; `BlogPost` applies its head once the post is known.
- The build must not fail when Sanity is down or unconfigured (empty `/blog/`, warning). `.htaccess` keeps a SPA fallback only for `/blog/<slug>/` → `blog-shell.html`. Sample posts (`src/lib/blog-fixtures.ts`) are dev/local-check only: `VITE_BLOG_FIXTURES=true` (dev) or `BLOG_FIXTURES=1` (local build — never publish that dist).

## Navigation

- Router links live in `copy.nav.items` (navbar, mobile drawer and footer all map it). "Noticias" is a NavLink to `/blog/`, active on posts too.

## Images

- All photos are the client's own, served from `public/images/` as WebP and referenced by file name through `photo('nombre')` in `copy.ts`. No stock/Unsplash images.
- Originals arrive in `cliente/imagenes/` (WhatsApp exports, max 1280px wide). Never edit them; export copies with ImageMagick: `-auto-orient -strip`, max 1920px for heroes / 1200px otherwise, `-quality 80`, kebab-case names. Do not upscale and do not add image dependencies to `package.json`.
- Image cards on Home put a dark gradient over the lower half, so the subject should sit in the upper half — crop sky from the source if needed.
- Alt text is in Spanish and describes the actual photo; decorative backdrops use `alt=""`.
- Heroes keep the photo prominent: the image sits at 60% opacity (65% on Home) under a navy gradient that stays dense only behind the text. Reframe a hero photo with `PageHero`'s `imagePosition` (e.g. `object-[center_72%]` on Nosotros) instead of re-cropping the file.

## Client material

- `cliente/` holds the client's raw material (presentation PDF, notes, photos, videos) and is gitignored — never commit it. The PDF still exists in early git history.

## Git

- Never create commits or push on your own. The user normally commits themselves — leave changes in the working tree. Only commit/push when the user explicitly asks in that turn; messages are Conventional Commits in Spanish.
