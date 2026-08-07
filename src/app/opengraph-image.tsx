import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SESSION } from "@/lib/session-config";
import { formatSessionDuration, formatSessionHeadline, getNextSessionDate } from "@/lib/session";

export const alt = "Growthable Office Hours — live product walkthroughs every week";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card, styled with the same brand tokens as the page. Regenerated per
 * request so the session date on the card matches the page — a stale date in a
 * Meta ad preview is worse than no card at all.
 *
 * Satori (which renders this) requires an explicit `display` on any element
 * with more than one child, and does not support the page's CSS. Keep every
 * container flex and every text node a single interpolated string.
 *
 * TYPEFACE: this renders in Satori's default sans, not Poppins, because Satori
 * cannot use next/font — it needs raw font bytes. To put the card in the brand
 * face, drop Poppins-Regular.ttf and Poppins-ExtraBold.ttf into `assets/` and
 * add to the ImageResponse options below:
 *
 *   fonts: [
 *     { name: "Poppins", data: await readFile(join(process.cwd(), "assets/Poppins-Regular.ttf")),   weight: 400, style: "normal" },
 *     { name: "Poppins", data: await readFile(join(process.cwd(), "assets/Poppins-ExtraBold.ttf")), weight: 800, style: "normal" },
 *   ]
 *
 * ...then set `fontFamily: "Poppins"` on the root div. Colours, layout and the
 * logo are already brand-correct, so this is purely a type refinement.
 */
export const dynamic = "force-dynamic";

// Brand tokens, kept literal — this renders outside the CSS pipeline.
const PAPER = "#fbfaf8";
const INK = "#25313d";
const SLATE_DEEP = "#34475b";
const BRAND = "#f03e6a";
const BRAND_TINT = "#fdedf1";
const LINE = "#e4e2dc";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/growthable-logo-dark.png"));
  const subline = `${formatSessionHeadline(getNextSessionDate())} · ${formatSessionDuration()} · Hosted by ${SESSION.host}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "70px 80px",
        }}
      >
        {/* Blurred brand-tint orb, mirroring the hero */}
        <div
          style={{
            position: "absolute",
            top: -240,
            right: -190,
            width: 640,
            height: 640,
            borderRadius: 999,
            background: BRAND_TINT,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 56, height: 3, background: BRAND, marginRight: 18 }} />
            <div
              style={{
                display: "flex",
                fontSize: 23,
                letterSpacing: 4,
                color: BRAND,
                fontWeight: 600,
              }}
            >
              JOIN OUR OFFICE HOURS
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 26,
              fontSize: 82,
              lineHeight: 1.06,
              fontWeight: 800,
              letterSpacing: -2.5,
              color: SLATE_DEEP,
            }}
          >
            <div style={{ display: "flex" }}>Live Product Walkthroughs,</div>
            <div style={{ display: "flex", color: BRAND }}>Every Week</div>
          </div>

          <div style={{ display: "flex", width: 132, height: 8, borderRadius: 999, background: BRAND, marginTop: 26 }} />

          <div style={{ display: "flex", marginTop: 26, fontSize: 28, color: INK }}>{subline}</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${LINE}`,
            paddingTop: 30,
          }}
        >
          <img
            src={`data:image/png;base64,${logo.toString("base64")}`}
            alt=""
            width={250}
            height={51}
          />
          <div style={{ display: "flex", fontSize: 25, color: INK }}>
            No fixed agenda — come see what&apos;s live.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
