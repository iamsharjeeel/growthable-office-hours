import { buildIcs } from "@/lib/calendar";

/** Time-dependent (resolves the next session at request time), so never cached. */
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(buildIcs(), {
    headers: {
      // Served as a real text/calendar URL rather than a client-side blob so
      // iOS and Android hand it straight to the native calendar app.
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="growthable-office-hours.ics"',
      "Cache-Control": "no-store",
    },
  });
}
