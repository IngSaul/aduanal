import type { ComponentType, ReactNode, SVGProps } from 'react'
import { Link } from 'react-router'
import { Card, Img } from './ui'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

/* -------------------------------------------------------------- FeatureCard */

/**
 * Service teaser. With `image` the card turns dark: the photograph sits behind
 * a navy wash so the copy stays legible, and drifts in on hover.
 */
export function FeatureCard({
  index,
  icon: Icon,
  title,
  text,
  to,
  image,
}: {
  index: number
  icon: IconType
  title: string
  text: string
  to?: string
  image?: string
}) {
  const dark = Boolean(image)

  const body = (
    <>
      <div className="flex items-start justify-between">
        <span
          className={`grid h-12 w-12 place-items-center rounded-[10px] transition-colors duration-400 ${
            dark
              ? 'border border-white/20 bg-navy/40 text-gold backdrop-blur-sm group-hover:border-gold group-hover:bg-gold group-hover:text-navy'
              : 'bg-mist text-blue group-hover:bg-navy group-hover:text-gold'
          }`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <span
          className={`font-mono text-[10.5px] font-medium tracking-[0.2em] ${dark ? 'text-light/70' : 'text-light'}`}
        >
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <h3
        className={`text-[17px] leading-snug font-bold tracking-[-0.015em] ${
          dark ? 'mt-auto pt-16 text-white' : 'mt-7 text-navy'
        }`}
      >
        {title}
      </h3>
      <p className={`mt-3 text-[14px] leading-[1.75] ${dark ? 'text-light/80' : 'text-steel'}`}>
        {text}
      </p>
      <span className="mt-6 block h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </>
  )

  const className = 'group relative flex h-full flex-col p-7'
  const content = to ? (
    <Link to={to} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  )

  if (!image) {
    return (
      <Card interactive className="h-full">
        {content}
      </Card>
    )
  }

  return (
    <div className="group relative isolate h-full min-h-[340px] overflow-hidden rounded-card bg-navy transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-24px_rgba(13,27,42,0.6)]">
      {/* Decorative: the title and text already say what the photo shows. */}
      <Img
        src={image}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full"
        imgClassName="opacity-70 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/85 to-navy/35 transition-opacity duration-500"
        aria-hidden="true"
      />
      {content}
    </div>
  )
}

/* --------------------------------------------------------------- ClientGrid */

export type ClientLike = { name: string; logo?: string }

/** Wall of client marks. Shows the logo when there is one, the name otherwise. */
export function ClientGrid({ clients }: { clients: readonly ClientLike[] }) {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-card bg-navy/10 md:grid-cols-3">
      {clients.map((client) => (
        <li
          key={client.name}
          className="grid h-28 place-items-center bg-white px-6 text-center transition-colors duration-400 hover:bg-mist md:h-32"
        >
          {client.logo ? (
            <img
              src={client.logo}
              alt={client.name}
              loading="lazy"
              className="max-h-10 w-auto max-w-[70%] object-contain opacity-70 grayscale transition duration-400 hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            <span className="text-[15px] font-bold tracking-[0.06em] text-navy/70 uppercase md:text-[17px]">
              {client.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

/* ---------------------------------------------------------------- ValueCard */

/** Dark card used for value propositions — no figures, only substance. */
export function ValueCard({
  index,
  icon: Icon,
  title,
  text,
}: {
  index: number
  icon: IconType
  title: string
  text: string
}) {
  return (
    <div className="group relative flex h-full flex-col rounded-card border border-white/12 bg-white/[0.035] p-7 transition-colors duration-400 hover:border-gold/40 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-[10px] border border-white/12 text-gold transition-colors duration-400 group-hover:border-gold/50 group-hover:bg-gold group-hover:text-navy">
          <Icon className="h-6 w-6" />
        </span>
        <span className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-steel-300">
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <h3 className="mt-8 text-[17px] leading-snug font-bold tracking-[-0.015em] text-white">
        {title}
      </h3>
      <p className="mt-3 text-[13.5px] leading-[1.75] text-light/65">{text}</p>
      <span className="mt-auto block pt-8" aria-hidden="true">
        <span className="block h-px w-full origin-left scale-x-25 bg-gold transition-transform duration-600 ease-out group-hover:scale-x-100" />
      </span>
    </div>
  )
}

/* ----------------------------------------------------------------- Timeline */

export type TimelineItem = { step: string; title: string; text: string }

const COLUMNS: Record<number, string> = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
}

export function Timeline({ items, dark = false }: { items: readonly TimelineItem[]; dark?: boolean }) {
  return (
    <ol className={`relative grid gap-10 md:grid-cols-2 lg:gap-8 ${COLUMNS[items.length] ?? 'lg:grid-cols-4'}`}>
      <span
        className={`absolute top-5 left-0 hidden h-px w-full lg:block ${dark ? 'bg-white/15' : 'bg-navy/12'}`}
        aria-hidden="true"
      />
      {items.map((item, i) => (
        <li key={item.step} className="group relative">
          <div className="flex items-center gap-4 lg:block">
            <span
              className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-[11px] font-semibold tracking-[0.06em] transition-colors duration-400 ${
                dark
                  ? 'border-white/25 bg-navy text-white group-hover:border-gold group-hover:bg-gold group-hover:text-navy'
                  : 'border-navy/15 bg-white text-navy group-hover:border-gold group-hover:bg-gold group-hover:text-navy'
              }`}
            >
              {item.step}
            </span>
            <h3
              className={`text-[16px] font-bold tracking-[-0.015em] lg:mt-6 ${
                dark ? 'text-white' : 'text-navy'
              }`}
            >
              {item.title}
            </h3>
          </div>
          <p
            className={`mt-3 max-w-xs text-[13.5px] leading-[1.75] lg:mt-3 ${
              dark ? 'text-light/65' : 'text-steel'
            }`}
          >
            {item.text}
          </p>
          {i < items.length - 1 ? (
            <span
              className={`absolute top-10 left-5 h-full w-px md:hidden ${dark ? 'bg-white/15' : 'bg-navy/12'}`}
              aria-hidden="true"
            />
          ) : null}
        </li>
      ))}
    </ol>
  )
}

/* -------------------------------------------------------------- InfoCard */

export function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: IconType
  title: string
  children: ReactNode
}) {
  return (
    <Card interactive className="group h-full p-7">
      <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-mist text-blue transition-colors duration-400 group-hover:bg-navy group-hover:text-gold">
        <Icon className="h-5.5 w-5.5" />
      </span>
      <h3 className="mt-6 text-[15px] font-bold tracking-[-0.01em] text-navy">{title}</h3>
      <div className="mt-3 space-y-1 text-[14px] leading-relaxed text-steel">{children}</div>
    </Card>
  )
}
