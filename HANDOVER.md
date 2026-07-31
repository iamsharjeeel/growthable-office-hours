# Handover

## What changed

- Replay section now embeds YouTube live `Qh-HPZ1KI94` with a "We covered" list under the player
- Scaffolded Next.js + Tailwind app for Growthable office hours landing page
- Matched brand palette (navy `#152039`, accent `#e8406a` / `#f23e67`) and Montserrat typography
- Built hero with wireframe mesh, design copy, floating register card, host section
- Logo uses attached brand file (`public/growthable-logo.png`, white bg removed, ink lightened for navy)
- Host headshot at `public/ryan-host.jpg` (circle + magenta frame)
- Added Watch a Replay section (YouTube `Qh-HPZ1KI94`) + Join Next Session → `#register`
- CTA style: solid pink face `#f03e6a` + hard offset shade `#f8ccd4`
- Slim footer → https://growthable.io
- Conversion pass: dynamic Tuesday session date + local time, countdown, form validation/UTM/analytics, lite YouTube, sticky mobile CTA, dark host section, final CTA
- Brand redesign: replaced the bespoke navy/dark theme with the **actual growthable.io design system**,
  sampled from the live site's compiled CSS (`:root` tokens + component classes)

## Design system

Tokens are copied verbatim from growthable.io — same names, same values — so this page and the
marketing site stay in step. Defined once in `src/app/globals.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#fbfaf8` | page background |
| `--mist` | `#f2f1ed` | recessed fills |
| `--ink` | `#25313d` | body text (`text-ink/75`, `/70`) |
| `--slate-deep` | `#34475b` | headings, labels |
| `--brand` | `#f03e6a` | CTA fill, bullet dots, accent bars, focus ring |
| `--brand-deep` | `#d62e58` | CTA hover, **all small pink text** (see contrast note) |
| `--brand-tint` | `#fdedf1` | pink wash / badges / invalid field fill |
| `--line` / `--line-strong` | `#e4e2dc` / `#c9cfd5` | hairlines / input borders |

Shadows are the site's offset "lift" family: `shadow-lift`, `shadow-lift-lg`, `shadow-lift-brand`.
Fonts are the site's: Poppins (`--font-poppins`) and IBM Plex Mono (`--font-plex-mono`, used for
eyebrow labels and countdown digits).

Component patterns lifted from the site: primary CTA (`.cta` — solid `--brand`, `rounded-lg`,
`shadow-lift-brand`, hover `--brand-deep` + lift), cards (`rounded-2xl border border-line bg-white
shadow-lift-lg`), inputs (`rounded-lg border-line-strong bg-white`), the eyebrow label (mono, upper,
`tracking-[0.2em]`, pink, preceded by a 1px pink dash), and `.stroke-under` for the pink accent bar
behind one phrase per heading.

The site also defines a secondary/outline button (`border-2 border-slate-deep text-slate-deep
bg-transparent hover:bg-slate-deep hover:text-white`). This page has no secondary CTA, so it is not
in `globals.css` — use that recipe if one is ever added.

## Social proof

The stat row in `OfficeHoursPage.tsx` mirrors growthable.io's own published
figures (24/7/365 support, 853+ tutorials, US/AU/UK compliance, unlimited
sub-accounts). No numbers were invented. If you want session-specific proof
(attendee counts, testimonials), supply the real figures and they can be added.

## Contrast

Every text node on the page was audited at 1440px and 390px against WCAG AA. All pass except the
three primary CTA labels: white on `--brand` is **3.75:1** where AA wants 4.5:1 at that size.
growthable.io ships the same value on its own buttons, so this was left as the brand defines it
rather than changed unilaterally. Two one-line fixes if you want it to pass:

- change the `.cta` fill to `--brand-deep` (4.75:1), or
- raise the CTA label from `0.95rem` to `1.175rem` so it clears the AA large-text threshold (needs 3.0).

Small pink text uses `--brand-deep` throughout (4.5:1+); `--brand` at full saturation is reserved for
the CTA fill and non-text accents.

## Why

Ship a studio-quality branded registration page from the Growthable office-hours design.

## Files touched

- `src/app/page.tsx` — landing composition + session copy
- `src/app/layout.tsx` — Poppins + IBM Plex Mono + metadata
- `src/app/globals.css` — brand tokens, `.cta`, `.stroke-under`, motion
- `src/components/Logo.tsx`
- `src/components/WireframeMesh.tsx`
- `src/components/RegisterForm.tsx`
- `public/ryan-host.jpg` — host headshot (CSS circle + magenta frame)
- `README.md`, `HANDOVER.md`, `CHANGELOG.md`, `.env.example`

## Weekly session updates

`src/lib/session-config.ts` is the single source of truth. Change `SESSION.topics`
and the hero bullet list, the calendar invite agenda, and nothing else, all update
together. The **date is not stored** — `weekday` + `startHour` are a recurring rule
resolved at request time, so the page, countdown, `.ics`, Google Calendar link and
share card roll forward to next week unattended. DST is handled by `Intl`
(prints PDT in summer, PST in winter).

`AGENTS.md` documents this as a task-oriented runbook so an AI agent picking the
repo up cold in a later week edits the right file instead of hardcoding a date
into a component. If you use a different LLM next week, point it at `AGENTS.md`.

## Registration payload

`POST /api/register` forwards server-side to the LeadConnector hook
(override with `LEAD_WEBHOOK_URL`):

```json
{ "name", "first_name", "last_name", "email", "phone" (E.164), "phone_formatted",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "fbclid", "gclid", "source", "form_name", "session_date", "submitted_at",
  "page_url", "referrer", "user_agent", "ip" }
```

Validated server-side (400 before any outbound call), 8s timeout, one retry on
5xx/network. On failure returns 502 and the form shows a retry message with the
entered values preserved.

## Calendar invite

- `/session.ics` — real `text/calendar` URL (not a client blob) so iOS/Android
  hand it to the native calendar app. RFC 5545 compliant: CRLF, 75-octet line
  folding, escaped TEXT, stable per-session `UID` so re-downloading updates
  rather than duplicates, plus a 15-minute `VALARM`. Validated against a real
  iCalendar parser.
- Google Calendar prefill link built from the same config.
- Single event, deliberately not recurring — attendees register per session, so a
  standing `RRULE` would leave a permanent event they never asked for.

## Pending

- Wire form submit to CRM / webhook / email provider
- Keep session date/time current in `src/app/page.tsx` (currently Tuesday July 28 — 2PM PDT)
- Optional: swap SVG logo for official brand SVG if Growthable provides one
- Decide the CTA contrast tradeoff above (leave brand-exact, or apply one of the two fixes)
- **Set `NEXT_PUBLIC_SITE_URL` in production.** Without it the canonical URL, OG
  tags and the invite `URL` fall back to the Vercel production domain, or to
  `http://localhost:3000` off-Vercel.
- **Verify the live LeadConnector hook end to end.** The payload path is verified
  against a local capture server, but the real endpoint has not been posted to —
  submit the form once on a preview deploy and confirm the contact lands.
- Analytics is still not installed: `fbq`/`gtag`/`dataLayer` calls in
  `RegisterForm.tsx` are no-ops until a Pixel/GA4/GTM tag is added. Deferred by
  request.
- OG card renders in Satori's default sans, not Poppins — Satori needs raw font
  bytes and cannot use `next/font`. `src/app/opengraph-image.tsx` has the exact
  5-line upgrade in a comment; drop two Poppins TTFs into `assets/` to apply it.
- Replay section points at YouTube live `Qh-HPZ1KI94` with a "We covered" agenda
  under the embed. Swap `REPLAY_ID` / `REPLAY_COVERED` in `OfficeHoursPage.tsx`
  when the next replay lands.
- `public/growthable-logo.png` (white wordmark, for dark backgrounds) is now unused — the page uses
  `growthable-logo-dark.png`. Kept in case a dark surface comes back.

## Manual steps

- None for local run (`npm install && npm run dev`)
- No env vars or SQL migrations required yet
