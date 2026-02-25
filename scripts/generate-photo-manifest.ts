/**
 * Generate photoManifest.json from photos.json
 *
 * Usage: npx tsx scripts/generate-photo-manifest.ts
 *
 * Reads src/data/photos.json, runs all scoring/filtering,
 * and writes src/data/photoManifest.json with pre-computed arrays.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// ── Types ──────────────────────────────────────────────────────────

type CrowdScale = "none" | "small" | "medium" | "large";
type Perspective = "aerial" | "ground" | "close";

interface Photo {
  filename: string;
  score: number;
  crowd_scale: CrowdScale;
  perspective: Perspective;
  security_gates_visible: boolean;
  staging_visible: boolean;
  rooftop_environment: boolean;
  sponsor_branding_visible: boolean;
  caption?: string;
  tags?: string[];
}

interface ScoredPhoto extends Photo {
  computed_score: number;
}

// ── Scorers ────────────────────────────────────────────────────────

const heroScore = (p: Photo) =>
  p.score +
  (p.crowd_scale === "large" ? 3 : 0) +
  (p.security_gates_visible ? 2 : 0) +
  (p.staging_visible ? 2 : 0) +
  (p.sponsor_branding_visible ? 1 : 0);

const infraScore = (p: Photo) =>
  p.score +
  (p.security_gates_visible ? 5 : 0) +
  (p.staging_visible ? 3 : 0) +
  (p.crowd_scale === "medium" ? 1 : 0) +
  (p.crowd_scale === "large" ? 2 : 0) +
  (p.perspective === "aerial" ? 1 : 0);

const opsScore = (p: Photo) =>
  p.score +
  (p.staging_visible ? 3 : 0) +
  (p.security_gates_visible ? 3 : 0) +
  (p.staging_visible && p.security_gates_visible ? 4 : 0) +
  (p.crowd_scale === "large" ? 1 : 0) +
  (p.sponsor_branding_visible ? -1 : 0);

const brandingScore = (p: Photo) =>
  p.score +
  (p.sponsor_branding_visible ? 4 : 0) +
  (p.crowd_scale === "medium" || p.crowd_scale === "large" ? 2 : 0) +
  (p.perspective === "close" ? 2 : 0);

// ── Helpers ────────────────────────────────────────────────────────

function scoreAndSort(
  photos: Photo[],
  filter: (p: Photo) => boolean,
  scorer: (p: Photo) => number
): ScoredPhoto[] {
  return photos
    .filter(filter)
    .map((p) => ({ ...p, computed_score: scorer(p) }))
    .sort((a, b) => b.computed_score - a.computed_score);
}

function filterAndSort(
  photos: Photo[],
  filter: (p: Photo) => boolean
): Photo[] {
  return photos.filter(filter).sort((a, b) => b.score - a.score);
}

// ── Generate ───────────────────────────────────────────────────────

const root = resolve(__dirname, "..");
const photosPath = resolve(root, "src/data/photos.json");
const outputPath = resolve(root, "src/data/photoManifest.json");

const photos: Photo[] = JSON.parse(readFileSync(photosPath, "utf-8"));

const heroCandidates = scoreAndSort(
  photos,
  (p) =>
    p.perspective === "aerial" &&
    (p.crowd_scale === "medium" || p.crowd_scale === "large") &&
    (p.security_gates_visible || p.staging_visible),
  heroScore
).slice(0, 5);

const districtImages = scoreAndSort(
  photos,
  (p) =>
    (p.security_gates_visible || p.staging_visible) &&
    p.crowd_scale !== "none" &&
    p.perspective !== "close",
  infraScore
).slice(0, 5);

const productionImages = scoreAndSort(
  photos,
  (p) =>
    (p.staging_visible || p.security_gates_visible) &&
    (p.crowd_scale === "small" ||
      p.crowd_scale === "medium" ||
      p.crowd_scale === "large"),
  opsScore
).slice(0, 8);

const brandingImages = scoreAndSort(
  photos,
  (p) => p.sponsor_branding_visible,
  brandingScore
).slice(0, 8);

const caseStudyImages = {
  arrival: filterAndSort(photos, (p) => p.security_gates_visible).slice(0, 2),
  bigMoment: filterAndSort(
    photos,
    (p) => p.crowd_scale === "large" && p.staging_visible
  ).slice(0, 2),
  branding: filterAndSort(
    photos,
    (p) => p.sponsor_branding_visible
  ).slice(0, 3),
  rooftop: filterAndSort(photos, (p) => p.rooftop_environment).slice(0, 2),
  detail: filterAndSort(
    photos,
    (p) =>
      (p.crowd_scale === "none" || p.crowd_scale === "small") &&
      (p.perspective === "close" || p.perspective === "ground")
  ).slice(0, 2),
};

const manifest = {
  generated: new Date().toISOString(),
  totalPhotos: photos.length,
  heroCandidates,
  districtImages,
  productionImages,
  brandingImages,
  caseStudyImages,
};

writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(`photoManifest.json generated`);
console.log(`  total photos: ${photos.length}`);
console.log(`  hero:         ${heroCandidates.length}`);
console.log(`  district:     ${districtImages.length}`);
console.log(`  production:   ${productionImages.length}`);
console.log(`  branding:     ${brandingImages.length}`);
console.log(`  case study:   ${Object.values(caseStudyImages).flat().length} (across 5 lanes)`);
