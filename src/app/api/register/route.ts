import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.name || !body?.email || !body?.phone) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    await new Promise((r) => setTimeout(r, 450));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
