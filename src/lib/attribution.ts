import type { NextRequest } from "next/server";

/**
 * First-touch attribution for leads.
 *
 * `AttributionCapture` (client, mounted in the root layout) reads utm_* / ref
 * params off the landing URL and stores them in a 90-day cookie. API routes
 * that write to efd_leads read that cookie back with `readAttribution` and
 * stamp the lead, so a visitor who arrives from the LVCVA email and inquires
 * days later is still credited to it. First touch wins — the cookie is never
 * overwritten once set.
 */

export const ATTRIBUTION_COOKIE = "efd_attr";
export const ATTRIBUTION_MAX_AGE = 60 * 60 * 24 * 90; // 90 days, in seconds

export type Attribution = {
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  landingPath: string;
  firstTouchAt: string; // ISO timestamp
};

const MAX_LEN = 100;

function clean(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim().slice(0, MAX_LEN);
  return s || undefined;
}

export function parseAttribution(raw: string | null | undefined): Attribution | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(decodeURIComponent(raw));
    const source = clean(obj?.source);
    if (!source) return null;
    return {
      source,
      medium: clean(obj.medium),
      campaign: clean(obj.campaign),
      content: clean(obj.content),
      landingPath: clean(obj.landingPath) || "/",
      firstTouchAt: clean(obj.firstTouchAt) || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/** Read the first-touch cookie from an API request. */
export function readAttribution(request: NextRequest): Attribution | null {
  return parseAttribution(request.cookies.get(ATTRIBUTION_COOKIE)?.value);
}

/** The efd_leads columns added in migration 009, ready to spread into an insert. */
export function attributionColumns(attr: Attribution | null): Record<string, string | null> {
  if (!attr) return {};
  return {
    utm_source: attr.source,
    utm_medium: attr.medium ?? null,
    utm_campaign: attr.campaign ?? null,
    utm_content: attr.content ?? null,
    landing_path: attr.landingPath,
    first_touch_at: attr.firstTouchAt,
  };
}

/** One-line summary for notification emails, e.g. "lvcva · email · book-the-block (first touch Oct 5, 2026 on /inquire)". */
export function describeAttribution(attr: Attribution): string {
  const parts = [attr.source, attr.medium, attr.campaign, attr.content].filter(Boolean);
  const when = new Date(attr.firstTouchAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  });
  return `${parts.join(" · ")} (first touch ${when} on ${attr.landingPath})`;
}
