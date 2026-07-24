"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import {
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
      <p className="mt-2 text-[0.95rem] font-medium tracking-[0.04em] text-white/95 sm:text-base">
        Weekly @{" "}
        <span className="font-semibold tracking-[0.06em]">{headline}</span>
      </p>
      {localLine ? (
        <p className="mt-1.5 text-[0.8rem] font-medium text-white/70">{localLine}</p>
      ) : null}
    </div>
  );
}
