import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { InquirySubmission } from "@/types/inquiry";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  return new Resend(apiKey);
}

const LABEL_MAP: Record<string, string> = {
  "under-200": "Under 200",
  "200-500": "200–500",
  "500-1000": "500–1,000",
  "1000-2500": "1,000–2,500",
  "2500-5000": "2,500–5,000",
  "5000-plus": "5,000+",
  "under-25k": "Under $25K",
  "25k-75k": "$25K–$75K",
  "75k-150k": "$75K–$150K",
  "150k-500k": "$150K–$500K",
  "500k-plus": "$500K+",
  "to-be-determined": "TBD",
  "single-venue": "Single Venue",
  "multi-venue": "Multi-Venue",
  "full-takeover": "Full Takeover",
  corporate: "Corporate Event",
  convention: "Convention",
  "brand-activation": "Brand Activation",
  private: "Private Event",
  other: "Other",
};

function label(val: string) {
  return LABEL_MAP[val] || val;
}

function buildEmailHtml(body: InquirySubmission) {
  const rows = [
    ["Organization", body.organizationName],
    ["Contact", body.contactName],
    ["Email", body.email],
    ["Event Type", label(body.eventType)],
    ["Guest Count", label(body.estimatedGuestCount)],
    ["Dates", `${body.preferredDateStart} → ${body.preferredDateEnd}`],
    ["Budget", label(body.budgetRange)],
    ["Scope", label(body.activationScope)],
    ...(body.referralSource ? [["Referral", label(body.referralSource)]] : []),
    ...(body.additionalNotes ? [["Notes", body.additionalNotes]] : []),
  ];

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0F1115; color: #F0EDE8; padding: 32px; border-radius: 8px;">
      <h1 style="color: #C49A6C; font-size: 20px; margin-bottom: 24px; border-bottom: 1px solid #2A2D33; padding-bottom: 16px;">
        New F.E.E.D. Inquiry
      </h1>
      <table style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 10px 12px; color: #9B978F; font-size: 13px; font-weight: 600; text-transform: uppercase; vertical-align: top; width: 120px; border-bottom: 1px solid #1A1D23;">${k}</td>
            <td style="padding: 10px 12px; color: #F0EDE8; font-size: 14px; border-bottom: 1px solid #1A1D23;">${v}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="color: #6B6760; font-size: 12px; margin-top: 24px;">
        Submitted ${new Date(body.submittedAt).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT
      </p>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body: InquirySubmission = await request.json();

    // Validate required fields
    const required: (keyof InquirySubmission)[] = [
      "organizationName",
      "contactName",
      "email",
      "eventType",
      "estimatedGuestCount",
      "preferredDateStart",
      "preferredDateEnd",
      "budgetRange",
      "activationScope",
      "submittedAt",
    ];

    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const { error } = await getResend().emails.send({
      from: "F.E.E.D. Inquiries <inquiries@cornerbarmgmt.com>",
      to: "events@cornerbarmgmt.com",
      replyTo: body.email,
      subject: `New Inquiry: ${body.organizationName} — ${label(body.eventType)}`,
      html: buildEmailHtml(body),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send inquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Inquiry submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry. Please try again." },
      { status: 500 }
    );
  }
}
