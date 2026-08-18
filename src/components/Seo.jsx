import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SEO } from '../seo-meta.mjs'

// Keeps <title> and the meta tags in step during client-side navigation. The
// first paint already has the right tags baked in by scripts/prerender.mjs.
const SITE = 'https://newyorkchambercollective.org'

function setMeta(selector, attr, value, content) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, value)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const meta = SEO[path] || SEO['/']
    const url = SITE + (path === '/' ? '/' : path)

    document.title = meta.title
    setMeta('meta[name="description"]', 'name', 'description', meta.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', url)
  }, [pathname])

  return null
}
