/**
 * Compare Airtable features vs static features to find mismatches.
 * Usage: npx tsx scripts/diff-features.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import Airtable from "airtable";
import { activationFrameworks } from "../src/data/activations";

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

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT! }).base(process.env.AIRTABLE_BASE_ID!);

async function main() {
  const fwRecords = await base("Activation Frameworks").select().all();
  const fwSlugById = new Map<string, string>();
  for (const r of fwRecords) fwSlugById.set(r.id, r.get("slug") as string);

  const featRecords = await base("Activation Features").select().all();

  // Build set of what's in Airtable per framework slug
  const airtableFeats = new Map<string, Set<string>>();
  for (const r of featRecords) {
    const linkedIds = r.get("framework") as string[] | undefined;
    const feature = r.get("feature") as string;
    if (!linkedIds) continue;
    for (const id of linkedIds) {
      const slug = fwSlugById.get(id) ?? "?";
      if (!airtableFeats.has(slug)) airtableFeats.set(slug, new Set());
      airtableFeats.get(slug)!.add(feature);
    }
  }

  // Features in STATIC but NOT in Airtable (these are what the user sees as ghosts)
  console.log("=== Features in STATIC but NOT in Airtable ===\n");
  let count1 = 0;
  for (const fw of activationFrameworks) {
    const atFeats = airtableFeats.get(fw.slug) ?? new Set();
    for (const feat of fw.includedFeatures) {
      if (!atFeats.has(feat.feature)) {
        console.log(`  [${fw.slug}] ${feat.category} -- ${feat.feature}`);
        count1++;
      }
    }
  }
  if (count1 === 0) console.log("  (none)");

  // Features in Airtable but NOT in static (new ones added in Airtable)
  console.log("\n=== Features in Airtable but NOT in Static ===\n");
  let count2 = 0;
  for (const fw of activationFrameworks) {
    const atFeats = airtableFeats.get(fw.slug) ?? new Set();
    const staticFeats = new Set(fw.includedFeatures.map((f) => f.feature));
    for (const feat of atFeats) {
      if (!staticFeats.has(feat)) {
        console.log(`  [${fw.slug}] ${feat}`);
        count2++;
      }
    }
  }
  if (count2 === 0) console.log("  (none)");

  // Counts
  console.log("\n=== Counts ===");
  for (const fw of activationFrameworks) {
    const atCount = airtableFeats.get(fw.slug)?.size ?? 0;
    const stCount = fw.includedFeatures.length;
    const match = atCount === stCount ? "MATCH" : "MISMATCH";
    console.log(`  ${fw.slug}: Airtable=${atCount}  Static=${stCount}  ${match}`);
  }
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
