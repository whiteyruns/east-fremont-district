import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "efd_session";

/** Public routes that don't require authentication. */
const PUBLIC_PATHS = new Set(["/", "/login", "/privacy", "/terms"]);

/** Path prefixes that are always public. */
const PUBLIC_PREFIXES = ["/api/", "/_next/", "/images/", "/video/", "/fonts/"];

async function verifyToken(token: string, secret: string): Promise<boolean> {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return false;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const payload = atob(payloadB64);
    const signature = await crypto.subtle.sign("HMAC", key, enc.encode(payload));

    // Convert ArrayBuffer to hex
    const expected = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return expected === sig;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();

  // Allow public prefixes (static assets, API routes)
  if (PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow static files (favicon, manifest, etc.)
  if (pathname.includes(".")) return NextResponse.next();

  // Check auth cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.AUTH_SECRET;

  if (token && secret && (await verifyToken(token, secret))) {
    return NextResponse.next();
  }

  // Redirect to login with return URL
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
