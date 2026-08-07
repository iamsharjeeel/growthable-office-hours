import { SESSION, SITE_URL } from "@/lib/session-config";
import { getNextSessionDate, getSessionEndDate } from "@/lib/session";

/** iCalendar UTC timestamp: 20260728T210000Z */
function icsStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** RFC 5545 §3.3.11 — escape TEXT values. */
function icsEscape(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** RFC 5545 §3.1 — fold content lines at 75 octets. */
function fold(line: string): string {
  if (Buffer.byteLength(line, "utf8") <= 75) return line;

  const out: string[] = [];
  let current = "";
  let width = 0;
  // Split by code point so multi-byte characters are never cut in half.
  for (const char of line) {
    const size = Buffer.byteLength(char, "utf8");
    // Continuation lines start with a space, so they get one octet less.
    if (width + size > (out.length === 0 ? 75 : 74)) {
      out.push(current);
      current = "";
      width = 0;
    }
    current += char;
    width += size;
  }
  if (current) out.push(current);
  return out.join("\r\n ");
}

function agendaLines(): string {
  return SESSION.topics.map((topic) => `• ${topic}`).join("\n");
}

function description(): string {
  const join = SESSION.joinUrl
    ? `Join here: ${SESSION.joinUrl}`
    : "Your join link is in your confirmation email.";

  return [
    `Hosted live by ${SESSION.host}.`,
    "",
    "No fixed agenda — we work through whatever's live, for example:",
    agendaLines(),
    "",
    "Come with questions, or just come watch and see what sticks.",
    "",
    join,
  ].join("\n");
}

/**
 * A single VEVENT for the next session.
 *
 * Deliberately not recurring: attendees register per session (seats refresh
 * weekly), so a standing RRULE would put a permanent event on their calendar
 * they never asked for. Add `RRULE:FREQ=WEEKLY` here if that ever changes.
 */
export function buildIcs(now = new Date()): string {
  const start = getNextSessionDate(now);
  const end = getSessionEndDate(start);
  const url = SESSION.joinUrl || SITE_URL;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Growthable//Office Hours//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    // Stable per session, so re-downloading updates the event instead of
    // creating a duplicate.
    `UID:office-hours-${icsStamp(start)}@growthable.io`,
    `DTSTAMP:${icsStamp(now)}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:${icsEscape(SESSION.title)}`,
    `DESCRIPTION:${icsEscape(description())}`,
    `LOCATION:${icsEscape(SESSION.joinUrl || "Online")}`,
    `URL:${icsEscape(url)}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${icsEscape(`${SESSION.title} starts in 15 minutes`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.map(fold).join("\r\n") + "\r\n";
}

/** Google Calendar "add event" prefill URL. */
export function buildGoogleCalendarUrl(now = new Date()): string {
  const start = getNextSessionDate(now);
  const end = getSessionEndDate(start);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: SESSION.title,
    dates: `${icsStamp(start)}/${icsStamp(end)}`,
    details: description(),
    location: SESSION.joinUrl || "Online",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
