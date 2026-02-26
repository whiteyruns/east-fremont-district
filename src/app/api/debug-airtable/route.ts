import { NextResponse } from "next/server";
import { isAirtableConfigured } from "@/lib/airtable";
import { getVenues } from "@/lib/airtable-venues";

export const dynamic = "force-dynamic";

export async function GET() {
  const venues = await getVenues();

  return NextResponse.json({
    isAirtableConfigured,
    hasPAT: !!process.env.AIRTABLE_PAT,
    hasBaseID: !!process.env.AIRTABLE_BASE_ID,
    patPrefix: process.env.AIRTABLE_PAT?.slice(0, 6) ?? "unset",
    baseIdPrefix: process.env.AIRTABLE_BASE_ID?.slice(0, 6) ?? "unset",
    venueCount: venues.length,
    firstVenue: venues[0]?.name ?? "none",
    totalCapacity: venues.reduce((s, v) => s + (v.capacity ?? 0), 0),
  });
}
