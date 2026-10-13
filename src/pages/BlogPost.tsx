import { useEffect } from 'react'
import { useParams } from 'react-router'
import { Breadcrumbs } from '../components/blog/Breadcrumbs'
import { PortableTextBody } from '../components/blog/PortableTextBody'
import { Button, Eyebrow, Img, Section } from '../components/ui'
import { useCopy } from '../i18n'
import { formatDate, type Post } from '../lib/blog'
import { usePost } from '../lib/blogData'
import { imageProps } from '../lib/sanity'
import { postSeoRoute } from '../seo/blog'
import { PATHS } from '../seo/paths'
import { NOT_FOUND_ROUTE } from '../seo/routes'
import { applyRouteMeta } from '../seo/useRouteMeta'
import NotFound from './NotFound'

export default function BlogPost() {
  const copy = useCopy()
  const { slug = '' } = useParams()
  const { post, status, retry } = usePost(slug)

  // RootLayout leaves the head of post URLs to this page: it depends on the post.
  useEffect(() => {
    if (status !== 'ready') return
    applyRouteMeta(post ? postSeoRoute(post) : NOT_FOUND_ROUTE)
  }, [post, status])

  if (status === 'ready' && !post) return <NotFound />

  return (
    <article>
      <header className="grid-etch relative bg-navy">
        <div className="container-page pt-[130px] pb-16 md:pt-[170px] md:pb-20">
          <div className="max-w-3xl">
            {post && status === 'ready' ? (
              <PostHeader post={post} />
            ) : status === 'error' ? (
              <div className="flex flex-col items-start gap-6">
                <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-tight font-bold tracking-[-0.03em] text-white">
                  {copy.blog.postErrorTitle}
                </h1>
                <p className="text-[15px] text-light/70">{copy.blog.errorLead}</p>
                <Button variant="accent" onClick={retry}>
                  {copy.blog.retry}
                </Button>
              </div>
            ) : (
              <div className="animate-pulse" role="status" aria-label={copy.blog.loading}>
                <div className="h-3 w-48 rounded bg-white/15" />
                <div className="mt-8 h-10 w-full rounded bg-white/15" />
                <div className="mt-4 h-10 w-2/3 rounded bg-white/15" />
                <div className="mt-8 h-4 w-4/5 rounded bg-white/10" />
              </div>
            )}
          </div>
        </div>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-gold/90" aria-hidden="true" />
      </header>

      {post && status === 'ready' ? (
        <Section tone="white" className="pt-14! md:pt-16! lg:pt-16!">
          <div className="mx-auto max-w-3xl">
            <Img
              {...imageProps(post.coverImage, {
                width: 768,
                aspect: 16 / 9,
                sizes: '(min-width: 800px) 768px, 100vw',
                widths: [480, 768, 1080, 1536],
              })}
              alt={post.coverImage.alt ?? ''}
              className="aspect-video w-full rounded-card"
              priority
            />

            <div className="mt-12">
              <PortableTextBody value={post.body} />
            </div>

            <div className="mt-16 border-t border-navy/10 pt-10">
              <Button to={PATHS.blog} variant="outline">
                {copy.blog.back}
              </Button>
            </div>
          </div>
        </Section>
      ) : null}
    </article>
  )
}

function PostHeader({ post }: { post: Post }) {
  const copy = useCopy()
  return (
    <>
      <Breadcrumbs label={copy.blog.breadcrumbLabel} items={postSeoRoute(post).breadcrumbs ?? []} />
      <div className="mt-10">
        <Eyebrow dark>
          <span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.category ? <span className="text-gold"> · {post.category.title}</span> : null}
          </span>
        </Eyebrow>
      </div>
      <h1 className="mt-6 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
        {post.title}
      </h1>
      <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-light/75 md:text-[16.5px]">{post.excerpt}</p>
    </>
  )
}
