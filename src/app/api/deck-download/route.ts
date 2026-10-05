import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { insertLead } from "@/lib/leads";
import { readAttribution, describeAttribution } from "@/lib/attribution";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  return new Resend(apiKey);
}

// The Book the Block deck (F.E.E.D. · Corner Bar, Aug 2026). Hosted on www —
// the apex 307s to it and some mail clients drop the redirect.
const DECK_URL = "https://www.eastfremontdistrict.com/FEED-BookTheBlock-Deck.pdf";

export async function POST(request: NextRequest) {
  try {
    const { email, organizationName, contactName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // First-touch campaign attribution (e.g. the LVCVA email), from the
    // cookie AttributionCapture set on landing.
    const attr = readAttribution(request);

    // Create lead in efd_leads
    try {
      const { error } = await insertLead(
        {
          source: "deck-download",
          status: "new",
          email,
          organization_name: organizationName || null,
          contact_name: contactName || null,
        },
        attr,
      );
      if (error) console.error("efd_leads insert error:", error);
    } catch (err) {
      console.error("Supabase error:", err);
    }

    // Send deck via email. Sender must be on cornerbar.com — the Resend key
    // is scoped to that domain (see project notes on domain-scoped keys).
    try {
      await getResend().emails.send({
        from: "Book the Block <booktheblock@cornerbar.com>",
        to: email,
        replyTo: "booktheblock@cornerbar.com",
        subject: "Your Book the Block deck — East Fremont District",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0F1115; color: #F0EDE8; padding: 32px; border-radius: 8px;">
            <h1 style="color: #C49A6C; font-size: 22px; margin-bottom: 8px;">
              Book the Block
            </h1>
            <p style="color: #9B978F; font-size: 14px; margin-bottom: 24px;">
              A full-district takeover of Fremont East
            </p>
            <p style="color: #F0EDE8; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
              Here's the deck you requested: one block of Downtown Las Vegas, thirteen venues, one operator, one contract.
            </p>
            <a href="${DECK_URL}" style="display: inline-block; background: #C49A6C; color: #0F1115; font-weight: 700; font-size: 14px; padding: 14px 28px; text-decoration: none; border-radius: 6px;">
              Download Deck (PDF)
            </a>
            <p style="color: #9B978F; font-size: 13px; line-height: 1.6; margin-top: 32px;">
              Have dates in mind? Reply to this email with your window and goals, or start an inquiry at
              <a href="https://www.eastfremontdistrict.com/inquire" style="color: #C49A6C;">eastfremontdistrict.com/inquire</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #2A2D33; margin: 24px 0;" />
            <p style="color: #6B6760; font-size: 11px;">
              The F.E.E.D. Team &middot; Corner Bar<br />
              East Fremont District &bull; 601 E. Bridger Ave., Las Vegas, NV 89101
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.error("Resend error:", err);
    }

    // Notify CBM team
    try {
      await getResend().emails.send({
        from: "F.E.E.D. Deck Requests <booktheblock@cornerbar.com>",
        to: "booktheblock@cornerbar.com",
        bcc: "keith@gorunrabbit.com",
        replyTo: email,
        subject: `Deck Request: ${organizationName || email}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 500px; background: #0F1115; color: #F0EDE8; padding: 24px; border-radius: 8px;">
            <p style="color: #C49A6C; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Deck Requested</p>
            <p style="font-size: 14px;"><strong>Email:</strong> ${email}</p>
            ${organizationName ? `<p style="font-size: 14px;"><strong>Organization:</strong> ${organizationName}</p>` : ""}
            ${contactName ? `<p style="font-size: 14px;"><strong>Contact:</strong> ${contactName}</p>` : ""}
            ${attr ? `<p style="font-size: 14px;"><strong>Source:</strong> ${describeAttribution(attr)}</p>` : ""}
            <p style="color: #6B6760; font-size: 12px; margin-top: 16px;">
              ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.error("Notification email error:", err);
    }

    return NextResponse.json({
      success: true,
      deckUrl: DECK_URL,
    });
  } catch (error) {
    console.error("Deck download error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
