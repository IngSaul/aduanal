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

/** The /blog/ listing, with the posts it shows. */
function blog(route: SeoRoute) {
  const url = `${SITE.url}${route.path}`
  return {
    '@type': 'Blog',
    '@id': `${url}#blog`,
    url,
    name: route.h1,
    description: route.description,
    inLanguage: SITE.locale,
    publisher: { '@id': ORG_ID },
    blogPost: (route.blogPosts ?? []).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE.url}${post.path}`,
      datePublished: post.publishedAt,
    })),
  }
}

function blogPosting(route: SeoRoute) {
  const url = `${SITE.url}${route.path}`
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    url,
    mainEntityOfPage: url,
    headline: route.h1,
    description: route.description,
    image: route.article ? [route.article.image] : undefined,
    datePublished: route.article?.publishedTime,
    dateModified: route.article?.modifiedTime,
    inLanguage: SITE.locale,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': `${SITE.url}/blog/#blog` },
  }
}

/** Mirrors the breadcrumb trail shown on the page. */
function breadcrumbList(route: SeoRoute) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: (route.breadcrumbs ?? []).map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE.url}${crumb.path}`,
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
      case 'Blog':
        return blog(route)
      case 'BlogPosting':
        return blogPosting(route)
      case 'BreadcrumbList':
        return breadcrumbList(route)
    }
  })
  return graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null
}
