import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import {
  TOUCHES,
  FROM,
  REPLY_TO,
  unsubscribeUrl,
  firstNameOf,
  type DripContext,
} from "@/lib/drip";

// Book the Block drip. Runs daily (vercel.json). For every deck-request lead
// still in play, sends the one touch whose window matches the lead's age and
// hasn't been sent yet. See src/lib/drip.ts for the schedule and copy.

const CRON_SECRET = process.env.CRON_SECRET || "efd-cron-2026";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  return new Resend(apiKey);
}

function daysBetween(dateStr: string): number {
  const created = new Date(dateStr);
  return Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
}

type Lead = {
  id: string;
  email: string;
  organization_name: string | null;
  contact_name: string | null;
  created_at: string;
};

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const resend = getResend();

  // Deck-request leads still in play: not moved along the pipeline, not
  // unsubscribed. Anything older than the last window is ignored by the
  // age check below, so a backlog never gets blasted.
  const { data: leads, error } = await supabase
    .from("efd_leads")
    .select("id, email, organization_name, contact_name, created_at")
    .eq("source", "deck-download")
    .in("status", ["new", "qualified"])
    .is("unsubscribed_at", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!leads || leads.length === 0) {
    return NextResponse.json({ message: "No follow-ups needed", checked: 0, sent: {} });
  }

  const sent: Record<string, number> = {};
  let stopped = 0;

  for (const lead of leads as Lead[]) {
    const age = daysBetween(lead.created_at);
    const touch = TOUCHES.find((t) => age >= t.minAge && age < t.maxAge);
    if (!touch) continue;

    const { data: activities } = await supabase
      .from("efd_lead_activity")
      .select("action, details")
      .eq("lead_id", lead.id);

    const types = new Set(
      (activities || []).map((a: { details: { type?: string } | null }) => a.details?.type),
    );
    if (types.has(touch.type)) continue;
    if (types.has("drip_stopped")) continue;

    // Stop the drip once they've inquired — the inquiry form writes its own
    // efd_leads row, so look for one under the same email.
    const { data: inquiries } = await supabase
      .from("efd_leads")
      .select("id")
      .eq("source", "website")
      .ilike("email", lead.email)
      .limit(1);

    if (inquiries && inquiries.length > 0) {
      await supabase.from("efd_lead_activity").insert({
        lead_id: lead.id,
        action: "note_added",
        details: { type: "drip_stopped", reason: "inquiry_submitted", inquiry_id: inquiries[0].id },
      });
      stopped++;
      continue;
    }

    const ctx: DripContext = {
      firstName: firstNameOf(lead.contact_name),
      requestedOn: new Date(lead.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "America/Los_Angeles",
      }),
      unsubscribeUrl: unsubscribeUrl(lead.id),
    };

    try {
      const { error: sendError } = await resend.emails.send({
        from: FROM,
        to: lead.email,
        replyTo: REPLY_TO,
        bcc: "keith@gorunrabbit.com",
        subject: touch.subject,
        html: touch.html(ctx),
        text: touch.text(ctx),
        headers: {
          "List-Unsubscribe": `<${ctx.unsubscribeUrl}>, <mailto:booktheblock@cornerbar.com?subject=unsubscribe>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
      if (sendError) {
        console.error(`${touch.type} failed for ${lead.email}:`, sendError);
        continue;
      }

      await supabase.from("efd_lead_activity").insert({
        lead_id: lead.id,
        action: "email_sent",
        details: { type: touch.type, subject: touch.subject },
      });
      await supabase
        .from("efd_leads")
        .update({ last_contacted_at: new Date().toISOString() })
        .eq("id", lead.id);

      sent[touch.type] = (sent[touch.type] ?? 0) + 1;
    } catch (err) {
      console.error(`${touch.type} failed for ${lead.email}:`, err);
    }
  }

  return NextResponse.json({
    message: "Follow-ups processed",
    checked: leads.length,
    sent,
    stopped,
  });
}
