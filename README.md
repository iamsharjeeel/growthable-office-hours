# Growthable Office Hours

Luxury landing page for Growthable weekly office hours — Next.js App Router + Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `LEAD_WEBHOOK_URL` | no | Overrides the LeadConnector (GoHighLevel) hook that receives registrations. Defaults to the production hook. |
| `NEXT_PUBLIC_SITE_URL` | **in production** | Public origin, used for the canonical URL, OG tags and the calendar invite URL. On Vercel it falls back to the project's production domain; anywhere else it falls back to `http://localhost:3000`, which would ship a wrong canonical. |

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Updating the weekly session

**Edit `SESSION.topics` in `src/lib/session-config.ts`. Nothing else.**

That array is both the "This week we're covering:" list on the page and the
agenda inside the calendar invite. The date is *not* stored anywhere — it is a
recurring rule (`weekday` + `startHour`), resolved at request time, so the page,
countdown, calendar invite and share card all roll forward on their own.

`AGENTS.md` carries the full instructions, including house style for topics and
what not to do. It is written so an AI coding agent picking this up cold in a
later week makes the change in the right place.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Poppins + IBM Plex Mono (matching the growthable.io design system)

## Project structure

```
src/app/
  layout.tsx             # fonts + metadata (OG / Twitter / canonical)
  page.tsx               # renders OfficeHoursPage
  globals.css            # brand design tokens
  opengraph-image.tsx    # generated 1200x630 share card
  session.ics/route.ts   # calendar invite download
  api/register/route.ts  # forwards registrations to LeadConnector
src/components/          # page sections, form, countdown, calendar CTAs
src/lib/
  session-config.ts      # ← SINGLE SOURCE OF TRUTH for the session
  session.ts             # date resolution + formatting
  calendar.ts            # .ics + Google Calendar generation
public/growthable-logo-dark.png
public/ryan-host.jpg
```

## Notes

- Registrations POST to `/api/register`, which forwards to LeadConnector
  (GoHighLevel) server-side with UTM/click-id attribution. See `HANDOVER.md` for
  the payload shape.
- Replay embed: YouTube live `Qh-HPZ1KI94` (`REPLAY_ID` in `OfficeHoursPage.tsx`).
- Analytics: `fireAnalytics()` in `RegisterForm.tsx` pushes to `dataLayer` and
  calls `fbq`/`gtag` **if present** — no pixel, GTM or GA4 tag is installed on
  the page yet, so these are currently no-ops.

## Deploy

Connect the repo to Vercel (or run `npm run build && npm run start` on any Node host).
