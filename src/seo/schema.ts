import { es } from '../content/copy'
import type { SeoRoute } from './routes'
import { SITE } from './site'

/**
 * JSON-LD for a route, as one `@graph`. Only facts that are visible on the
 * site: no ratings, reviews, prices, hours or people.
 */

const ORG_ID = `${SITE.url}/#organization`
const WEBSITE_ID = `${SITE.url}/#website`

function website() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    inLanguage: SITE.locale,
    publisher: { '@id': ORG_ID },
  }
}

/** A consultancy and customs brokerage: the closest LocalBusiness subtype. */
function professionalService() {
  return {
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SITE.description,
    logo: `${SITE.url}${SITE.logo}`,
    image: `${SITE.url}${SITE.logo}`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', ...SITE.geo },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
    sameAs: SITE.social.map((s) => s.url),
  }
}

/** The six service lines exactly as the Servicios page lists them. */
function offerCatalog(route: SeoRoute) {
  return {
    '@type': 'OfferCatalog',
    '@id': `${SITE.url}${route.path}#servicios`,
    name: es.servicesPage.indexTitle,
    url: `${SITE.url}${route.path}`,
    itemListElement: es.services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE.url}${route.path}#${service.id}`,
        name: service.title,
        description: service.description,
        url: `${SITE.url}${route.path}#${service.id}`,
        provider: { '@id': ORG_ID },
        areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
      },
    })),
  }
}

export function buildSchema(route: SeoRoute) {
  const graph = route.schema.map((type) => {
    switch (type) {
      case 'WebSite':
        return website()
      case 'ProfessionalService':
        return professionalService()
      case 'OfferCatalog':
        return offerCatalog(route)
    }
  })
  return graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null
}
