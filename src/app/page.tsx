import Image from "next/image";
import { Logo } from "@/components/Logo";
import { RegisterForm } from "@/components/RegisterForm";
import { WireframeMesh } from "@/components/WireframeMesh";

const topics = [
  "Our proprietary Voice AI — how it handles real inbound calls like a trained rep, not a robot",
  "Conversational AI that qualifies and books leads while you sleep",
  "Our ticketing system — built to actually replace the clunky helpdesk tools you're stuck with",
  "Live Q&A — bring your setup, we'll help you fix it on the call",
];

const REPLAY_ID = "HwGJz4rj_jw";

export default function Home() {
  return (
    <main className="min-h-full">
      <section className="relative overflow-hidden bg-navy">
        <WireframeMesh />

        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-10 lg:pb-24">
          <header className="animate-rise flex justify-center">
            <Logo />
          </header>

          <div className="animate-rise delay-1 mt-10 text-center sm:mt-12">
            <p className="text-[clamp(1.55rem,3.4vw,2.35rem)] font-extrabold tracking-[-0.02em] text-accent uppercase">
              Join Our Office Hours
            </p>
            <p className="mt-2 text-[0.95rem] font-medium tracking-[0.04em] text-white/95 sm:text-base">
              Weekly @{" "}
              <span className="font-semibold tracking-[0.06em]">
                Tuesday July 28 — 2PM PDT
              </span>
            </p>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-14 xl:gap-16">
            <div className="animate-rise delay-2 max-w-xl lg:pt-2">
              <h1 className="text-[clamp(1.85rem,3.8vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-white uppercase">
                Live Product Walkthroughs, Every Week
              </h1>

              <p className="mt-5 max-w-lg text-[1.02rem] leading-[1.7] text-white/88 sm:text-[1.08rem]">
                Every Tuesday, we open up Growthable HQ and show you exactly what
                we&apos;re building — live, unscripted, no fluff.
              </p>

              <div className="mt-8">
                <p className="text-[1.02rem] font-semibold text-white">
                  This week we&apos;re covering:
                </p>
                <ul className="mt-4 space-y-3.5">
                  {topics.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.98rem] leading-[1.55] text-white/90">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 text-[1.05rem] font-semibold tracking-[-0.01em] text-white">
                Come with questions. Leave with a plan.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-deep px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,64,106,0.14),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold tracking-[0.04em] text-accent uppercase">
            Watch a Replay
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[1.02rem] leading-relaxed text-white/75">
            Missed a session? Catch the latest walkthrough, then save your seat for the next live one.
          </p>

          <div className="mx-auto mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${REPLAY_ID}?rel=0`}
                title="Growthable office hours replay"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href="#register"
              className="cta inline-flex items-center justify-center px-8 py-3.5 text-[0.95rem] font-bold tracking-[-0.01em] text-white"
            >
              Join Next Session
            </a>
            <p className="text-sm text-white/55">Takes 20 seconds — seats refresh every Tuesday.</p>
          </div>
        </div>
      </section>

      <section className="grain bg-host-bg px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="animate-rise text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold tracking-[0.04em] text-accent uppercase">
            Your Host
          </h2>

          <div className="animate-float-in delay-2 host-ring mt-10 rounded-full bg-accent p-[7px] sm:mt-12">
            <div className="overflow-hidden rounded-full bg-host-bg p-1">
              <Image
                src="/ryan-host.jpg"
                alt="Ryan O'Connor, Founder and CEO of Growthable"
                width={420}
                height={420}
                priority
                className="h-[180px] w-[180px] rounded-full object-cover object-[center_12%] sm:h-[210px] sm:w-[210px]"
              />
            </div>
          </div>

          <div className="animate-rise delay-3 mt-8">
            <p className="text-[1.55rem] font-extrabold tracking-[-0.02em] text-accent sm:text-[1.75rem]">
              Ryan O&apos;Connor
            </p>
            <p className="mt-2 text-[1rem] font-medium text-ink-muted sm:text-[1.05rem]">
              Founder and CEO — Growthable
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-host-bg px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
          <a
            href="https://growthable.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ink-muted transition-colors hover:text-accent"
          >
            growthable.io
          </a>
        </div>
      </footer>
    </main>
  );
}
