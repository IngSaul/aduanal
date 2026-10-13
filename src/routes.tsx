import { Navigate, type RouteObject } from 'react-router'
import RootLayout from './RootLayout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Services from './pages/Services'

/**
 * Route tree shared by the browser router (`App.tsx`) and the prerender
 * (`entry-server.tsx`). Paths match `src/seo/paths.ts`; the router ignores
 * the trailing slash, so `/servicios` and `/servicios/` both resolve.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'servicios', Component: Services },
      // The sector page was dropped; keep old links landing somewhere useful.
      // Production answers it with a 301 from the server (see public/.htaccess).
      { path: 'industrias', element: <Navigate to="/" replace /> },
      { path: 'nosotros', Component: About },
      { path: 'contacto', Component: Contact },
      { path: 'aviso-de-privacidad', Component: Privacy },
      { path: '*', Component: NotFound },
    ],
  },
]
