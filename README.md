# New York Chamber Collective — Web

Code-managed version of the New York Chamber Collective site, built with **Vite + React**
and deployed to **GitHub Pages**. (The client-editable version lives separately on Squarespace.)

**Live:** https://newyorkchambercollective.org/ (also at https://sulaga-chan.github.io/nycc-web/, which redirects to the custom domain)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`),
which builds the site and publishes `dist/` to GitHub Pages automatically. No manual step.

> One-time setup in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions.**

## Structure

```
src/
  App.jsx              routes (BrowserRouter)
  seo-meta.mjs         per-route <title> and description
  styles.css           black & white classic-serif theme
  components/Layout.jsx  header nav + footer + socials
  components/Seo.jsx   keeps meta tags in step during client-side navigation
  pages/               Home, About, Services, Team, Musicians, Gallery, Video, Contact
  data/musicians.js    ensemble roster
scripts/prerender.mjs  writes one real HTML file per route after the build
public/img/            photos: img/team, img/musicians, img/gallery
```

## Editing content

- **Team** — edit the `TEAM` array in `src/pages/Team.jsx`. Add a photo by dropping a
  file in `public/img/team/` and setting `photo: '/img/team/name.jpg'`.
- **Musicians** — edit `src/data/musicians.js`; photos live in `public/img/musicians/`.
- **Gallery** — add files to `public/img/gallery/` and list them in the
  `PHOTOS` / `VIDEOS` arrays in `src/pages/Gallery.jsx`.
- **Page titles / descriptions** — edit `src/seo-meta.mjs`. A new route added there
  also needs an entry in `public/sitemap.xml`.
- **Contact** — the form composes an email via the visitor's mail client. To collect
  submissions server-side, point it at a Formspree/Getform endpoint. Update
  `CONTACT_EMAIL` in `src/pages/Contact.jsx`.

## Notes

- Routing uses `BrowserRouter`, so URLs are clean (`/services`, not `/#/services`).
  GitHub Pages has no server-side routing, so `npm run build` runs
  `scripts/prerender.mjs`, which writes a real `dist/<route>.html` for every route in
  `src/seo-meta.mjs`. Pages serves extensionless URLs from those files, so each page
  returns **200** with its own title and description already in the HTML — which is
  what lets Google index them. `public/404.html` catches anything else (typos, old
  links) and hands the path back to the app; `index.html` also rewrites legacy
  `/#/page` URLs to `/page`.
- Route names must not collide with folders in `public/` — that is why photos live
  under `public/img/` rather than `public/musicians/`, which would shadow the
  `/musicians` route.
- `base` in `vite.config.js` is `/` because the site is served at the root of the custom
  domain **newyorkchambercollective.org** (via `public/CNAME`). Asset paths are root-absolute
  (`/img/team/…`, `/hero.jpg`). Serving it back under `sulaga-chan.github.io/nycc-web/`
  would need `base` changed to `/nycc-web/`, the asset paths updated to match, and the
  absolute URLs in `seo-meta.mjs`, `sitemap.xml`, and `robots.txt` revisited.
