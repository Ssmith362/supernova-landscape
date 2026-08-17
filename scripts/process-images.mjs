/**
 * One-off asset pipeline used to import Supernova's real photography from the
 * legacy Webflow site into /public. Kept in the repo so the import is
 * reproducible and so new photos can be added the same way.
 *
 * Usage:  node scripts/process-images.mjs <source-dir>
 * Requires: npm i -D sharp   (sharp is NOT a runtime dependency)
 */
import { mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2];
const ROOT = process.cwd();

if (!SRC || !existsSync(SRC)) {
  console.error("Usage: node scripts/process-images.mjs <source-dir>");
  process.exit(1);
}

/** [sourceFile, outputPath, width, options] */
const PHOTOS = [
  // Before / after pairs — real Supernova jobs
  ["before-1.jpg", "images/projects/backyard-reset-before.jpg", 1600],
  ["after-1.jpg", "images/projects/backyard-reset-after.jpg", 1600],
  ["before-2.jpg", "images/projects/flagstone-patio-before.jpg", 1600],
  ["after-2.jpg", "images/projects/flagstone-patio-after.jpg", 1600],
  ["before-3.jpg", "images/projects/side-yard-before.jpg", 1600],
  ["after-3.jpg", "images/projects/side-yard-after.jpg", 1600],

  // Standalone finished work
  ["after-6.jpg", "images/projects/front-entry-beds.jpg", 1400],
  ["sod-after.jpg", "images/projects/sod-lawn.jpg", 1600],
  ["clean-landscape.jpg", "images/projects/striped-lawn-barn.jpg", 2000],
  ["mowing-2.jpg", "images/projects/striped-lawn-acreage.jpg", 1600],
  ["job-20240420.jpg", "images/projects/boulder-slope-planting.jpg", 1600],
  ["gallery-2.webp", "images/projects/stone-wall-bed.jpg", 1000],
  ["gallery-3.webp", "images/projects/boulder-retaining-wall.jpg", 1000],
  ["gallery-4.webp", "images/projects/front-yard-rock-beds.jpg", 1000],
  ["gallery-a7.webp", "images/projects/mulch-island-bed.jpg", 1000],

  // Service imagery
  ["dethatcher.jpg", "images/services/dethatching.jpg", 1200],
  ["sprinkler-head.jpg", "images/services/irrigation.jpg", 1200],
  ["snow-blower.jpg", "images/services/snow-sidewalk.jpg", 1920],
  ["snow-plow-truck.jpg", "images/services/snow-plow-truck.jpg", 1920],
];

const LOGOS = [
  ["logo-full.png", "brand/logo.png", 900],
];

/**
 * Wide crops for full-bleed hero bands.
 *
 * A hero band is roughly 2.4:1 on desktop, so serving it a 4:3 source means
 * the browser downloads ~40% more pixels than it can ever show. These crops
 * exist purely to keep the LCP image small.
 * [sourceFile, outputPath, width, height]
 */
const HEROES = [
  ["mowing-2.jpg", "images/heroes/services.jpg", 2400, 1000],
  ["after-2.jpg", "images/heroes/projects.jpg", 2400, 1000],
  ["snow-plow-truck.jpg", "images/heroes/commercial-snow.jpg", 2400, 1000],
];

async function run() {
  const dirs = new Set(
    [...PHOTOS, ...LOGOS, ...HEROES].map(([, out]) =>
      path.dirname(path.join(ROOT, "public", out)),
    ),
  );
  for (const d of dirs) await mkdir(d, { recursive: true });

  for (const [src, out, w, h] of HEROES) {
    const from = path.join(SRC, src);
    if (!existsSync(from)) {
      console.warn(`skip hero (missing): ${src}`);
      continue;
    }
    const to = path.join(ROOT, "public", out);
    await sharp(from)
      .rotate()
      .resize(w, h, { fit: "cover", position: "attention" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(to);
    const m = await sharp(to).metadata();
    console.log(`${out.padEnd(48)} ${m.width}x${m.height}`);
  }

  for (const [src, out, width] of PHOTOS) {
    const from = path.join(SRC, src);
    if (!existsSync(from)) {
      console.warn(`skip (missing): ${src}`);
      continue;
    }
    const to = path.join(ROOT, "public", out);
    await sharp(from)
      .rotate() // honour EXIF orientation
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(to);
    const { width: w, height: h } = await sharp(to).metadata();
    console.log(`${out.padEnd(48)} ${w}x${h}`);
  }

  for (const [src, out, width] of LOGOS) {
    const from = path.join(SRC, src);
    if (!existsSync(from)) continue;
    const to = path.join(ROOT, "public", out);
    await sharp(from)
      .trim({ threshold: 12 })
      .resize({ width, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(to);
    const { width: w, height: h } = await sharp(to).metadata();
    console.log(`${out.padEnd(48)} ${w}x${h}`);
  }

  console.log("\nDone. Files written to /public:");
  for (const d of dirs) {
    const rel = path.relative(path.join(ROOT, "public"), d);
    const files = await readdir(d);
    console.log(`  ${rel || "."}: ${files.length} files`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
