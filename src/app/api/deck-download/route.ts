import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  return new Resend(apiKey);
}

const DECK_URL = "https://eastfremontdistrict.com/FeedTheBlock-RetailSponsorship-2026.pdf";

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

    // Create lead in efd_leads
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("efd_leads").insert({
        source: "deck-download",
        status: "new",
        email,
        organization_name: organizationName || null,
        contact_name: contactName || null,
      });
      if (error) console.error("efd_leads insert error:", error);
    } catch (err) {
      console.error("Supabase error:", err);
    }

    // Send deck via email
    try {
      await getResend().emails.send({
        from: "East Fremont District <inquiries@cornerbarmgmt.com>",
        to: email,
        subject: "Feed the Block — 2026 Retail Sponsorship Deck",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0F1115; color: #F0EDE8; padding: 32px; border-radius: 8px;">
            <h1 style="color: #C49A6C; font-size: 22px; margin-bottom: 8px;">
              Feed the Block
            </h1>
            <p style="color: #9B978F; font-size: 14px; margin-bottom: 24px;">
              2026 Retail Sponsorship Opportunities
            </p>
            <p style="color: #F0EDE8; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
              Thanks for your interest in Feed the Block. Here's the sponsorship deck you requested.
            </p>
            <a href="${DECK_URL}" style="display: inline-block; background: #C49A6C; color: #0F1115; font-weight: 700; font-size: 14px; padding: 14px 28px; text-decoration: none; border-radius: 6px;">
              Download Deck (PDF)
            </a>
            <p style="color: #9B978F; font-size: 13px; line-height: 1.6; margin-top: 32px;">
              Interested in a partnership? Reply to this email or reach out to
              <a href="mailto:booktheblock@cornerbar.com" style="color: #C49A6C;">booktheblock@cornerbar.com</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #2A2D33; margin: 24px 0;" />
            <p style="color: #6B6760; font-size: 11px;">
              Corner Bar + Wynn Las Vegas<br />
              East Fremont District &bull; Las Vegas
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
        from: "F.E.E.D. Deck Downloads <inquiries@cornerbarmgmt.com>",
        to: "booktheblock@cornerbar.com",
        subject: `Deck Download: ${organizationName || email}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 500px; background: #0F1115; color: #F0EDE8; padding: 24px; border-radius: 8px;">
            <p style="color: #C49A6C; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Deck Downloaded</p>
            <p style="font-size: 14px;"><strong>Email:</strong> ${email}</p>
            ${organizationName ? `<p style="font-size: 14px;"><strong>Organization:</strong> ${organizationName}</p>` : ""}
            ${contactName ? `<p style="font-size: 14px;"><strong>Contact:</strong> ${contactName}</p>` : ""}
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
