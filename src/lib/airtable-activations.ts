import base, { isAirtableConfigured } from "./airtable";
import {
  ActivationFramework,
  ActivationFeature,
} from "@/types/activation";
import { activationFrameworks as staticFrameworks } from "@/data/activations";

/**
 * Fetch activation frameworks + their features from Airtable.
 *
 * Tables:
 *   "Activation Frameworks" — one row per tier
 *   "Activation Features"   — one row per feature, linked to a framework
 *
 * Activation Frameworks fields:
 *   slug, name, tier, startingRange, idealGuestCount, positioningLine,
 *   description, venueAccess, productionLevel,
 *   brandingIncluded (long text, one per line),
 *   addOns (long text, one per line),
 *   sortOrder (number, for display ordering)
 *
 * Activation Features fields:
 *   category, feature, included (checkbox),
 *   framework (linked record to Activation Frameworks)
 */
export async function getActivationFrameworks(): Promise<
  ActivationFramework[]
> {
  if (!isAirtableConfigured || !base) return staticFrameworks;

  try {
    // Fetch frameworks
    const fwRecords = await base("Activation Frameworks")
      .select({ sort: [{ field: "sortOrder", direction: "asc" }] })
      .all();

    // Fetch all features
    const featRecords = await base("Activation Features")
      .select({ view: "Grid view" })
      .all();

    // Group features by linked framework record id
    const featsByFw = new Map<string, ActivationFeature[]>();
    for (const r of featRecords) {
      const linkedIds = r.get("framework") as string[] | undefined;
      if (!linkedIds?.length) continue;
      const feat: ActivationFeature = {
        category: (r.get("category") as string) ?? "",
        feature: (r.get("feature") as string) ?? "",
        included: (r.get("included") as boolean) ?? false,
      };
      for (const fwId of linkedIds) {
        const arr = featsByFw.get(fwId) ?? [];
        arr.push(feat);
        featsByFw.set(fwId, arr);
      }
    }

    return fwRecords.map((r) => ({
      id: r.id,
      slug: (r.get("slug") as string) ?? "",
      name: (r.get("name") as string) ?? "",
      tier: (r.get("tier") as ActivationFramework["tier"]) ?? "core",
      startingRange: (r.get("startingRange") as string) ?? "",
      idealGuestCount: (r.get("idealGuestCount") as string) ?? "",
      positioningLine: (r.get("positioningLine") as string) ?? "",
      description: (r.get("description") as string) ?? "",
      venueAccess: (r.get("venueAccess") as string) ?? "",
      productionLevel: (r.get("productionLevel") as string) ?? "",
      brandingIncluded: splitLines(r.get("brandingIncluded") as string),
      addOns: splitLines(r.get("addOns") as string),
      includedFeatures: featsByFw.get(r.id) ?? [],
    }));
  } catch (err) {
    console.error(
      "[airtable-activations] fetch failed, using static fallback",
      err
    );
    return staticFrameworks;
  }
}

/** Split a multi-line text field into an array of non-empty strings */
function splitLines(val: string | null | undefined): string[] {
  if (!val) return [];
  return val
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}
