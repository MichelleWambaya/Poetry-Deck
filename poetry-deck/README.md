# Paper Trail — Pen Pal App

A Next.js app for composing poems/cards, saving to a gallery, and optionally sealing & sending from the gallery. Built with the App Router, Tailwind, and client-side state.

## Quick Start

- Node 18+ recommended
- Install: `npm ci`
- Dev: `npm run dev` → http://localhost:3000
- Build: `npm run build`
- Start: `npm start`

## Features

- Compose modal: title + body only; auto-assigns image based on theme (no manual image inputs).
- Gallery: neat responsive grid (no scatter), color images (no grayscale).
- Seal & Send: appears only when selecting a card in the gallery.
- Theme: simple options — System or Custom Upload (keeps background aligned to theme).
- Home: shows the most recently saved card preview.
- Profile & Auth: `/auth` page bypasses to `/profile` for testing.

## Deploy to Vercel

- Root Directory: set to `poetry-deck` in Project Settings.
- Install Command: `npm ci`
- Build Command: `npm run build`
- Node Version: 18 or 20
- External Images: allowed for Unsplash via `next.config.ts` (`remotePatterns` + `unoptimized: true`).

## Configuration

- `next.config.ts`
  - `images.remotePatterns` for Unsplash
  - If build errors mention `reactCompiler`, remove it or put under `experimental`.
- `tsconfig.json`
  - Path alias: `@/*` → `./src/*`

## Database (Optional)

Currently, gallery/profile data is client-side for testing. To use MySQL:

1. Add env vars in Vercel (or `.env.local`): `MYSQL_URL`, `MYSQL_USER`, `MYSQL_PASSWORD`.
2. Create API routes to read/write cards and profile data.
3. Point gallery/profile components to the API.

## Card Sizes

Cards scale with screen via the grid. To tweak image height, adjust classes like:`h-32 sm:h-40 md:h-44 lg:h-52` in `src/app/gallery/page.tsx`.

## Notes on Images & Capture

Remote images are CORS-safe and supported in captures via `html2canvas` (`useCORS: true`) and `crossOrigin` on images. Unsplash is pre-configured.

## Navigation

Header includes links to Home, Gallery, Profile, Login. Add a back arrow on any page with `Link` to `/` if desired.
