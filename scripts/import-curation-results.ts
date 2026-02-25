/**
 * Import image-curation-results.json into photos.json
 *
 * Usage: npx tsx scripts/import-curation-results.ts
 *
 * Maps perspective values: ground-level → ground, close-up → close
 * Strips extra fields (width, height, aspect_ratio, orientation)
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const inputPath = resolve(root, "assets/raw/image-curation-results.json");
const outputPath = resolve(root, "src/data/photos.json");

const perspectiveMap: Record<string, string> = {
  aerial: "aerial",
  "ground-level": "ground",
  "close-up": "close",
};

const curation = JSON.parse(readFileSync(inputPath, "utf-8"));
const photos = curation.all_images.map(
  (img: Record<string, unknown>) => ({
    filename: img.filename,
    score: img.score,
    crowd_scale: img.crowd_scale,
    perspective: perspectiveMap[img.perspective as string] ?? img.perspective,
    security_gates_visible: img.security_gates_visible,
    staging_visible: img.staging_visible,
    rooftop_environment: img.rooftop_environment,
    sponsor_branding_visible: img.sponsor_branding_visible,
    caption: img.caption,
    tags: img.tags,
  })
);

writeFileSync(outputPath, JSON.stringify(photos, null, 2) + "\n");
console.log(`photos.json updated with ${photos.length} images`);
