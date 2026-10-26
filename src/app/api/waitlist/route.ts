import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { clientKey, rateLimit } from "@/lib/rate-limit";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCES = new Set(["hero", "footer", "quiz", "teams", "waitlist"]);

/** POST { email, marketingConsent, source?, engine? } — one row per email; joining twice just updates it. */
export async function POST(req: Request) {
  if (!rateLimit(`waitlist:${clientKey(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many tries. Give it ten minutes." }, { status: 429 });
  }
  let body: { email?: string; marketingConsent?: boolean; source?: string; engine?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Send JSON." }, { status: 400 });
  }
  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) return NextResponse.json({ error: "That doesn’t look like an email address." }, { status: 400 });
  const source = body.source && SOURCES.has(body.source) ? body.source : "waitlist";
  const engine = typeof body.engine === "string" && body.engine.length <= 40 ? body.engine : null;

  const db = supabaseAdmin();
  const { data: existing } = await db.from("waitlist").select("id").ilike("email", email).maybeSingle();
  const row = { email, marketing_consent: !!body.marketingConsent, source, ...(engine ? { engine } : {}) };
  const { error } = existing ? await db.from("waitlist").update(row).eq("id", existing.id) : await db.from("waitlist").insert(row);
  if (error) {
    console.error("waitlist insert failed:", error.code); // the code only; never the row
    return NextResponse.json({ error: "Something went wrong. Try again in a moment." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, alreadyOn: !!existing });
}
