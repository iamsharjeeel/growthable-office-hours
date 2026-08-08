/*
 * ============================================================================
 *  WEEKLY SESSION CONFIG — EDIT THIS FILE TO UPDATE THE OFFICE HOURS SESSION
 * ============================================================================
 *
 * READ THIS FIRST (applies to humans and to AI coding agents alike):
 *
 * This object is the ONLY place the session is defined. Everything downstream
 * derives from it, so you never have to hunt through components:
 *
 *   - the "Weekly @ ..." date line in the hero        (src/components/SessionDate.tsx)
 *   - the live countdown                              (src/components/Countdown.tsx)
 *   - the "This week we're covering:" bullet list     (src/components/OfficeHoursPage.tsx)
 *   - the Add-to-Calendar invite (.ics + Google)      (src/lib/calendar.ts, /session.ics)
 *   - the session_date sent to the CRM webhook        (src/app/api/register/route.ts)
 *
 * The DATE IS NOT STORED HERE and must not be. `weekday` + `startHour` are a
 * recurring rule, and getNextSessionDate() in ./session.ts resolves the next
 * matching date at request time. That means the page, the countdown and the
 * calendar invite roll forward to next week on their own — there is nothing to
 * update just because a week passed.
 *
 * ----------------------------------------------------------------------------
 * TASK: "update the office hours page for this week"
 * ----------------------------------------------------------------------------
 * Edit `topics` below, and nothing else. Those four strings are the agenda:
 * they render as the hero bullet list AND become the agenda in the calendar
 * invite. Keep them to one line each, sentence case, no trailing period —
 * match the tone of the existing entries.
 *
 * TASK: "the session moved to a different day or time"
 * ----------------------------------------------------------------------------
 * Change `weekday`, `startHour`, `startMinute` or `timeZone`. Do NOT hardcode
 * a formatted string like "Tuesday 2PM PDT" anywhere — the headline, the
 * invite and the visitor's local-time line are all derived, and DST is handled
 * for you. Also update the two places that mention the cadence in prose:
 * `topics`' surrounding copy in OfficeHoursPage.tsx ("Every Tuesday, ...",
 * "seats refresh every Tuesday") — those are marketing copy, not config.
 *
 * TASK: "the session is longer/shorter"
 * ----------------------------------------------------------------------------
 * Change `durationMinutes`. The page's stated duration and the calendar
 * invite's end time both follow.
 *
 * TASK: "we have a permanent Zoom/Meet link now"
 * ----------------------------------------------------------------------------
 * Put it in `joinUrl`. While it is empty the calendar invite tells attendees
 * the link is in their confirmation email, which is the correct behaviour when
 * the link is generated per session by the CRM.
 *
 * DO NOT: add a `date`/`nextSession` field, reintroduce a hardcoded weekday or
 * time string, or duplicate `topics` into a component. Any of those breaks the
 * single-source-of-truth guarantee and the page will start disagreeing with
 * the calendar invite.
 */

export const SESSION = {
  /** 0 = Sunday … 6 = Saturday. 2 = Tuesday. */
  weekday: 2,

  /** Start time in 24-hour clock, expressed in `timeZone` (not UTC). */
  startHour: 14,
  startMinute: 0,

  /** How long the session runs. Drives the invite end time and the page copy. */
  durationMinutes: 60,

  /** IANA zone the start time is expressed in. DST is resolved automatically. */
  timeZone: "America/Los_Angeles",

  /** Calendar invite subject line. */
  title: "Growthable Office Hours",

  /** Shown as the invite organiser in the description. */
  host: "Ryan O'Connor",

  /**
   * Permanent meeting link, if there is one. Leave "" to have the invite point
   * attendees at their confirmation email for the join link.
   */
  joinUrl: "",

  /**
   * THIS WEEK'S AGENDA. Renders as the hero bullet list and as the agenda in
   * the calendar invite. This is the field you change each week.
   */
  topics: [
    "Our proprietary Voice AI — how it handles real inbound calls like a trained rep, not a robot",
    "Conversational AI that qualifies and books leads while you sleep",
    "Our ticketing system — built to actually replace the clunky helpdesk tools you're stuck with",
    "Live Q&A — bring your setup, we'll help you fix it on the call",
  ],
} as const;

/** Slim announcement strip under the header. Set to "" to hide. */
export const BONUS_BANNER =
  "Show up live and you’ll get special bonuses worth $100+";

/** Public origin, used for canonical URLs, OG tags and the invite URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Canonical legal pages. These live on the marketing site, not in this app. */
export const LEGAL = {
  privacy: "https://growthable.io/privacy-policy/",
  terms: "https://growthable.io/terms-and-conditions/",
} as const;
