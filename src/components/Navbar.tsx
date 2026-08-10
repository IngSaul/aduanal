import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { CONTACT } from '../content/copy'
import { useCopy } from '../i18n'
import { Logo } from './Logo'
import { IconClose, IconMenu, IconWhatsApp } from './icons'

export default function Navbar() {
  const copy = useCopy()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on navigation and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-out',
        solid
          ? 'border-b border-navy/10 bg-white/97 shadow-[0_1px_24px_-14px_rgba(13,27,42,0.5)] backdrop-blur-[2px]'
          : 'border-b border-white/10 bg-transparent',
      ].join(' ')}
    >
      <div className="container-page">
        <div
          className={`flex items-center justify-between gap-5 transition-[height] duration-500 ${
            solid ? 'h-[68px]' : 'h-[84px]'
          }`}
        >
          <Link to="/" aria-label={copy.brand.legal} className="shrink-0">
            <Logo tone={solid ? 'navy' : 'white'} />
          </Link>

          <nav aria-label={copy.brand.legal} className="hidden items-center gap-9 lg:flex">
            {copy.nav.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'link-underline text-[13px] font-semibold tracking-[0.06em] transition-colors duration-300',
                    solid
                      ? isActive
                        ? 'text-gold-600'
                        : 'text-navy hover:text-gold-600'
                      : isActive
                        ? 'text-gold'
                        : 'text-white/75 hover:text-white',
                  ].join(' ')
                }
              >
                {({ isActive }) => <span data-active={isActive}>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.common.whatsappAria}
              title={copy.common.whatsapp}
              className={[
                'grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300',
                solid
                  ? 'border-navy/15 text-navy hover:border-gold hover:bg-gold hover:text-navy'
                  : 'border-white/30 text-white hover:border-gold hover:bg-gold hover:text-navy',
              ].join(' ')}
            >
              <IconWhatsApp className="h-5 w-5" />
            </a>

            <Link
              to="/contacto"
              className={[
                'hidden h-10 items-center rounded-[10px] px-5 text-[12px] font-semibold tracking-[0.11em] uppercase transition-all duration-300 md:inline-flex',
                solid
                  ? 'bg-gold text-navy hover:bg-gold-600 hover:text-white'
                  : 'border border-white/40 text-white hover:border-gold hover:bg-gold hover:text-navy',
              ].join(' ')}
            >
              {copy.nav.cta}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
              className={`grid h-10 w-10 place-items-center rounded-[10px] border transition-colors duration-300 lg:hidden ${
                solid ? 'border-navy/15 text-navy' : 'border-white/30 text-white'
              }`}
            >
              {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — `inert` keeps the collapsed links out of the tab order. */}
      <div
        inert={!open}
        className={`overflow-hidden border-t border-navy/10 bg-white transition-[max-height,opacity] duration-500 ease-out lg:hidden ${
          open ? 'max-h-[620px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-page flex flex-col gap-1 py-6">
          {copy.nav.items.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-baseline gap-4 border-b border-navy/8 py-4 text-[17px] font-semibold tracking-[-0.01em] transition-colors ${
                  isActive ? 'text-gold-600' : 'text-navy'
                }`
              }
            >
              <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-steel">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </NavLink>
          ))}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contacto"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-[10px] bg-gold sm:flex-1 px-5 text-[12px] font-semibold tracking-[0.11em] text-navy uppercase transition-colors hover:bg-gold-600 hover:text-white"
            >
              {copy.nav.cta}
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-[10px] border sm:flex-1 border-navy/20 px-5 text-[12px] font-semibold tracking-[0.11em] text-navy uppercase transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <IconWhatsApp className="h-4.5 w-4.5" />
              {copy.common.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
