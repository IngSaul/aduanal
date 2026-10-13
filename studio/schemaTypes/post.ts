import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { ImageIcon } from '@sanity/icons/Image'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { SLUG_PATTERN, slugify } from './slug'

const altField = defineField({
  name: 'alt',
  title: 'Texto alternativo',
  description: 'Describe la imagen para quien no puede verla y para Google. Obligatorio.',
  type: 'string',
  validation: (rule) => rule.required().error('Describe la imagen.'),
})

export const post = defineType({
  name: 'post',
  title: 'Noticia',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(100).error('Escribe un título de hasta 100 caracteres.'),
    }),
    defineField({
      name: 'slug',
      title: 'Dirección (URL)',
      description: 'Se genera desde el título. Queda como andeus.mx/blog/<dirección>/. Evita cambiarla después de publicar.',
      type: 'slug',
      group: 'content',
      options: { source: 'title', slugify, maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((slug) =>
          !slug?.current || SLUG_PATTERN.test(slug.current) ? true : 'Usa solo minúsculas, números y guiones.',
        ),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      description: 'La noticia aparece en el sitio a partir de esta fecha y hora.',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Portada',
      description: 'Foto horizontal. Marca el punto de interés para que los recortes no lo corten.',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [altField],
      validation: (rule) => rule.required().error('Agrega una portada.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      description: 'Resumen de una o dos frases para el listado y Google. Máximo 200 caracteres.',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required().max(200).error('Escribe un extracto de hasta 200 caracteres.'),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Párrafo', value: 'normal' },
            { title: 'Subtítulo (H2)', value: 'h2' },
            { title: 'Subtítulo menor (H3)', value: 'h3' },
            { title: 'Cita', value: 'blockquote' },
          ],
          lists: [
            { title: 'Viñetas', value: 'bullet' },
            { title: 'Numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Enlace',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'Dirección',
                    description: 'Los enlaces a otros sitios se abren en una pestaña nueva.',
                    type: 'url',
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] })
                        .error('Escribe una dirección válida (https://…, /servicios/, mailto:…).'),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          title: 'Imagen',
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            altField,
            defineField({ name: 'caption', title: 'Pie de foto', type: 'string', description: 'Opcional.' }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1).error('Escribe el contenido de la noticia.'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO y redes sociales',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Fecha de publicación (recientes primero)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', publishedAt: 'publishedAt', media: 'coverImage' },
    prepare: ({ title, publishedAt, media }) => ({
      title,
      media,
      subtitle: publishedAt
        ? new Intl.DateTimeFormat('es-MX', { dateStyle: 'long', timeZone: 'America/Mexico_City' }).format(new Date(publishedAt))
        : 'Sin fecha',
    }),
  },
})
