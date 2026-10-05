import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyUnsubscribeToken } from "@/lib/drip";

// Unsubscribe from the Book the Block drip. Linked from every drip email and
// offered to mail clients via List-Unsubscribe (GET for the link, POST for
// RFC 8058 one-click). Sets efd_leads.unsubscribed_at; the cron skips those.

function page(title: string, body: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title} — East Fremont District</title></head>
<body style="margin:0;background:#0F1115;color:#F0EDE8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:520px;margin:0 auto;padding:72px 24px;">
  <p style="color:#C49A6C;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 16px;">East Fremont District</p>
  <h1 style="font-size:26px;font-weight:600;margin:0 0 12px;">${title}</h1>
  <p style="color:#9B978F;font-size:15px;line-height:1.7;margin:0;">${body}</p>
</div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

async function unsubscribe(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") ?? "";
  const token = request.nextUrl.searchParams.get("t") ?? "";

  if (!id || !token || !verifyUnsubscribeToken(id, token)) {
    return page("This link isn't valid", "The unsubscribe link may have been cut off. Reply to any of our emails with \"unsubscribe\" and we'll take care of it.", 400);
  }

  const { error } = await getSupabase()
    .from("efd_leads")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("unsubscribe update error:", error);
    return page("Something went wrong", "We couldn't record that just now. Reply to any of our emails with \"unsubscribe\" and we'll take care of it.", 500);
  }

  return page("You're unsubscribed", "You won't get any more follow-ups about Book the Block. If you ever want to talk about the district, booktheblock@cornerbar.com is open.");
}

export async function GET(request: NextRequest) {
  return unsubscribe(request);
}

export async function POST(request: NextRequest) {
  return unsubscribe(request);
}
