"use client";

import { FormEvent, useState } from "react";

const fields = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Jane Cooper",
    autoComplete: "name",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 12a4.25 4.25 0 1 0-4.25-4.25A4.25 4.25 0 0 0 12 12Zm0 2.25c-4.15 0-7.5 2.1-7.5 4.7V20.5h15v-1.55c0-2.6-3.35-4.7-7.5-4.7Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+1 (555) 000-0000",
    autoComplete: "tel",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8.2 3.75h2.1l1.05 5.1-1.65 1.05a11.4 11.4 0 0 0 5.4 5.4l1.05-1.65 5.1 1.05v2.1A2.1 2.1 0 0 1 19.2 18.9 14.4 14.4 0 0 1 5.1 4.8a2.1 2.1 0 0 1 3.1-1.05Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    autoComplete: "email",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6.75A2.25 2.25 0 0 1 6.25 4.5h11.5A2.25 2.25 0 0 1 20 6.75v10.5A2.25 2.25 0 0 1 17.75 19.5H6.25A2.25 2.25 0 0 1 4 17.25V6.75Zm1.7.45 6.05 4.2a.45.45 0 0 0 .5 0l6.05-4.2v-.6H5.7v.6Zm12.6 1.35-5.85 4.05a1.95 1.95 0 0 1-2.3 0L5.7 8.55v8.2h12.6v-8.2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
] as const;

export function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div id="register" className="animate-float-in delay-3 w-full max-w-[420px] scroll-mt-28">
      <div className="rounded-[22px] bg-white p-7 shadow-[0_28px_80px_rgba(0,0,0,0.32),0_8px_24px_rgba(0,0,0,0.18)] sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fde8ee] text-accent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 4.5v11.25m0 0 4.5-4.5M12 15.75l-4.5-4.5M5.25 19.5h13.5"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="text-[1.55rem] font-bold tracking-[-0.02em] text-accent">
            Register Now
          </h2>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-line-soft bg-[#fafafb] px-5 py-10 text-center">
            <p className="text-lg font-semibold text-ink">You&apos;re on the list.</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              We&apos;ll send your office hours details shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="rounded-2xl border border-line bg-[#fcfcfd] p-4 sm:p-5">
              <div className="space-y-4">
                {fields.map((field) => (
                  <label key={field.id} htmlFor={field.id} className="block">
                    <span className="mb-1.5 block text-[0.8rem] font-semibold tracking-[0.01em] text-ink">
                      {field.label} <span className="text-accent">*</span>
                    </span>
                    <span className="field flex items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-3 transition-all duration-200">
                      <span className="text-accent">{field.icon}</span>
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        required
                        autoComplete={field.autoComplete}
                        placeholder={field.placeholder}
                        className="w-full bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-[#9aa1b2]"
                      />
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="cta mt-3 flex w-full items-center justify-center px-5 py-3.5 text-[0.95rem] font-bold tracking-[-0.01em] text-white"
            >
              Register Now!
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
