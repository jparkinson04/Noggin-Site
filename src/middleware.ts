import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-session";

// Everything under /admin and /api/admin needs the admin cookie, except signing in.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/sign-in" || pathname === "/api/admin/sign-in") return NextResponse.next();
  const ok = await verifySession(process.env.ADMIN_SESSION_SECRET, req.cookies.get(ADMIN_COOKIE)?.value);
  if (ok) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const to = req.nextUrl.clone();
  to.pathname = "/admin/sign-in";
  to.search = "";
  return NextResponse.redirect(to);
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
