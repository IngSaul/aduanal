import type { BodyImage, Post } from './blog'

/**
 * SAMPLE POSTS — development and local verification only.
 *
 * Loaded by the dev server when VITE_BLOG_FIXTURES=true and by
 * `BLOG_FIXTURES=1 npm run build` for a local prerender test. Never part of
 * a production build. The copy is placeholder text, not client news.
 */

let key = 0
const k = () => `fx${key++}`

const span = (text: string, marks: string[] = []) => ({ _type: 'span', _key: k(), text, marks })
const block = (style: string, ...children: ReturnType<typeof span>[]) => ({
  _type: 'block' as const,
  _key: k(),
  style,
  markDefs: [] as { _type: string; _key: string; href?: string }[],
  children,
})
const p = (text: string) => block('normal', span(text))
const bullet = (text: string, listItem: 'bullet' | 'number' = 'bullet') => ({ ...p(text), listItem, level: 1 })

const photo = (name: string, alt: string) => ({ localSrc: `/images/${name}.webp`, alt })

function linkParagraph(): ReturnType<typeof block> {
  const internal = k()
  const external = k()
  const b = block(
    'normal',
    span('Este párrafo de ejemplo incluye un '),
    span('enlace interno a Servicios', [internal]),
    span(' y un '),
    span('enlace externo', [external]),
    span(', que se abre en otra pestaña.'),
  )
  b.markDefs = [
    { _type: 'link', _key: internal, href: '/servicios/' },
    { _type: 'link', _key: external, href: 'https://www.sanity.io/docs' },
  ]
  return b
}

const bodyImage = (name: string, alt: string, caption?: string): BodyImage => ({
  _type: 'image',
  _key: k(),
  ...photo(name, alt),
  caption,
})

function samplePost(n: number, base: (typeof TEMPLATES)[number], date: string): Post {
  return {
    _id: `fixture-${n}`,
    title: `${base.title}${n > TEMPLATES.length ? ` (${n})` : ''}`,
    slug: `${base.slug}${n > TEMPLATES.length ? `-${n}` : ''}`,
    publishedAt: date,
    _updatedAt: date,
    excerpt: n > TEMPLATES.length ? `${base.excerpt} Copia número ${n}.` : base.excerpt,
    coverImage: photo(base.cover, base.coverAlt),
    category: base.category,
    seo: null,
    body: [
      p('Contenido de ejemplo para revisar el diseño del blog. Sustitúyelo por publicaciones reales desde el Studio de Sanity.'),
      block('h2', span('Un subtítulo de nivel 2')),
      p('Los párrafos usan la tipografía y los colores del sitio. El texto puede llevar '),
      block('normal', span('negritas', ['strong']), span(', '), span('cursivas', ['em']), span(' y combinaciones de ambas.')),
      linkParagraph(),
      block('h3', span('Un subtítulo de nivel 3')),
      bullet('Primer elemento de una lista con viñetas'),
      bullet('Segundo elemento de la lista'),
      bullet('Tercer elemento de la lista'),
      bodyImage(base.inline, base.inlineAlt, 'Pie de foto opcional de la imagen dentro del texto.'),
      block('blockquote', span('Una cita destacada de ejemplo para ver el estilo del bloque de cita.')),
      bullet('Paso uno de una lista numerada', 'number'),
      bullet('Paso dos de la lista numerada', 'number'),
      p('Fin del contenido de ejemplo.'),
    ],
  }
}

const TEMPLATES = [
  {
    title: 'Ejemplo: publicación con portada de puerto',
    slug: 'ejemplo-publicacion-puerto',
    excerpt: 'Extracto de ejemplo para la tarjeta del listado. En una publicación real resume la noticia en una o dos frases.',
    cover: 'terminal-gruas-azules',
    coverAlt: 'Grúas pórtico azules en el muelle de una terminal de contenedores',
    inline: 'garita-aduana-trailer',
    inlineAlt: 'Tráiler cruzando la garita de acceso a una terminal portuaria',
    category: { title: 'Ejemplo', slug: 'ejemplo' },
  },
  {
    title: 'Ejemplo: publicación sobre logística aérea',
    slug: 'ejemplo-publicacion-logistica-aerea',
    excerpt: 'Otro extracto de ejemplo, con una longitud distinta para comprobar cómo se acomodan las tarjetas de la grilla.',
    cover: 'avion-carga-pista',
    coverAlt: 'Avión de carga en la pista de un aeropuerto',
    inline: 'pista-aeropuerto-sala',
    inlineAlt: 'Pista de un aeropuerto vista desde la sala de espera',
    category: null,
  },
  {
    title: 'Ejemplo: publicación de una bodega',
    slug: 'ejemplo-publicacion-bodega',
    excerpt: 'Tercer extracto de ejemplo, más corto, para revisar el diseño de la tarjeta.',
    cover: 'bodega-cajas-madera',
    coverAlt: 'Cajas de madera con mercancía embalada dentro de una bodega',
    inline: 'buque-carga-noche',
    inlineAlt: 'Buque portacontenedores cargado bajo las grúas de un puerto de noche',
    category: { title: 'Ejemplo', slug: 'ejemplo' },
  },
]

/**
 * The three sample posts, repeated up to twelve entries so "Cargar más" has a
 * second page to load (the list shows nine at a time).
 */
export const FIXTURE_POSTS: Post[] = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 9, 10 - i, 15)).toISOString()
  return samplePost(i + 1, TEMPLATES[i % TEMPLATES.length], date)
})
