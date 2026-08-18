// Emits one real HTML file per route (dist/services.html, dist/about.html, …).
//
// Why: GitHub Pages has no server-side routing. The usual SPA trick — a 404.html
// that bounces back to index.html — works for visitors, but the response status is
// still 404, so Google refuses to index those URLs. Writing a real file per route
// makes each page a 200 with its own <title> and description already in the HTML,
// no JavaScript required. Pages serves extensionless URLs from `<name>.html`, so
// /services resolves to services.html with no redirect.
//
// Runs automatically after `npm run build` (see the build script in package.json).
import fs from 'node:fs'
import path from 'node:path'

const SITE = 'https://newyorkchambercollective.org'
const dist = path.resolve('dist')

// Keep in sync with SEO in src/components/Seo.jsx (that copy handles client-side
// navigation; this one handles the first paint and what crawlers read).
const { SEO } = await import('../src/seo-meta.mjs')

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

function render(pathname, meta) {
  const url = SITE + (pathname === '/' ? '/' : pathname)
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${esc(meta.description)}" />`
    )
    .replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${url}" />`
    )
    .replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${esc(meta.title)}" />`
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${esc(meta.description)}" />`
    )
    .replace(
      /<meta property="og:url"[^>]*>/,
      `<meta property="og:url" content="${url}" />`
    )
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

let count = 0
for (const [pathname, meta] of Object.entries(SEO)) {
  const html = render(pathname, meta)
  const file = pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`
  fs.writeFileSync(path.join(dist, file), html)
  count++
}

// The 404 fallback keeps unknown paths working (typos, old links).
console.log(`prerendered ${count} routes`)
