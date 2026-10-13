/**
 * Business identity (NAP: name, address, phone) shared by the footer, the
 * contact page and the structured data, so every mention matches exactly.
 * Only data the client has published goes here — never invent the rest.
 */

/** Plazas where the customs brokerage and trading company operates. */
export const SERVICE_AREA = [
  'Nuevo Laredo',
  'Manzanillo',
  'Veracruz',
  'Querétaro',
  'CDMX',
  'Lázaro Cárdenas',
  'Altamira',
  'Laredo',
  'Guadalajara',
  'Monterrey',
]

export const SITE = {
  name: 'Andeus Group',
  /** Final production origin, no trailing slash. Non-www is the canonical host. */
  url: 'https://andeus.mx',
  locale: 'es-MX',
  description:
    'Despacho de consultores especializados en comercio exterior, logística y transporte: consultoría, capacitación, auditoría, certificación NOM, trámites, despacho aduanal y logística.',

  phone: '+52 442 116 0464',
  phoneE164: '+524421160464',
  whatsappUrl: 'https://wa.me/524421160464',
  email: 'infomx@andeus.mx',

  address: {
    street: 'Blvd. Centro Sur No. 3000, Col. Centro Sur',
    locality: 'Querétaro',
    region: 'Qro.',
    // TODO(negocio): confirmar el código postal. El sitio dice 76090 y el pin de Google Maps que envió la clienta, 76093.
    postalCode: '76090',
    country: 'MX',
  },
  /** Office pin, from the Google Maps embed the client supplied. */
  geo: { latitude: 20.569231, longitude: -100.366899 },
  // TODO(negocio): horario de atención. No se publica hasta que la clienta lo confirme.

  /** Customs points plus the country as a whole. */
  areaServed: [...SERVICE_AREA, 'México'],

  social: [{ label: 'Instagram', url: 'https://www.instagram.com/andeus_group/' }],
  /** X (Twitter) handle with @. Empty: the brand has no account, so no twitter:site. */
  xHandle: '',

  /** Raster logo for structured data (Google does not accept SVG there). */
  logo: '/brand/andeus-logo.png',

  /** Measurement stays off until these are filled in; empty means nothing is emitted. */
  googleSiteVerification: '',
  ga4Id: '',
} as const

/** "Querétaro, Qro. C.P. 76090" — the city line used on the contact page. */
export const cityLine = `${SITE.address.locality}, ${SITE.address.region} C.P. ${SITE.address.postalCode}`
