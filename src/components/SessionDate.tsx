"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import {
  formatSessionDuration,
  formatSessionHeadline,
  formatVisitorLocalTime,
  getNextSessionDate,
  getVisitorTimeZone,
} from "@/lib/session";

export function SessionDate() {
  const session = useMemo(() => getNextSessionDate(), []);
  const headline = formatSessionHeadline(session);
  const [localLine, setLocalLine] = useState<string | null>(null);

  useEffect(() => {
    const tz = getVisitorTimeZone();
    if (tz === "America/Los_Angeles") return;
    startTransition(() => {
      setLocalLine(`(that's ${formatVisitorLocalTime(session, tz)} your time)`);
    });
  }, [session]);

  return (
    <div>
      <p className="mt-3 text-[0.95rem] font-medium text-slate-deep sm:text-base">
        Weekly @ <span className="font-semibold">{headline}</span>
        <span className="text-ink/70"> · {formatSessionDuration()}</span>
      </p>
      {localLine ? (
        <p className="mt-1.5 text-[0.8rem] font-medium text-ink/70">{localLine}</p>
      ) : null}
    </div>
  );
}
