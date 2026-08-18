// Title and description per route — the single source of truth for page metadata.
// Consumed by src/components/Seo.jsx (client-side navigation) and by
// scripts/prerender.mjs (bakes these into a real HTML file per route at build time).
//
// Keep descriptions under ~155 characters; Google truncates longer ones.
// When adding a route here, also add it to public/sitemap.xml.
const NAME = 'New York Chamber Collective'

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
