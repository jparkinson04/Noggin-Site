import { NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_SECONDS, createSession, passwordMatches } from "@/lib/admin-session";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/** POST { password } — sets the admin cookie for a week. */
export async function POST(req: Request) {
  if (!rateLimit(`admin:${clientKey(req)}`, 5, 15 * 60_000)) {
    return NextResponse.json({ error: "Too many tries. Wait fifteen minutes." }, { status: 429 });
  }
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "Admin isn’t set up on this deployment." }, { status: 503 });
  if (!passwordMatches(password ?? "", process.env.ADMIN_PASSWORD)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await createSession(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return res;
}
