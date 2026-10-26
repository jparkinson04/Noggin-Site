import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-session";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/admin/sign-in", req.url), { status: 303 });
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
