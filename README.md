# New York Chamber Collective — Web

Code-managed version of the New York Chamber Collective site, built with **Vite + React**
and deployed to **GitHub Pages**. (The client-editable version lives separately on Squarespace.)

**Live:** https://sulaga-chan.github.io/nycc-web/

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
  App.jsx              routes (HashRouter)
  styles.css           black & white classic-serif theme
  components/Layout.jsx  header nav + footer + socials
  pages/               Home, About, Team, Musicians, Gallery, Contact
  data/musicians.js    ensemble roster
```

## Editing content

- **Team** — edit the `TEAM` array in `src/pages/Team.jsx`. Add a photo by dropping a
  file in `public/` and setting `photo: '/nycc-web/team/name.jpg'`.
- **Musicians** — edit `src/data/musicians.js`.
- **Gallery** — currently empty. Add files to `public/gallery/` and list them in the
  `PHOTOS` / `VIDEOS` arrays in `src/pages/Gallery.jsx`.
- **Contact** — the form composes an email via the visitor's mail client. To collect
  submissions server-side, point it at a Formspree/Getform endpoint. Update
  `CONTACT_EMAIL` in `src/pages/Contact.jsx`.

## Notes

- Routing uses `HashRouter` (URLs look like `/#/about`) so deep links never 404 on
  GitHub Pages. Switch to `BrowserRouter` + a `404.html` fallback if clean URLs matter.
- `base` in `vite.config.js` is `/nycc-web/` to match the repo name. Rename both if you
  rename the repo.
