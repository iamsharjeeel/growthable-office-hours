# Growthable Office Hours

Luxury landing page for Growthable weekly office hours — Next.js App Router + Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables required for the current static registration UI.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Montserrat (Google Fonts)

## Project structure

```
src/app/                 # layout, page, global styles
src/components/          # Logo, RegisterForm, WireframeMesh
public/growthable-logo.png
public/ryan-sq.jpg
```

## Notes

- Registration form is client-side only (success state; no backend yet).
- Brand assets: transparent logo + circle-framed host headshot.
- Session copy (date/time) is hard-coded in `src/app/page.tsx`.

## Deploy

Connect the repo to Vercel (or run `npm run build && npm run start` on any Node host).
