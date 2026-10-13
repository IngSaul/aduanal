import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { fetchPost, fetchPostPage, PAGE_SIZE, type Post, type PostCard, type PostPage } from './blog'

/**
 * Blog data the prerender fetched for one page. It is rendered on the server,
 * embedded as `window.__BLOG_DATA__` and used as the initial client state, so
 * hydration matches and the page does not fetch twice. Client-side navigation
 * to any other page fetches normally.
 */
export type BlogData = {
  path: string
  latest?: PostCard[]
  list?: PostPage
  /** `null` means the slug does not exist. */
  post?: Post | null
}

const BlogDataContext = createContext<BlogData | null>(null)

export function BlogDataProvider({ value, children }: { value: BlogData | null; children: ReactNode }) {
  return <BlogDataContext.Provider value={value}>{children}</BlogDataContext.Provider>
}

const withSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`)

/** The embedded value for `key`, only while on the page it was rendered for. */
function useInitial<K extends keyof Omit<BlogData, 'path'>>(key: K): BlogData[K] | undefined {
  const data = useContext(BlogDataContext)
  const { pathname } = useLocation()
  if (!data || withSlash(data.path) !== withSlash(pathname) || !(key in data)) return undefined
  return data[key]
}

export type Status = 'loading' | 'ready' | 'error'

/** The three most recent posts, for the home page block. */
export function useLatestPosts(): PostCard[] {
  const initial = useInitial('latest')
  const [posts, setPosts] = useState<PostCard[]>(initial ?? [])

  useEffect(() => {
    if (initial) return
    let live = true
    fetchPostPage(0, 3)
      .then((page) => live && setPosts(page.posts))
      .catch(() => {}) // the block simply stays hidden
    return () => {
      live = false
    }
  }, [initial])

  return posts
}

/** The paginated list for /blog/, nine at a time. */
export function usePostList() {
  const initial = useInitial('list')
  const [posts, setPosts] = useState<PostCard[]>(initial?.posts ?? [])
  const [total, setTotal] = useState(initial?.total ?? 0)
  const [status, setStatus] = useState<Status>(initial ? 'ready' : 'loading')
  const [loadingMore, setLoadingMore] = useState(false)
  const [moreFailed, setMoreFailed] = useState(false)
  const live = useRef(true)

  useEffect(() => {
    live.current = true
    return () => {
      live.current = false
    }
  }, [])

  const loadFirst = useCallback(() => {
    setStatus('loading')
    fetchPostPage(0)
      .then((page) => {
        if (!live.current) return
        setPosts(page.posts)
        setTotal(page.total)
        setStatus('ready')
      })
      .catch(() => live.current && setStatus('error'))
  }, [])

  useEffect(() => {
    if (!initial) loadFirst()
  }, [initial, loadFirst])

  const loadMore = useCallback(() => {
    setLoadingMore(true)
    setMoreFailed(false)
    fetchPostPage(posts.length, PAGE_SIZE)
      .then((page) => {
        if (!live.current) return
        setPosts((current) => [...current, ...page.posts.filter((p) => !current.some((c) => c._id === p._id))])
        setTotal(page.total)
      })
      .catch(() => live.current && setMoreFailed(true))
      .finally(() => live.current && setLoadingMore(false))
  }, [posts.length])

  return { posts, total, status, retry: loadFirst, loadMore, loadingMore, moreFailed, hasMore: posts.length < total }
}

/** One post by slug; `post` is null once loaded when the slug does not exist. */
export function usePost(slug: string) {
  const initial = useInitial('post')
  const [post, setPost] = useState<Post | null>(initial ?? null)
  const [status, setStatus] = useState<Status>(initial !== undefined ? 'ready' : 'loading')
  const [attempt, setAttempt] = useState(0)
  const usedInitial = useRef(initial !== undefined)

  useEffect(() => {
    if (usedInitial.current) {
      usedInitial.current = false
      return
    }
    let live = true
    setStatus('loading')
    fetchPost(slug)
      .then((result) => {
        if (!live) return
        setPost(result)
        setStatus('ready')
      })
      .catch(() => live && setStatus('error'))
    return () => {
      live = false
    }
  }, [slug, attempt])

  return { post, status, retry: () => setAttempt((n) => n + 1) }
}
