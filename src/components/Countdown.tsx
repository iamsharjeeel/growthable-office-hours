"use client";

import { useEffect, useState } from "react";
import { getCountdownParts, getNextSessionDate, pad2 } from "@/lib/session";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "mins", label: "Mins" },
  { key: "secs", label: "Secs" },
] as const;

export function Countdown() {
  const [parts, setParts] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = getNextSessionDate();
    const tick = () => setParts(getCountdownParts(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mb-5">
      <p className="mb-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-brand-deep">
        Next session starts in
      </p>
      <div className="flex items-end justify-between gap-1 sm:justify-start sm:gap-3">
        {units.map((unit, i) => (
          <div key={unit.key} className="flex items-end gap-1 sm:gap-3">
            <div className="flex w-[2.6rem] flex-col items-center sm:w-[2.85rem]">
              <span className="text-[1.15rem] font-bold tabular-nums leading-none text-slate-deep sm:text-[1.25rem]">
                {pad2(parts[unit.key])}
              </span>
              <span className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.08em] text-ink/70">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 ? (
              <span className="mb-[1.05rem] text-[0.85rem] font-semibold text-brand-deep" aria-hidden>
                :
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
