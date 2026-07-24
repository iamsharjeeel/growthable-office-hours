# Handover

## What changed

- Scaffolded Next.js + Tailwind app for Growthable office hours landing page
- Matched brand palette (navy `#152039`, accent `#e8406a` / `#f23e67`) and Montserrat typography
- Built hero with wireframe mesh, design copy, floating register card, host section
- Logo uses attached brand file (`public/growthable-logo.png`, white bg removed, ink lightened for navy)
- Host headshot at `public/ryan-host.jpg` (circle + magenta frame)
- Added Watch a Replay section (YouTube `HwGJz4rj_jw`) + Join Next Session → `#register`
- CTA style: solid pink face `#f03e6a` + hard offset shade `#f8ccd4`
- Slim footer → https://growthable.io

## Why

Ship a studio-quality branded registration page from the Growthable office-hours design.

## Files touched

- `src/app/page.tsx` — landing composition + session copy
- `src/app/layout.tsx` — Montserrat + metadata
- `src/app/globals.css` — brand tokens, motion, grain
- `src/components/Logo.tsx`
- `src/components/WireframeMesh.tsx`
- `src/components/RegisterForm.tsx`
- `public/ryan-host.jpg` — host headshot (CSS circle + magenta frame)
- `README.md`, `HANDOVER.md`, `CHANGELOG.md`, `.env.example`

## Pending

- Wire form submit to CRM / webhook / email provider
- Keep session date/time current in `src/app/page.tsx` (currently Tuesday July 28 — 2PM PDT)
- Optional: swap SVG logo for official brand SVG if Growthable provides one

## Manual steps

- None for local run (`npm install && npm run dev`)
- No env vars or SQL migrations required yet
