import base, { isAirtableConfigured } from "./airtable";
import { Venue } from "@/types/venue";
import { venues as staticVenues } from "@/data/venues";

/**
 * Fetch venues from Airtable, falling back to static data.
 *
 * Airtable table: "Venues"
 * Fields: slug, name, operator, address, zone, capacity, squareFeet,
 *         hasRooftop, hasStage, hasKitchen, adaAccessible, notes
 */
export async function getVenues(): Promise<Venue[]> {
  if (!isAirtableConfigured || !base) return staticVenues;

  try {
    const records = await base("Venues")
      .select({ view: "Grid view" })
      .all();

    return records.map((r) => ({
      slug: (r.get("slug") as string) ?? "",
      name: (r.get("name") as string) ?? "",
      operator: (r.get("operator") as string) ?? null,
      address: (r.get("address") as string) ?? "",
      zone: (r.get("zone") as Venue["zone"]) ?? "TBD",
      capacity: r.get("capacity") != null ? Number(r.get("capacity")) : null,
      squareFeet:
        r.get("squareFeet") != null ? Number(r.get("squareFeet")) : null,
      hasRooftop: castBool(r.get("hasRooftop")),
      hasStage: castBool(r.get("hasStage")),
      hasKitchen: castBool(r.get("hasKitchen")),
      adaAccessible: castBool(r.get("adaAccessible")),
      notes: (r.get("notes") as string) ?? "",
    }));
  } catch (err) {
    console.error("[airtable-venues] fetch failed, using static fallback", err);
    return staticVenues;
  }
}

function castBool(val: unknown): boolean | null {
  if (val === true || val === false) return val;
  return null;
}
