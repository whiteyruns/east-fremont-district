import { NextResponse } from "next/server";
import base, { isAirtableConfigured } from "@/lib/airtable";

export const dynamic = "force-dynamic";

export async function GET() {
  const result: Record<string, unknown> = {
    isAirtableConfigured,
    hasPAT: !!process.env.AIRTABLE_PAT,
    hasBaseID: !!process.env.AIRTABLE_BASE_ID,
    patPrefix: process.env.AIRTABLE_PAT?.slice(0, 6) ?? "unset",
    baseIdPrefix: process.env.AIRTABLE_BASE_ID?.slice(0, 6) ?? "unset",
  };

  if (isAirtableConfigured && base) {
    try {
      const records = await base("Venues").select().all();
      result.venueCount = records.length;
      result.firstVenue = records[0]?.get("name") ?? "none";
      result.totalCapacity = records.reduce(
        (s, r) => s + (Number(r.get("capacity")) || 0),
        0
      );
      result.source = "airtable";
    } catch (err) {
      result.source = "error";
      result.error = err instanceof Error ? err.message : String(err);
      result.errorStack = err instanceof Error ? err.stack : undefined;
    }
  } else {
    result.source = "static-fallback";
  }

  return NextResponse.json(result);
}
