import type { ComponentType, SVGProps } from 'react'
import { Link } from 'react-router'
import { useCopy } from '../i18n'
import { Logo } from './Logo'
import { IconFacebook, IconInstagram, IconLinkedIn, IconWhatsApp } from './icons'

/** Keyed by the labels listed in `copy.footer.social`. */
const SOCIAL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  LinkedIn: IconLinkedIn,
  Facebook: IconFacebook,
  Instagram: IconInstagram,
  WhatsApp: IconWhatsApp,
}

export default function Footer() {
  const copy = useCopy()

  return (
    <footer className="grid-etch bg-navy text-light">
      <div className="container-page">
        <div className="grid gap-14 border-b border-white/10 py-16 md:py-20 lg:grid-cols-[1.5fr_1fr_1.1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Logo tone="white" />
            <p className="mt-6 text-[14px] leading-[1.8] text-light/65">{copy.footer.blurb}</p>
            <p className="mt-6 text-[15px] leading-snug font-semibold tracking-[-0.01em] text-gold">
              {copy.brand.tagline}
            </p>
          </div>

          <nav aria-label={copy.footer.navTitle}>
            <h2 className="font-mono text-[10.5px] font-medium tracking-[0.22em] text-steel-300 uppercase">
              {copy.footer.navTitle}
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {copy.nav.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline inline-block py-1 text-[14px] text-light/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={copy.footer.infoTitle}>
            <h2 className="font-mono text-[10.5px] font-medium tracking-[0.22em] text-steel-300 uppercase">
              {copy.footer.infoTitle}
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {copy.footer.info.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="link-underline inline-block py-1 text-[14px] text-light/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[10.5px] font-medium tracking-[0.22em] text-steel-300 uppercase">
              {copy.footer.socialTitle}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {copy.footer.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.label]
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-light/80 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-[0.1em] text-steel-300">
            {copy.footer.rights}{' '}
            <span aria-hidden="true">·</span>{' '}
            <Link to={copy.footer.privacy.to} className="link-underline transition-colors hover:text-white">
              {copy.footer.privacy.label}
            </Link>
          </p>
          <a
            href={copy.footer.credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.18em] text-steel-300 uppercase transition-colors hover:text-white"
          >
            {copy.footer.credit.label} · <span className="text-gold">{copy.footer.credit.studio}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
