#!/usr/bin/env node
/**
 * Checks the visitor-local time line ("that's Wed, Jul 29, 2:00 AM your time")
 * across timezones.
 *
 * That line is rendered client-side from the browser's Intl timezone, so it is
 * absent from the SSR HTML and cannot be checked with curl. This drives a real
 * browser with an overridden timezone instead.
 *
 * Usage:
 *   npx next start -p 3000 &
 *   npm run check:tz
 *   npm run check:tz -- --port 4000 Asia/Dubai America/Sao_Paulo
 *
 * Playwright is intentionally NOT a dependency of this project — installing it
 * would pull a browser download into every `npm install` for the sake of one
 * diagnostic. Install it on demand:
 *   npm i -D playwright && npx playwright install chromium
 */

const HOST_ZONE = "America/Los_Angeles";

const DEFAULT_ZONES = [
  HOST_ZONE, // line is suppressed here by design
  "America/New_York",
  "America/Chicago",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata", // half-hour offset
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland", // furthest ahead; rolls to the next day
];

const args = process.argv.slice(2);
const portIndex = args.findIndex((a) => a === "--port" || a === "-p");
const port = portIndex === -1 ? 3000 : Number(args[portIndex + 1]);
const zones = args.filter((a, i) => !a.startsWith("-") && i !== portIndex + 1);
const ZONES = zones.length > 0 ? zones : DEFAULT_ZONES;

const url = `http://localhost:${port}/`;

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "Playwright is not installed. Run:\n" +
      "  npm i -D playwright && npx playwright install chromium\n",
  );
  process.exit(1);
}

try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
} catch {
  console.error(`No server responding at ${url}\n  npx next start -p ${port} &\n`);
  process.exit(1);
}

// Honours a pinned binary (CI images, sandboxes) but falls back to Playwright's own.
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;
const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });

let headline = null;
const problems = [];

console.log(`Checking ${url}\n`);

for (const timezoneId of ZONES) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 700 }, timezoneId });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  // The local line is set in an effect after hydration.
  await page.waitForTimeout(500);

  const found = await page.evaluate(() => {
    const paragraphs = [...document.querySelectorAll("p")].map((el) => el.textContent.trim());
    return {
      headline: paragraphs.find((t) => t.startsWith("Weekly @")) ?? null,
      local: paragraphs.find((t) => t.startsWith("(that's")) ?? null,
    };
  });
  await ctx.close();

  headline ??= found.headline;

  if (!found.headline) {
    problems.push(`${timezoneId}: no "Weekly @" headline rendered`);
  } else if (found.headline !== headline) {
    // The headline is always in the session's own zone, so it must not vary.
    problems.push(`${timezoneId}: headline differs — "${found.headline}" vs "${headline}"`);
  }

  if (timezoneId === HOST_ZONE) {
    // Suppressed on purpose: the headline already states the session's zone.
    if (found.local) problems.push(`${HOST_ZONE}: local line should be suppressed, got "${found.local}"`);
    console.log(`  ${timezoneId.padEnd(21)} (suppressed — same zone as the session)`);
  } else if (!found.local) {
    problems.push(`${timezoneId}: expected a visitor-local line, got none`);
    console.log(`  ${timezoneId.padEnd(21)} MISSING`);
  } else {
    console.log(`  ${timezoneId.padEnd(21)} ${found.local}`);
  }
}

await browser.close();

console.log(`\nHeadline (same in every zone): ${headline}`);

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(`\nOK — ${ZONES.length} zones checked.`);
