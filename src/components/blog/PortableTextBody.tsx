import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Link } from 'react-router'
import type { BodyImage, Post } from '../../lib/blog'
import { imageProps } from '../../lib/sanity'
import { SITE } from '../../seo/site'
import { Img } from '../ui'

/** Post body column is at most 768px wide. */
const BODY_IMAGE_SIZES = '(min-width: 800px) 768px, 100vw'

/** Links to this site stay in the router; anything else opens in a new tab. */
function BodyLink({ href = '', children }: { href?: string; children: React.ReactNode }) {
  const className = 'font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold-600'
  const internal = href.startsWith('/') ? href : href.startsWith(SITE.url) ? href.slice(SITE.url.length) || '/' : null
  if (internal) {
    return (
      <Link to={internal} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 text-[16px] leading-[1.9] text-navy/85">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-14 text-[clamp(1.5rem,2.8vw,2rem)] leading-[1.15] font-bold tracking-[-0.025em] text-navy">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-[clamp(1.2rem,2.2vw,1.45rem)] leading-snug font-bold tracking-[-0.02em] text-navy">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-10 border-l-2 border-gold pl-6 text-[18px] leading-[1.7] font-semibold tracking-[-0.01em] text-navy">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 grid gap-3">{children}</ul>,
    number: ({ children }) => <ol className="mt-6 grid list-decimal gap-3 pl-6 marker:font-semibold marker:text-gold-600">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-[16px] leading-relaxed text-navy/85">
        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold" aria-hidden="true" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="pl-2 text-[16px] leading-relaxed text-navy/85">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-navy">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => <BodyLink href={value?.href}>{children}</BodyLink>,
  },
  types: {
    image: ({ value }: { value: BodyImage }) => (
      <figure className="mt-10">
        <Img
          {...imageProps(value, { width: 768, sizes: BODY_IMAGE_SIZES, widths: [480, 768, 1080, 1536] })}
          alt={value.alt ?? ''}
          className="w-full rounded-card"
          imgClassName="h-auto"
        />
        {value.caption ? (
          <figcaption className="mt-3 text-[13px] leading-relaxed text-steel">{value.caption}</figcaption>
        ) : null}
      </figure>
    ),
  },
}

/** A post's Portable Text in the site's type scale and colours. */
export function PortableTextBody({ value }: { value: Post['body'] }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <PortableText value={value} components={components} />
    </div>
  )
}
