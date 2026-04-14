import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { token, action } = await request.json();

    if (!token || !action) {
      return NextResponse.json({ error: "token and action required" }, { status: 400 });
    }

    const supabase = getSupabase();

    const updates: Record<string, string> = {};

    if (action === "viewed") {
      updates.status = "viewed";
      updates.viewed_at = new Date().toISOString();
    } else if (action === "clicked") {
      updates.status = "clicked";
      updates.clicked_at = new Date().toISOString();
    } else if (action === "inquired") {
      updates.status = "inquired";
    }

    // Only advance status, never go backwards
    const { data: existing } = await supabase
      .from("efd_outbound_targets")
      .select("status")
      .eq("magic_link_token", token)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "target not found" }, { status: 404 });
    }

    const statusOrder = ["pending", "sent", "viewed", "clicked", "inquired", "converted"];
    const currentIdx = statusOrder.indexOf(existing.status);
    const newIdx = statusOrder.indexOf(updates.status);

    if (newIdx > currentIdx) {
      await supabase
        .from("efd_outbound_targets")
        .update(updates)
        .eq("magic_link_token", token);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ error: "Failed to track" }, { status: 500 });
  }
}
