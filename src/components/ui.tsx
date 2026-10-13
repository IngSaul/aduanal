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

/**
 * Fades and lifts its children in once, when they first enter the viewport.
 * `onLoad` is for above-the-fold content: the same motion runs as a pure CSS
 * animation from the first paint, so it never waits for hydration (LCP).
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  onLoad = false,
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
  onLoad?: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || onLoad) return
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
  }, [onLoad])

  if (onLoad) {
    return (
      <Tag className={`reveal-load ${className}`} style={{ animationDelay: `${delay}ms` }}>
        {children}
      </Tag>
    )
  }

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

/**
 * Bare-bones image with a tonal placeholder so layout holds before load.
 * `priority` marks the page's LCP photo: fetched eagerly at high priority and
 * shown at once instead of fading in, so it paints straight from the HTML.
 */
export function Img({
  src,
  alt,
  width,
  height,
  className = '',
  imgClassName = '',
  priority = false,
}: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  imgClassName?: string
  priority?: boolean
}) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(priority)

  // A prerendered image can finish loading before hydration attaches `onLoad`.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <span className={`block overflow-hidden bg-blue/15 ${className}`}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </span>
  )
}
