# Changelog

## 2026-08-08

- Added a slim branded bonus banner under the header (`BONUS_BANNER` in `session-config.ts`)

## 2026-07-24

- Added Growthable office hours landing page (hero, register form, host section) with brand colors and Montserrat
- Replaced logo with official wordmark (transparent) and updated host headshot (circle-framed)
- Added maintenance docs: README, HANDOVER, CHANGELOG, `.env.example`
- Fixed logo (SVG, no fringe) and host photo (`ryan-host.jpg` outdoor headshot)
- Swapped logo to attached brand asset; added Watch a Replay (YouTube) + Join Next Session scroll CTA
- Matched CTAs to hard offset pink shadow style; added slim footer linking to growthable.io
- Conversion engineering: dynamic session date/countdown, form UX, lite YouTube, sticky mobile bar, dark host, final CTA, polish
- Rebuilt the visual system on the real growthable.io design tokens: light cream (`--paper`) page,
  slate headings, single brand pink, Poppins + IBM Plex Mono, offset "lift" shadows, `.stroke-under`
  heading accent, hairline section dividers (styling only — no copy or behaviour changes)
- Added a closing heading ("See You Tuesday") to the final CTA section so it is not a bare button
- Wired the registration form to the LeadConnector (GoHighLevel) webhook server-side, with E.164
  phone normalisation, name splitting, UTM/click-id + attribution passthrough, server-side
  revalidation, an 8s timeout and one retry; failures now surface a retry message instead of
  silently dropping the lead
- Perf: stopped bypassing the image optimizer on the header logo (129 KB -> 8.8 KB) and fixed
  synthetic-bold countdown digits (IBM Plex Mono 700 was never loaded)
- Legal links now point at growthable.io/privacy-policy/ and /terms-and-conditions/ (both
  previously 404ed while being referenced by the SMS consent copy)
- Added OG/Twitter metadata, canonical URL and a generated 1200x630 share card
- Added a stat row using growthable.io's own published figures, "we'll text you the join
  link" on the phone field, session duration on the date line, and reframed the replay
  section as posted-after-each-session
- Added add-to-calendar (.ics + Google) driven by a new single-source-of-truth session
  config; AGENTS.md documents the weekly update as a runbook for humans and AI agents
- Form a11y: fields restructured so the SMS consent paragraph is no longer folded into
  the phone field's accessible name; added aria-required/aria-invalid/aria-describedby
