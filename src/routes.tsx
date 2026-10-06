import { createBrowserRouter, Navigate } from 'react-router'
import RootLayout from './RootLayout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Services from './pages/Services'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'servicios', Component: Services },
      // The sector page was dropped; keep old links landing somewhere useful.
      { path: 'industrias', element: <Navigate to="/" replace /> },
      { path: 'nosotros', Component: About },
      { path: 'contacto', Component: Contact },
      { path: 'aviso-de-privacidad', Component: Privacy },
      { path: '*', Component: NotFound },
    ],
  },
])
