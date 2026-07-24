"use client";

import { useEffect, useState } from "react";
import { ScrollToRegister } from "@/components/ScrollToRegister";

type Props = {
  registered: boolean;
};

export function StickyRegisterBar({ registered }: Props) {
  const [formOutOfView, setFormOutOfView] = useState(false);

  useEffect(() => {
    if (registered) return;

    const form = document.getElementById("register");
    if (!form) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setFormOutOfView(!entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    io.observe(form);
    return () => io.disconnect();
  }, [registered]);

  if (registered || !formOutOfView) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy/95 px-4 pt-3 backdrop-blur-md lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <ScrollToRegister className="cta flex w-full cursor-pointer items-center justify-center px-5 py-3.5 text-[0.95rem] font-bold tracking-[-0.01em] text-white">
        Register Now
      </ScrollToRegister>
    </div>
  );
}
