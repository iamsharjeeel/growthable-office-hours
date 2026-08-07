"use client";

import Image from "next/image";
import { useState } from "react";
import { LiteYouTube } from "@/components/LiteYouTube";
import { Logo } from "@/components/Logo";
import { RegisterForm } from "@/components/RegisterForm";
import { Reveal } from "@/components/Reveal";
import { ScrollToRegister } from "@/components/ScrollToRegister";
import { SessionDate } from "@/components/SessionDate";
import { StickyRegisterBar } from "@/components/StickyRegisterBar";
import { WireframeMesh } from "@/components/WireframeMesh";
import { LEGAL, SESSION } from "@/lib/session-config";

const REPLAY_ID = "HwGJz4rj_jw";

/**
 * Growthable's own published figures, mirrored from the stat bar on
 * growthable.io. Do not invent numbers here — if a stat is not published on
 * the marketing site, leave it out.
 */
const stats = [
  { value: "24/7/365", label: "Live client support" },
  { value: "853+", label: "Free GHL tutorials" },
  { value: "US · AU · UK", label: "Compliance filed for you" },
  { value: "Unlimited", label: "Sub-accounts, flat rate" },
];

const heading = "text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold tracking-tight text-slate-deep";
const ctaButton =
  "cta inline-flex cursor-pointer items-center justify-center px-7 py-3.5 text-[0.95rem] font-bold tracking-tight text-white";

export function OfficeHoursPage() {
  const [registered, setRegistered] = useState(false);

  return (
    <main className="min-h-full">
      <header className="border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="animate-rise mx-auto flex h-16 w-full max-w-[1120px] items-center justify-center px-5 sm:px-8">
          <Logo />
        </div>
      </header>

      <section className="relative overflow-hidden">
        <WireframeMesh />

        <div className="relative z-10 mx-auto max-w-[1120px] px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-16 lg:pb-28">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-14 lg:gap-y-0 xl:gap-x-16">
            <div className="order-1 animate-rise delay-1 max-w-xl lg:col-start-1 lg:row-start-1 lg:pt-2">
              <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-brand-deep sm:text-xs">
                <span
                  className="mr-2 inline-block h-px w-6 bg-brand align-middle"
                  aria-hidden="true"
                />
                Join Our Office Hours
              </p>

              <SessionDate />

              <h1 className="mt-6 text-[clamp(1.85rem,3.8vw,2.75rem)] font-extrabold leading-[1.14] tracking-tight text-slate-deep">
                Live Product Walkthroughs,{" "}
                <span className="stroke-under">Every Week</span>
              </h1>

              <p className="mt-5 max-w-lg text-[1.02rem] leading-[1.75] text-ink/75 sm:text-[1.08rem]">
                Every Tuesday, we open up Growthable HQ and show you exactly what
                we&apos;re building — live, unscripted, no fluff.
              </p>
            </div>

            <div className="order-2 flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-end">
              <RegisterForm onRegistered={() => setRegistered(true)} />
            </div>

            <div className="order-3 max-w-xl lg:col-start-1 lg:row-start-2">
              <Reveal>
                <div className="mt-0 lg:mt-10">
                  <p className="text-[1.02rem] font-semibold text-slate-deep">
                    No fixed agenda — we work through whatever&apos;s live:
                  </p>
                  <ul className="mt-4 space-y-3.5">
                    {SESSION.topics.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.98rem] leading-[1.6] text-ink/80"
                      >
                        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-8 text-[1.05rem] font-semibold tracking-tight text-slate-deep">
                  Come with questions, or just come watch and see what sticks.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist px-5 py-10 sm:px-8 sm:py-12">
        <dl className="mx-auto grid max-w-[1120px] grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-[1.35rem] font-extrabold tracking-tight text-slate-deep sm:text-[1.6rem]">
                {stat.value}
              </dt>
              <dd className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink/70">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <Reveal>
        <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className={heading}>
              This Week&apos;s <span className="stroke-under">Replay</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ink/75">
              The replay will be posted here right after each session. In the meantime, here&apos;s
              one of our most useful walkthroughs.
            </p>

            <div className="mx-auto mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-lift-lg">
              <LiteYouTube videoId={REPLAY_ID} title="Growthable office hours replay" />
            </div>

            <div className="mt-12 flex flex-col items-center gap-3">
              <ScrollToRegister className={ctaButton}>Join Next Session</ScrollToRegister>
              <p className="text-sm text-ink/70">
                Takes 20 seconds — seats refresh every Tuesday.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className={heading}>
              Your <span className="stroke-under">Host</span>
            </h2>

            <div className="host-ring mt-12 rounded-full bg-brand/25 p-[6px]">
              <div className="overflow-hidden rounded-full bg-paper p-1">
                <Image
                  src="/ryan-host.jpg"
                  alt="Ryan O'Connor, Founder and CEO of Growthable"
                  width={420}
                  height={420}
                  sizes="210px"
                  className="h-[180px] w-[180px] rounded-full object-cover object-[center_12%] sm:h-[210px] sm:w-[210px]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[1.55rem] font-extrabold tracking-tight text-brand sm:text-[1.75rem]">
                Ryan O&apos;Connor
              </p>
              <p className="mt-2 text-[1rem] font-medium text-ink/70 sm:text-[1.05rem]">
                Founder and CEO — Growthable
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className={heading}>
              See You <span className="stroke-under">Tuesday</span>
            </h2>
            <ScrollToRegister className={`${ctaButton} mt-9`}>Register Now</ScrollToRegister>
            <p className="mt-3 text-sm text-ink/70">
              Takes 20 seconds — seats refresh every Tuesday.
            </p>
          </div>
        </section>
      </Reveal>

      <footer className="border-t border-line px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a
            href="https://growthable.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold tracking-tight text-slate-deep underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
          >
            <span className="text-brand-deep">g</span>rowthable.io
          </a>
          <a
            href={LEGAL.privacy}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ink/70 underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href={LEGAL.terms}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ink/70 underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
          >
            Terms of Service
          </a>
        </div>
      </footer>

      <StickyRegisterBar registered={registered} />
    </main>
  );
}
