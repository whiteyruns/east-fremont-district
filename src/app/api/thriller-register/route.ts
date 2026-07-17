import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { ThrillerRegistration } from "@/types/thriller";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  return new Resend(apiKey);
}

// Sender MUST be on cornerbar.com — EFD's RESEND_API_KEY is domain-scoped to
// cornerbar.com, so any other verified domain (e.g. cornerbarmgmt.com) 403s.
const FROM = "F.E.E.D. Thriller <booktheblock@cornerbar.com>";
const TEAM_INBOX = "booktheblock@cornerbar.com";
const BCC = "keith@gorunrabbit.com";

// Escape user-supplied values before interpolating into email HTML so a
// registrant can't inject markup/links into the confirmation or the team
// notification.
function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function makeConfirmationCode() {
  // 6 chars, unambiguous set (no 0/O/1/I), namespaced for humans.
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `FEED-${code}`;
}

function confirmationEmailHtml(firstName: string, code: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0F1115; color: #F0EDE8; padding: 32px; border-radius: 8px;">
      <div style="color: #C49A6C; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">
        World's Largest Thriller Dance
      </div>
      <h1 style="color: #F0EDE8; font-size: 24px; margin: 0 0 16px;">
        You're on the grid, ${esc(firstName)}.
      </h1>
      <p style="color: #9B978F; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
        Thanks for registering for the F.E.E.D. Guinness World Record attempt.
        We'll be in touch with rehearsal details, the official choreography
        tutorial, and your assigned grid square as the date approaches.
      </p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 12px; color: #9B978F; font-size: 13px; text-transform: uppercase; width: 120px; border-bottom: 1px solid #1A1D23;">Date</td>
          <td style="padding: 10px 12px; color: #F0EDE8; font-size: 14px; border-bottom: 1px solid #1A1D23;">Sunday, October 25, 2026</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #9B978F; font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #1A1D23;">Check-In</td>
          <td style="padding: 10px 12px; color: #F0EDE8; font-size: 14px; border-bottom: 1px solid #1A1D23;">4:00 PM · Wristband pickup</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #9B978F; font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #1A1D23;">Attempt</td>
          <td style="padding: 10px 12px; color: #F0EDE8; font-size: 14px; border-bottom: 1px solid #1A1D23;">7:00 PM Sharp</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #9B978F; font-size: 13px; text-transform: uppercase;">Location</td>
          <td style="padding: 10px 12px; color: #F0EDE8; font-size: 14px;">Fremont East District · Downtown Las Vegas</td>
        </tr>
      </table>
      <div style="background: #1A1D23; border: 1px solid #2A2D33; border-radius: 6px; padding: 16px; text-align: center; margin-bottom: 24px;">
        <div style="color: #9B978F; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px;">Your Confirmation</div>
        <div style="color: #C49A6C; font-size: 22px; font-weight: 700; letter-spacing: 3px;">${code}</div>
      </div>
      <p style="color: #9B978F; font-size: 13px; line-height: 1.6;">
        Questions? Just reply to this email and a real human will get back to you.
      </p>
      <hr style="border: none; border-top: 1px solid #2A2D33; margin: 24px 0;" />
      <p style="color: #6B6760; font-size: 11px;">
        F.E.E.D. · Fremont East Entertainment District<br />
        Corner Bar + Wynn Las Vegas · Las Vegas
      </p>
    </div>
  `;
}

function notificationEmailHtml(reg: ThrillerRegistration, code: string) {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 500px; background: #0F1115; color: #F0EDE8; padding: 24px; border-radius: 8px;">
      <p style="color: #C49A6C; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">New Thriller Registration</p>
      <p style="font-size: 14px; margin: 4px 0;"><strong>Name:</strong> ${esc(reg.firstName)} ${esc(reg.lastName)}</p>
      <p style="font-size: 14px; margin: 4px 0;"><strong>Email:</strong> ${esc(reg.email)}</p>
      <p style="font-size: 14px; margin: 4px 0;"><strong>Confirmation:</strong> ${code}</p>
      <p style="color: #6B6760; font-size: 12px; margin-top: 16px;">
        ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT
      </p>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body: ThrillerRegistration = await request.json();
    const firstName = (body.firstName || "").trim();
    const lastName = (body.lastName || "").trim();
    const email = (body.email || "").trim().toLowerCase();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First and last name are required." },
        { status: 400 },
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // Persist the dancer to thriller_registrations. email is UNIQUE, so a
    // repeat signup is idempotent: we fetch the existing confirmation code and
    // treat it as success rather than erroring. dbError reflects whether the
    // registrant is actually captured, so the visitor is never shown a failure
    // when their spot was saved.
    let confirmationCode = makeConfirmationCode();
    let dbError: string | null = null;
    let alreadyRegistered = false;
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("thriller_registrations").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        confirmation_code: confirmationCode,
        source: "thriller-page",
        status: "registered",
      });
      if (error) {
        // 23505 = unique_violation. Almost always the email (repeat signup);
        // recover their existing code and treat as already-on-the-grid.
        if (error.code === "23505") {
          const { data: existing } = await supabase
            .from("thriller_registrations")
            .select("confirmation_code")
            .eq("email", email)
            .maybeSingle();
          if (existing?.confirmation_code) {
            confirmationCode = existing.confirmation_code;
            alreadyRegistered = true;
          } else {
            dbError = error.message;
          }
        } else {
          console.error("thriller_registrations insert error:", error);
          dbError = error.message;
        }
      }
    } catch (err) {
      console.error("Supabase connection error:", err);
      dbError = err instanceof Error ? err.message : "Unknown DB error";
    }

    // Confirmation email to the dancer (best-effort — never blocks the flow).
    try {
      const { error: confErr } = await getResend().emails.send({
        from: FROM,
        to: email,
        replyTo: TEAM_INBOX,
        subject: "You're on the grid — World's Largest Thriller Dance",
        html: confirmationEmailHtml(firstName, confirmationCode),
      });
      if (confErr) console.error("Confirmation email error:", confErr);
    } catch (err) {
      console.error("Confirmation email send failed:", err);
    }

    // Team notification. This is the second capture path, so we track its
    // success. Skipped for a repeat signup (they're already in the DB and the
    // team was notified the first time — avoids inbox noise).
    let notifyFailed = false;
    if (!alreadyRegistered) {
      try {
        const { error: notifyErr } = await getResend().emails.send({
          from: FROM,
          to: TEAM_INBOX,
          replyTo: email,
          bcc: BCC,
          subject: `New Thriller registration: ${firstName} ${lastName}`,
          html: notificationEmailHtml({ firstName, lastName, email }, confirmationCode),
        });
        if (notifyErr) {
          console.error("Notification email error:", notifyErr);
          notifyFailed = true;
        }
      } catch (err) {
        console.error("Notification email send failed:", err);
        notifyFailed = true;
      }
    }

    // Only fail if the registrant was captured NOWHERE — neither the DB row
    // nor the team notification landed.
    if (dbError && notifyFailed) {
      return NextResponse.json(
        { error: "Registration failed. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, confirmationCode, alreadyRegistered },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing registration:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 },
    );
  }
}
