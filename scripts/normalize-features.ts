/**
 * Normalize activation features so every feature has ONE shared name
 * across all three tiers, with included=true/false per tier.
 *
 * Usage:
 *   npx tsx scripts/normalize-features.ts --dry-run   # preview
 *   npx tsx scripts/normalize-features.ts              # execute
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import Airtable from "airtable";

// Load .env.local
const envPath = resolve(__dirname, "../.env.local");
try {
  const envFile = readFileSync(envPath, "utf-8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {}

const PAT = process.env.AIRTABLE_PAT!;
const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const dryRun = process.argv.includes("--dry-run");
const base = new Airtable({ apiKey: PAT }).base(BASE_ID);

// ─── Normalized feature definitions ────────────────────────────────────────
// Each entry: [category, feature name, core, expanded, full-takeover]
// true = included, false = not included in that tier

type Tier3 = [boolean, boolean, boolean];

const normalizedFeatures: [string, string, ...Tier3][] = [
  // ── Venue ──
  ["Venue", "Venue access", true, true, true],
  ["Venue", "Exclusive space access", true, true, true],
  ["Venue", "Extended hours access", true, true, true],
  ["Venue", "VIP/premium lounge areas", false, true, true],
  ["Venue", "Kitchen and beverage facilities", false, true, true],
  ["Venue", "Street-level activation zones", false, false, true],
  ["Venue", "Rooftop access", false, false, true],

  // ── Production ──
  ["Production", "Sound system", true, true, true],
  ["Production", "Lighting package", true, true, true],
  ["Production", "DJ booth access", true, true, false],
  ["Production", "AV coordination and production", true, true, true],
  ["Production", "Stage setup", false, true, true],
  ["Production", "Live streaming capability", false, true, true],
  ["Production", "Custom projection mapping", false, false, true],
  ["Production", "Unlimited technical support", false, false, true],

  // ── Staffing ──
  ["Staffing", "Event coordinator", true, true, true],
  ["Staffing", "Security staffing", true, true, true],
  ["Staffing", "Registration and guest management", true, true, true],
  ["Staffing", "Venue management", false, true, true],
  ["Staffing", "Brand ambassador program", false, true, true],
  ["Staffing", "Concierge and guest services", false, false, true],
  ["Staffing", "Medical and emergency services on-site", false, false, true],

  // ── Branding ──
  ["Branding", "Signage package", true, true, true],
  ["Branding", "Social media and marketing", true, true, true],
  ["Branding", "District directory listing", true, false, false],
  ["Branding", "Street-level branding", false, true, true],
  ["Branding", "Digital signage integration", false, true, true],
  ["Branding", "Influencer and media relations", false, false, true],
  ["Branding", "Building wraps (exterior)", false, false, true],
  ["Branding", "Rooftop installations and branding", false, false, true],
  ["Branding", "Partnership activation opportunities", false, false, true],
  ["Branding", "Integrated marketing campaign (360)", false, false, true],

  // ── Coordination ──
  ["Coordination", "Event planning services", true, true, true],
  ["Coordination", "Vendor management", false, true, true],
  ["Coordination", "Post-event reporting and analytics", true, true, true],
  ["Coordination", "Timeline and contingency planning", false, true, true],
  ["Coordination", "Logistics management", false, false, true],
  ["Coordination", "Strategic planning and creative direction", false, false, true],
  ["Coordination", "Real-time event monitoring and adjustments", false, false, true],
];

async function main() {
  console.log(dryRun ? "=== DRY RUN ===\n" : "");

  // 1. Fetch framework record IDs
  const fwRecords = await base("Activation Frameworks").select().all();
  const fwIdBySlug = new Map<string, string>();
  for (const r of fwRecords) {
    fwIdBySlug.set(r.get("slug") as string, r.id);
  }
  const coreId = fwIdBySlug.get("district-core")!;
  const expandedId = fwIdBySlug.get("district-expanded")!;
  const fullId = fwIdBySlug.get("district-full-takeover")!;

  // 2. Show proposed features
  console.log("Proposed normalized features:\n");
  console.log(
    "Feature".padEnd(45) +
      "Core".padEnd(10) +
      "Expanded".padEnd(12) +
      "Full Takeover"
  );
  console.log("-".repeat(75));

  let currentCat = "";
  for (const [cat, feat, core, expanded, full] of normalizedFeatures) {
    if (cat !== currentCat) {
      console.log(`\n  ${cat.toUpperCase()}`);
      currentCat = cat;
    }
    const c = core ? "  Y" : "  -";
    const e = expanded ? "  Y" : "  -";
    const f = full ? "  Y" : "  -";
    console.log(`    ${feat.padEnd(43)}${c.padEnd(10)}${e.padEnd(12)}${f}`);
  }

  // Count totals per tier
  const coreCount = normalizedFeatures.filter(([, , c]) => c).length;
  const expCount = normalizedFeatures.filter(([, , , e]) => e).length;
  const fullCount = normalizedFeatures.filter(([, , , , f]) => f).length;
  console.log(`\n  Totals: Core=${coreCount}  Expanded=${expCount}  Full Takeover=${fullCount}`);
  console.log(`  Total unique features: ${normalizedFeatures.length}`);

  if (dryRun) {
    console.log("\nRe-run without --dry-run to apply these changes to Airtable.");
    return;
  }

  // 3. Delete all existing feature records
  console.log("\nDeleting existing feature records...");
  const existingRecords = await base("Activation Features").select().all();
  const existingIds = existingRecords.map((r) => r.id);
  for (let i = 0; i < existingIds.length; i += 10) {
    const batch = existingIds.slice(i, i + 10);
    await base("Activation Features").destroy(batch);
  }
  console.log(`  Deleted ${existingIds.length} records`);

  // 4. Create normalized feature records (one row per feature per tier)
  console.log("\nCreating normalized feature records...");
  const toCreate: Record<string, unknown>[] = [];

  for (const [category, feature, core, expanded, full] of normalizedFeatures) {
    if (core || true) {
      // Always create a row for each tier so the comparison table works
      toCreate.push({
        category,
        feature,
        included: core,
        framework: [coreId],
      });
    }
    toCreate.push({
      category,
      feature,
      included: expanded,
      framework: [expandedId],
    });
    toCreate.push({
      category,
      feature,
      included: full,
      framework: [fullId],
    });
  }

  let created = 0;
  for (let i = 0; i < toCreate.length; i += 10) {
    const batch = toCreate.slice(i, i + 10).map((fields) => ({ fields }));
    await (base("Activation Features").create as Function)(batch);
    created += batch.length;
  }
  console.log(`  Created ${created} records (${normalizedFeatures.length} features x 3 tiers)`);

  // 5. Update static fallback to match
  console.log("\nDone! Airtable now has normalized features.");
  console.log("IMPORTANT: Update src/data/activations.ts to match if you want the static fallback to stay in sync.");
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
