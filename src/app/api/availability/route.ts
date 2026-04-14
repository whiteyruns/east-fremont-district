import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const start = request.nextUrl.searchParams.get("start");
  const end = request.nextUrl.searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json({ error: "start and end date params required" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Fetch venues
  const { data: venues, error: venueError } = await supabase
    .from("venues")
    .select("id, slug, name, capacity, is_cbm_operated")
    .eq("is_cbm_operated", true)
    .order("sort_order");

  if (venueError) {
    return NextResponse.json({ error: venueError.message }, { status: 500 });
  }

  // Fetch availability for date range
  const { data: availability, error: availError } = await supabase
    .from("venue_availability")
    .select("venue_id, date, status, notes")
    .gte("date", start)
    .lte("date", end);

  if (availError) {
    return NextResponse.json({ error: availError.message }, { status: 500 });
  }

  return NextResponse.json({ venues, availability });
}

export async function POST(request: NextRequest) {
  // Admin: set availability for a venue/date
  const body = await request.json();
  const { venue_id, date, status, notes } = body;

  if (!venue_id || !date || !status) {
    return NextResponse.json({ error: "venue_id, date, and status required" }, { status: 400 });
  }

  const supabase = getSupabase();

  // Upsert — update if exists, insert if not
  const { data, error } = await supabase
    .from("venue_availability")
    .upsert(
      { venue_id, date, status, notes: notes || null },
      { onConflict: "venue_id,date" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
