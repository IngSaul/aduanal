import { accentedText, es } from '../content/copy'
import { PATHS } from './paths'

/**
 * Single source of truth for page metadata. The client head sync, the
 * prerender, the sitemap and `npm run seo:check` all read from here.
 *
 * Titles run 50–60 characters with the brand last; descriptions 140–160,
 * unique per page, with a benefit and a call to action.
 */

export type SchemaType = 'WebSite' | 'ProfessionalService' | 'OfferCatalog'

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
  /** Absolute or root-relative 1200×630 image. Filled in by the Open Graph step. */
  ogImage: string
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
    ogImage: '',
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
    ogImage: '',
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
    ogImage: '',
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
    ogImage: '',
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
    ogImage: '',
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
  ogImage: '',
}

/** Paths that must never be indexed (robots.txt Disallow). None yet. */
export const PRIVATE_PATHS: string[] = []

/** Registry entry for a pathname, tolerant of a missing trailing slash. */
export function findSeoRoute(pathname: string): SeoRoute {
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`
  return SEO_ROUTES.find((route) => route.path === normalized.toLowerCase()) ?? NOT_FOUND_ROUTE
}
