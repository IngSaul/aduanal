import type { SVGProps } from 'react'

/**
 * Minimal 24px line icons for the ADUANEX identity: 1.5px strokes, round caps,
 * no fills. Brand marks at the bottom are solid glyphs (simple-icons, CC0-1.0).
 */

type IconProps = SVGProps<SVGSVGElement>

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

/* ------------------------------------------------------------- Servicios */

/** Despacho aduanal — documento con sello. */
export const IconDocSeal = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.6 3.5h7.9l4.9 4.9V20.5H5.6z" />
    <path d="M13.5 3.5v4.9h4.9" />
    <circle cx="11.8" cy="13.4" r="2.4" />
    <path d="m9.9 15.4-.7 3 2.6-1.3 2.6 1.3-.7-3" />
  </Base>
)

/** Logística — transporte terrestre. */
export const IconTruck = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.6 6.8h10.6v8.8H2.6z" />
    <path d="M13.2 9.8h3.5l2.7 3v2.8h-6.2z" />
    <circle cx="7" cy="17.5" r="1.9" />
    <circle cx="16.8" cy="17.5" r="1.9" />
    <path d="M9 15.6h5.9" />
  </Base>
)

/** Clasificación arancelaria — balanza. */
export const IconScale = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5.6v13.9M8.4 19.5h7.2" />
    <path d="M4.6 8.2h14.8" />
    <path d="M7.5 8.2 4.6 14.1h5.8ZM16.5 8.2l-2.9 5.9h5.8Z" />
    <circle cx="12" cy="4.4" r="1.2" />
  </Base>
)

/** Padrones y regulaciones — expediente verificado. */
export const IconClipboardCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 4.6H7.1A1.6 1.6 0 0 0 5.5 6.2v13.1a1.6 1.6 0 0 0 1.6 1.6h9.8a1.6 1.6 0 0 0 1.6-1.6V6.2a1.6 1.6 0 0 0-1.6-1.6H15" />
    <rect x="9" y="2.9" width="6" height="3.4" rx="1.1" />
    <path d="m9.4 13.5 1.9 1.9 3.5-3.9" />
  </Base>
)

/** Freight forwarding — buque de carga. */
export const IconShip = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.2 14.9h17.6l-2 5.3H5.2z" />
    <path d="M6.8 14.9V9.7h10.4v5.2" />
    <path d="M10.1 9.7V6.3h4.1v3.4" />
    <path d="M12 3.2v3.1" />
  </Base>
)

/** Consultoría — brújula. */
export const IconCompass = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="m15.4 8.6-2 4.8-4.8 2 2-4.8z" />
  </Base>
)

/* --------------------------------------------------------------- Valores */

/** Experiencia. */
export const IconBriefcase = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="7.2" width="18" height="12.6" rx="1.8" />
    <path d="M9 7.2V5.7A1.7 1.7 0 0 1 10.7 4h2.6A1.7 1.7 0 0 1 15 5.7v1.5" />
    <path d="M3 12.4h18" />
    <path d="M10.6 12.4h2.8" />
  </Base>
)

/** Precisión. */
export const IconTarget = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="13" r="8" />
    <circle cx="11" cy="13" r="4" />
    <path d="m11 13 8.5-8.5M17.5 3.2l.4 2.9 2.9.4" />
  </Base>
)

/** Cumplimiento. */
export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.8 4.8 5.6v6c0 4.3 3 8.1 7.2 9.6 4.2-1.5 7.2-5.3 7.2-9.6v-6Z" />
    <path d="m8.8 11.9 2.3 2.3 4.1-4.6" />
  </Base>
)

/** Atención personalizada. */
export const IconChat = (p: IconProps) => (
  <Base {...p}>
    <path d="M20.5 11.4c0 3.9-3.8 7.1-8.5 7.1a10 10 0 0 1-2.5-.3l-5 1.7 1.4-3.6a6.7 6.7 0 0 1-2.4-4.9c0-3.9 3.8-7.1 8.5-7.1s8.5 3.2 8.5 7.1Z" />
    <path d="M8.7 11.4h.01M12 11.4h.01M15.3 11.4h.01" />
  </Base>
)

/* ------------------------------------------------------------ Industrias */

export const IconCar = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.6 16.4v-3.1l1.9-4.5a2 2 0 0 1 1.8-1.2h9.4a2 2 0 0 1 1.8 1.2l1.9 4.5v3.1" />
    <path d="M3.6 13.3h16.8" />
    <circle cx="7.3" cy="16.6" r="1.7" />
    <circle cx="16.7" cy="16.6" r="1.7" />
    <path d="M3.6 19.2h1.9M18.5 19.2h1.9" />
  </Base>
)

export const IconFactory = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 20.5V11l5.5 3.2V11l5.5 3.2V11l5.5 3.2V20.5Z" />
    <path d="M2.5 20.5h19" />
    <path d="M5.6 11V4.5h2.9V11" />
    <path d="M7 17h1.6M11 17h1.6M15 17h1.6" />
  </Base>
)

export const IconChip = (p: IconProps) => (
  <Base {...p}>
    <rect x="7" y="7" width="10" height="10" rx="1.4" />
    <rect x="10.3" y="10.3" width="3.4" height="3.4" rx="0.6" />
    <path d="M10 7V4.2M14 7V4.2M10 19.8V17M14 19.8V17M7 10H4.2M7 14H4.2M19.8 10H17M19.8 14H17" />
  </Base>
)

export const IconBottle = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 2.9h4v3l1.7 2.7v10.5a1.4 1.4 0 0 1-1.4 1.4H9.7a1.4 1.4 0 0 1-1.4-1.4V8.6L10 5.9z" />
    <path d="M8.3 12.6h7.4" />
    <path d="M17.6 8.6h3.5v6.2a1.4 1.4 0 0 1-1.4 1.4h-2.1" />
  </Base>
)

export const IconGear = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.6v2.6M12 18.8v2.6M21.4 12h-2.6M5.2 12H2.6M18.6 5.4l-1.9 1.9M7.3 16.7l-1.9 1.9M18.6 18.6l-1.9-1.9M7.3 7.3 5.4 5.4" />
    <circle cx="12" cy="12" r="7.6" strokeDasharray="2.6 3.4" />
  </Base>
)

/** Siderurgia — rollos de acero. */
export const IconCoils = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8.2" cy="8.8" r="3.6" />
    <circle cx="15.8" cy="8.8" r="3.6" />
    <circle cx="12" cy="15.6" r="3.6" />
    <path d="M8.2 8.4h.01M15.8 8.4h.01M12 15.2h.01" />
  </Base>
)

export const IconServer = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="4" width="17" height="6" rx="1.4" />
    <rect x="3.5" y="14" width="17" height="6" rx="1.4" />
    <path d="M7 7h.01M7 17h.01" />
    <path d="M10.5 7h6M10.5 17h6" />
  </Base>
)

export const IconSofa = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.2 12.4V8.7a2.1 2.1 0 0 1 2.1-2.1h11.4a2.1 2.1 0 0 1 2.1 2.1v3.7" />
    <rect x="2.8" y="12.4" width="18.4" height="4.9" rx="1.6" />
    <path d="M6 17.3v2.2M18 17.3v2.2" />
    <path d="M7.4 12.4V9.6h9.2v2.8" />
  </Base>
)

export const IconCart = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.8 4h2.3l2.4 10.6h9.4l2.3-7.7H6.3" />
    <circle cx="9.6" cy="18.4" r="1.5" />
    <circle cx="16.4" cy="18.4" r="1.5" />
  </Base>
)

/* --------------------------------------------------------------- Utility */

export const IconGlobe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M3.4 12h17.2M12 3.2c2.4 2.5 3.6 5.5 3.6 8.8s-1.2 6.3-3.6 8.8c-2.4-2.5-3.6-5.5-3.6-8.8S9.6 5.7 12 3.2Z" />
  </Base>
)

export const IconRoute = (p: IconProps) => (
  <Base {...p}>
    <circle cx="6" cy="6" r="2.4" />
    <circle cx="18" cy="18" r="2.4" />
    <path d="M8.4 6h5.2a3.4 3.4 0 0 1 0 6.8h-3.2a3.4 3.4 0 0 0 0 6.8h5.2" />
  </Base>
)

export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.8" y="5" width="18.4" height="14" rx="1.6" />
    <path d="m3.4 6.5 8.6 6.2 8.6-6.2" />
  </Base>
)

export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M7.2 3.5h-2A2.2 2.2 0 0 0 3 5.9c.4 6.9 6.2 12.7 13.1 13.1a2.2 2.2 0 0 0 2.4-2.2v-2l-4-1.4-1.7 2a13.6 13.6 0 0 1-5.2-5.2l2-1.7Z" />
  </Base>
)

export const IconPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21.5s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
    <circle cx="12" cy="10.2" r="2.7" />
  </Base>
)

export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 6.8V12l3.4 2" />
  </Base>
)

export const IconEye = (p: IconProps) => (
  <Base {...p}>
    <path d="M1.8 12S5.6 5.5 12 5.5 22.2 12 22.2 12 18.4 18.5 12 18.5 1.8 12 1.8 12Z" />
    <circle cx="12" cy="12" r="3.2" />
  </Base>
)

export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </Base>
)

export const IconMenu = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h11" />
  </Base>
)

export const IconArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </Base>
)

/* ----------------------------------------------------------- Brand marks */

export const IconWhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.84 9.84 0 0 0 4.68 1.19h.01c5.43 0 9.85-4.42 9.85-9.86A9.79 9.79 0 0 0 19 4.87 9.79 9.79 0 0 0 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.15 8.15 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2a8.14 8.14 0 0 1 5.79 2.4 8.13 8.13 0 0 1 2.4 5.8c0 4.52-3.68 8.27-8.13 8.27Zm4.5-6.14c-.24-.13-1.44-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.25-.63.8-.77.96-.14.16-.28.18-.52.06-.25-.12-1.04-.38-1.97-1.22-.73-.65-1.22-1.45-1.36-1.7-.14-.24-.02-.37.1-.5.11-.11.25-.28.37-.43.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.85.84-.85 2.04s.87 2.37.99 2.53c.12.16 1.72 2.62 4.16 3.68.58.25 1.04.4 1.39.51.58.19 1.12.16 1.54.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z" />
  </svg>
)

export const IconLinkedIn = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export const IconFacebook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export const IconInstagram = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)
