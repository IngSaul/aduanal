import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { BlogDataProvider, type BlogData } from './lib/blogData'
import { routes } from './routes'
import { SITE } from './seo/site'

/**
 * Server entry for the build-time prerender (`scripts/prerender.mjs`).
 * The app has no `React.lazy` or `Suspense`, so `renderToString` is enough.
 */
export async function render(url: string, blogData: BlogData | null = null): Promise<{ html: string; status: number }> {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(new URL(url, SITE.url)))
  if (context instanceof Response) throw new Error(`Unexpected redirect while prerendering ${url}`)

  const router = createStaticRouter(handler.dataRoutes, context)
  const html = renderToString(
    <React.StrictMode>
      <BlogDataProvider value={blogData}>
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </BlogDataProvider>
    </React.StrictMode>,
  )
  return { html, status: context.statusCode }
}

export { renderHead, socialTags } from './seo/head'
export { blogIndexRoute, postSeoRoute } from './seo/blog'
export { PATHS, postPath } from './seo/paths'
export { fetchAllPosts, PAGE_SIZE, toCard } from './lib/blog'
export { dataset, projectId, sanityConfigured } from './lib/sanity'
// Sample posts for `BLOG_FIXTURES=1 npm run build` (local check only). Server bundle only.
export { FIXTURE_POSTS } from './lib/blog-fixtures'
export { NOT_FOUND_ROUTE, PRIVATE_PATHS, SEO_ROUTES } from './seo/routes'
export { SITE } from './seo/site'
