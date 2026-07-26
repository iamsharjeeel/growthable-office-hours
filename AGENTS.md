<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Updating the weekly office hours session

**If you were asked to "update the office hours page" for a new week, this is the
whole job. Read this section before opening any component.**

## The one file you edit

`src/lib/session-config.ts` — the `SESSION` object. It is the single source of
truth for the session. These all derive from it automatically:

| What | Where it renders |
| --- | --- |
| `Weekly @ <date> — <time> · <duration>` line | `src/components/SessionDate.tsx` |
| Live countdown | `src/components/Countdown.tsx` |
| `This week we're covering:` bullet list | `src/components/OfficeHoursPage.tsx` |
| Calendar invite: `.ics` + Google Calendar | `src/lib/calendar.ts`, `/session.ics` |
| Agenda inside the calendar invite | same `topics` array as the bullet list |
| `session_date` sent to the CRM webhook | `src/app/api/register/route.ts` |
| Session date on the social share card | `src/app/opengraph-image.tsx` |

## The routine weekly change

Replace the four strings in `SESSION.topics`. That is it. Those strings are both
the on-page agenda and the agenda in the calendar invite, so they stay in sync
by construction.

House style for a topic: one line, sentence case, no trailing period, and it
names a concrete thing the viewer will see. Match the existing entries — an
em-dash clause explaining the payoff is the established pattern:

```ts
topics: [
  "Our new SMS drip builder — how to launch a 5-touch sequence in under ten minutes",
  "Snapshot loading, start to finish, on a fresh sub-account",
  "Live Q&A — bring your setup, we'll help you fix it on the call",
],
```

Keep it to 3–5 entries; the hero column is sized for four.

## You do NOT need to change the date

There is deliberately **no date field**. `SESSION.weekday` + `startHour` +
`startMinute` are a recurring rule, and `getNextSessionDate()` in
`src/lib/session.ts` resolves the next matching instant at request time. The
page, countdown, invite and share card roll over to next week on their own.

**Never** add a `date`, `nextSession` or `sessionDate` field, and never hardcode
a formatted string like `"Tuesday 2PM PDT"`. The headline is built from `Intl`
so daylight saving is handled — it prints `PDT` in summer and `PST` in winter
without intervention. Hardcoding it is how this page starts lying to visitors.

## Less common changes

| Ask | Change |
| --- | --- |
| Different day or time | `weekday` (0=Sun…6=Sat), `startHour`, `startMinute`, `timeZone` |
| Longer or shorter session | `durationMinutes` — page copy and invite end time both follow |
| Permanent Zoom/Meet link | `joinUrl` — while empty, the invite points attendees at their confirmation email |
| Different host | `host` |

If you change the day, also update the three places that mention the cadence in
**prose** — these are marketing copy, not config, and are intentionally not
derived:

- `OfficeHoursPage.tsx`: "Every Tuesday, we open up Growthable HQ…"
- `OfficeHoursPage.tsx`: "seats refresh every Tuesday." (appears twice)

## Verifying your change

```bash
npm run lint && npm run build
npx next start -p 3000 &
curl -s localhost:3000/session.ics          # DTSTART/DTEND must match the page
curl -s localhost:3000/ | grep "Weekly @"   # date line must match the invite
npm run check:tz                            # visitor-local line, 11 timezones
```

The page date and the `.ics` `DTSTART` must agree. If they don't, something has
been hardcoded that should have been derived — fix that rather than patching one
side.

### `npm run check:tz`

The hero's second line — `(that's Wed, Jul 29, 2:00 AM your time)` — is rendered
client-side from the browser's `Intl` timezone. It is **not in the SSR HTML**, so
`curl | grep` cannot see it and its absence there is not a bug. The script drives
a real browser with an overridden timezone and asserts, for each zone, that:

- the visitor-local line is present and correct,
- it is *suppressed* in `America/Los_Angeles` — deliberate, because the headline
  already states the session's own zone,
- the `Weekly @ …` headline is **identical in every zone** (it is always printed
  in the session's timezone, so any variation means a timezone leaked into it).

It exits non-zero on any of those, so it is safe to run in CI. Playwright is
deliberately not a dependency — install on demand:

```bash
npm i -D playwright && npx playwright install chromium
npx next start -p 3000 &
npm run check:tz
npm run check:tz -- --port 4000 Asia/Dubai America/Sao_Paulo   # custom port/zones
```

To eyeball it by hand instead: DevTools → `Cmd/Ctrl+Shift+P` → "Show Sensors" →
set **Location** (or just a custom Timezone ID), then **reload** — the line is set
in an effect on mount, so changing the override without reloading does nothing.

# Other conventions in this repo

- **Design tokens** live in `src/app/globals.css` and are copied verbatim from
  the live growthable.io design system (same names, same values). Do not invent
  new colours, shadows or fonts; reuse `--brand`, `--ink`, `--slate-deep`,
  `--paper`, `--mist`, `--line`, and the `shadow-lift*` family. Small pink text
  must use `--brand-deep`, not `--brand`, or it fails WCAG AA on cream.
- **Stats** in `OfficeHoursPage.tsx` must be figures actually published on
  growthable.io. Do not invent social proof numbers.
- **Legal links** come from `LEGAL` in `src/lib/session-config.ts` and point at
  the marketing site. This app does not host its own privacy/terms pages.
