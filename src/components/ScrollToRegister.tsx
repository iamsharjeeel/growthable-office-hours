"use client";

import { MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function ScrollToRegister({ children, className = "" }: Props) {
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const target = document.getElementById("register");
    if (!target) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });

    if (reduce) return;

    const card = target.querySelector("[data-register-card]");
    if (!(card instanceof HTMLElement)) return;
    card.classList.remove("register-pulse");
    void card.offsetWidth;
    card.classList.add("register-pulse");
    window.setTimeout(() => card.classList.remove("register-pulse"), 1600);
  }

  return (
    <a href="#register" onClick={onClick} className={className}>
      {children}
    </a>
  );
}
