import { SearchIcon } from '@sanity/icons/Search'
import { defineField, defineType } from 'sanity'

/** Optional overrides. Empty fields fall back to the post's title, excerpt and cover. */
export const seo = defineType({
  name: 'seo',
  title: 'SEO y redes sociales',
  type: 'object',
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Título para Google',
      description: 'Opcional. Si lo dejas vacío se usa el título de la noticia. Máximo 60 caracteres.',
      type: 'string',
      validation: (rule) => rule.max(60).error('Máximo 60 caracteres.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Descripción para Google',
      description: 'Opcional. Si la dejas vacía se usa el extracto. Máximo 160 caracteres.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).error('Máximo 160 caracteres.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen al compartir',
      description: 'Opcional. Si la dejas vacía se usa la portada. Se recorta a 1200 × 630 alrededor del punto de interés.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown } | undefined
              return parent?.asset && !alt ? 'Describe la imagen para quien no puede verla.' : true
            }),
        }),
      ],
    }),
  ],
})
