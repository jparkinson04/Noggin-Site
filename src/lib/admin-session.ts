// The admin session: one shared password, a signed httpOnly cookie, nothing stored server-side.
// Signing uses Web Crypto so it runs in both the Node runtime and middleware (edge).

export const ADMIN_COOKIE = "noggin_admin";
const DAY = 86_400;
export const SESSION_SECONDS = 7 * DAY;

const enc = new TextEncoder();

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** "expires.signature": nothing personal in it, so there's nothing to leak. */
export async function createSession(secret: string): Promise<string> {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${expires}.${await hmac(secret, expires)}`;
}

export async function verifySession(secret: string | undefined, token: string | undefined): Promise<boolean> {
  if (!secret || !token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig) return false;
  if (Number(expires) < Math.floor(Date.now() / 1000)) return false;
  const expected = await hmac(secret, expires);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

/** Constant-time string compare for the password itself. */
export function passwordMatches(given: string, expected: string | undefined): boolean {
  if (!expected) return false;
  if (given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < given.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
