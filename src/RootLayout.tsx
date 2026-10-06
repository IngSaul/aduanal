import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import WhatsAppButton from './components/WhatsAppButton'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      return
    }

    // Client-side navigation never jumps to the fragment on its own. The new page
    // is already committed when this runs, so the target is normally there; the
    // short retry only covers a late render. `scroll-mt-*` on it clears the navbar.
    const id = decodeURIComponent(hash.slice(1))
    let timer = 0
    let tries = 0
    const jump = () => {
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior })
      } else if (tries++ < 20) {
        timer = window.setTimeout(jump, 50)
      }
    }
    jump()
    return () => window.clearTimeout(timer)
  }, [pathname, hash])
  return null
}

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
