/**
 * Single source of truth for every string rendered by the site.
 *
 * The site is published in Spanish only: components read their strings from
 * `useCopy()`, which returns this object.
 */

export const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export const CONTACT = {
  whatsapp: 'https://wa.me/523311940399',
  whatsappLabel: '+52 33 1194 0399',
  phoneHref: 'tel:+523311940399',
  email: 'contacto@aduanex.mx',
  city: 'Guadalajara, Jalisco, México',
  coverage: 'Operaciones en aduanas estratégicas del país',
  hours: 'Lunes a viernes, 9:00 – 18:00 h',
} as const

/** Headline fragment where the middle words are set in the brand gold. */
export type Accented = { lead: string; accent: string; tail: string }

export const es = {
  brand: {
    name: 'ADUANEX',
    descriptor: 'Agencia Aduanal',
    legal: 'ADUANEX Agencia Aduanal',
    tagline: 'Conectamos tu negocio con el mundo.',
  },

  nav: {
    items: [
      { to: '/', label: 'Inicio' },
      { to: '/servicios', label: 'Servicios' },
      { to: '/industrias', label: 'Industrias' },
      { to: '/nosotros', label: 'Nosotros' },
      { to: '/contacto', label: 'Contacto' },
    ],
    cta: 'Cotizar operación',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },

  common: {
    quote: 'Cotizar operación',
    quoteLong: 'Cotiza tu operación',
    services: 'Conoce nuestros servicios',
    viewIndustries: 'Ver todas las industrias',
    viewIndustry: 'Ver sector',
    whatsapp: 'Hablar por WhatsApp',
    whatsappAria: 'Escríbenos por WhatsApp',
    close: 'Cerrar',
    includes: 'Qué incluye',
    appliesTo: 'Aplica en',
    considerations: 'Puntos de atención',
    sector: 'Sector',
  },

  home: {
    heroEyebrow: 'Agencia aduanal · Comercio exterior en México',
    heroTitle: {
      lead: 'Soluciones aduanales que impulsan tu ',
      accent: 'comercio internacional',
      tail: '.',
    } as Accented,
    heroSubtitle:
      'Despacho aduanal, logística y asesoría en comercio exterior con la precisión que tu negocio necesita.',
    heroImageAlt: 'Buque portacontenedores en maniobra junto a las grúas de una terminal portuaria',
    heroFacts: [
      { label: 'Operación', value: 'Importación y exportación' },
      { label: 'Cobertura', value: 'Aduanas estratégicas' },
      { label: 'Enfoque', value: 'Cumplimiento y trazabilidad' },
    ],

    valuesEyebrow: '01 — Por qué ADUANEX',
    valuesTitle: 'Razones para operar con nosotros',
    valuesLead:
      'Cuatro criterios que sostienen cada operación que ponemos en marcha, sin importar su tamaño.',

    servicesEyebrow: '02 — Servicios',
    servicesTitle: 'Servicios para simplificar tu comercio exterior',
    servicesLead:
      'Integramos servicios aduanales, logísticos y de consultoría para que tu mercancía llegue a donde necesita estar.',
    servicesCta: 'Ver todos los servicios',

    processEyebrow: '03 — Proceso',
    processTitle: 'De tu operación al destino, paso a paso.',
    processLead:
      'Un método claro que mantiene la documentación, los tiempos y la comunicación bajo control.',

    industriesEyebrow: '04 — Industrias',
    industriesTitle: 'Experiencia en diferentes industrias',
    industriesLead: 'Entendemos que cada sector tiene necesidades y desafíos diferentes.',

    coverageEyebrow: '05 — Cobertura',
    coverageTitle: {
      lead: 'Conectamos operaciones con los ',
      accent: 'principales puntos de entrada y salida',
      tail: '.',
    } as Accented,
    coverageLead:
      'Trabajamos mediante una red estratégica de cobertura para facilitar operaciones de comercio exterior en México.',
    coverageNote:
      'El punto de despacho se define según el origen, el destino y el tipo de mercancía de cada operación.',

    statementEyebrow: '06 — Nuestra postura',
    statementTitle: {
      lead: 'Más que un trámite, somos tu ',
      accent: 'aliado estratégico',
      tail: '.',
    } as Accented,
    statementLead:
      'Nuestro objetivo es ayudarte a operar tu comercio exterior con mayor claridad, control y confianza.',
    statementPillars: [
      { title: 'Claridad', text: 'Sabes en qué etapa está tu operación y qué sigue en cada momento.' },
      { title: 'Control', text: 'Documentación, tiempos y costos revisados antes de que sean un problema.' },
      { title: 'Confianza', text: 'Un criterio sustentado detrás de cada decisión que tomamos contigo.' },
    ],

    ctaTitle: '¿Tienes una operación en puerta?',
    ctaLead:
      'Cuéntanos qué necesitas y te ayudaremos a identificar la mejor forma de llevarla a cabo.',
    ctaPrimary: 'Cotizar mi operación',
  },

  /** Trust block on the home page and the dark value block on Nosotros. */
  values: [
    {
      id: 'experiencia',
      title: 'Experiencia',
      text: 'Conocimiento especializado para gestionar operaciones de comercio exterior.',
    },
    {
      id: 'precision',
      title: 'Precisión',
      text: 'Procesos cuidadosamente coordinados para reducir errores y retrasos.',
    },
    {
      id: 'cumplimiento',
      title: 'Cumplimiento',
      text: 'Operaciones alineadas con las disposiciones y regulaciones aplicables.',
    },
    {
      id: 'atencion',
      title: 'Atención personalizada',
      text: 'Acompañamiento cercano durante cada etapa de tu operación.',
    },
  ],

  process: [
    {
      step: '01',
      title: 'Analizamos',
      text: 'Conocemos tu mercancía, origen, destino y necesidades específicas.',
    },
    {
      step: '02',
      title: 'Planeamos',
      text: 'Definimos la estrategia aduanal y logística adecuada para tu operación.',
    },
    {
      step: '03',
      title: 'Gestionamos',
      text: 'Coordinamos documentación, despacho y los procesos necesarios.',
    },
    {
      step: '04',
      title: 'Damos seguimiento',
      text: 'Acompañamos la operación para mantener el control durante todo el proceso.',
    },
  ],

  /** Entry and exit points we coordinate operations through. */
  customs: [
    {
      name: 'Nuevo Laredo',
      type: 'Frontera norte',
      note: 'Cruce terrestre con alto flujo de carga hacia y desde Estados Unidos.',
    },
    {
      name: 'Manzanillo',
      type: 'Puerto · Pacífico',
      note: 'Terminal de contenedores conectada con los mercados de Asia.',
    },
    {
      name: 'Veracruz',
      type: 'Puerto · Golfo',
      note: 'Punto de entrada marítima con conexión a Europa y Sudamérica.',
    },
    {
      name: 'Altamira',
      type: 'Puerto · Golfo',
      note: 'Manejo de carga industrial, granel y proyectos de gran volumen.',
    },
    {
      name: 'AICM',
      type: 'Carga aérea',
      note: 'Aeropuerto Internacional de la Ciudad de México para embarques aéreos.',
    },
  ],

  servicesPage: {
    eyebrow: 'Servicios',
    title: 'Servicios aduanales, logísticos y de consultoría',
    lead:
      'Seis líneas de servicio que cubren el ciclo completo de una operación: desde la revisión documental previa hasta la entrega de la mercancía en su destino.',
    heroImageAlt: 'Vista aérea de una terminal de contenedores con grúas de patio',
    indexTitle: 'Índice de servicios',
    ctaTitle: '¿Tu operación combina varios servicios?',
    ctaLead:
      'La mayoría de las operaciones integran despacho, transporte y asesoría. Cuéntanos el caso y lo revisamos contigo.',
  },

  services: [
    {
      id: 'despacho-aduanal',
      title: 'Despacho Aduanal',
      short:
        'Gestión integral de operaciones de importación y exportación, desde la documentación hasta el despacho de mercancías.',
      description:
        'Coordinamos el despacho de principio a fin: revisión de la documentación del embarque, validación de datos, elaboración del pedimento, atención del reconocimiento aduanero y liberación de la mercancía. Cada operación se trabaja con la información del cliente y con los terceros que intervienen en ella.',
      includes: [
        'Revisión documental previa al arribo del embarque',
        'Elaboración y presentación del pedimento',
        'Atención y seguimiento del reconocimiento aduanero',
        'Coordinación de la liberación y salida de la mercancía',
      ],
      appliesTo: ['Importación', 'Exportación', 'Carga marítima', 'Carga terrestre'],
      image: '1450101499163-c8848c66ca85',
      imageAlt: 'Persona revisando y firmando la documentación de una operación de comercio exterior',
    },
    {
      id: 'logistica-internacional',
      title: 'Logística Internacional',
      short:
        'Coordinación de transporte y logística para conectar tus operaciones con diferentes mercados.',
      description:
        'Planeamos el movimiento de la mercancía entre el origen y el destino: transporte, maniobras, consolidación, almacenaje y entrega final. La ruta y el modo de transporte se definen según el tipo de mercancía, los tiempos del cliente y el punto de despacho seleccionado.',
      includes: [
        'Transporte terrestre nacional y transfronterizo',
        'Maniobras de carga, descarga y consolidación',
        'Almacenaje temporal y control documental del inventario',
        'Programación de citas y entregas en destino',
      ],
      appliesTo: ['Carga completa', 'Carga consolidada', 'Cruce fronterizo', 'Entrega en planta'],
      image: '1519003722824-194d4455a60c',
      imageAlt: 'Camión de carga circulando por una carretera hacia el punto de destino',
    },
    {
      id: 'clasificacion-arancelaria',
      title: 'Clasificación Arancelaria',
      short:
        'Análisis de mercancías para determinar su correcta clasificación y facilitar el cumplimiento de las disposiciones aplicables.',
      description:
        'Analizamos la naturaleza, composición y uso de la mercancía para sustentar la fracción arancelaria que le corresponde. Un criterio bien documentado reduce el riesgo de diferencias, sanciones y demoras durante el despacho.',
      includes: [
        'Estudio técnico de la mercancía y su documentación',
        'Propuesta de fracción arancelaria y NICO sustentada',
        'Identificación de regulaciones y restricciones no arancelarias',
        'Homologación del catálogo de productos de la empresa',
      ],
      appliesTo: ['Materias primas', 'Componentes', 'Producto terminado', 'Maquinaria'],
      image: '1554224155-6726b3ff858f',
      imageAlt: 'Escritorio con documentos, calculadora y análisis de costos de una operación',
    },
    {
      id: 'padrones-regulaciones',
      title: 'Padrones y Regulaciones',
      short:
        'Asesoría y gestión relacionada con padrones, permisos y regulaciones necesarias para tus operaciones.',
      description:
        'Acompañamos a la empresa en los requisitos previos a la operación: inscripción y actualización en padrones, permisos, avisos y normas aplicables a la mercancía. Revisar estos puntos antes del embarque evita que la carga quede detenida en la aduana.',
      includes: [
        'Inscripción y actualización en el padrón de importadores',
        'Gestión de padrones sectoriales según la mercancía',
        'Trámite de permisos previos y avisos aplicables',
        'Revisión de normas oficiales mexicanas y etiquetado',
      ],
      appliesTo: ['Padrón de importadores', 'Padrones sectoriales', 'Permisos previos', 'Etiquetado'],
      image: '1586281380349-632531db7ed4',
      imageAlt: 'Expediente y lista de verificación de requisitos sobre un escritorio de trabajo',
    },
    {
      id: 'freight-forwarding',
      title: 'Freight Forwarding',
      short:
        'Coordinación de embarques marítimos, aéreos y terrestres de acuerdo con las necesidades de cada operación.',
      description:
        'Gestionamos la contratación y el seguimiento del flete internacional en sus distintos modos. Comparamos alternativas de ruta, tiempo de tránsito y costo, y damos seguimiento al embarque desde su recolección en origen hasta la llegada al punto de despacho.',
      includes: [
        'Cotización y contratación de flete marítimo, aéreo y terrestre',
        'Coordinación de recolección y documentación en origen',
        'Seguimiento del embarque y actualización de estatus',
        'Apoyo en la contratación del seguro de carga',
      ],
      appliesTo: ['Marítimo', 'Aéreo', 'Terrestre', 'Multimodal'],
      image: '1569154941061-e231b4725ef1',
      imageAlt: 'Avión de carga en la pista de un aeropuerto internacional',
    },
    {
      id: 'consultoria',
      title: 'Consultoría en Comercio Exterior',
      short:
        'Asesoría estratégica para planear, optimizar y ejecutar operaciones de comercio internacional.',
      description:
        'Revisamos la operación de comercio exterior de la empresa para identificar oportunidades de mejora: estructura documental, criterios de clasificación, aprovechamiento de tratados y programas de fomento, y controles internos que sostienen el cumplimiento a lo largo del tiempo.',
      includes: [
        'Diagnóstico de la operación de comercio exterior',
        'Análisis de tratados comerciales y reglas de origen',
        'Revisión de programas de fomento aplicables a la empresa',
        'Definición de controles internos y expediente documental',
      ],
      appliesTo: ['Planeación', 'Cumplimiento', 'Costos', 'Auditoría interna'],
      image: '1600880292203-757bb62b4baf',
      imageAlt: 'Equipo de trabajo revisando la estrategia de una operación de comercio exterior',
    },
  ],

  industriesPage: {
    eyebrow: 'Industrias',
    title: 'Cada sector opera de una forma distinta',
    lead:
      'La mercancía, las regulaciones y los tiempos cambian de una industria a otra. Conocer esas diferencias es lo que permite anticipar los puntos críticos de cada operación.',
    heroImageAlt: 'Línea de producción automatizada dentro de una planta de manufactura',
    ctaTitle: '¿Tu sector no aparece en la lista?',
    ctaLead:
      'Trabajamos con mercancías de distintos giros. Cuéntanos qué necesitas mover y revisamos los requisitos que aplican a tu caso.',
  },

  industries: [
    {
      id: 'automotriz',
      name: 'Automotriz',
      short: 'Autopartes, componentes y equipo para líneas de producción.',
      description:
        'Operaciones de proveeduría automotriz donde el tiempo de entrega y la trazabilidad documental son determinantes: componentes, autopartes, herramentales y equipo para planta.',
      points: [
        'Embarques recurrentes con programas de entrega definidos',
        'Clasificación de componentes, herramentales y refacciones',
        'Coordinación con plantas y proveedores de primer y segundo nivel',
      ],
      image: '1565043666747-69f6646db940',
      imageAlt: 'Fila de automóviles nuevos listos para su distribución',
    },
    {
      id: 'manufactura',
      name: 'Manufactura',
      short: 'Insumos, materias primas y producto terminado.',
      description:
        'Empresas que importan insumos y exportan producto terminado, con necesidades de control documental y continuidad en el abasto de sus líneas.',
      points: [
        'Importación de materias primas e insumos de proceso',
        'Exportación de producto terminado',
        'Operaciones vinculadas a programas de fomento',
      ],
      image: '1581091226825-a6a2a5aee158',
      imageAlt: 'Técnica supervisando un proceso de manufactura en planta',
    },
    {
      id: 'electronica',
      name: 'Electrónica',
      short: 'Componentes y dispositivos de alto valor y rotación.',
      description:
        'Mercancía de ciclo de vida corto y valor elevado, donde la clasificación y las regulaciones técnicas requieren una revisión detallada antes de cada embarque.',
      points: [
        'Clasificación de componentes y equipo terminado',
        'Regulaciones técnicas y requisitos de etiquetado',
        'Embarques aéreos cuando el tiempo es crítico',
      ],
      image: '1518770660439-4636190af475',
      imageAlt: 'Placa de circuito impreso con componentes electrónicos',
    },
    {
      id: 'alimentos-bebidas',
      name: 'Alimentos y bebidas',
      short: 'Productos con requisitos sanitarios y tiempos sensibles.',
      description:
        'Operaciones que exigen atención a requisitos sanitarios, etiquetado y condiciones de transporte para preservar la mercancía durante todo el trayecto.',
      points: [
        'Revisión de requisitos sanitarios y de etiquetado',
        'Transporte con control de temperatura',
        'Certificados de origen y documentación de respaldo',
      ],
      image: '1543168256-418811576931',
      imageAlt: 'Productos alimenticios empacados listos para su distribución',
    },
    {
      id: 'maquinaria',
      name: 'Maquinaria',
      short: 'Equipo industrial, líneas completas y refacciones.',
      description:
        'Importación de maquinaria y equipo, incluyendo embarques de dimensiones especiales y proyectos que terminan con la instalación dentro de planta.',
      points: [
        'Carga de dimensiones y peso especiales',
        'Clasificación de equipo, partes y refacciones',
        'Coordinación de maniobras y entrega en planta',
      ],
      image: '1580901368919-7738efb0f87e',
      imageAlt: 'Maquinaria pesada en un sitio de trabajo industrial',
    },
    {
      id: 'siderurgia',
      name: 'Siderurgia',
      short: 'Acero y metales con regulaciones específicas.',
      description:
        'Mercancía sujeta a regulaciones particulares y requisitos documentales que deben revisarse con anticipación para no comprometer el despacho.',
      points: [
        'Revisión de permisos y avisos aplicables al acero',
        'Manejo de carga a granel y de gran volumen',
        'Documentación de origen y certificados de calidad',
      ],
      image: '1757266705809-22af172a3b26',
      imageAlt: 'Instalación siderúrgica con hornos y estructuras metálicas',
    },
    {
      id: 'tecnologia',
      name: 'Tecnología',
      short: 'Cómputo, telecomunicaciones e infraestructura digital.',
      description:
        'Embarques de equipo y componentes que combinan alto valor, garantías del fabricante y regulaciones técnicas aplicables a su comercialización.',
      points: [
        'Clasificación de equipo, accesorios y consumibles',
        'Homologaciones y regulaciones técnicas aplicables',
        'Operaciones de reparación, garantía y retorno',
      ],
      image: '1558494949-ef010cbdcc31',
      imageAlt: 'Racks de servidores dentro de un centro de datos',
    },
    {
      id: 'mobiliario',
      name: 'Mobiliario',
      short: 'Muebles, acabados y artículos para proyecto.',
      description:
        'Carga voluminosa que requiere planeación de espacio, consolidación y cuidado en el manejo desde el origen hasta la entrega final.',
      points: [
        'Consolidación de carga voluminosa',
        'Requisitos de etiquetado comercial',
        'Entregas programadas por etapa de proyecto',
      ],
      image: '1524758631624-e2822e304c36',
      imageAlt: 'Interior con mobiliario y acabados listos para entrega',
    },
    {
      id: 'retail',
      name: 'Retail',
      short: 'Bienes de consumo con temporadas y volúmenes variables.',
      description:
        'Operaciones con picos de temporada, donde la planeación anticipada evita costos de almacenaje y llegadas fuera de tiempo al punto de venta.',
      points: [
        'Planeación de temporadas y picos de volumen',
        'Etiquetado comercial y normas aplicables',
        'Manejo de múltiples proveedores en un mismo embarque',
      ],
      image: '1441986300917-64674bd600d8',
      imageAlt: 'Interior de una tienda con mercancía en exhibición',
    },
  ],

  aboutPage: {
    eyebrow: 'Nosotros',
    title: 'Una agencia aduanal enfocada en la operación de su cliente',
    lead:
      'ADUANEX acompaña a empresas mexicanas en sus operaciones de importación y exportación, con un enfoque en el cumplimiento, la trazabilidad documental y la comunicación directa.',
    heroImageAlt: 'Torres corporativas de un centro financiero internacional',

    storyEyebrow: '01 — Quiénes somos',
    storyTitle: 'Comercio exterior sin sorpresas',
    storyBody: [
      'Una operación de comercio exterior se detiene por detalles: un dato que no coincide, un permiso que faltaba, una clasificación que nadie sustentó. Nuestro trabajo consiste en revisar esos detalles antes de que la mercancía llegue a la aduana.',
      'Por eso trabajamos con un expediente ordenado desde el primer contacto: qué se mueve, de dónde viene, a dónde va y qué requisitos aplican. Con esa base definimos el punto de despacho, la ruta y los tiempos reales de la operación.',
      'El resultado es una operación que el cliente puede seguir y explicar en su empresa, con un interlocutor que conoce el caso y responde con información concreta en cada etapa.',
    ],
    storyImageAlt: 'Dos personas revisando documentación de comercio exterior en una oficina',

    missionTitle: 'Misión',
    missionBody:
      'Facilitar las operaciones de comercio exterior de nuestros clientes mediante un servicio aduanal preciso, documentado y apegado a las disposiciones aplicables.',
    visionTitle: 'Visión',
    visionBody:
      'Ser la agencia aduanal de referencia para las empresas que buscan claridad y control en cada una de sus operaciones internacionales.',

    valuesEyebrow: '02 — Valores',
    valuesTitle: 'Lo que sostiene cada operación',
    values: [
      { title: 'Precisión', text: 'Los datos se revisan antes de presentarse, no después de una incidencia.' },
      { title: 'Cumplimiento', text: 'Cada criterio que aplicamos se sustenta en la disposición que lo respalda.' },
      { title: 'Transparencia', text: 'Costos, tiempos y riesgos se conversan de frente desde la cotización.' },
      { title: 'Cercanía', text: 'Un interlocutor que conoce tu operación y da seguimiento a lo acordado.' },
      { title: 'Confidencialidad', text: 'La información comercial del cliente se maneja con reserva.' },
    ],

    focusEyebrow: '03 — Enfoque',
    focusTitle: 'En qué ponemos atención',
    focus: [
      {
        step: '01',
        title: 'Cumplimiento normativo',
        text: 'Revisamos que la operación se apegue a las disposiciones y requisitos aplicables a la mercancía.',
      },
      {
        step: '02',
        title: 'Trazabilidad documental',
        text: 'Cada operación se sustenta en un expediente ordenado y disponible cuando se necesita.',
      },
      {
        step: '03',
        title: 'Coordinación logística',
        text: 'Alineamos transporte, despacho y entrega para que una etapa no detenga a la siguiente.',
      },
      {
        step: '04',
        title: 'Comunicación directa',
        text: 'Informamos avances y desviaciones a tiempo, con lenguaje claro y datos verificables.',
      },
    ],
    focusImageAlts: [
      'Buque de carga atracado en una terminal de contenedores',
      'Almacén con mercancía organizada en racks para su distribución',
    ],

    valueBlockEyebrow: '04 — Compromiso',
    valueBlockTitle: 'Cuatro constantes en nuestro servicio',

    processEyebrow: '05 — Proceso',

    ctaTitle: 'Trabajemos en tu próxima operación',
    ctaLead:
      'Cuéntanos qué mercancía necesitas mover y revisamos contigo los requisitos, los tiempos y la mejor forma de ejecutarla.',
  },

  contactPage: {
    eyebrow: 'Contacto',
    title: 'Hablemos de tu operación',
    lead:
      'Cuéntanos qué necesitas mover, desde dónde y hacia dónde. Te ayudamos a identificar la mejor forma de llevarlo a cabo.',
    heroImageAlt: 'Almacén con mercancía organizada en racks, lista para su distribución',

    formTitle: 'Cotizar operación',
    formLead: 'Los campos marcados con asterisco son obligatorios.',
    fields: {
      name: 'Nombre',
      company: 'Empresa',
      email: 'Correo',
      phone: 'Teléfono',
      service: 'Servicio de interés',
      servicePlaceholder: 'Selecciona una opción',
      message: 'Mensaje',
      messagePlaceholder:
        'Describe la mercancía, el origen, el destino y la fecha estimada de la operación.',
    },
    submit: 'Enviar solicitud',
    submitted: 'Recibimos tu solicitud. Te contactaremos para dar seguimiento.',
    privacy:
      'Al enviar aceptas que utilicemos tus datos únicamente para responder a esta solicitud.',

    infoTitle: 'Información de contacto',
    cards: [
      { title: 'Cobertura', lines: [CONTACT.city, CONTACT.coverage] },
      { title: 'WhatsApp', lines: [CONTACT.whatsappLabel, 'Atención directa para operaciones en curso'] },
      { title: 'Correo electrónico', lines: [CONTACT.email, 'Respuesta en horario de oficina'] },
      { title: 'Horario', lines: [CONTACT.hours, 'Seguimiento a embarques según su itinerario'] },
    ],
    mapTitle: 'Guadalajara, Jalisco',
    mapNote: 'Coordinación de operaciones en aduanas marítimas, fronterizas y aéreas',
    mapLabel: 'Ubicación de referencia',
    whatsappTitle: '¿Necesitas una respuesta rápida?',
    whatsappLead:
      'Si tu embarque ya está en tránsito o tienes una fecha de arribo cerca, escríbenos por WhatsApp.',
  },

  footer: {
    blurb:
      'Agencia aduanal especializada en despacho, logística internacional y asesoría en comercio exterior para empresas que operan en México.',
    navTitle: 'Navegación',
    infoTitle: 'Información',
    socialTitle: 'Síguenos',
    info: [
      { label: 'Agencia Aduanal', to: '/nosotros' },
      { label: 'Comercio Exterior', to: '/servicios#consultoria' },
      { label: 'Logística Internacional', to: '/servicios#logistica-internacional' },
      { label: 'Cotizaciones', to: '/contacto' },
    ],
    social: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com' },
      { label: 'Facebook', href: 'https://www.facebook.com' },
      { label: 'Instagram', href: 'https://www.instagram.com' },
      { label: 'WhatsApp', href: CONTACT.whatsapp },
    ],
    rights: '© 2026 ADUANEX Agencia Aduanal. Todos los derechos reservados.',
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'Página no encontrada',
    lead: 'La ruta que buscas no existe o fue movida a otra sección del sitio.',
    cta: 'Volver al inicio',
  },
}

export type Copy = typeof es
