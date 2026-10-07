import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { FROM, REPLY_TO } from "@/lib/drip";
import { TOUR_DATES } from "@/lib/block-tour";

// Weekly Book the Block summary for the team (Mauricio asked for it Oct 7):
// every lead from the past seven days with where it came from, deck requests
// vs inquiries, drip sends, unsubscribes, tour RSVPs, and the campaign-to-date
// pipeline. Runs Monday mornings (vercel.json). Page views and video plays
// live in GA4, which this doesn't query; the email links there instead.

const CRON_SECRET = process.env.CRON_SECRET || "efd-cron-2026";
const TO = "booktheblock@cornerbar.com";
const CC = ["mauricio@cornerbar.com"];
const BCC = "keith@gorunrabbit.com";
const DAYS = 7;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  return new Resend(apiKey);
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });
}

type Lead = {
  id: string;
  source: string;
  status: string;
  organization_name: string | null;
  contact_name: string | null;
  email: string;
  event_type: string | null;
  estimated_guest_count: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  created_at: string;
  unsubscribed_at: string | null;
};

type Rsvp = {
  name: string;
  company: string;
  email: string;
  tour_date: string;
  party_size: number;
  opt_in: boolean;
  utm_source: string | null;
};

function tally<T>(rows: T[], key: (r: T) => string): [string, number][] {
  const m = new Map<string, number>();
  for (const r of rows) m.set(key(r), (m.get(key(r)) ?? 0) + 1);
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
}

const sourceLabel = (s: string | null) => s ?? "direct / untagged";
const kindLabel = (s: string) => (s === "deck-download" ? "Deck request" : s === "website" ? "Inquiry" : s);

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("secret") !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const since = new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000);
  const sinceIso = since.toISOString();

  const { data: weekLeads, error: leadsErr } = await supabase
    .from("efd_leads")
    .select(
      "id, source, status, organization_name, contact_name, email, event_type, estimated_guest_count, utm_source, utm_medium, utm_campaign, utm_content, created_at, unsubscribed_at",
    )
    .gte("created_at", sinceIso)
    .order("created_at", { ascending: false });
  if (leadsErr) {
    return NextResponse.json({ error: leadsErr.message }, { status: 500 });
  }
  const leads = (weekLeads ?? []) as Lead[];

  const { data: sends } = await supabase
    .from("efd_lead_activity")
    .select("details, created_at")
    .eq("action", "email_sent")
    .gte("created_at", sinceIso);
  const dripSends = (sends ?? []) as { details: { type?: string } | null }[];

  const { data: unsubs } = await supabase
    .from("efd_leads")
    .select("id")
    .gte("unsubscribed_at", sinceIso);

  // Campaign to date: everything that arrived tagged book-the-block, plus
  // anything untagged that came through the deck gate (the gate only exists
  // on the Book the Block pages).
  const { data: allLeads } = await supabase
    .from("efd_leads")
    .select("id, source, status, utm_source, utm_campaign")
    .or("utm_campaign.eq.book-the-block,source.eq.deck-download");
  const campaign = (allLeads ?? []) as Pick<Lead, "id" | "source" | "status" | "utm_source" | "utm_campaign">[];

  // Tour RSVPs: the table may not exist until migration 011 runs.
  let rsvps: Rsvp[] = [];
  try {
    const { data } = await supabase
      .from("block_tour_rsvps")
      .select("name, company, email, tour_date, party_size, opt_in, utm_source")
      .gte("created_at", sinceIso)
      .order("tour_date");
    rsvps = (data ?? []) as Rsvp[];
  } catch {
    rsvps = [];
  }

  const deckRequests = leads.filter((l) => l.source === "deck-download").length;
  const inquiries = leads.filter((l) => l.source === "website").length;
  const bySource = tally(leads, (l) => sourceLabel(l.utm_source));
  const byTouch = tally(dripSends, (s) => s.details?.type ?? "unknown");
  const campaignBySource = tally(campaign, (l) => sourceLabel(l.utm_source));
  const campaignByStatus = tally(campaign, (l) => l.status);
  const unsubscribes = unsubs?.length ?? 0;
  const windowLabel = `${fmtDate(since)}–${fmtDate(new Date())}`;

  const headline = leads.length === 0 && rsvps.length === 0
    ? "A quiet week: no new leads."
    : `${leads.length} new lead${leads.length === 1 ? "" : "s"}` +
      (rsvps.length ? `, ${rsvps.length} tour RSVP${rsvps.length === 1 ? "" : "s"}` : "") +
      ".";

  const stat = (n: number | string, label: string) =>
    `<td style="padding:14px 16px;background:#15181E;border:1px solid #2A2D33;text-align:center;">
      <div style="font-size:28px;font-weight:300;color:#F0EDE8;">${n}</div>
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#9B978F;margin-top:4px;">${label}</div>
    </td>`;

  const h2 = (t: string) =>
    `<h2 style="margin:28px 0 10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#C49A6C;font-weight:700;">${t}</h2>`;

  const tallyRows = (rows: [string, number][], empty: string) =>
    rows.length
      ? rows
          .map(
            ([k, n]) =>
              `<tr><td style="padding:6px 0;color:#F0EDE8;font-size:14px;border-bottom:1px solid #1A1D23;">${esc(k)}</td><td style="padding:6px 0;color:#F0EDE8;font-size:14px;text-align:right;border-bottom:1px solid #1A1D23;">${n}</td></tr>`,
          )
          .join("")
      : `<tr><td style="padding:6px 0;color:#6B6760;font-size:14px;">${empty}</td></tr>`;

  const leadRows = leads.length
    ? leads
        .map((l) => {
          const who = [l.contact_name, l.organization_name].filter(Boolean).join(", ") || l.email;
          const what = [kindLabel(l.source), l.event_type, l.estimated_guest_count ? `${l.estimated_guest_count} guests` : null]
            .filter(Boolean)
            .join(" · ");
          const src = [l.utm_source, l.utm_medium, l.utm_content].filter(Boolean).join(" · ") || "direct / untagged";
          return `<tr>
            <td style="padding:8px 0;border-bottom:1px solid #1A1D23;vertical-align:top;">
              <div style="color:#F0EDE8;font-size:14px;">${esc(who)}</div>
              <div style="color:#9B978F;font-size:12px;">${esc(what)}</div>
            </td>
            <td style="padding:8px 0 8px 12px;border-bottom:1px solid #1A1D23;vertical-align:top;text-align:right;white-space:nowrap;">
              <div style="color:#C49A6C;font-size:12px;">${esc(src)}</div>
              <div style="color:#6B6760;font-size:12px;">${fmtDate(l.created_at)}</div>
            </td>
          </tr>`;
        })
        .join("")
    : `<tr><td style="padding:6px 0;color:#6B6760;font-size:14px;">None this week.</td></tr>`;

  const rsvpRows = rsvps.length
    ? rsvps
        .map((r) => {
          const date = TOUR_DATES.find((d) => d.iso === r.tour_date)?.short ?? r.tour_date;
          return `<tr>
            <td style="padding:8px 0;border-bottom:1px solid #1A1D23;vertical-align:top;">
              <div style="color:#F0EDE8;font-size:14px;">${esc(r.name)}, ${esc(r.company)}</div>
              <div style="color:#9B978F;font-size:12px;">${esc(r.email)}${r.party_size > 1 ? ` · party of ${r.party_size}` : ""}${r.opt_in ? " · opted in" : ""}</div>
            </td>
            <td style="padding:8px 0 8px 12px;border-bottom:1px solid #1A1D23;vertical-align:top;text-align:right;white-space:nowrap;color:#C49A6C;font-size:12px;">${esc(date)}</td>
          </tr>`;
        })
        .join("")
    : "";

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0F1115;color:#F0EDE8;padding:32px;border-radius:8px;">
      <div style="color:#C49A6C;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Book the Block · weekly summary · ${windowLabel}</div>
      <h1 style="color:#F0EDE8;font-size:24px;font-weight:300;margin:0 0 20px;">${headline}</h1>
      <table style="width:100%;border-collapse:separate;border-spacing:6px 0;margin:0 -6px;"><tr>
        ${stat(inquiries, "Inquiries")}
        ${stat(deckRequests, "Deck requests")}
        ${stat(dripSends.length, "Drip sends")}
        ${stat(unsubscribes, "Unsubscribes")}
      </tr></table>

      ${h2("New leads")}
      <table style="width:100%;border-collapse:collapse;">${leadRows}</table>

      ${h2("Where they came from")}
      <table style="width:100%;border-collapse:collapse;">${tallyRows(bySource, "No leads this week.")}</table>

      ${rsvps.length ? h2("Block tour RSVPs") + `<table style="width:100%;border-collapse:collapse;">${rsvpRows}</table>` : ""}

      ${byTouch.length ? h2("Drip touches sent") + `<table style="width:100%;border-collapse:collapse;">${tallyRows(byTouch, "")}</table>` : ""}

      ${h2("Campaign to date")}
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#9B978F;font-size:12px;letter-spacing:1px;text-transform:uppercase;" colspan="2">By source · ${campaign.length} lead${campaign.length === 1 ? "" : "s"}</td></tr>
        ${tallyRows(campaignBySource, "Nothing yet.")}
        <tr><td style="padding:14px 0 6px;color:#9B978F;font-size:12px;letter-spacing:1px;text-transform:uppercase;" colspan="2">By status</td></tr>
        ${tallyRows(campaignByStatus, "Nothing yet.")}
      </table>

      <hr style="border:none;border-top:1px solid #2A2D33;margin:28px 0 16px;">
      <p style="color:#6B6760;font-size:12px;line-height:1.6;margin:0;">
        Leads and sources come from the site's own records. Page views, video plays and the
        <code style="color:#9B978F;">deck_request</code> / <code style="color:#9B978F;">inquiry_submit</code> events are in
        <a href="https://analytics.google.com/" style="color:#C49A6C;">GA4</a>. Reply to this email to reach the team.
      </p>
    </div>`;

  const subject = `Book the Block · week of ${windowLabel}: ${leads.length} lead${leads.length === 1 ? "" : "s"}` +
    (rsvps.length ? `, ${rsvps.length} tour RSVP${rsvps.length === 1 ? "" : "s"}` : "");

  // ?dry=1 returns the rendered email instead of sending it, for previews.
  if (request.nextUrl.searchParams.get("dry")) {
    return new NextResponse(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  }

  const { error: sendErr } = await getResend().emails.send({
    from: FROM,
    to: TO,
    cc: CC,
    bcc: BCC,
    replyTo: REPLY_TO,
    subject,
    html,
  });
  if (sendErr) {
    return NextResponse.json({ error: sendErr.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    window: windowLabel,
    leads: leads.length,
    inquiries,
    deckRequests,
    dripSends: dripSends.length,
    unsubscribes,
    tourRsvps: rsvps.length,
    campaignToDate: campaign.length,
  });
}
