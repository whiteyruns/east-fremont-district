import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { readAttribution, describeAttribution } from "@/lib/attribution";
import {
  TOUR_EVENT,
  TOUR_TIME_LABEL,
  TOUR_DURATION_MIN,
  MEETING_POINT,
  HOST,
  PARKING_GUIDANCE,
  PARKING_FALLBACK,
  MAX_PARTY_SIZE,
  findTourDate,
  tourIcs,
  type TourDate,
} from "@/lib/block-tour";

// Sender MUST be on cornerbar.com — EFD's RESEND_API_KEY is domain-scoped.
const FROM = "Book the Block <booktheblock@cornerbar.com>";
const TEAM_INBOX = "booktheblock@cornerbar.com";
const TEAM_CC = HOST.email;
const BCC = "keith@gorunrabbit.com";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  return new Resend(apiKey);
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Rsvp = {
  name: string;
  company: string;
  title: string;
  email: string;
  phone: string;
  partySize: number;
  optIn: boolean;
  notes: string;
};

function row(label: string, value: string, last = false) {
  const border = last ? "" : "border-bottom:1px solid #1A1D23;";
  return `<tr>
    <td style="padding:10px 12px;color:#9B978F;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:130px;vertical-align:top;${border}">${label}</td>
    <td style="padding:10px 12px;color:#F0EDE8;font-size:14px;line-height:1.5;${border}">${value}</td>
  </tr>`;
}

function confirmationHtml(rsvp: Rsvp, date: TourDate) {
  const first = rsvp.name.split(/\s+/)[0];
  const hostLine = HOST.phone
    ? `${esc(HOST.name)}, ${esc(HOST.org)} · ${esc(HOST.phone)} · ${esc(HOST.email)}`
    : `${esc(HOST.name)}, ${esc(HOST.org)} · ${esc(HOST.email)}`;
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0F1115;color:#F0EDE8;padding:32px;border-radius:8px;">
      <div style="color:#C49A6C;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Book the Block · IMEX week</div>
      <h1 style="color:#F0EDE8;font-size:24px;font-weight:300;margin:0 0 16px;">You're on the walk, ${esc(first)}.</h1>
      <p style="color:#9B978F;font-size:15px;line-height:1.6;margin:0 0 24px;">
        ${esc(HOST.name)} will meet you at ${esc(MEETING_POINT.venue)} and walk you through the block:
        the closed street, the rooftops, the showroom and the clubs, and how a private
        program runs across all of it under one contract. About ${TOUR_DURATION_MIN} minutes.
      </p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#15181E;border:1px solid #2A2D33;border-radius:6px;">
        ${row("When", `${esc(date.label)}, 2026 · ${TOUR_TIME_LABEL}`)}
        ${row("Meet at", `${esc(MEETING_POINT.venue)}<br>${esc(MEETING_POINT.address)}<br><span style="color:#9B978F;">${esc(MEETING_POINT.hint)}</span> · <a href="${MEETING_POINT.mapsUrl}" style="color:#C49A6C;">Map</a>`)}
        ${row("Parking", esc(PARKING_GUIDANCE ?? PARKING_FALLBACK))}
        ${row("Your host", hostLine)}
        ${row("Party", rsvp.partySize === 1 ? "Just you" : `${rsvp.partySize} people`, true)}
      </table>
      <p style="color:#9B978F;font-size:14px;line-height:1.6;margin:0 0 8px;">
        A calendar invite is attached. If your IMEX schedule moves, reply to this email and we'll shift you to another morning.
      </p>
      <p style="color:#9B978F;font-size:14px;line-height:1.6;margin:0 0 24px;">
        Can't wait for the morning? <a href="https://www.eastfremontdistrict.com/book-the-block/private?utm_source=imex&utm_medium=email&utm_campaign=book-the-block&utm_content=rsvp-confirmation" style="color:#C49A6C;">See the block online</a>.
      </p>
      <hr style="border:none;border-top:1px solid #2A2D33;margin:24px 0;">
      <p style="color:#6B6760;font-size:11px;line-height:1.6;margin:0;">
        East Fremont District · Corner Bar · 601 E. Bridger Ave., Las Vegas, NV 89101
      </p>
    </div>`;
}

function confirmationText(rsvp: Rsvp, date: TourDate) {
  const first = rsvp.name.split(/\s+/)[0];
  return [
    `You're on the walk, ${first}.`,
    ``,
    `${HOST.name} will meet you at ${MEETING_POINT.venue} and walk you through the block: the closed street, the rooftops, the showroom and the clubs, and how a private program runs across all of it under one contract. About ${TOUR_DURATION_MIN} minutes.`,
    ``,
    `When: ${date.label}, 2026 · ${TOUR_TIME_LABEL}`,
    `Meet at: ${MEETING_POINT.venue}, ${MEETING_POINT.address} (${MEETING_POINT.hint})`,
    `Map: ${MEETING_POINT.mapsUrl}`,
    `Parking: ${PARKING_GUIDANCE ?? PARKING_FALLBACK}`,
    `Your host: ${HOST.name}, ${HOST.org}${HOST.phone ? ` · ${HOST.phone}` : ""} · ${HOST.email}`,
    `Party: ${rsvp.partySize === 1 ? "Just you" : `${rsvp.partySize} people`}`,
    ``,
    `A calendar invite is attached. If your IMEX schedule moves, reply to this email and we'll shift you to another morning.`,
    ``,
    `See the block online: https://www.eastfremontdistrict.com/book-the-block/private`,
    ``,
    `East Fremont District · Corner Bar · 601 E. Bridger Ave., Las Vegas, NV 89101`,
  ].join("\n");
}

function teamAlertHtml(rsvp: Rsvp, date: TourDate, source: string | null, dbNote: string | null) {
  const parkingNote = PARKING_GUIDANCE
    ? ""
    : `<p style="color:#E58A63;font-size:13px;margin:12px 0 0;">Parking guidance is still unset — the confirmation promised it the day before. Set PARKING_GUIDANCE in src/lib/block-tour.ts.</p>`;
  return `
    <div style="font-family:-apple-system,sans-serif;max-width:520px;background:#0F1115;color:#F0EDE8;padding:24px;border-radius:8px;">
      <p style="color:#C49A6C;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;">Block tour RSVP · ${esc(date.short)} · ${TOUR_TIME_LABEL}</p>
      <p style="font-size:14px;margin:4px 0;"><strong>Name:</strong> ${esc(rsvp.name)}</p>
      <p style="font-size:14px;margin:4px 0;"><strong>Company:</strong> ${esc(rsvp.company)}${rsvp.title ? ` · ${esc(rsvp.title)}` : ""}</p>
      <p style="font-size:14px;margin:4px 0;"><strong>Email:</strong> <a href="mailto:${esc(rsvp.email)}" style="color:#C49A6C;">${esc(rsvp.email)}</a></p>
      <p style="font-size:14px;margin:4px 0;"><strong>Phone:</strong> ${rsvp.phone ? esc(rsvp.phone) : "<span style='color:#9B978F'>not given</span>"}</p>
      <p style="font-size:14px;margin:4px 0;"><strong>Party:</strong> ${rsvp.partySize}</p>
      <p style="font-size:14px;margin:4px 0;"><strong>Opt-in to follow-up:</strong> ${rsvp.optIn ? "Yes" : "No"}</p>
      ${rsvp.notes ? `<p style="font-size:14px;margin:4px 0;"><strong>Notes:</strong> ${esc(rsvp.notes)}</p>` : ""}
      <p style="font-size:14px;margin:4px 0;"><strong>Source:</strong> ${source ? esc(source) : "direct / untagged"}</p>
      ${dbNote ? `<p style="color:#E58A63;font-size:13px;margin:12px 0 0;">${esc(dbNote)}</p>` : ""}
      ${parkingNote}
      <p style="color:#6B6760;font-size:12px;margin-top:16px;">
        ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT
      </p>
    </div>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rsvp: Rsvp = {
      name: String(body.name || "").trim(),
      company: String(body.company || "").trim(),
      title: String(body.title || "").trim(),
      email: String(body.email || "").trim().toLowerCase(),
      phone: String(body.phone || "").trim(),
      partySize: Number.parseInt(String(body.partySize ?? "1"), 10) || 1,
      optIn: body.optIn === true,
      notes: String(body.notes || "").trim().slice(0, 1000),
    };
    const date = findTourDate(String(body.tourDate || ""));

    if (!rsvp.name || !rsvp.company) {
      return NextResponse.json({ error: "Name and company are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rsvp.email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!date) {
      return NextResponse.json({ error: "Pick a morning." }, { status: 400 });
    }
    if (rsvp.partySize < 1 || rsvp.partySize > MAX_PARTY_SIZE) {
      return NextResponse.json(
        { error: `Party size must be between 1 and ${MAX_PARTY_SIZE}.` },
        { status: 400 },
      );
    }

    const attr = readAttribution(request);
    const source = attr ? describeAttribution(attr) : null;

    // Persist. (event, tour_date, email) is unique, so a repeat submit for the
    // same morning is idempotent: we resend the confirmation and skip the
    // team alert. A different morning from the same person is a new row — the
    // team sees both and sorts it out with them.
    let dbNote: string | null = null;
    let repeat = false;
    let rowId: string | null = null;
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("block_tour_rsvps")
        .insert({
          event: TOUR_EVENT,
          tour_date: date.iso,
          name: rsvp.name,
          company: rsvp.company,
          title: rsvp.title || null,
          email: rsvp.email,
          phone: rsvp.phone || null,
          party_size: rsvp.partySize,
          opt_in: rsvp.optIn,
          notes: rsvp.notes || null,
          utm_source: attr?.source ?? null,
          utm_medium: attr?.medium ?? null,
          utm_campaign: attr?.campaign ?? null,
          utm_content: attr?.content ?? null,
        })
        .select("id")
        .single();
      if (error) {
        if (error.code === "23505") {
          repeat = true;
        } else {
          console.error("block_tour_rsvps insert error:", error);
          dbNote = `Not saved to the database (${error.message}). This email is the only record.`;
        }
      } else {
        rowId = data?.id ?? null;
      }
    } catch (err) {
      console.error("Supabase connection error:", err);
      dbNote = "Not saved to the database (connection error). This email is the only record.";
    }

    const resend = getResend();
    const ics = tourIcs(date, rowId ?? `${rsvp.email}-${date.iso}`);

    // Confirmation to the attendee, with the calendar invite attached.
    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: rsvp.email,
        replyTo: TEAM_INBOX,
        subject: `Block tour · ${date.short} · ${TOUR_TIME_LABEL} at ${MEETING_POINT.venue}`,
        html: confirmationHtml(rsvp, date),
        text: confirmationText(rsvp, date),
        attachments: [
          {
            filename: `block-tour-${date.iso}.ics`,
            content: Buffer.from(ics).toString("base64"),
            contentType: "text/calendar",
          },
        ],
      });
      if (error) console.error("Tour confirmation email error:", error);
    } catch (err) {
      console.error("Tour confirmation send failed:", err);
    }

    // Team alert: Mauricio asked for every person's contact and opt-in.
    let alertFailed = false;
    if (!repeat) {
      try {
        const { error } = await resend.emails.send({
          from: FROM,
          to: TEAM_INBOX,
          cc: TEAM_CC,
          bcc: BCC,
          replyTo: rsvp.email,
          subject: `Tour RSVP · ${date.short}: ${rsvp.name}, ${rsvp.company}${rsvp.partySize > 1 ? ` (+${rsvp.partySize - 1})` : ""}`,
          html: teamAlertHtml(rsvp, date, source, dbNote),
        });
        if (error) {
          console.error("Tour alert email error:", error);
          alertFailed = true;
        }
      } catch (err) {
        console.error("Tour alert send failed:", err);
        alertFailed = true;
      }
    }

    if (dbNote && alertFailed) {
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, repeat, tourDate: date.iso });
  } catch (error) {
    console.error("Error processing tour RSVP:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
