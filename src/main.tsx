import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BlogDataProvider } from './lib/blogData'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <BlogDataProvider value={window.__BLOG_DATA__ ?? null}>
      <App />
    </BlogDataProvider>
  </React.StrictMode>
)

// Production pages arrive prerendered and are hydrated; the dev server serves
// the bare template, so there is nothing to hydrate there.
if (root.firstElementChild) {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}
