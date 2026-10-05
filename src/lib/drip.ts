import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Book the Block drip — the follow-ups a deck request earns after the deck
 * itself (day 0, sent by /api/deck-download). Sent by /api/cron/follow-ups.
 *
 * Touch schedule (days since the request), each sent once, inside a bounded
 * window so a lead that ages past a window never gets a stale send:
 *   D3  — the TransUnion CES story
 *   D10 — find your window (tentpole weeks → inquiry)
 *   D21 — walk the block with us
 * Stops: inquiry submitted, status moved past new/qualified, or unsubscribed.
 */

export const SITE = "https://www.eastfremontdistrict.com";
export const FROM = "Book the Block <booktheblock@cornerbar.com>";
export const REPLY_TO = "booktheblock@cornerbar.com";
// Who signs the drips. Swap for a named person once Ryan decides.
export const SIGNATURE = "The F.E.E.D. Team · Corner Bar";

export type DripTouch = {
  type: "d3_transunion" | "d10_window" | "d21_walkthrough";
  minAge: number; // inclusive, days
  maxAge: number; // exclusive, days
  subject: string;
  html: (ctx: DripContext) => string;
  text: (ctx: DripContext) => string;
};

export type DripContext = {
  firstName: string | null;
  requestedOn: string; // e.g. "October 5, 2026"
  unsubscribeUrl: string;
};

function utm(path: string, content: string) {
  return `${SITE}${path}?utm_source=drip&utm_medium=email&utm_campaign=book-the-block&utm_content=${content}`;
}

function greeting(ctx: DripContext) {
  return ctx.firstName ? `Hi ${ctx.firstName},` : "Hi there,";
}

function wrap(body: string, ctx: DripContext) {
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0F1115; color: #F0EDE8; padding: 32px; border-radius: 8px;">
  ${body}
  <hr style="border: none; border-top: 1px solid #2A2D33; margin: 28px 0 16px;" />
  <p style="color: #6B6760; font-size: 11px; line-height: 1.6; margin: 0;">
    ${SIGNATURE}<br />
    East Fremont District &bull; 601 E. Bridger Ave., Las Vegas, NV 89101<br />
    You're receiving this because you requested the Book the Block deck from eastfremontdistrict.com on ${ctx.requestedOn}.
    <a href="${ctx.unsubscribeUrl}" style="color: #9B978F;">Unsubscribe</a>
  </p>
</div>`;
}

function footerText(ctx: DripContext) {
  return `
—
${SIGNATURE}
East Fremont District · 601 E. Bridger Ave., Las Vegas, NV 89101
You're receiving this because you requested the Book the Block deck from eastfremontdistrict.com on ${ctx.requestedOn}.
Unsubscribe: ${ctx.unsubscribeUrl}`;
}

const p = (s: string) =>
  `<p style="font-size: 14px; line-height: 1.7; color: #F0EDE8; margin: 0 0 16px;">${s}</p>`;
const h1 = (s: string) =>
  `<h1 style="color: #C49A6C; font-size: 20px; margin: 0 0 18px;">${s}</h1>`;
const cta = (href: string, label: string) =>
  `<a href="${href}" style="display: inline-block; background: #C49A6C; color: #0F1115; font-weight: 700; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; padding: 13px 24px; text-decoration: none; border-radius: 6px; margin-top: 4px;">${label}</a>`;

export const TOUCHES: DripTouch[] = [
  {
    type: "d3_transunion",
    minAge: 3,
    maxAge: 10,
    subject: "How TransUnion took the block for CES",
    html: (ctx) =>
      wrap(
        h1("Case in point: CES 2026") +
          p(greeting(ctx)) +
          p(
            "The deck shows what a takeover can be. Here's what one looked like. For CES 2026, TransUnion took the East Fremont District for three days: building wraps across the district, a street-level activation on Fremont, and rooftop receptions at Commonwealth.",
          ) +
          p("<strong style=\"color:#F0EDE8\">2,500+ guests. 4.1M brand impressions. One contract.</strong>") +
          p("Permits, production, security, F&amp;B and reporting all ran through one team, so theirs could focus on the guests.") +
          cta(utm("/case-studies/transunion-ces-2026", "d3"), "Read the case study"),
        ctx,
      ),
    text: (ctx) => `${greeting(ctx)}

The deck shows what a takeover can be. Here's what one looked like. For CES 2026, TransUnion took the East Fremont District for three days: building wraps across the district, a street-level activation on Fremont, and rooftop receptions at Commonwealth.

2,500+ guests. 4.1M brand impressions. One contract.

Permits, production, security, F&B and reporting all ran through one team, so theirs could focus on the guests.

Read the case study: ${utm("/case-studies/transunion-ces-2026", "d3")}
${footerText(ctx)}`,
  },
  {
    type: "d10_window",
    minAge: 10,
    maxAge: 21,
    subject: "Which week is yours?",
    html: (ctx) =>
      wrap(
        h1("Let's find your window") +
          p(greeting(ctx)) +
          p(
            "Tentpole weeks like CES and F1 get claimed a year or more in advance, as conventions lock their event dates early. If there's a week on your calendar where Las Vegas matters, now is the time to put a hold on it.",
          ) +
          p(
            "Tell us your goals and dates and we'll come back within five business days with an activation tier, a footprint on the block, and an indicative budget. No commitment on your side.",
          ) +
          cta(utm("/inquire", "d10"), "Start your inquiry") +
          p(`<span style="color:#9B978F; font-size:13px;">Or just reply to this email with your window.</span>`),
        ctx,
      ),
    text: (ctx) => `${greeting(ctx)}

Tentpole weeks like CES and F1 get claimed a year or more in advance, as conventions lock their event dates early. If there's a week on your calendar where Las Vegas matters, now is the time to put a hold on it.

Tell us your goals and dates and we'll come back within five business days with an activation tier, a footprint on the block, and an indicative budget. No commitment on your side.

Start your inquiry: ${utm("/inquire", "d10")}
Or just reply to this email with your window.
${footerText(ctx)}`,
  },
  {
    type: "d21_walkthrough",
    minAge: 21,
    maxAge: 36,
    subject: "Walk the block with us",
    html: (ctx) =>
      wrap(
        h1("See it in person") +
          p(greeting(ctx)) +
          p(
            "The deck gives you the numbers. The block is something you have to stand on. If you or anyone on your team is coming through Las Vegas, we'd like to walk you through the district: the venues, the rooftops, where the stages go, how the street closes.",
          ) +
          p("Thirty minutes, any day you're in town. Reply with your dates and we'll set it up.") +
          cta(utm("/inquire", "d21"), "Tell us your dates"),
        ctx,
      ),
    text: (ctx) => `${greeting(ctx)}

The deck gives you the numbers. The block is something you have to stand on. If you or anyone on your team is coming through Las Vegas, we'd like to walk you through the district: the venues, the rooftops, where the stages go, how the street closes.

Thirty minutes, any day you're in town. Reply with your dates and we'll set it up.

Tell us your dates: ${utm("/inquire", "d21")}
${footerText(ctx)}`,
  },
];

// ── Unsubscribe tokens ──────────────────────────────────────────────────
// The link in every drip is /api/unsubscribe?id=<lead id>&t=<token>, where the
// token is an HMAC of the lead id, so nobody can unsubscribe someone else.

function secret() {
  return process.env.UNSUBSCRIBE_SECRET || process.env.CRON_SECRET || "efd-cron-2026";
}

export function unsubscribeToken(leadId: string): string {
  return createHmac("sha256", secret()).update(leadId).digest("hex").slice(0, 32);
}

export function verifyUnsubscribeToken(leadId: string, token: string): boolean {
  const expected = Buffer.from(unsubscribeToken(leadId));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function unsubscribeUrl(leadId: string): string {
  return `${SITE}/api/unsubscribe?id=${encodeURIComponent(leadId)}&t=${unsubscribeToken(leadId)}`;
}

export function firstNameOf(contactName: string | null | undefined): string | null {
  const first = contactName?.trim().split(/\s+/)[0];
  return first && first.length > 1 ? first : null;
}
