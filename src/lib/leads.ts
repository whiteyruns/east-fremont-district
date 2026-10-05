import { getSupabase } from "@/lib/supabase";
import { attributionColumns, type Attribution } from "@/lib/attribution";

/**
 * Insert a row into efd_leads, stamped with first-touch attribution.
 *
 * The attribution columns come from migration 009. If that migration hasn't
 * reached the database yet, PostgREST rejects the insert with PGRST204
 * ("column not found"); in that case the lead is written again without the
 * attribution so a prospect is never lost to a schema gap.
 */
export async function insertLead(
  row: Record<string, unknown>,
  attr: Attribution | null,
): Promise<{ error: string | null }> {
  const supabase = getSupabase();
  const withAttr = { ...row, ...attributionColumns(attr) };

  const { error } = await supabase.from("efd_leads").insert(withAttr);
  if (!error) return { error: null };

  if (attr && error.code === "PGRST204") {
    console.error("efd_leads attribution columns missing (run migration 009); retrying without attribution:", error.message);
    const retry = await supabase.from("efd_leads").insert(row);
    return { error: retry.error ? retry.error.message : null };
  }

  return { error: error.message };
}
