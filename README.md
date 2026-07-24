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
src/app/                 # layout, page, global styles, register API
src/components/          # page sections, form, logo, countdown, replay
src/lib/session.ts       # next-Tuesday session helpers
public/growthable-logo.png
public/growthable-mark.png
public/ryan-host.jpg
```

## Notes

- Registration posts to `/api/register` (stub OK response + client analytics hooks).
- Brand pink: full saturation on CTA buttons only; `--accent-muted` for secondary accents.
- Legal links: Privacy → https://growthable.io/privacy-policy/ · Terms → https://growthable.io/terms-and-conditions/
- Replay embed: YouTube `HwGJz4rj_jw` in `OfficeHoursPage`.
- Session date/countdown derived in `src/lib/session.ts` (next Tuesday 2PM America/Los_Angeles).

## Deploy

Connect the repo to Vercel (or run `npm run build && npm run start` on any Node host).
