const TZ = "America/Los_Angeles";

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

function laLocalToUtc(
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
  for (let offset = 0; offset < 8; offset++) {
    const probe = new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);
    const p = getZonedParts(probe, TZ);
    if (p.weekday !== "Tue") continue;
    const session = laLocalToUtc(p.year, p.month, p.day, 14, 0);
    if (session.getTime() > now.getTime()) return session;
  }
  const fallback = getZonedParts(now, TZ);
  return laLocalToUtc(fallback.year, fallback.month, fallback.day + 7, 14, 0);
}

export function formatSessionHeadline(date: Date): string {
  const monthDay = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    month: "long",
    day: "numeric",
  }).format(date);
  return `Tuesday ${monthDay} — 2PM PDT`;
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
