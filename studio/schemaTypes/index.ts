import { category } from './category'
import { post } from './post'
import { seo } from './seo'

/** Only the blog lives in Sanity; every other page reads src/content/copy.ts. */
export const schemaTypes = [post, category, seo]
