import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'https://newyorkchambercollective.org'
const NAME = 'New York Chamber Collective'

// Title and description per route. Keep descriptions under ~155 characters —
// Google truncates longer ones in search results.
export const SEO = {
  '/': {
    title: `${NAME} | Live Chamber Music in NYC`,
    description:
      'Elegant live music for weddings, galas, and private events across New York City. String quartets, trios, soloists, and full chamber orchestra.',
  },
  '/about': {
    title: `About | ${NAME}`,
    description:
      'A collective of professional New York musicians bringing live chamber music to weddings, celebrations, and private events.',
  },
  '/services': {
    title: `Services | ${NAME}`,
    description:
      'String quartets, piano trios, wind and brass ensembles, and chamber orchestra — in classical, pop, jazz, Broadway, and more, for any occasion.',
  },
  '/team': {
    title: `Our Team | ${NAME}`,
    description:
      'Meet the team behind New York Chamber Collective — founder and violinist Jane Lee and the people who bring each performance together.',
  },
  '/musicians': {
    title: `Musicians | ${NAME}`,
    description:
      'Our roster of professional New York musicians across strings, keyboard, woodwinds, and brass.',
  },
  '/gallery': {
    title: `Gallery | ${NAME}`,
    description:
      'Photos from recent New York Chamber Collective performances, including the Metropolitan Club in New York.',
  },
  '/video': {
    title: `Video | ${NAME}`,
    description: 'Performance videos from New York Chamber Collective — coming soon.',
  },
  '/contact': {
    title: `Contact | ${NAME}`,
    description:
      'Request live music for your wedding, gala, or private event in New York City. Tell us about your occasion and we will design the right ensemble.',
  },
}

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

    document.title = meta.title
    setMeta('meta[name="description"]', 'name', 'description', meta.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', SITE + path)

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', SITE + (path === '/' ? '/' : path))
  }, [pathname])

  return null
}
