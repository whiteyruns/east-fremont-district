/**
 * Optimize public images: convert JPG/PNG → WebP at quality 82, keep 1920px max width.
 * Removes originals after conversion.
 *
 * Usage: npx tsx scripts/optimize-images.ts
 */

import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "fs";
import { join } from "path";

const imagesDir = join(__dirname, "..", "public", "images");

function collectImages(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectImages(full));
    } else if (/\.(jpe?g|png)$/i.test(entry)) {
      results.push(full);
    }
  }
  return results;
}

async function optimize() {
  const images = collectImages(imagesDir);
  console.log(`Found ${images.length} images to optimize\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const src of images) {
    const before = statSync(src).size;
    totalBefore += before;

    const webpPath = src.replace(/\.(jpe?g|png)$/i, ".webp");

    await sharp(src)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(webpPath);

    const after = statSync(webpPath).size;
    totalAfter += after;

    // Remove original
    unlinkSync(src);

    const savings = ((1 - after / before) * 100).toFixed(0);
    const rel = src.replace(imagesDir + "/", "");
    console.log(
      `  ${rel} → .webp  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (${savings}% smaller)`
    );
  }

  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB  (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% reduction)`
  );
}

optimize().catch(console.error);
