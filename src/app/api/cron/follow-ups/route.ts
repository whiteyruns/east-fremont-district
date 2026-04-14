import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

const CRON_SECRET = process.env.CRON_SECRET || "efd-cron-2026";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  return new Resend(apiKey);
}

function daysBetween(dateStr: string): number {
  const created = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
}

const DAY2_SUBJECT = "Did you get a chance to review the Feed the Block deck?";
const DAY2_HTML = `
<div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0F1115; color: #F0EDE8; padding: 32px; border-radius: 8px;">
  <h1 style="color: #C49A6C; font-size: 20px; margin-bottom: 16px;">Quick follow-up</h1>
  <p style="font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
    Just checking in — did you get a chance to look through the Feed the Block sponsorship deck we sent over?
  </p>
  <p style="font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
    We're heading into our busiest season with 9 events remaining in 2026. A few category exclusive
    slots are still available, but they tend to go fast once conversations start.
  </p>
  <p style="font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
    If you have any questions or want to talk through what an activation could look like for your brand,
    just reply to this email — happy to jump on a quick call.
  </p>
  <a href="https://eastfremontdistrict.com/FeedTheBlock-RetailSponsorship-2026.pdf"
     style="display: inline-block; background: #C49A6C; color: #0F1115; font-weight: 700; font-size: 14px; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
    Re-download Deck
  </a>
  <hr style="border: none; border-top: 1px solid #2A2D33; margin: 24px 0;" />
  <p style="color: #6B6760; font-size: 11px;">
    Mauricio Morales — VP of Marketing and Events<br />
    Corner Bar Management + Wynn Las Vegas<br />
    partnerships@feedtheblock.com
  </p>
</div>
`;

const DAY7_SUBJECT = "Would you like to schedule a walkthrough of East Fremont?";
const DAY7_HTML = `
<div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #0F1115; color: #F0EDE8; padding: 32px; border-radius: 8px;">
  <h1 style="color: #C49A6C; font-size: 20px; margin-bottom: 16px;">See it in person</h1>
  <p style="font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
    The deck gives you the numbers, but East Fremont is really something you have to experience.
    Walking the block, seeing the venues, understanding the flow — it clicks differently in person.
  </p>
  <p style="font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
    If you or anyone on your team is going to be in Vegas, we'd love to do a quick 30-minute walkthrough
    of the district. We can show you the activation zones, talk through logistics, and map out
    what your brand's footprint could look like.
  </p>
  <p style="font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
    No pressure — just reply with your availability and we'll make it happen.
  </p>
  <a href="https://eastfremontdistrict.com/inquire"
     style="display: inline-block; background: #C49A6C; color: #0F1115; font-weight: 700; font-size: 14px; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
    Submit an Inquiry
  </a>
  <hr style="border: none; border-top: 1px solid #2A2D33; margin: 24px 0;" />
  <p style="color: #6B6760; font-size: 11px;">
    Mauricio Morales — VP of Marketing and Events<br />
    Corner Bar Management + Wynn Las Vegas<br />
    partnerships@feedtheblock.com
  </p>
</div>
`;

export async function GET(request: NextRequest) {
  // Verify cron secret
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const resend = getResend();

  // Get all deck-download leads that haven't been followed up
  const { data: leads, error } = await supabase
    .from("efd_leads")
    .select("id, email, organization_name, contact_name, created_at")
    .eq("source", "deck-download")
    .in("status", ["new", "qualified"]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!leads || leads.length === 0) {
    return NextResponse.json({ message: "No follow-ups needed", sent: 0 });
  }

  let day2Sent = 0;
  let day7Sent = 0;

  for (const lead of leads) {
    const age = daysBetween(lead.created_at);

    // Check what follow-ups have already been sent
    const { data: activities } = await supabase
      .from("efd_lead_activity")
      .select("action, details")
      .eq("lead_id", lead.id)
      .eq("action", "email_sent");

    const sentTypes = (activities || []).map(
      (a: { details: { type?: string } }) => a.details?.type
    );

    // Day 2 follow-up (send between day 2-6)
    if (age >= 2 && age < 7 && !sentTypes.includes("day2_followup")) {
      try {
        await resend.emails.send({
          from: "East Fremont District <inquiries@cornerbarmgmt.com>",
          to: lead.email,
          replyTo: "partnerships@feedtheblock.com",
          subject: DAY2_SUBJECT,
          html: DAY2_HTML,
        });

        await supabase.from("efd_lead_activity").insert({
          lead_id: lead.id,
          action: "email_sent",
          details: { type: "day2_followup", subject: DAY2_SUBJECT },
        });

        // Update last_contacted_at
        await supabase
          .from("efd_leads")
          .update({ last_contacted_at: new Date().toISOString() })
          .eq("id", lead.id);

        day2Sent++;
      } catch (err) {
        console.error(`Day 2 follow-up failed for ${lead.email}:`, err);
      }
    }

    // Day 7 follow-up (send between day 7-14)
    if (age >= 7 && age < 14 && !sentTypes.includes("day7_followup")) {
      try {
        await resend.emails.send({
          from: "East Fremont District <inquiries@cornerbarmgmt.com>",
          to: lead.email,
          replyTo: "partnerships@feedtheblock.com",
          subject: DAY7_SUBJECT,
          html: DAY7_HTML,
        });

        await supabase.from("efd_lead_activity").insert({
          lead_id: lead.id,
          action: "email_sent",
          details: { type: "day7_followup", subject: DAY7_SUBJECT },
        });

        await supabase
          .from("efd_leads")
          .update({ last_contacted_at: new Date().toISOString() })
          .eq("id", lead.id);

        day7Sent++;
      } catch (err) {
        console.error(`Day 7 follow-up failed for ${lead.email}:`, err);
      }
    }
  }

  return NextResponse.json({
    message: "Follow-ups processed",
    checked: leads.length,
    day2Sent,
    day7Sent,
  });
}
