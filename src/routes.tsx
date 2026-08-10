import { createBrowserRouter } from 'react-router'
import RootLayout from './RootLayout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Industries from './pages/Industries'
import NotFound from './pages/NotFound'
import Services from './pages/Services'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'servicios', Component: Services },
      { path: 'industrias', Component: Industries },
      { path: 'nosotros', Component: About },
      { path: 'contacto', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
])
