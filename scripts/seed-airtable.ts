/**
 * Seed Airtable base — creates all tables, fields, and records.
 *
 * Usage:
 *   npx tsx scripts/seed-airtable.ts
 *
 * Reads AIRTABLE_PAT and AIRTABLE_BASE_ID from .env.local
 *
 * Prerequisites:
 *   1. Create a blank Airtable base (just the default empty base)
 *   2. Create a PAT with scopes: data.records:read, data.records:write, schema.bases:write
 *   3. Grant the PAT access to your base
 *   4. Put both values in .env.local
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import Airtable from "airtable";
import { venues } from "../src/data/venues";
import { activationFrameworks } from "../src/data/activations";
import { caseStudies } from "../src/data/case-studies";

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

const META_URL = `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`;
const headers = {
  Authorization: `Bearer ${PAT}`,
  "Content-Type": "application/json",
};

const base = new Airtable({ apiKey: PAT }).base(BASE_ID);

// ─── Metadata API helpers ────────────────────────────────────────────────────

type FieldSpec = {
  name: string;
  type: string;
  options?: Record<string, unknown>;
};

/** Create a new table with fields via the Metadata API */
async function createTable(
  name: string,
  fields: FieldSpec[]
): Promise<string> {
  const res = await fetch(META_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, fields }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create table "${name}": ${res.status} ${err}`);
  }
  const data = await res.json();
  console.log(`  ✓ Table "${name}" created (${data.id})`);
  return data.id;
}

/** Add a linked-record field to an existing table */
async function addLinkedField(
  tableId: string,
  fieldName: string,
  linkedTableId: string
): Promise<void> {
  const url = `${META_URL}/${tableId}/fields`;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: fieldName,
      type: "multipleRecordLinks",
      options: { linkedTableId },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(
      `Failed to add linked field "${fieldName}": ${res.status} ${err}`
    );
  }
}

// ─── Record batch helpers ────────────────────────────────────────────────────

async function batchCreate(
  table: string,
  records: Record<string, unknown>[]
): Promise<string[]> {
  const ids: string[] = [];
  for (let i = 0; i < records.length; i += 10) {
    const batch = records.slice(i, i + 10).map((fields) => ({ fields }));
    const created = await (base(table).create as Function)(batch);
    ids.push(...created.map((r: { id: string }) => r.id));
  }
  return ids;
}

// ─── Schema definitions ──────────────────────────────────────────────────────

const VENUES_FIELDS: FieldSpec[] = [
  { name: "slug", type: "singleLineText" },
  { name: "name", type: "singleLineText" },
  { name: "operator", type: "singleLineText" },
  { name: "address", type: "singleLineText" },
  {
    name: "zone",
    type: "singleSelect",
    options: {
      choices: [
        { name: "WEST" },
        { name: "CENTRAL" },
        { name: "EAST" },
        { name: "TBD" },
      ],
    },
  },
  { name: "capacity", type: "number", options: { precision: 0 } },
  { name: "squareFeet", type: "number", options: { precision: 0 } },
  { name: "hasRooftop", type: "checkbox", options: { icon: "check", color: "greenBright" } },
  { name: "hasStage", type: "checkbox", options: { icon: "check", color: "greenBright" } },
  { name: "hasKitchen", type: "checkbox", options: { icon: "check", color: "greenBright" } },
  { name: "adaAccessible", type: "checkbox", options: { icon: "check", color: "greenBright" } },
  { name: "notes", type: "multilineText" },
];

const FRAMEWORKS_FIELDS: FieldSpec[] = [
  { name: "slug", type: "singleLineText" },
  { name: "name", type: "singleLineText" },
  {
    name: "tier",
    type: "singleSelect",
    options: {
      choices: [
        { name: "core" },
        { name: "expanded" },
        { name: "full-takeover" },
      ],
    },
  },
  { name: "startingRange", type: "singleLineText" },
  { name: "idealGuestCount", type: "singleLineText" },
  { name: "positioningLine", type: "singleLineText" },
  { name: "description", type: "multilineText" },
  { name: "venueAccess", type: "singleLineText" },
  { name: "productionLevel", type: "singleLineText" },
  { name: "brandingIncluded", type: "multilineText" },
  { name: "addOns", type: "multilineText" },
  { name: "sortOrder", type: "number", options: { precision: 0 } },
];

const FEATURES_FIELDS: FieldSpec[] = [
  { name: "category", type: "singleLineText" },
  { name: "feature", type: "singleLineText" },
  { name: "included", type: "checkbox", options: { icon: "check", color: "greenBright" } },
  // "framework" linked field added after table creation
];

const CASE_STUDIES_FIELDS: FieldSpec[] = [
  { name: "slug", type: "singleLineText" },
  { name: "title", type: "singleLineText" },
  {
    name: "clientType",
    type: "singleSelect",
    options: {
      choices: [
        { name: "corporate" },
        { name: "convention" },
        { name: "brand-activation" },
        { name: "association" },
        { name: "private" },
      ],
    },
  },
  { name: "clientName", type: "singleLineText" },
  { name: "date", type: "singleLineText" },
  { name: "guestCount", type: "number", options: { precision: 0 } },
  {
    name: "activationScope",
    type: "multipleSelects",
    options: {
      choices: [
        { name: "single-venue" },
        { name: "multi-venue" },
        { name: "street-activation" },
        { name: "full-takeover" },
        { name: "rooftop" },
        { name: "stage-program" },
        { name: "branding-package" },
      ],
    },
  },
  { name: "infrastructureUsed", type: "multilineText" },
  { name: "customElements", type: "multilineText" },
  { name: "heroImageUrl", type: "singleLineText" },
  { name: "galleryImages", type: "multilineText" },
  { name: "testimonialQuote", type: "multilineText" },
  { name: "testimonialAttribution", type: "singleLineText" },
  { name: "testimonialRole", type: "singleLineText" },
  { name: "summary", type: "multilineText" },
  { name: "sortOrder", type: "number", options: { precision: 0 } },
  // "caseStudy" linked field added on Results table
];

const RESULTS_FIELDS: FieldSpec[] = [
  { name: "metric", type: "singleLineText" },
  { name: "value", type: "singleLineText" },
  { name: "context", type: "singleLineText" },
  // "caseStudy" linked field added after table creation
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Setting up Airtable base...\n");

  // 1. Create tables
  console.log("Creating tables...");
  const venuesTableId = await createTable("Venues", VENUES_FIELDS);
  const fwTableId = await createTable("Activation Frameworks", FRAMEWORKS_FIELDS);
  const featTableId = await createTable("Activation Features", FEATURES_FIELDS);
  const csTableId = await createTable("Case Studies", CASE_STUDIES_FIELDS);
  const resTableId = await createTable("Case Study Results", RESULTS_FIELDS);

  // 2. Add linked-record fields
  console.log("\nAdding linked fields...");
  await addLinkedField(featTableId, "framework", fwTableId);
  console.log('  ✓ "framework" link on Activation Features');
  await addLinkedField(resTableId, "caseStudy", csTableId);
  console.log('  ✓ "caseStudy" link on Case Study Results');

  // 3. Seed venues
  console.log("\nSeeding Venues...");
  const venueRecords = venues.map((v) => ({
    slug: v.slug,
    name: v.name,
    operator: v.operator ?? "",
    address: v.address,
    zone: v.zone,
    capacity: v.capacity,
    squareFeet: v.squareFeet,
    hasRooftop: v.hasRooftop ?? false,
    hasStage: v.hasStage ?? false,
    hasKitchen: v.hasKitchen ?? false,
    adaAccessible: v.adaAccessible ?? false,
    notes: v.notes,
  }));
  await batchCreate("Venues", venueRecords);
  console.log(`  ✓ ${venueRecords.length} venues`);

  // 4. Seed frameworks + features
  console.log("\nSeeding Activation Frameworks...");
  const fwRecords = activationFrameworks.map((fw, i) => ({
    slug: fw.slug,
    name: fw.name,
    tier: fw.tier,
    startingRange: fw.startingRange,
    idealGuestCount: fw.idealGuestCount,
    positioningLine: fw.positioningLine,
    description: fw.description,
    venueAccess: fw.venueAccess,
    productionLevel: fw.productionLevel,
    brandingIncluded: fw.brandingIncluded.join("\n"),
    addOns: (fw.addOns ?? []).join("\n"),
    sortOrder: i + 1,
  }));
  const fwIds = await batchCreate("Activation Frameworks", fwRecords);
  console.log(`  ✓ ${fwIds.length} frameworks`);

  console.log("Seeding Activation Features...");
  let featCount = 0;
  for (let fi = 0; fi < activationFrameworks.length; fi++) {
    const fw = activationFrameworks[fi];
    const fwId = fwIds[fi];
    const featRecords = fw.includedFeatures.map((feat) => ({
      category: feat.category,
      feature: feat.feature,
      included: feat.included,
      framework: [fwId],
    }));
    await batchCreate("Activation Features", featRecords);
    featCount += featRecords.length;
  }
  console.log(`  ✓ ${featCount} features`);

  // 5. Seed case studies + results
  console.log("\nSeeding Case Studies...");
  const csRecords = caseStudies.map((cs, i) => ({
    slug: cs.slug,
    title: cs.title,
    clientType: cs.clientType,
    clientName: cs.clientName ?? "",
    date: cs.date,
    guestCount: cs.guestCount,
    activationScope: cs.activationScope,
    infrastructureUsed: cs.infrastructureUsed.join("\n"),
    customElements: cs.customElements.join("\n"),
    heroImageUrl: cs.heroImageUrl,
    galleryImages: cs.galleryImages.join("\n"),
    testimonialQuote: cs.testimonial?.quote ?? "",
    testimonialAttribution: cs.testimonial?.attribution ?? "",
    testimonialRole: cs.testimonial?.role ?? "",
    summary: cs.summary,
    sortOrder: i + 1,
  }));
  const csIds = await batchCreate("Case Studies", csRecords);
  console.log(`  ✓ ${csIds.length} case studies`);

  console.log("Seeding Case Study Results...");
  let resCount = 0;
  for (let ci = 0; ci < caseStudies.length; ci++) {
    const cs = caseStudies[ci];
    const csId = csIds[ci];
    const resRecords = cs.results.map((res) => ({
      metric: res.metric,
      value: res.value,
      context: res.context ?? "",
      caseStudy: [csId],
    }));
    await batchCreate("Case Study Results", resRecords);
    resCount += resRecords.length;
  }
  console.log(`  ✓ ${resCount} results`);

  console.log("\n✅ Done! All tables, fields, and data created.");
  console.log(`\nBase ID: ${BASE_ID}`);
  console.log("You can now view and edit your data at airtable.com");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
