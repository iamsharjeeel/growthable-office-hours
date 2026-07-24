# Handover

## What changed

- Scaffolded Next.js + Tailwind app for Growthable office hours landing page
- Matched brand palette (navy `#152039`, accent `#e8406a` / `#f23e67`) and Montserrat typography
- Built hero with wireframe mesh, design copy, floating register card, host section
- Wired official Growthable wordmark (`public/growthable-logo.png`, white bg removed) and host headshot (`public/ryan-sq.jpg`)

## Why

Ship a studio-quality branded registration page from the Growthable office-hours design.

## Files touched

- `src/app/page.tsx` — landing composition + session copy
- `src/app/layout.tsx` — Montserrat + metadata
- `src/app/globals.css` — brand tokens, motion, grain
- `src/components/Logo.tsx`
- `src/components/WireframeMesh.tsx`
- `src/components/RegisterForm.tsx`
- `public/growthable-logo.png` — transparent wordmark
- `public/ryan-sq.jpg` — host headshot (CSS circle + magenta frame)
- `README.md`, `HANDOVER.md`, `CHANGELOG.md`, `.env.example`

## Pending

- Wire form submit to CRM / webhook / email provider
- Keep session date/time current in `src/app/page.tsx` (currently Tuesday July 28 — 2PM PDT)
- Optional: drop unused `public/ryan.png` / `public/growthable-logo-original.png` if not needed

## Manual steps

- None for local run (`npm install && npm run dev`)
- No env vars or SQL migrations required yet
