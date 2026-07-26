import { NextRequest, NextResponse } from "next/server";
import { getNextSessionDate } from "@/lib/session";

/**
 * LeadConnector (GoHighLevel) inbound webhook trigger.
 * Override per environment with LEAD_WEBHOOK_URL.
 */
const WEBHOOK_URL =
  process.env.LEAD_WEBHOOK_URL ??
  "https://services.leadconnectorhq.com/hooks/dhNcLQdbdfltU3kuLmlI/webhook-trigger/ee85deac-dc9b-4009-874e-2c43b1ade2c7";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown, max = 300): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** GoHighLevel matches contacts on E.164, so normalise before sending. */
function toE164(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

function splitName(full: string): { first_name: string; last_name: string } {
  const parts = full.split(/\s+/).filter(Boolean);
  return {
    first_name: parts[0] ?? full,
    last_name: parts.slice(1).join(" "),
  };
}

async function postToWebhook(payload: unknown): Promise<Response> {
  return fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 200).toLowerCase();
  const phoneRaw = str(body.phone, 40);
  const phone = toE164(phoneRaw);

  // Client-side validation is bypassable, so re-check here.
  if (!name || !EMAIL_RE.test(email) || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 400 });
  }

  const attribution = Object.fromEntries(
    UTM_KEYS.map((key) => [key, str(body[key], 200)]),
  ) as Record<(typeof UTM_KEYS)[number], string>;

  const payload = {
    name,
    ...splitName(name),
    email,
    phone,
    phone_formatted: phoneRaw,
    ...attribution,
    source: "office-hours-landing",
    form_name: "Office Hours Registration",
    session_date: getNextSessionDate().toISOString(),
    submitted_at: new Date().toISOString(),
    page_url: str(body.page_url, 500) || req.headers.get("referer") || "",
    referrer: str(body.referrer, 500),
    user_agent: req.headers.get("user-agent") ?? "",
    ip:
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "",
  };

  // One retry — a dropped lead is worse than a slow response.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await postToWebhook(payload);
      if (res.ok) return NextResponse.json({ ok: true });
      // 4xx from the webhook will not fix itself on retry.
      if (res.status < 500) {
        console.error(`[register] webhook rejected: ${res.status} ${await res.text()}`);
        break;
      }
      console.error(`[register] webhook ${res.status}, attempt ${attempt + 1}`);
    } catch (err) {
      console.error(`[register] webhook error, attempt ${attempt + 1}:`, err);
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, 400));
  }

  // Surface the failure so the visitor can retry rather than losing the lead.
  return NextResponse.json({ ok: false, error: "Could not submit" }, { status: 502 });
}
