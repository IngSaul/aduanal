import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { routes } from './routes'
import { SITE } from './seo/site'

/**
 * Server entry for the build-time prerender (`scripts/prerender.mjs`).
 * The app has no `React.lazy` or `Suspense`, so `renderToString` is enough.
 */
export async function render(url: string): Promise<{ html: string; status: number }> {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(new URL(url, SITE.url)))
  if (context instanceof Response) throw new Error(`Unexpected redirect while prerendering ${url}`)

  const router = createStaticRouter(handler.dataRoutes, context)
  const html = renderToString(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </React.StrictMode>,
  )
  return { html, status: context.statusCode }
}

export { renderHead } from './seo/head'
export { NOT_FOUND_ROUTE, PRIVATE_PATHS, SEO_ROUTES } from './seo/routes'
export { SITE } from './seo/site'
