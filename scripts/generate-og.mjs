/**
 * Generates the branded 1200x630 Open Graph share card into
 * /public/og/default.png.
 *
 * Built as a static asset rather than a runtime ImageResponse route so there
 * is zero per-request cost on Hostinger and no font-loading dependency at
 * runtime. Pages that have their own strong photography (service, location and
 * project pages) reference that photo directly instead — see src/lib/seo.ts.
 *
 * Usage:  node scripts/generate-og.mjs
 * Requires: npm i -D sharp
 *
 * Re-run this if the phone number, rating or review count in
 * src/config/site.ts changes.
 */
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const W = 1200;
const H = 630;

// Kept in sync with src/config/site.ts by hand — re-run after changing those.
const PHONE = "(509) 808-3130";
const RATING = "4.9";
const REVIEWS = "53";

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const overlay = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="#04150c" stop-opacity="1"/>
      <stop offset="60%" stop-color="#04150c" stop-opacity="0.97"/>
      <stop offset="100%" stop-color="#04150c" stop-opacity="0.72"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="#e0a02a"/>

  <text x="72" y="146" font-family="Georgia, 'Times New Roman', serif"
        font-size="26" fill="#a9c0a9" letter-spacing="4">
    SPOKANE · SPOKANE VALLEY · LIBERTY LAKE
  </text>

  <text x="72" y="240" font-family="Georgia, 'Times New Roman', serif"
        font-size="66" font-weight="700" fill="#ffffff">
    Supernova Landscape
  </text>

  <text x="72" y="312" font-family="Georgia, 'Times New Roman', serif"
        font-size="38" fill="#e3ede3">
    Landscaping, lawn care and snow removal,
  </text>
  <text x="72" y="362" font-family="Georgia, 'Times New Roman', serif"
        font-size="38" fill="#e3ede3">
    done properly.
  </text>

  <g transform="translate(72, 424)">
    <rect width="486" height="68" fill="#ffffff" fill-opacity="0.09" stroke="#e0a02a" stroke-opacity="0.6"/>
    <text x="26" y="45" font-family="Georgia, 'Times New Roman', serif"
          font-size="32" font-weight="700" fill="#e0a02a">★ ${esc(RATING)}</text>
    <text x="132" y="45" font-family="Georgia, 'Times New Roman', serif"
          font-size="27" fill="#ffffff">from ${esc(REVIEWS)} Google reviews</text>
  </g>

  <text x="72" y="556" font-family="Georgia, 'Times New Roman', serif"
        font-size="38" font-weight="700" fill="#ffffff">${esc(PHONE)}</text>
  <text x="72" y="596" font-family="Georgia, 'Times New Roman', serif"
        font-size="25" fill="#a9c0a9">Free estimates · supernovalandscape.com</text>
</svg>`;

async function run() {
  const outDir = path.join(ROOT, "public", "og");
  await mkdir(outDir, { recursive: true });

  const photo = await sharp(
    path.join(ROOT, "public", "images", "projects", "striped-lawn-barn.jpg"),
  )
    .resize(W, H, { fit: "cover", position: "right" })
    .toBuffer();

  // White silhouette of the logo, built from its alpha channel. Negating the
  // colours instead would turn the brand green magenta.
  const sized = await sharp(path.join(ROOT, "public", "brand", "logo.png"))
    .resize({ height: 88 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = Buffer.alloc(sized.data.length);
  for (let i = 0; i < sized.data.length; i += 4) {
    px[i] = 255;
    px[i + 1] = 255;
    px[i + 2] = 255;
    px[i + 3] = sized.data[i + 3];
  }
  const logo = await sharp(px, {
    raw: {
      width: sized.info.width,
      height: sized.info.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();

  const outFile = path.join(outDir, "default.jpg");
  await sharp(photo)
    .composite([
      { input: Buffer.from(overlay), top: 0, left: 0 },
      { input: logo, top: 44, left: W - sized.info.width - 64 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outFile);

  const out = await sharp(outFile).metadata();
  const bytes = await readFile(outFile).then((b) => b.length);
  console.log(
    `public/og/default.jpg  ${out.width}x${out.height}  ${Math.round(bytes / 1024)}KB`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
