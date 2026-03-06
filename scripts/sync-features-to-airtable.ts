/**
 * Sync static activation features into Airtable.
 *
 * Reads existing features from the "Activation Features" table,
 * compares against the static data in src/data/activations.ts,
 * and creates any missing rows so the site no longer falls back to static.
 *
 * Usage:
 *   npx tsx scripts/sync-features-to-airtable.ts
 *
 * Add --dry-run to preview without writing:
 *   npx tsx scripts/sync-features-to-airtable.ts --dry-run
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import Airtable from "airtable";
import { activationFrameworks } from "../src/data/activations";

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
} catch {
  // .env.local not found, rely on env vars
}

const PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!PAT || !BASE_ID) {
  console.error("Set AIRTABLE_PAT and AIRTABLE_BASE_ID env vars");
  process.exit(1);
}

const dryRun = process.argv.includes("--dry-run");
const base = new Airtable({ apiKey: PAT }).base(BASE_ID);

async function main() {
  console.log(dryRun ? "DRY RUN — no records will be created\n" : "");

  // 1. Fetch all framework records to get their Airtable IDs by slug
  console.log("Fetching Activation Frameworks from Airtable...");
  const fwRecords = await base("Activation Frameworks").select().all();
  const fwIdBySlug = new Map<string, string>();
  for (const r of fwRecords) {
    const slug = r.get("slug") as string;
    if (slug) fwIdBySlug.set(slug, r.id);
  }
  console.log(`  Found ${fwIdBySlug.size} frameworks: ${[...fwIdBySlug.keys()].join(", ")}`);

  // Check for missing frameworks
  const missingFw = activationFrameworks.filter((fw) => !fwIdBySlug.has(fw.slug));
  if (missingFw.length > 0) {
    console.error(
      `\nERROR: These frameworks exist in static data but not in Airtable: ${missingFw.map((f) => f.slug).join(", ")}`
    );
    console.error("Run the full seed script first, or add them manually in Airtable.");
    process.exit(1);
  }

  // 2. Fetch all existing features from Airtable
  console.log("\nFetching existing Activation Features from Airtable...");
  const existingRecords = await base("Activation Features").select().all();

  // Build a set of "frameworkId|category|feature" keys for deduplication
  const existingKeys = new Set<string>();
  for (const r of existingRecords) {
    const linkedIds = r.get("framework") as string[] | undefined;
    const category = (r.get("category") as string) ?? "";
    const feature = (r.get("feature") as string) ?? "";
    if (linkedIds) {
      for (const fwId of linkedIds) {
        existingKeys.add(`${fwId}|${category}|${feature}`);
      }
    }
  }
  console.log(`  Found ${existingRecords.length} existing feature records`);

  // 3. Determine which static features are missing
  const toCreate: { category: string; feature: string; included: boolean; framework: string[] }[] = [];

  for (const fw of activationFrameworks) {
    const fwId = fwIdBySlug.get(fw.slug)!;
    for (const feat of fw.includedFeatures) {
      const key = `${fwId}|${feat.category}|${feat.feature}`;
      if (!existingKeys.has(key)) {
        toCreate.push({
          category: feat.category,
          feature: feat.feature,
          included: feat.included,
          framework: [fwId],
        });
      }
    }
  }

  if (toCreate.length === 0) {
    console.log("\nAll static features already exist in Airtable. Nothing to sync.");
    return;
  }

  console.log(`\n${toCreate.length} missing features to add:\n`);
  for (const rec of toCreate) {
    const fwSlug = [...fwIdBySlug.entries()].find(([, id]) => id === rec.framework[0])?.[0] ?? "?";
    console.log(`  [${fwSlug}] ${rec.category} — ${rec.feature} (${rec.included ? "included" : "not included"})`);
  }

  if (dryRun) {
    console.log("\nDry run complete. Re-run without --dry-run to create these records.");
    return;
  }

  // 4. Batch create in groups of 10 (Airtable limit)
  console.log("\nCreating records...");
  let created = 0;
  for (let i = 0; i < toCreate.length; i += 10) {
    const batch = toCreate.slice(i, i + 10).map((fields) => ({ fields }));
    await (base("Activation Features").create as Function)(batch);
    created += batch.length;
    console.log(`  ${created}/${toCreate.length}`);
  }

  console.log(`\nDone! Added ${created} features to Airtable.`);
  console.log("The site should now load all features from Airtable instead of falling back to static data.");
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
