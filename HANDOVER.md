# Handover

## What changed

- Confirmed single hero + single `RegisterForm` / countdown; final CTA after host is button + caption only
- Privacy / Terms hrefs → growthable.io (new tab); footer + consent microcopy
- Color hierarchy: `--accent-muted` for eyebrows, icons, countdown label/colons, host ring, play overlay, links; countdown digits neutral gray; full pink reserved for `.cta` buttons
- Footer logomark: cropped `g` from header wordmark (`public/growthable-mark.png`) in muted pink beside growthable.io

## Why

Remove duplicate-hero risk, fix legal URLs, calm pink noise so CTAs own attention, brand the footer.

## Files touched

- `src/app/globals.css` — `--accent-muted` token
- `src/components/OfficeHoursPage.tsx` — muted accents, footer mark + legal URLs
- `src/components/RegisterForm.tsx` — muted icons/links, real Privacy/Terms hrefs
- `src/components/Countdown.tsx` — neutral digits, muted label/colons
- `src/components/LiteYouTube.tsx` — muted play button
- `src/components/LogoMark.tsx` — footer `g` mark
- `public/growthable-mark.png`
- `README.md`, `HANDOVER.md`, `CHANGELOG.md`

## Pending

- Wire form submit to CRM / webhook / email provider
- Optional: official SVG mark from brand if provided

## Manual steps

- None for local run (`npm install && npm run dev`)
- No env vars or SQL migrations required yet
