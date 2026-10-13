import { Link } from 'react-router'
import { formatDate, type PostCard as PostCardData } from '../../lib/blog'
import { imageProps } from '../../lib/sanity'
import { postPath } from '../../seo/paths'
import { Img } from '../ui'

/** Card grid: one column on phones, up to three from `lg`. */
const CARD_SIZES = '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'

/**
 * News teaser in the FeatureCard idiom: white card, gold rule on hover, the
 * cover on top. The whole card is one link; `heading` keeps the outline
 * correct (h2 on /blog/, h3 under a section title on the home page).
 */
export function PostCard({ post, heading: Heading = 'h3' }: { post: PostCardData; heading?: 'h2' | 'h3' }) {
  return (
    <Link
      to={postPath(post.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-navy/10 bg-white transition-all duration-400 ease-out hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-[0_18px_40px_-24px_rgba(13,27,42,0.45)]"
    >
      <Img
        {...imageProps(post.coverImage, { width: 640, aspect: 16 / 10, sizes: CARD_SIZES, widths: [400, 640, 960] })}
        alt={post.coverImage.alt ?? ''}
        className="aspect-[16/10] w-full"
        imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="flex flex-1 flex-col p-7">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] font-medium tracking-[0.18em] text-steel uppercase">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.category ? (
            <>
              <span className="h-px w-4 bg-gold" aria-hidden="true" />
              <span className="text-gold-600">{post.category.title}</span>
            </>
          ) : null}
        </p>
        <Heading className="mt-4 text-[17px] leading-snug font-bold tracking-[-0.015em] text-navy transition-colors group-hover:text-gold-600">
          {post.title}
        </Heading>
        <p className="mt-3 text-[14px] leading-[1.75] text-steel">{post.excerpt}</p>
        <span className="mt-auto block pt-6" aria-hidden="true">
          <span className="block h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </span>
      </div>
    </Link>
  )
}

/** Placeholder with the card's shape while posts load. */
export function PostCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-card border border-navy/10 bg-white" aria-hidden="true">
      <div className="aspect-[16/10] w-full bg-blue/10" />
      <div className="flex flex-col gap-3 p-7">
        <div className="h-3 w-32 rounded bg-navy/10" />
        <div className="h-5 w-11/12 rounded bg-navy/10" />
        <div className="h-5 w-2/3 rounded bg-navy/10" />
        <div className="mt-2 h-3.5 w-full rounded bg-navy/8" />
        <div className="h-3.5 w-4/5 rounded bg-navy/8" />
      </div>
    </div>
  )
}
