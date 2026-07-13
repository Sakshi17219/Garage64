# Garage 64

Premium die-cast collectibles storefront — homepage only, frontend/UI, no backend. Built with React 19 + Vite 8 + Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # optional, serves the dist/ build locally to sanity-check it
```

Output goes to `dist/`.

## Deploy to Vercel

This is a standard static Vite build, so Vercel auto-detects everything — no config file needed.

1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. In Vercel: **Add New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist` (also auto-detected).
4. Deploy.

Or from the CLI:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

## Notes

- All product/brand data in `src/App.tsx` is placeholder content — wire it up to a real product source when you add a backend.
- Images are placeholder Unsplash URLs — swap in real product photography before launch.
- Fonts (Cormorant Garamond, Manrope) load from `static.figma.com` — fine for prototyping, but for production consider self-hosting or swapping to Google Fonts so the site doesn't depend on an external font CDN outside your control.
- Fully responsive from ~320px phones up through desktop: sticky/glass nav collapses to a hamburger menu below `lg`, product rails become horizontal swipe-scrollers, grids collapse to 1–2 columns, and hero type scales down so nothing overflows on small screens.
