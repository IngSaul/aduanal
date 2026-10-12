# CLAUDE.md

## Context

- This repo is a client project for Avalon Nova avalonnova.com (a demo for a customs agency).
- The client is Andeus Group (comercio exterior, logística y despacho aduanal, Querétaro). The site is Spanish only.
- Vite + React + Tailwind. `npm run dev` serves on port 8443; `npm run build` must pass before handing work back.

## Content

- Every string lives in `src/content/copy.ts` (read through `useCopy()`); components hold no copy. Section eyebrows are numbered (`01 — …`), so renumber the page when a section is added or removed.
- Never mention the client's customers anywhere on the site — no names, logos or "empresas que confían en nosotros" sections. The client has no consent to show them. The same goes for third-party brands that are legible in photos.

## Navigation

- Router links live in `copy.nav.items`. "Blog" (`copy.nav.blog`) is a plain `#blog` anchor in the navbar, mobile drawer and footer until the blog has content; when it does, turn it into a route there.

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
