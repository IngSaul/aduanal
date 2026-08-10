import type { ComponentType, ReactNode, SVGProps } from 'react'
import { Link } from 'react-router'
import { unsplash } from '../content/copy'
import { useCopy } from '../i18n'
import { IconArrowUpRight } from './icons'
import { Card, Img } from './ui'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

/* -------------------------------------------------------------- FeatureCard */

export function FeatureCard({
  index,
  icon: Icon,
  title,
  text,
  to,
}: {
  index: number
  icon: IconType
  title: string
  text: string
  to?: string
}) {
  const body = (
    <>
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-[10px] bg-mist text-blue transition-colors duration-400 group-hover:bg-navy group-hover:text-gold">
          <Icon className="h-6 w-6" />
        </span>
        <span className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-light">
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <h3 className="mt-7 text-[17px] leading-snug font-bold tracking-[-0.015em] text-navy">
        {title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.75] text-steel">{text}</p>
      <span className="mt-6 block h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </>
  )

  const className = 'group flex h-full flex-col p-7'

  return (
    <Card interactive className="h-full">
      {to ? (
        <Link to={to} className={className}>
          {body}
        </Link>
      ) : (
        <div className={className}>{body}</div>
      )}
    </Card>
  )
}

/* ------------------------------------------------------------- IndustryCard */

export type IndustryLike = {
  id: string
  name: string
  short: string
  description: string
  points: readonly string[]
  image: string
  imageAlt: string
}

export function IndustryCard({
  industry,
  onOpen,
  aspect = 'aspect-[4/3]',
}: {
  industry: IndustryLike
  onOpen: () => void
  aspect?: string
}) {
  const copy = useCopy()

  return (
    <article className="group relative overflow-hidden rounded-card bg-navy">
      <Img
        src={unsplash(industry.image, 900, 700)}
        alt={industry.imageAlt}
        className={`${aspect} w-full`}
        imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] opacity-85"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/20 transition-opacity duration-500 group-hover:via-navy/90 group-hover:to-navy/35"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-6 md:p-7">
        <p className="font-mono text-[10.5px] font-medium tracking-[0.2em] text-gold uppercase">
          {copy.common.sector}
        </p>
        <h3 className="text-[19px] leading-snug font-bold tracking-[-0.015em] text-white">
          {industry.name}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-light/75">{industry.short}</p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-1 inline-flex w-fit items-center gap-2 border-b border-gold pt-2 pb-2 text-[12px] font-semibold tracking-[0.11em] text-white uppercase transition-colors hover:text-gold"
        >
          {copy.common.viewIndustry}
          <IconArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <span
        className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
        aria-hidden="true"
      />
    </article>
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
