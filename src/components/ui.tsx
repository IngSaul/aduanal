import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ElementType,
  type ReactNode,
} from 'react'
import { Link } from 'react-router'
import type { Accented } from '../content/copy'

/* ------------------------------------------------------------------ Reveal */

/** Fades and lifts its children in once, when they first enter the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* --------------------------------------------------------------- Headline */

/** Renders a headline whose middle fragment is set in the brand gold. */
export function Highlight({ parts }: { parts: Accented }) {
  return (
    <>
      {parts.lead}
      <span className="text-gold">{parts.accent}</span>
      {parts.tail}
    </>
  )
}

/* ------------------------------------------------------------------ Button */

type Variant = 'primary' | 'accent' | 'outline' | 'onDark' | 'ghost'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-navy text-white hover:bg-blue focus-visible:bg-blue shadow-[0_1px_2px_rgba(13,27,42,0.18)]',
  accent: 'bg-gold text-navy hover:bg-gold-600 hover:text-white',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white',
  onDark: 'border border-white/30 text-white hover:border-gold hover:bg-gold hover:text-navy',
  ghost: 'text-navy hover:text-gold-600',
}

/** Tighter padding below `sm` so long Spanish labels never reach the gutter. */
const SIZES = {
  md: 'h-11 px-5 text-[12.5px] sm:px-6 sm:text-[13px]',
  lg: 'h-13 px-6 text-[13px] sm:px-8 sm:text-sm',
} as const

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  size?: keyof typeof SIZES
  to?: string
  href?: string
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [
    'group inline-flex items-center justify-center gap-2.5 rounded-[10px]',
    'font-semibold uppercase tracking-[0.11em] whitespace-nowrap',
    'transition-all duration-300 ease-out active:translate-y-px',
    SIZES[size],
    VARIANTS[variant],
    className,
  ].join(' ')

  const inner = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        →
      </span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  )
}

/* -------------------------------------------------------------- Section bits */

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] ${
        dark ? 'text-steel-300' : 'text-steel'
      }`}
    >
      <span className="h-px w-8 bg-gold" aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  lead,
  dark = false,
  align = 'left',
  className = '',
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  dark?: boolean
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === 'center' ? 'items-center text-center' : 'items-start'
      } ${className}`}
    >
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`max-w-3xl text-[clamp(1.75rem,3.4vw,2.9rem)] leading-[1.1] font-bold tracking-[-0.025em] ${
          dark ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`max-w-2xl text-[15px] leading-[1.75] ${dark ? 'text-light/75' : 'text-steel'}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  )
}

export function Section({
  children,
  className = '',
  tone = 'white',
  id,
}: {
  children: ReactNode
  className?: string
  tone?: 'white' | 'mist' | 'navy' | 'deep'
  id?: string
}) {
  const tones = {
    white: 'bg-white',
    mist: 'bg-mist',
    navy: 'bg-navy text-white',
    deep: 'bg-blue text-white',
  }
  return (
    <section id={id} className={`${tones[tone]} py-20 md:py-28 lg:py-32 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  )
}

/* -------------------------------------------------------------------- Card */

export function Card({
  children,
  className = '',
  interactive = false,
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
}) {
  return (
    <div
      className={[
        'rounded-card border border-navy/10 bg-white',
        interactive
          ? 'transition-all duration-400 ease-out hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_18px_40px_-24px_rgba(13,27,42,0.45)]'
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------- Image */

/** Bare-bones image with a tonal placeholder so layout holds before load. */
export function Img({
  src,
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  loading?: 'lazy' | 'eager'
}) {
  const [loaded, setLoaded] = useState(false)
  return (
    <span className={`block overflow-hidden bg-blue/15 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </span>
  )
}
