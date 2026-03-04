import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "efd_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET environment variable is not set");
  return secret;
}

/** Create an HMAC-signed token for the given username. */
export function createToken(username: string): string {
  const payload = `${username}:${Date.now()}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64")}.${sig}`;
}

/** Verify an HMAC-signed token. Returns true if valid. */
export function verifyToken(token: string): boolean {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return false;

    const payload = Buffer.from(payloadB64, "base64").toString();
    const expected = createHmac("sha256", getSecret())
      .update(payload)
      .digest("hex");

    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

/** Set the auth cookie after successful login. */
export function setAuthCookie(username: string): void {
  const token = createToken(username);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** Clear the auth cookie on logout. */
export function clearAuthCookie(): void {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

/** Check if the current request has a valid auth cookie. */
export function isAuthenticated(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

/** Verify the auth cookie from a raw cookie value (for middleware). */
export function verifyAuthCookie(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  return verifyToken(cookieValue);
}

export { COOKIE_NAME };
