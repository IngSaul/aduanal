import type { ReactNode } from 'react'
import { unsplash } from '../content/copy'
import { Eyebrow, Img } from './ui'

/** Compact dark hero used by every page other than Home. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string
  title: string
  lead: string
  image: string
  imageAlt: string
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <Img
        src={unsplash(image, 1800, 1000)}
        alt={imageAlt}
        loading="eager"
        className="absolute inset-0 h-full w-full"
        imgClassName="opacity-30"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/45"
        aria-hidden="true"
      />
      <div className="grid-etch absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="container-page relative pt-[150px] pb-20 md:pt-[190px] md:pb-28">
        <div className="max-w-3xl">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.1rem,5.2vw,3.9rem)] leading-[1.05] font-bold tracking-[-0.03em] text-white">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-light/75 md:text-[16.5px]">{lead}</p>
          {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-1 bg-gold/90" aria-hidden="true" />
    </section>
  )
}
