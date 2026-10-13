/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Sanity project for the blog. Empty means the blog renders as "no posts yet". */
  readonly VITE_SANITY_PROJECT_ID?: string
  readonly VITE_SANITY_DATASET?: string
  /** Dev server only: serve the sample posts in src/lib/blog-fixtures.ts. */
  readonly VITE_BLOG_FIXTURES?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  /** Blog data the prerender embedded for this page (see src/lib/blogData.tsx). */
  __BLOG_DATA__?: import('./lib/blogData').BlogData
}
