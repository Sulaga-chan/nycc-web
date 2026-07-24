import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to GitHub Pages at https://sulaga-chan.github.io/nycc-web/
// so the base path must match the repo name.
export default defineConfig({
  plugins: [react()],
  base: '/nycc-web/',
})
