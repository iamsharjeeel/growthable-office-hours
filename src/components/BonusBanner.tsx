import { BONUS_BANNER } from "@/lib/session-config";

export function BonusBanner() {
  if (!BONUS_BANNER) return null;

  return (
    <div className="border-b border-line bg-brand-tint">
      <p className="animate-rise mx-auto max-w-[1120px] px-5 py-2.5 text-center text-[0.88rem] font-medium leading-snug tracking-tight text-brand-deep sm:px-8 sm:text-[0.95rem]">
        {BONUS_BANNER}
      </p>
    </div>
  );
}
