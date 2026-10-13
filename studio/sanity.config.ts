import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { TagIcon } from '@sanity/icons/Tag'
import { esESLocale } from '@sanity/locale-es-es'
import { defineConfig } from 'sanity'
import { structureTool, type StructureResolver } from 'sanity/structure'
import { dataset, projectId } from './env'
import { schemaTypes } from './schemaTypes'

/** The Studio holds the blog and nothing else: news and their categories. */
const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Noticias')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('post')
            .title('Noticias')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
        ),
      S.listItem()
        .title('Categorías')
        .icon(TagIcon)
        .child(S.documentTypeList('category').title('Categorías')),
    ])

export default defineConfig({
  name: 'andeus',
  title: 'Andeus Group · Noticias',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), esESLocale()],
  schema: {
    types: schemaTypes,
    // "Create new" only offers the two document types of the blog.
    templates: (templates) => templates.filter(({ schemaType }) => ['post', 'category'].includes(schemaType)),
  },
})
