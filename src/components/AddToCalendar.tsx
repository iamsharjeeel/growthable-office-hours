"use client";

import { useMemo } from "react";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import { formatSessionDuration, formatSessionHeadline, getNextSessionDate } from "@/lib/session";

/**
 * Shown after a successful registration. Both destinations derive from
 * SESSION in src/lib/session-config.ts, so the invite can never drift from
 * the date shown in the hero.
 */
export function AddToCalendar() {
  const { headline, googleUrl } = useMemo(() => {
    const session = getNextSessionDate();
    return {
      headline: formatSessionHeadline(session),
      googleUrl: buildGoogleCalendarUrl(),
    };
  }, []);

  return (
    <div className="w-full">
      <p className="text-[0.78rem] font-medium text-ink/70">
        {headline} · {formatSessionDuration()}
      </p>

      {/* Stacked, not a row: the card is capped at 420px, so side-by-side wraps. */}
      <div className="mt-3 flex flex-col items-center gap-3">
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-slate-deep px-4 py-2.5 text-[0.85rem] font-semibold whitespace-nowrap text-slate-deep transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-deep hover:text-white"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M7 3v3m10-3v3M4.5 8.5h15M6 5.5h12A1.5 1.5 0 0 1 19.5 7v12A1.5 1.5 0 0 1 18 20.5H6A1.5 1.5 0 0 1 4.5 19V7A1.5 1.5 0 0 1 6 5.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          Add to Google Calendar
        </a>

        <a
          href="/session.ics"
          download="growthable-office-hours.ics"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-2 py-1 text-[0.8rem] font-semibold whitespace-nowrap text-slate-deep underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Apple / Outlook (.ics)
        </a>
      </div>
    </div>
  );
}
