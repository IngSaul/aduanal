import PageHero from '../components/PageHero'
import { PostCard, PostCardSkeleton } from '../components/blog/PostCard'
import { Button, Section } from '../components/ui'
import { useCopy } from '../i18n'
import { PAGE_SIZE } from '../lib/blog'
import { usePostList } from '../lib/blogData'

export default function Blog() {
  const copy = useCopy()
  const page = copy.blog
  const { posts, status, retry, loadMore, loadingMore, moreFailed, hasMore } = usePostList()

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} image={page.heroImage} imageAlt={page.heroImageAlt} />

      <Section tone="mist">
        {status === 'loading' ? (
          <div role="status" aria-label={page.loading}>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <li key={i}>
                  <PostCardSkeleton />
                </li>
              ))}
            </ul>
          </div>
        ) : status === 'error' ? (
          <Notice title={page.errorTitle} lead={page.errorLead}>
            <Button variant="primary" onClick={retry}>
              {page.retry}
            </Button>
          </Notice>
        ) : posts.length === 0 ? (
          <Notice title={page.emptyTitle} lead={page.emptyLead} />
        ) : (
          <>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post._id}>
                  <PostCard post={post} heading="h2" />
                </li>
              ))}
              {loadingMore
                ? Array.from({ length: Math.min(3, PAGE_SIZE) }, (_, i) => (
                    <li key={`loading-${i}`} aria-hidden="true">
                      <PostCardSkeleton />
                    </li>
                  ))
                : null}
            </ul>

            {hasMore || moreFailed ? (
              <div className="mt-14 flex flex-col items-center gap-4" aria-live="polite">
                {moreFailed ? <p className="text-[14px] text-steel">{page.loadMoreError}</p> : null}
                <Button variant="outline" onClick={loadMore} disabled={loadingMore} aria-busy={loadingMore}>
                  {loadingMore ? page.loadingMore : page.loadMore}
                </Button>
              </div>
            ) : null}
          </>
        )}
      </Section>
    </>
  )
}

/** Empty and error states share one calm panel. */
function Notice({ title, lead, children }: { title: string; lead: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-xl rounded-card border border-navy/10 bg-white px-8 py-14 text-center">
      <h2 className="text-[clamp(1.3rem,2.6vw,1.7rem)] leading-snug font-bold tracking-[-0.02em] text-navy">{title}</h2>
      <p className="mt-4 text-[15px] leading-[1.8] text-steel">{lead}</p>
      {children ? <div className="mt-8 flex justify-center">{children}</div> : null}
    </div>
  )
}
