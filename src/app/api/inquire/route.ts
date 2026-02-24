import { NextRequest, NextResponse } from "next/server";
import { InquirySubmission } from "@/types/inquiry";

// ============================================================================
// POST HANDLER - PROCESS INQUIRY SUBMISSIONS
// ============================================================================
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: InquirySubmission = await request.json();

    // Basic validation - check required fields
    const requiredFields = [
      "organizationName",
      "contactName",
      "email",
      "phone",
      "eventType",
      "estimatedGuestCount",
      "preferredDateStart",
      "preferredDateEnd",
      "budgetRange",
      "activationScope",
      "submittedAt",
    ];

    for (const field of requiredFields) {
      if (!body[field as keyof InquirySubmission]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // TODO: Integrate with Airtable/CRM webhook
    // Example:
    // const response = await fetch(process.env.AIRTABLE_WEBHOOK_URL!, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body),
    // });
    // if (!response.ok) throw new Error('Failed to save inquiry');

    // Log inquiry (for development/debugging)
    console.log("New inquiry received:", {
      organizationName: body.organizationName,
      contactName: body.contactName,
      email: body.email,
      eventType: body.eventType,
      estimatedGuestCount: body.estimatedGuestCount,
      submittedAt: body.submittedAt,
    });

    // Return success response
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
