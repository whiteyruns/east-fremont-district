/**
 * Copy photos from assets/raw into shortlist folders based on photoManifest.json
 *
 * Usage: npx tsx scripts/shortlist-photos.ts
 *
 * Creates:
 *   assets/shortlist/hero/
 *   assets/shortlist/district/
 *   assets/shortlist/production/
 *   assets/shortlist/branding/
 *   assets/shortlist/case-study/
 *
 * Copies matching filenames from assets/raw — no renaming, no modification.
 */

import { readFileSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";

const root = resolve(__dirname, "..");
const manifestPath = resolve(root, "src/data/photoManifest.json");
const rawDir = resolve(root, "assets/raw");
const shortlistDir = resolve(root, "assets/shortlist");

const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

interface ManifestPhoto {
  filename: string;
  [key: string]: unknown;
}

const sets: [string, ManifestPhoto[]][] = [
  ["hero", manifest.heroCandidates],
  ["district", manifest.districtImages],
  ["production", manifest.productionImages],
  ["branding", manifest.brandingImages],
  [
    "case-study",
    [
      ...manifest.caseStudyImages.arrival,
      ...manifest.caseStudyImages.bigMoment,
      ...manifest.caseStudyImages.branding,
      ...manifest.caseStudyImages.rooftop,
      ...manifest.caseStudyImages.detail,
    ],
  ],
];

let totalCopied = 0;
let totalMissing = 0;

for (const [folder, photos] of sets) {
  const destDir = join(shortlistDir, folder);
  mkdirSync(destDir, { recursive: true });

  // Dedupe — same photo can appear in multiple lanes (e.g. case-study)
  const seen = new Set<string>();

  for (const photo of photos) {
    if (seen.has(photo.filename)) continue;
    seen.add(photo.filename);

    const src = join(rawDir, photo.filename);
    const dest = join(destDir, photo.filename);

    if (!existsSync(src)) {
      console.warn(`  MISSING: ${photo.filename} (not in assets/raw)`);
      totalMissing++;
      continue;
    }

    copyFileSync(src, dest);
    totalCopied++;
  }

  console.log(`${folder}: ${seen.size} files → ${destDir}`);
}

console.log(`\nDone. ${totalCopied} copied, ${totalMissing} missing.`);
