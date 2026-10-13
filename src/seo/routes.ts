import { accentedText, es } from '../content/copy'
import { PATHS } from './paths'

/**
 * Single source of truth for page metadata. The client head sync, the
 * prerender, the sitemap and `npm run seo:check` all read from here.
 *
 * Titles run 50–60 characters with the brand last; descriptions 140–160,
 * unique per page, with a benefit and a call to action.
 */

export type SchemaType = 'WebSite' | 'ProfessionalService' | 'OfferCatalog' | 'Blog' | 'BlogPosting' | 'BreadcrumbList'

export type SeoRoute = {
  path: string
  title: string
  description: string
  /** The page's visible h1, read from the copy so it cannot drift. */
  h1: string
  indexable: boolean
  priority: number
  changefreq: 'weekly' | 'monthly' | 'yearly'
  schema: SchemaType[]
  /** LCP photo (file name under `public/images/`), preloaded in the head. */
  lcpImage?: string
  /** Share card. Falls back to `title` / `description` when absent. */
  ogTitle?: string
  ogDescription?: string
  /** 1200×630 JPG: root-relative under `public/og/`, or an absolute Sanity CDN URL for posts. */
  ogImage: string
  ogImageAlt: string
  /** `article` only for blog posts. */
  ogType?: 'website' | 'article'

  /* Blog-only data, set by src/seo/blog.ts at prerender time. */
  article?: { publishedTime: string; modifiedTime: string; image: string }
  breadcrumbs?: { name: string; path: string }[]
  blogPosts?: { title: string; path: string; publishedAt: string }[]
  /** Sitemap lastmod (ISO). Defaults to the build date. */
  lastmod?: string
}

/** Brand card for pages without their own image (and every noindex page). */
const OG_DEFAULT = {
  ogImage: '/og/og-default-v1.jpg',
  ogImageAlt: 'Logotipo de Andeus Group sobre un puerto iluminado de noche, con el texto «Comercio exterior y logística»',
}

const BASE_SCHEMA: SchemaType[] = ['WebSite', 'ProfessionalService']

export const SEO_ROUTES: SeoRoute[] = [
  {
    path: PATHS.home,
    title: 'Agencia aduanal y consultoría en Querétaro | Andeus Group',
    description:
      'Agencia aduanal y consultoría en comercio exterior en Querétaro: despacho aduanal, certificación NOM y auditoría en 10 plazas. Solicita tu asesoría hoy.',
    h1: accentedText(es.home.heroTitle),
    indexable: true,
    priority: 1,
    changefreq: 'monthly',
    schema: BASE_SCHEMA,
    lcpImage: es.home.heroImage,
    ogTitle: 'Andeus Group | Agencia aduanal en Querétaro',
    ogDescription: 'Consultoría en comercio exterior, despacho aduanal y logística en 10 plazas de México.',
    ogImage: '/og/og-inicio-v1.jpg',
    ogImageAlt: 'Logotipo de Andeus Group sobre una terminal portuaria, con el texto «Agencia aduanal en Querétaro»',
  },
  {
    path: PATHS.services,
    title: 'Consultoría, auditoría y despacho aduanal | Andeus Group',
    description:
      'Consultoría aduanera, capacitación, auditoría, certificación NOM, trámites IMMEX y PROSEC, despacho aduanal y logística. Conoce cada servicio y cotiza.',
    h1: es.servicesPage.title,
    indexable: true,
    priority: 0.9,
    changefreq: 'monthly',
    schema: [...BASE_SCHEMA, 'OfferCatalog'],
    lcpImage: es.servicesPage.heroImage,
    ogTitle: 'Servicios de comercio exterior | Andeus Group',
    ogDescription: 'Consultoría, capacitación, auditoría, certificación NOM, trámites y logística en un solo despacho.',
    ogImage: '/og/og-servicios-v1.jpg',
    ogImageAlt: 'Logotipo de Andeus Group sobre grúas de contenedores, con el texto «Servicios de comercio exterior»',
  },
  {
    path: PATHS.about,
    title: 'Consultores en comercio exterior en Querétaro | Andeus Group',
    description:
      'Somos un despacho de consultores en comercio exterior en Querétaro que cuida el cumplimiento aduanero de tu empresa. Conoce cómo trabajamos contigo.',
    h1: es.aboutPage.title,
    indexable: true,
    priority: 0.7,
    changefreq: 'yearly',
    schema: BASE_SCHEMA,
    lcpImage: es.aboutPage.heroImage,
    ogTitle: 'Conoce a Andeus Group',
    ogDescription: 'Consultores especializados que cuidan el cumplimiento aduanero de tu empresa.',
    ogImage: '/og/og-nosotros-v1.jpg',
    ogImageAlt: 'Logotipo de Andeus Group sobre grúas a contraluz, con el texto «Consultores en comercio exterior»',
  },
  {
    path: PATHS.contact,
    title: 'Contacto: asesoría en comercio exterior | Andeus Group',
    description:
      'Habla con un consultor de Andeus Group en Querétaro por WhatsApp o correo y recibe asesoría en comercio exterior y despacho aduanal. Escríbenos hoy.',
    h1: es.contactPage.title,
    indexable: true,
    priority: 0.8,
    changefreq: 'yearly',
    schema: BASE_SCHEMA,
    lcpImage: es.contactPage.heroImage,
    ogTitle: 'Habla con Andeus Group',
    ogDescription: 'Escríbenos por WhatsApp o correo y recibe asesoría en comercio exterior desde Querétaro.',
    ogImage: '/og/og-contacto-v1.jpg',
    ogImageAlt: 'Logotipo de Andeus Group sobre el puerto y la ciudad, con el texto «Hablemos de tu empresa»',
  },
  {
    path: PATHS.privacy,
    title: 'Aviso de privacidad y datos personales | Andeus Group',
    description:
      'Consulta cómo Andeus Group recaba, usa y protege tus datos personales y cómo ejercer tus derechos ARCO. Lee nuestro aviso de privacidad vigente aquí.',
    h1: es.privacyPage.title,
    indexable: true,
    priority: 0.3,
    changefreq: 'yearly',
    schema: BASE_SCHEMA,
    lcpImage: es.privacyPage.heroImage,
    ogTitle: 'Aviso de privacidad | Andeus Group',
    ogDescription: 'Cómo Andeus Group protege tus datos personales y cómo ejercer tus derechos ARCO.',
    ...OG_DEFAULT,
  },
  {
    path: PATHS.blog,
    title: 'Noticias de comercio exterior y aduanas | Andeus Group',
    description:
      'Noticias y novedades de Andeus Group sobre comercio exterior, despacho aduanal y logística en México. Lee las publicaciones más recientes de nuestro equipo.',
    h1: es.blog.title,
    indexable: true,
    priority: 0.6,
    changefreq: 'weekly',
    schema: [...BASE_SCHEMA, 'Blog'],
    lcpImage: es.blog.heroImage,
    ogTitle: 'Noticias | Andeus Group',
    ogDescription: 'Novedades de comercio exterior, aduanas y logística de Andeus Group.',
    ogImage: '/og/og-noticias-v1.jpg',
    ogImageAlt: 'Logotipo de Andeus Group sobre una terminal al amanecer, con el texto «Noticias de comercio exterior»',
  },
]

/** Head for any URL outside the registry. Never indexed, never in the sitemap. */
export const NOT_FOUND_ROUTE: SeoRoute = {
  path: '/404.html',
  title: 'Página no encontrada | Andeus Group',
  description: es.notFound.lead,
  h1: es.notFound.title,
  indexable: false,
  priority: 0,
  changefreq: 'yearly',
  schema: [],
  // Generic brand card: a shared broken link still previews as Andeus Group.
  ogTitle: 'Andeus Group',
  ogDescription: 'Consultoría en comercio exterior, despacho aduanal y logística desde Querétaro.',
  ...OG_DEFAULT,
}

/** Paths that must never be indexed (robots.txt Disallow). None yet. */
export const PRIVATE_PATHS: string[] = []

/** Registry entry for a pathname, tolerant of a missing trailing slash. */
export function findSeoRoute(pathname: string): SeoRoute {
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`
  return SEO_ROUTES.find((route) => route.path === normalized.toLowerCase()) ?? NOT_FOUND_ROUTE
}
