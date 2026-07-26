import { SESSION } from "@/lib/session-config";

const TZ = SESSION.timeZone;
const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

type ZonedParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: string;
};

function getZonedParts(date: Date, timeZone: string): ZonedParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    weekday: get("weekday"),
  };
}

function zonedToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  let utc = Date.UTC(year, month - 1, day, hour + 8, minute, 0);
  for (let i = 0; i < 4; i++) {
    const p = getZonedParts(new Date(utc), TZ);
    const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, 0);
    const target = Date.UTC(year, month - 1, day, hour, minute, 0);
    utc += target - asUtc;
  }
  return new Date(utc);
}

export function getNextSessionDate(now = new Date()): Date {
  const target = WEEKDAY_SHORT[SESSION.weekday];
  for (let offset = 0; offset < 8; offset++) {
    const probe = new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);
    const p = getZonedParts(probe, TZ);
    if (p.weekday !== target) continue;
    const session = zonedToUtc(p.year, p.month, p.day, SESSION.startHour, SESSION.startMinute);
    if (session.getTime() > now.getTime()) return session;
  }
  const fallback = getZonedParts(now, TZ);
  return zonedToUtc(
    fallback.year,
    fallback.month,
    fallback.day + 7,
    SESSION.startHour,
    SESSION.startMinute,
  );
}

export function getSessionEndDate(start: Date): Date {
  return new Date(start.getTime() + SESSION.durationMinutes * 60 * 1000);
}

/** "1 hour", "90 minutes" — derived so the page and invite never disagree. */
export function formatSessionDuration(): string {
  const m = SESSION.durationMinutes;
  if (m % 60 === 0) {
    const h = m / 60;
    return `${h} hour${h === 1 ? "" : "s"}`;
  }
  return `${m} minutes`;
}

export function formatSessionHeadline(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const minute = get("minute");
  const clock = minute === "00" ? get("hour") : `${get("hour")}:${minute}`;
  // e.g. "Tuesday July 28 — 2PM PDT" (DST-correct: PDT in summer, PST in winter)
  return `${get("weekday")} ${get("month")} ${get("day")} — ${clock}${get("dayPeriod")} ${get("timeZoneName")}`;
}

export function formatVisitorLocalTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function getVisitorTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

export function getCountdownParts(target: Date, now = new Date()) {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return { days, hours, mins, secs };
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
