"use client";

import { FormEvent, startTransition, useEffect, useState } from "react";
import { Countdown } from "@/components/Countdown";

type FieldErrors = Partial<Record<"name" | "phone" | "email", string>>;

type UtmFields = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  gclid: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const emptyUtm: UtmFields = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  fbclid: "",
  gclid: "",
};

function formatUSPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const len = digits.length;
  if (len === 0) return "";
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length === 10;
}

function fireAnalytics() {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "office_hours_registration" });
  } catch {
    /* ignore */
  }
  try {
    if (typeof window.fbq === "function") window.fbq("track", "Lead");
  } catch {
    /* ignore */
  }
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", { event_category: "office_hours" });
    }
  } catch {
    /* ignore */
  }
}

function readUtm(): UtmFields {
  if (typeof window === "undefined") return emptyUtm;
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
    fbclid: params.get("fbclid") ?? "",
    gclid: params.get("gclid") ?? "",
  };
}

type Props = {
  onRegistered?: () => void;
};

export function RegisterForm({ onRegistered }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [utm, setUtm] = useState<UtmFields>(emptyUtm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setUtm(readUtm());
    });
  }, []);

  function validateField(field: "name" | "phone" | "email", value: string): string {
    if (!value.trim()) return "Required";
    if (field === "email" && !isValidEmail(value)) return "Enter a valid email";
    if (field === "phone" && !isValidPhone(value)) return "Enter a valid phone number";
    return "";
  }

  function onBlur(field: "name" | "phone" | "email", value: string) {
    const msg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: msg || undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: FieldErrors = {
      name: validateField("name", name) || undefined,
      phone: validateField("phone", phone) || undefined,
      email: validateField("email", email) || undefined,
    };
    setErrors(next);
    if (next.name || next.phone || next.email) return;

    setSubmitting(true);
    setSubmitFailed(false);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          email: email.trim(),
          ...utm,
          page_url: window.location.href,
          referrer: document.referrer,
        }),
      });
      if (!res.ok) throw new Error("fail");
      fireAnalytics();
      setSuccess(true);
      onRegistered?.();
      window.dispatchEvent(new CustomEvent("office-hours-registered"));
    } catch {
      // Keep the form filled in and tell them, rather than failing silently.
      setSubmitFailed(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="register" className="w-full max-w-[420px] scroll-mt-28">
      <div
        data-register-card
        className="min-h-[540px] rounded-2xl border border-line bg-white p-7 shadow-lift-lg sm:min-h-[560px] sm:p-8"
      >
        {success ? (
          <div className="flex h-full min-h-[480px] flex-col items-center justify-center px-2 text-center animate-fade">
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ecfdf5] text-[#009767]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 13.2 9.8 18 19 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className="text-[1.45rem] font-bold tracking-tight text-slate-deep">
              You&apos;re registered!
            </h2>
            <p className="mt-3 max-w-[18rem] text-[0.95rem] leading-relaxed text-ink/75">
              Check your email for the calendar invite and join link.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-tint text-brand">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 4.5v11.25m0 0 4.5-4.5M12 15.75l-4.5-4.5M5.25 19.5h13.5"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h2 className="text-[1.55rem] font-bold tracking-tight text-brand">
                Register Now
              </h2>
            </div>

            <Countdown />

            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              {Object.entries(utm).map(([key, value]) => (
                <input key={key} type="hidden" name={key} value={value} />
              ))}

              <div className="rounded-xl border border-line bg-paper p-4 sm:p-5">
                <div className="space-y-4">
                  <label htmlFor="name" className="block">
                    <span className="mb-1.5 block text-[0.8rem] font-semibold tracking-[0.01em] text-slate-deep">
                      Full Name <span className="text-brand-deep">*</span>
                    </span>
                    <span
                      className={`field flex items-center gap-2.5 rounded-lg border px-3.5 py-3 transition-all duration-200 ${
                        errors.name ? "border-brand-deep bg-brand-tint/40" : "border-line-strong bg-white"
                      }`}
                    >
                      <span className="text-slate-deep/45">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path
                            d="M12 12a4.25 4.25 0 1 0-4.25-4.25A4.25 4.25 0 0 0 12 12Zm0 2.25c-4.15 0-7.5 2.1-7.5 4.7V20.5h15v-1.55c0-2.6-3.35-4.7-7.5-4.7Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Jane Cooper"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => onBlur("name", name)}
                        className="w-full bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-ink/50"
                      />
                    </span>
                    {errors.name ? (
                      <span className="mt-1 block text-[0.75rem] font-medium text-brand-deep">{errors.name}</span>
                    ) : null}
                  </label>

                  <label htmlFor="phone" className="block">
                    <span className="mb-1.5 block text-[0.8rem] font-semibold tracking-[0.01em] text-slate-deep">
                      Phone <span className="text-brand-deep">*</span>
                    </span>
                    <span
                      className={`field flex items-center gap-2.5 rounded-lg border px-3.5 py-3 transition-all duration-200 ${
                        errors.phone ? "border-brand-deep bg-brand-tint/40" : "border-line-strong bg-white"
                      }`}
                    >
                      <span className="text-slate-deep/45">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path
                            d="M8.2 3.75h2.1l1.05 5.1-1.65 1.05a11.4 11.4 0 0 0 5.4 5.4l1.05-1.65 5.1 1.05v2.1A2.1 2.1 0 0 1 19.2 18.9 14.4 14.4 0 0 1 5.1 4.8a2.1 2.1 0 0 1 3.1-1.05Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(formatUSPhone(e.target.value))}
                        onBlur={() => onBlur("phone", phone)}
                        className="w-full bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-ink/50"
                      />
                    </span>
                    {errors.phone ? (
                      <span className="mt-1 block text-[0.75rem] font-medium text-brand-deep">{errors.phone}</span>
                    ) : null}
                    <p className="mt-2 text-[0.7rem] leading-relaxed text-ink/70">
                      By submitting, you agree to receive email and SMS reminders about this
                      session. Msg &amp; data rates may apply. Reply STOP to opt out.{" "}
                      <a href="/privacy-policy" className="underline underline-offset-2 transition-colors hover:text-brand-deep">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="/terms-of-service" className="underline underline-offset-2 transition-colors hover:text-brand-deep">
                        Terms
                      </a>
                      .
                    </p>
                  </label>

                  <label htmlFor="email" className="block">
                    <span className="mb-1.5 block text-[0.8rem] font-semibold tracking-[0.01em] text-slate-deep">
                      Email <span className="text-brand-deep">*</span>
                    </span>
                    <span
                      className={`field flex items-center gap-2.5 rounded-lg border px-3.5 py-3 transition-all duration-200 ${
                        errors.email ? "border-brand-deep bg-brand-tint/40" : "border-line-strong bg-white"
                      }`}
                    >
                      <span className="text-slate-deep/45">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path
                            d="M4 6.75A2.25 2.25 0 0 1 6.25 4.5h11.5A2.25 2.25 0 0 1 20 6.75v10.5A2.25 2.25 0 0 1 17.75 19.5H6.25A2.25 2.25 0 0 1 4 17.25V6.75Zm1.7.45 6.05 4.2a.45.45 0 0 0 .5 0l6.05-4.2v-.6H5.7v.6Zm12.6 1.35-5.85 4.05a1.95 1.95 0 0 1-2.3 0L5.7 8.55v8.2h12.6v-8.2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => onBlur("email", email)}
                        className="w-full bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-ink/50"
                      />
                    </span>
                    {errors.email ? (
                      <span className="mt-1 block text-[0.75rem] font-medium text-brand-deep">{errors.email}</span>
                    ) : null}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="cta mt-3 flex w-full cursor-pointer items-center justify-center gap-2 px-5 py-3.5 text-[0.95rem] font-bold tracking-[-0.01em] text-white disabled:cursor-wait disabled:opacity-90"
              >
                {submitting ? (
                  <>
                    <span className="spinner" aria-hidden />
                    Registering...
                  </>
                ) : (
                  "Register Now!"
                )}
              </button>

              {submitFailed ? (
                <p
                  role="alert"
                  className="animate-fade rounded-lg bg-brand-tint px-3.5 py-2.5 text-center text-[0.78rem] font-medium leading-relaxed text-brand-deep"
                >
                  Something went wrong on our end. Please try again — your details are still here.
                </p>
              ) : null}

              <p className="flex items-center justify-center gap-1.5 text-center text-[0.72rem] text-ink/70">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M7.5 10.5V8.25a4.5 4.5 0 0 1 9 0v2.25M6.75 10.5h10.5A1.75 1.75 0 0 1 19 12.25v6A1.75 1.75 0 0 1 17.25 20H6.75A1.75 1.75 0 0 1 5 18.25v-6a1.75 1.75 0 0 1 1.75-1.75Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Free to attend · No credit card · Unsubscribe anytime
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
