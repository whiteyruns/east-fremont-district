import base, { isAirtableConfigured } from "./airtable";
import { CaseStudy, CaseStudyResult, ActivationScope } from "@/types/case-study";
import { caseStudies as staticCaseStudies } from "@/data/case-studies";

/**
 * Fetch case studies from Airtable.
 *
 * Table: "Case Studies"
 * Fields:
 *   slug, title, clientType, clientName, date, guestCount,
 *   activationScope (multi-select),
 *   infrastructureUsed (long text, one per line),
 *   customElements (long text, one per line),
 *   heroImageUrl, galleryImages (long text, one URL per line),
 *   testimonialQuote, testimonialAttribution, testimonialRole,
 *   summary,
 *   sortOrder (number)
 *
 * Linked table: "Case Study Results"
 *   metric, value, context,
 *   caseStudy (linked record to Case Studies)
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!isAirtableConfigured || !base) return staticCaseStudies;

  try {
    const csRecords = await base("Case Studies")
      .select({ sort: [{ field: "sortOrder", direction: "asc" }] })
      .all();

    // Fetch all results
    const resRecords = await base("Case Study Results")
      .select({ view: "Grid view" })
      .all();

    // Group results by linked case study id
    const resultsByCs = new Map<string, CaseStudyResult[]>();
    for (const r of resRecords) {
      const linkedIds = r.get("caseStudy") as string[] | undefined;
      if (!linkedIds?.length) continue;
      const result: CaseStudyResult = {
        metric: (r.get("metric") as string) ?? "",
        value: (r.get("value") as string) ?? "",
        context: (r.get("context") as string) ?? undefined,
      };
      for (const csId of linkedIds) {
        const arr = resultsByCs.get(csId) ?? [];
        arr.push(result);
        resultsByCs.set(csId, arr);
      }
    }

    return csRecords.map((r) => {
      const testimonialQuote = r.get("testimonialQuote") as string | undefined;

      return {
        id: r.id,
        slug: (r.get("slug") as string) ?? "",
        title: (r.get("title") as string) ?? "",
        clientType: (r.get("clientType") as CaseStudy["clientType"]) ?? "corporate",
        clientName: (r.get("clientName") as string) ?? undefined,
        date: (r.get("date") as string) ?? "",
        guestCount: Number(r.get("guestCount")) || 0,
        activationScope:
          ((r.get("activationScope") as string[]) ?? []) as ActivationScope[],
        infrastructureUsed: splitLines(r.get("infrastructureUsed") as string),
        customElements: splitLines(r.get("customElements") as string),
        results: resultsByCs.get(r.id) ?? [],
        heroImageUrl: (r.get("heroImageUrl") as string) ?? "",
        galleryImages: splitLines(r.get("galleryImages") as string),
        testimonial: testimonialQuote
          ? {
              quote: testimonialQuote,
              attribution: (r.get("testimonialAttribution") as string) ?? "",
              role: (r.get("testimonialRole") as string) ?? "",
            }
          : undefined,
        summary: (r.get("summary") as string) ?? "",
      };
    });
  } catch (err) {
    console.error(
      "[airtable-case-studies] fetch failed, using static fallback",
      err
    );
    return staticCaseStudies;
  }
}

function splitLines(val: string | null | undefined): string[] {
  if (!val) return [];
  return val
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}
