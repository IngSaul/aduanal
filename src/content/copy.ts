/**
 * Single source of truth for every string rendered by the site.
 *
 * The site is published in Spanish only: components read their strings from
 * `useCopy()`, which returns this object. Content follows the client's own
 * company presentation (`cliente/Presentación 1_compressed (1).pdf`).
 */

import { PATHS } from '../seo/paths'
import { SERVICE_AREA, SITE, cityLine } from '../seo/site'

/** Client photograph under `public/images/`, by file name without extension. */
export const photo = (name: string) => `${import.meta.env.BASE_URL}images/${name}.webp`

/** Intrinsic size of each photo, so every `<img>` carries width and height. */
const PHOTO_SIZES: Record<string, [number, number]> = {
  'avion-carga-pista': [1200, 630],
  'bodega-cajas-madera': [960, 1280],
  'buque-carga-noche': [1200, 900],
  'buque-vista-aerea': [960, 1280],
  'contenedores-gruas-patio': [960, 1280],
  'flota-buques-bahia': [1200, 630],
  'garita-aduana-trailer': [1200, 900],
  'gruas-puerto-noche-vertical': [960, 1280],
  'hero-puerto-grua-ciudad': [1280, 960],
  'pista-aeropuerto-sala': [960, 1280],
  'puerto-ciudad-gruas-dia': [1280, 960],
  'puerto-ciudad-panoramica': [1280, 687],
  'puerto-gruas-noche': [1280, 960],
  'terminal-amanecer': [1200, 585],
  'terminal-gruas-azules': [1200, 900],
  'terminal-gruas-contraluz': [1280, 960],
}

export type PhotoSource = { src: string; width: number; height: number }

/** `src`, `width` and `height` for a photo, ready to spread into `<Img>`. */
export const photoSource = (name: string): PhotoSource => {
  const [width, height] = PHOTO_SIZES[name]
  return { src: photo(name), width, height }
}

export const CONTACT = {
  whatsapp: SITE.whatsappUrl,
  whatsappLabel: SITE.phone,
  phoneHref: `tel:${SITE.phoneE164}`,
  email: SITE.email,
  address: SITE.address.street,
  addressCity: cityLine,
  coverage: `Agencia aduanal en ${SERVICE_AREA.length} plazas`,
  /** Google Maps embed for the office, as provided by the client. */
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d933.865202430603!2d-100.3668988191129!3d20.569230879799743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d344bdd9b48bdb%3A0x9d8da6b170495c2f!2sBlvd.%20Centro%20Sur%203000%2C%20Centro%20Sur%2C%2076093%20Santiago%20de%20Quer%C3%A9taro%2C%20Qro.!5e0!3m2!1ses!2smx!4v1791325347436!5m2!1ses!2smx',
} as const

/** Headline fragment where the middle words are set in the brand gold. */
export type Accented = { lead: string; accent: string; tail: string }

/** Plain-text version of an accented headline. */
export const accentedText = ({ lead, accent, tail }: Accented) => `${lead}${accent}${tail}`

export const es = {
  brand: {
    name: 'ANDEUS',
    descriptor: 'Group',
    legal: SITE.name,
    /** Official logo from cliente/logo.ai: full color for light backgrounds, white lettering for dark ones. */
    logo: {
      navy: `${import.meta.env.BASE_URL}brand/andeus-logo.svg`,
      white: `${import.meta.env.BASE_URL}brand/andeus-logo-blanco.svg`,
      width: 472,
      height: 169,
    },
    tagline: 'Estrategia, servicio personalizado y calidad en cada operación.',
  },

  nav: {
    items: [
      { to: PATHS.home, label: 'Inicio' },
      { to: PATHS.services, label: 'Servicios' },
      { to: PATHS.about, label: 'Nosotros' },
      { to: PATHS.contact, label: 'Contacto' },
      { to: PATHS.blog, label: 'Noticias' },
    ],
    cta: 'Solicitar asesoría',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },

  common: {
    quote: 'Solicitar asesoría',
    quoteLong: 'Solicita una asesoría',
    services: 'Conoce nuestros servicios',
    whatsapp: 'Hablar por WhatsApp',
    whatsappAria: 'Escríbenos por WhatsApp',
    contactForm: 'Ver datos de contacto',
    includes: 'Qué incluye',
    appliesTo: 'Agencia aduanal y comercializadora en',
  },

  home: {
    heroEyebrow: 'Consultoría en comercio exterior · Querétaro',
    heroTitle: {
      lead: 'Soluciones integrales de ',
      accent: 'logística, transporte y comercio exterior',
      tail: '.',
    } as Accented,
    heroSubtitle:
      'Consultores especializados que garantizan el cumplimiento del marco jurídico aduanero de tus operaciones, con un servicio de estrategia, personalizado y de calidad.',
    heroImage: 'hero-puerto-grua-ciudad',
    heroImageAlt: 'Grúas de una terminal de contenedores frente a los edificios de la ciudad, vistas desde el mar',
    heroFacts: [
      { label: 'Servicios', value: 'Consultoría, auditoría y certificación' },
      { label: 'Cobertura', value: 'Agencia aduanal en 10 plazas' },
      { label: 'Sede', value: 'Querétaro, México' },
    ],

    valuesEyebrow: '01 — Por qué Andeus',
    valuesTitle: 'Razones para trabajar con nosotros',
    valuesLead:
      'La experiencia de un equipo altamente especializado, alineada a las necesidades de cada empresa.',

    servicesEyebrow: '02 — Servicios',
    servicesTitle: 'Soluciones integrales para tu comercio exterior',
    servicesLead:
      'Consultoría, capacitación, auditoría, certificación, trámites y logística a través de nuestros consultores altamente capacitados.',
    servicesCta: 'Ver todos los servicios',

    processEyebrow: '03 — Proceso',
    processTitle: 'Una estrategia a la medida de tu empresa.',
    processLead:
      'Cada servicio parte de las necesidades de tu operación y del marco jurídico que le aplica.',

    coverageEyebrow: '04 — Cobertura',
    coverageTitle: {
      lead: 'Agencia aduanal y comercializadora en ',
      accent: 'diez plazas estratégicas',
      tail: '.',
    } as Accented,
    coverageLead:
      'Operamos en los principales puertos, fronteras y aduanas interiores para conectar tu mercancía con su destino.',
    coverageNote:
      'Transporte aéreo, marítimo y terrestre, almacenaje, consolidación y seguro de mercancía como parte del mismo servicio.',

    statementEyebrow: '05 — Nuestra propuesta',
    statementTitle: {
      lead: 'Soluciones integrales a través de consultores ',
      accent: 'altamente capacitados',
      tail: '.',
    } as Accented,
    statementLead:
      'Brindamos a tu empresa servicios personalizados, con base en la experiencia de nuestro equipo y alineados a sus necesidades.',
    statementPillars: [
      { title: 'Estrategia', text: 'Asesoría pensada para la operación y los objetivos de tu empresa.' },
      { title: 'Personalización', text: 'Un servicio alineado a las necesidades específicas de cada cliente.' },
      { title: 'Calidad', text: 'Un equipo altamente especializado detrás de cada servicio.' },
    ],

    newsEyebrow: '06 — Noticias',
    newsTitle: 'Últimas noticias',
    newsCta: 'Ver todas las noticias',

    ctaTitle: '¿Tu empresa necesita asesoría en comercio exterior?',
    ctaLead: 'Cuéntanos sobre tu operación y te ayudamos a definir la estrategia adecuada.',
    ctaPrimary: 'Solicitar asesoría',
  },

  /** Trust block on the home page and the dark value block on Nosotros. */
  values: [
    {
      id: 'especialistas',
      image: 'contenedores-gruas-patio',
      title: 'Consultores especializados',
      text: 'Un equipo altamente capacitado en logística, transporte y comercio exterior.',
    },
    {
      id: 'cumplimiento',
      image: 'garita-aduana-trailer',
      title: 'Cumplimiento jurídico',
      text: 'Garantizamos el cumplimiento del marco jurídico en materia aduanera de tus operaciones.',
    },
    {
      id: 'prevencion',
      image: 'gruas-puerto-noche-vertical',
      title: 'Prevención de riesgos',
      text: 'Alertas oportunas para reducir o eliminar los riesgos fiscales de tu empresa.',
    },
    {
      id: 'integral',
      image: 'pista-aeropuerto-sala',
      title: 'Soluciones integrales',
      text: 'Consultoría, auditoría, certificación, trámites y logística en un mismo despacho.',
    },
  ],

  process: [
    {
      step: '01',
      title: 'Diagnóstico',
      text: 'Conocemos la operación de tu empresa y el marco jurídico que le aplica.',
    },
    {
      step: '02',
      title: 'Estrategia',
      text: 'Nuestros consultores definen la solución adecuada a tus necesidades.',
    },
    {
      step: '03',
      title: 'Ejecución',
      text: 'Gestionamos trámites, certificaciones, auditorías y operaciones de comercio exterior.',
    },
    {
      step: '04',
      title: 'Seguimiento',
      text: 'Acompañamos a tu empresa para mantener un cumplimiento legal oportuno.',
    },
  ],

  /** Entry and exit points we coordinate operations through. */
  customs: [
    { name: 'Nuevo Laredo', type: 'Frontera norte' },
    { name: 'Manzanillo', type: 'Puerto · Pacífico' },
    { name: 'Veracruz', type: 'Puerto · Golfo' },
    { name: 'Querétaro', type: 'Aduana interior' },
    { name: 'CDMX', type: 'Aduana interior' },
    { name: 'Lázaro Cárdenas', type: 'Puerto · Pacífico' },
    { name: 'Altamira', type: 'Puerto · Golfo' },
    { name: 'Laredo', type: 'Frontera norte' },
    { name: 'Guadalajara', type: 'Aduana interior' },
    { name: 'Monterrey', type: 'Aduana interior' },
  ],

  servicesPage: {
    eyebrow: 'Servicios',
    title: 'Consultoría, auditoría, certificación y logística',
    lead:
      'Seis líneas de servicio con consultores altamente capacitados, para que tu empresa opere su comercio exterior con estrategia y cumplimiento.',
    heroImage: 'puerto-ciudad-panoramica',
    heroImageAlt: 'Panorámica de un puerto con grúas de contenedores y la ciudad al fondo',
    indexTitle: 'Índice de servicios',
    ctaTitle: '¿Tu empresa necesita más de un servicio?',
    ctaLead:
      'Nuestras soluciones son integrales. Cuéntanos tu caso y armamos contigo la estrategia completa.',
  },

  services: [
    {
      id: 'consultoria',
      title: 'Consultoría',
      short:
        'Asesoría de estrategia conforme a las necesidades de tu empresa en materia aduanera, fiscal y legal.',
      description:
        'Nuestros consultores especializados brindan asesoría de estrategia conforme a las necesidades de su empresa en los temas que impactan su operación de comercio exterior.',
      includes: [
        'Empresas IMMEX, PROSEC y Regla 8va',
        'Administración y reconstrucción de Anexo 24 y Anexo 31',
        'Certificación en materia de IVA e IEPS',
        'Despacho aduanero y operaciones de importación y exportación',
        'Cumplimiento de regulaciones y restricciones no arancelarias',
        'Estudios y reglas de origen',
        'Clasificación arancelaria',
        'Asesoría legal corporativa y mercantil',
        'Propiedad intelectual',
      ],
      image: 'terminal-gruas-azules',
      imageAlt: 'Grúas pórtico azules en el muelle de una terminal de contenedores',
    },
    {
      id: 'capacitacion',
      title: 'Capacitación',
      short:
        'Capacitación para fortalecer las competencias de tu equipo y mantenerlo actualizado.',
      description:
        'Brindamos capacitación enfocada en fortalecer las competencias de nuestros clientes y en su actualización en los temas que impactan su operación. Nuestro modelo, basado en conceptos jurídico-empresariales, facilita su aplicación en la operatividad de su empresa para el cumplimiento legal oportuno.',
      includes: [
        'Materia aduanera y de comercio exterior',
        'Materia legal corporativa y mercantil',
        'Materia fiscal y contable',
        'Protección de datos',
        'Propiedad intelectual',
      ],
      image: 'flota-buques-bahia',
      imageAlt: 'Buques mercantes fondeados en una bahía, vistos desde un avión',
    },
    {
      id: 'auditoria',
      title: 'Auditoría de Comercio Exterior, Legal y Corporativa',
      short:
        'Auditorías preventivas para emitir alertas oportunas y reducir o eliminar riesgos fiscales.',
      description:
        'Contamos con un área especializada en auditorías preventivas con el fin de realizar alertas oportunas y encontrar áreas de oportunidad para la reducción y/o eliminación total de riesgos fiscales para su empresa.',
      includes: [
        'Materia aduanera y de comercio exterior',
        'Auditoría electrónica de operaciones de comercio exterior',
        'Auditoría de activo fijo (comprobar la legal estancia y/o tenencia de bienes)',
        'Auditoría de cumplimiento de Certificación IVA e IEPS',
        'Auditoría de cumplimiento OEA',
        'Auditoría de Anexo 24',
        'Auditoría legal corporativa y mercantil',
      ],
      image: 'bodega-cajas-madera',
      imageAlt: 'Cajas de madera con mercancía embalada dentro de una bodega',
    },
    {
      id: 'certificacion-nom',
      title: 'Certificación NOM',
      short:
        'Inspección, pruebas y evaluación para comprobar que tu producto cumple la normatividad aplicable.',
      description:
        'Nuestros técnicos realizan servicios de inspección ocular, muestreo, pruebas, investigación de campo y evaluación, comprobando el cumplimiento de la normatividad nacional e internacional para proporcionar seguridad al consumidor y cuidado del medio ambiente respecto de un producto.',
      includes: [
        'Verificación, análisis y pruebas de laboratorio',
        'Cartas de justificación técnica',
        'Creación de diagramas y etiquetado',
        'Certificación y renovación NOM',
        'Traducción de manuales y fichas técnicas',
        'Trámite de folios SOL',
      ],
      image: 'buque-carga-noche',
      imageAlt: 'Buque portacontenedores cargado bajo las grúas de un puerto de noche',
    },
    {
      id: 'tramites-certificaciones',
      title: 'Trámites y Certificaciones',
      short: 'Gestión de padrones, certificaciones, permisos y avisos de comercio exterior.',
      description:
        'Como parte de nuestros servicios integrales de consultoría y comercio exterior, te apoyamos en la gestoría de trámites y certificaciones en la materia.',
      includes: [
        'Padrón de importadores y sectoriales de importación y exportación',
        'Certificación en materia de IVA e IEPS, IMMEX/PROSEC',
        'Permisos COFEPRIS',
        'Regla 2a / Regla 8va',
        'Certificado de elegibilidad / Certificado de origen',
        'OEA / C-TPAT',
        'Avisos automáticos de importación / exportación',
      ],
      image: 'avion-carga-pista',
      imageAlt: 'Avión de carga en la pista de un aeropuerto',
    },
    {
      id: 'logistica-transporte',
      title: 'Logística y Transporte',
      short:
        'Transporte nacional e internacional, almacenaje y despacho aduanal en diez plazas del país.',
      description:
        'Como parte de nuestros servicios integrales de consultoría y comercio exterior, coordinamos la logística y el transporte nacional e internacional de tu mercancía, incluido el despacho a través de nuestra agencia aduanal y comercializadora.',
      includes: [
        'Transporte aéreo, marítimo y terrestre',
        'Almacenaje y distribución',
        'Consolidación y desconsolidación',
        'Seguro de mercancía',
        'Agencia aduanal y comercializadora',
      ],
      appliesTo: SERVICE_AREA,
      image: 'terminal-amanecer',
      imageAlt: 'Terminal de contenedores con sus grúas al amanecer, vista desde el agua',
    },
  ] as {
    id: string
    title: string
    short: string
    description: string
    includes: string[]
    appliesTo?: string[]
    image: string
    imageAlt: string
  }[],

  aboutPage: {
    eyebrow: 'Nosotros',
    title: 'Un despacho de consultores especializados en comercio exterior',
    lead:
      'Andeus Group brinda soluciones integrales de logística, transporte y comercio exterior a empresas que operan en México.',
    heroImage: 'terminal-gruas-contraluz',
    heroImageAlt: 'Grúas de una terminal portuaria a contraluz sobre el mar',

    storyEyebrow: '01 — Quiénes somos',
    storyTitle: 'Cumplimiento jurídico con visión estratégica',
    storyBody: [
      'Somos un despacho de consultores especializados en brindar soluciones integrales de logística, transporte y comercio exterior. Garantizamos el cumplimiento del marco jurídico en materia aduanera de las operaciones de nuestros clientes con base en la experiencia de nuestro equipo altamente especializado.',
      'Nuestra propuesta es brindar a su empresa soluciones integrales con servicios personalizados a través de nuestros consultores altamente capacitados: un servicio de estrategia, personalizado y de calidad, alineado a sus necesidades.',
      'Nuestros servicios abarcan consultoría, capacitación, auditoría, certificación NOM, trámites y certificaciones, despacho aduanal, y logística y transporte nacional e internacional.',
    ],
    storyImageAlt: 'Buque portacontenedores navegando en mar abierto, visto desde el aire',

    valueBlockEyebrow: '02 — Compromiso',
    valueBlockTitle: 'Lo que nos distingue',

    processEyebrow: '03 — Proceso',

    ctaTitle: 'Trabajemos con tu empresa',
    ctaLead:
      'Cuéntanos qué necesita tu operación de comercio exterior y definimos contigo la estrategia adecuada.',
  },

  contactPage: {
    eyebrow: 'Contacto',
    title: 'Hablemos de tu empresa',
    lead:
      'Cuéntanos qué necesita tu operación de comercio exterior y te ayudamos a definir la estrategia adecuada.',
    heroImage: 'puerto-ciudad-gruas-dia',
    heroImageAlt: 'Grúas de contenedores y edificios de la ciudad en la orilla, vistos desde el mar bajo un cielo con nubes',

    infoTitle: 'Información de contacto',
    cards: [
      { title: 'Oficina', lines: [CONTACT.address, CONTACT.addressCity] },
      { title: 'WhatsApp', lines: [CONTACT.whatsappLabel, 'Atención directa con nuestros consultores'] },
      { title: 'Correo electrónico', lines: [CONTACT.email, 'Escríbenos con los detalles de tu operación'] },
      { title: 'Cobertura', lines: [CONTACT.coverage, 'Puertos, fronteras y aduanas interiores'] },
    ],
    mapTitle: 'Querétaro, Qro.',
    mapNote: CONTACT.address,
    mapLabel: 'Mapa de la oficina de Andeus Group en Querétaro',
    whatsappTitle: '¿Necesitas una respuesta rápida?',
    whatsappLead: 'Escríbenos por WhatsApp y uno de nuestros consultores te atenderá directamente.',
  },

  footer: {
    blurb:
      'Despacho de consultores especializados en soluciones integrales de logística, transporte y comercio exterior.',
    navTitle: 'Navegación',
    infoTitle: 'Servicios',
    socialTitle: 'Síguenos',
    info: [
      { label: 'Consultoría', to: `${PATHS.services}#consultoria` },
      { label: 'Auditoría', to: `${PATHS.services}#auditoria` },
      { label: 'Certificación NOM', to: `${PATHS.services}#certificacion-nom` },
      { label: 'Logística y Transporte', to: `${PATHS.services}#logistica-transporte` },
    ],
    social: [
      ...SITE.social.map((s) => ({ label: s.label, href: s.url })),
      { label: 'WhatsApp', href: CONTACT.whatsapp },
    ],
    rights: `© 2026 ${SITE.name}. Todos los derechos reservados.`,
    privacy: { label: 'Aviso de privacidad', to: PATHS.privacy },
    credit: { label: 'Sitio desarrollado por', studio: 'Avalon Nova', href: 'https://avalonnova.com' },
  },

  privacyPage: {
    eyebrow: 'Legal',
    title: 'Aviso de privacidad',
    lead: 'Cómo Andeus Group trata los datos personales de quienes nos contactan y de nuestros clientes.',
    heroImage: 'puerto-gruas-noche',
    heroImageAlt: 'Grúas de un puerto iluminadas de noche, reflejadas en el agua',
    updated: 'Última actualización: 6 de octubre de 2026',
    sections: [
      {
        title: 'Responsable de tus datos personales',
        body: [
          `Andeus Group, con domicilio en ${CONTACT.address}, ${CONTACT.addressCity}, es responsable del uso y protección de tus datos personales, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y demás normativa aplicable.`,
          `Para cualquier asunto relacionado con este aviso, puedes escribirnos a ${CONTACT.email}.`,
        ],
      },
      {
        title: 'Datos personales que recabamos',
        body: [
          'Cuando nos contactas o contratas nuestros servicios podemos recabar los siguientes datos:',
        ],
        items: [
          'Datos de identificación y contacto: nombre, teléfono y correo electrónico.',
          'Datos laborales: empresa, puesto o cargo y domicilio de la empresa.',
          'Información sobre las operaciones de comercio exterior que nos compartas para prestarte el servicio.',
        ],
        after: ['No solicitamos datos personales sensibles.'],
      },
      {
        title: 'Cómo obtenemos tus datos',
        body: [
          'Obtenemos tus datos cuando nos los proporcionas directamente por WhatsApp, correo electrónico, teléfono o en persona. Este sitio web no cuenta con formularios y no recaba datos personales por sí mismo.',
        ],
      },
      {
        title: 'Finalidades del tratamiento',
        body: ['Utilizamos tus datos para las siguientes finalidades, necesarias para el servicio que solicitas:'],
        items: [
          'Atender tus solicitudes de información y asesoría.',
          'Elaborar propuestas y prestar los servicios contratados.',
          'Dar seguimiento a tus operaciones y mantener comunicación contigo.',
          'Facturar y cumplir las obligaciones legales, fiscales y aduaneras que correspondan.',
        ],
        after: [
          'De manera adicional, podemos usar tus datos para enviarte información sobre nuestros servicios. Esta finalidad no es necesaria para la relación contigo; si no deseas que tus datos se usen para ello, indícalo escribiendo a nuestro correo.',
        ],
      },
      {
        title: 'Transferencias de datos',
        body: [
          'No vendemos ni compartimos tus datos personales con terceros para fines propios de ellos. Solo los compartimos cuando es necesario para prestar el servicio que solicitaste (por ejemplo, ante autoridades aduaneras y fiscales en un trámite o despacho) o cuando una ley o una autoridad competente lo requiera.',
        ],
      },
      {
        title: 'Derechos ARCO y revocación del consentimiento',
        body: [
          `Tienes derecho a acceder a tus datos personales, rectificarlos si son inexactos, cancelarlos u oponerte a su uso para fines específicos (derechos ARCO), así como a revocar el consentimiento que nos hayas otorgado. Para ejercerlos, envía tu solicitud a ${CONTACT.email} indicando:`,
        ],
        items: [
          'Tu nombre y un medio para comunicarte la respuesta.',
          'Un documento que acredite tu identidad o, en su caso, la de tu representante.',
          'Una descripción clara de los datos y del derecho que deseas ejercer.',
        ],
        after: [
          'Responderemos tu solicitud en los plazos que establece la ley. Ten en cuenta que, en algunos casos, no podremos cancelar tus datos de forma inmediata cuando una obligación legal nos exija conservarlos.',
        ],
      },
      {
        title: 'Cookies y servicios de terceros',
        body: [
          'Este sitio no utiliza cookies propias ni herramientas de analítica. La página de contacto muestra un mapa de Google Maps y el sitio incluye enlaces a WhatsApp e Instagram; al usarlos, esos servicios pueden recabar información conforme a sus propias políticas de privacidad.',
        ],
      },
      {
        title: 'Cambios a este aviso',
        body: [
          'Podemos actualizar este aviso de privacidad para reflejar cambios legales o en nuestros servicios. La versión vigente estará siempre disponible en esta página, con su fecha de última actualización.',
          'Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes acudir ante la autoridad competente en la materia.',
        ],
      },
    ] as { title: string; body: string[]; items?: string[]; after?: string[] }[],
  },

  blog: {
    eyebrow: 'Noticias',
    title: 'Noticias de comercio exterior',
    lead: 'Novedades de Andeus Group sobre comercio exterior, aduanas y logística.',
    heroImage: 'terminal-amanecer',
    heroImageAlt: 'Terminal de contenedores con sus grúas al amanecer, vista desde el agua',
    listTitle: 'Publicaciones recientes',
    loading: 'Cargando noticias',
    loadMore: 'Cargar más noticias',
    loadingMore: 'Cargando más noticias',
    loadMoreError: 'No pudimos cargar más noticias. Inténtalo de nuevo.',
    emptyTitle: 'Aún no hay noticias publicadas',
    emptyLead: 'Muy pronto compartiremos aquí novedades de comercio exterior, aduanas y logística.',
    errorTitle: 'No pudimos cargar las noticias',
    errorLead: 'Revisa tu conexión e inténtalo de nuevo.',
    postErrorTitle: 'No pudimos cargar esta noticia',
    retry: 'Reintentar',
    back: 'Volver a Noticias',
    breadcrumbLabel: 'Migas de pan',
    home: 'Inicio',
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'Página no encontrada',
    lead: 'La ruta que buscas no existe o fue movida a otra sección del sitio.',
    cta: 'Volver al inicio',
  },
}

export type Copy = typeof es
