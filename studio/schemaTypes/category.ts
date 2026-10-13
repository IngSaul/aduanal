import { TagIcon } from '@sanity/icons/Tag'
import { defineField, defineType } from 'sanity'
import { SLUG_PATTERN, slugify } from './slug'

export const category = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required().max(60).error('Escribe un nombre de hasta 60 caracteres.'),
    }),
    defineField({
      name: 'slug',
      title: 'Identificador para la URL',
      type: 'slug',
      options: { source: 'title', slugify },
      validation: (rule) =>
        rule.required().custom((slug) =>
          !slug?.current || SLUG_PATTERN.test(slug.current) ? true : 'Usa solo minúsculas, números y guiones.',
        ),
    }),
  ],
  preview: { select: { title: 'title' } },
})
