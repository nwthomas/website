// Downloads a favicon for every bookmark hostname, shrinks it to a tiny WebP in
// public/images/bookmarks/favicons/, and regenerates app/bookmarks/favicons.ts so
// the bookmarks list knows which hostnames have an icon (the rest get a link icon).
//
// Usage: bun ./scripts/fetch-bookmark-favicons.ts [--force]
//   --force  re-download icons that already exist on disk

import fs from "fs";
import path from "path";
import sharp, { type Sharp } from "sharp";

import { BOOKMARKS } from "../app/bookmarks/bookmarks";

// Icons render at roughly 14px, so 32px stays sharp on 2x displays while staying tiny
const ICON_SIZE = 32;
const CONCURRENCY = 8;
const TIMEOUT_MS = 10_000;
const USER_AGENT = "Mozilla/5.0 (compatible; bookmark-favicon-fetcher)";

const ROOT = path.join(import.meta.dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public/images/bookmarks/favicons");
const MANIFEST_PATH = path.join(ROOT, "app/bookmarks/favicons.ts");

type IconCandidate = {
  href: string;
  // Higher scores are tried first
  score: number;
};

async function fetchWithTimeout(url: string): Promise<Response> {
  return fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

function getAttribute(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match ? (match[1] ?? match[2] ?? match[3]) : undefined;
}

function scoreIcon(rel: string, type: string | undefined, sizes: string | undefined, href: string): number {
  if (type?.includes("svg") || /\.svg(\?|$)/i.test(href)) {
    return 10_000;
  }
  const largestSize = Math.max(
    0,
    ...(sizes ?? "")
      .split(/\s+/)
      .map((size) => parseInt(size.split("x")[0], 10))
      .filter((size) => !Number.isNaN(size)),
  );
  // Prefer icons at or above the output size, then the smallest of those to limit download size
  if (largestSize >= ICON_SIZE) {
    return 5_000 - largestSize;
  }
  if (largestSize > 0) {
    return 1_000 + largestSize;
  }
  // Unsized apple-touch-icons are usually 180px and better than an unsized favicon
  return rel.includes("apple-touch-icon") ? 900 : 500;
}

function findIconCandidates(html: string, baseUrl: string): IconCandidate[] {
  const candidates: IconCandidate[] = [];
  for (const [tag] of html.matchAll(/<link\b[^>]*>/gi)) {
    const rel = getAttribute(tag, "rel")?.toLowerCase() ?? "";
    const href = getAttribute(tag, "href");
    if (!href || !rel.split(/\s+/).some((value) => value === "icon" || value.startsWith("apple-touch-icon"))) {
      continue;
    }
    try {
      const absoluteHref = new URL(href.replaceAll("&amp;", "&"), baseUrl).toString();
      candidates.push({
        href: absoluteHref,
        score: scoreIcon(rel, getAttribute(tag, "type"), getAttribute(tag, "sizes"), absoluteHref),
      });
    } catch {
      // Ignore malformed hrefs
    }
  }
  return candidates.sort((a, b) => b.score - a.score);
}

// sharp cannot read .ico files, so pull out the largest image they contain.
// Modern .ico entries are usually embedded PNGs; older ones are BMP bitmaps.
function decodeIco(data: Buffer): Sharp | null {
  if (data.length < 6 || data.readUInt16LE(0) !== 0 || data.readUInt16LE(2) !== 1) {
    return null;
  }
  const count = data.readUInt16LE(4);
  let best: { width: number; bpp: number; size: number; offset: number } | null = null;
  for (let i = 0; i < count; i++) {
    const entry = 6 + i * 16;
    if (entry + 16 > data.length) {
      break;
    }
    const width = data[entry] || 256;
    const bpp = data.readUInt16LE(entry + 6);
    const size = data.readUInt32LE(entry + 8);
    const offset = data.readUInt32LE(entry + 12);
    if (offset + size > data.length) {
      continue;
    }
    if (!best || width > best.width || (width === best.width && bpp > best.bpp)) {
      best = { width, bpp, size, offset };
    }
  }
  if (!best) {
    return null;
  }

  const image = data.subarray(best.offset, best.offset + best.size);
  if (image.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return sharp(image);
  }
  return decodeIcoBitmap(image);
}

function decodeIcoBitmap(image: Buffer): Sharp | null {
  const headerSize = image.readUInt32LE(0);
  const width = image.readInt32LE(4);
  // The stored height covers both the color data and the transparency mask
  const height = Math.abs(image.readInt32LE(8)) / 2;
  const bpp = image.readUInt16LE(14);
  const compression = image.readUInt32LE(16);
  const colorsUsed = image.readUInt32LE(32);
  if (compression !== 0 || ![1, 4, 8, 24, 32].includes(bpp) || width <= 0 || height <= 0) {
    return null;
  }

  const paletteSize = bpp <= 8 ? colorsUsed || 1 << bpp : 0;
  const paletteStart = headerSize;
  const colorStart = paletteStart + paletteSize * 4;
  const colorRowSize = Math.ceil((width * bpp) / 32) * 4;
  const maskStart = colorStart + colorRowSize * height;
  const maskRowSize = Math.ceil(width / 32) * 4;
  const hasMask = maskStart + maskRowSize * height <= image.length;
  if (colorStart + colorRowSize * height > image.length) {
    return null;
  }

  const pixels = Buffer.alloc(width * height * 4);
  let anyAlpha = false;
  for (let y = 0; y < height; y++) {
    // Bitmap rows are stored bottom-up
    const row = colorStart + (height - 1 - y) * colorRowSize;
    for (let x = 0; x < width; x++) {
      const out = (y * width + x) * 4;
      let b: number, g: number, r: number;
      let a = 255;
      if (bpp === 32 || bpp === 24) {
        const pixel = row + x * (bpp / 8);
        [b, g, r] = [image[pixel], image[pixel + 1], image[pixel + 2]];
        if (bpp === 32) {
          a = image[pixel + 3];
          anyAlpha ||= a > 0;
        }
      } else {
        const bitOffset = x * bpp;
        const byte = image[row + (bitOffset >> 3)];
        const index = (byte >> (8 - bpp - (bitOffset & 7))) & ((1 << bpp) - 1);
        const color = paletteStart + index * 4;
        [b, g, r] = [image[color], image[color + 1], image[color + 2]];
      }
      pixels[out] = r;
      pixels[out + 1] = g;
      pixels[out + 2] = b;
      pixels[out + 3] = a;
    }
  }

  // Without real alpha in the color data, the 1-bit mask marks transparent pixels
  if (!anyAlpha && hasMask) {
    for (let y = 0; y < height; y++) {
      const row = maskStart + (height - 1 - y) * maskRowSize;
      for (let x = 0; x < width; x++) {
        const masked = (image[row + (x >> 3)] >> (7 - (x & 7))) & 1;
        pixels[(y * width + x) * 4 + 3] = masked ? 0 : 255;
      }
    }
  }

  return sharp(pixels, { raw: { width, height, channels: 4 } });
}

async function downloadIcon(url: string): Promise<Buffer | null> {
  const response = await fetchWithTimeout(url);
  if (!response.ok) {
    return null;
  }
  const contentType = response.headers.get("content-type") ?? "";
  // Sites without an icon often answer with their HTML page instead of a 404
  if (contentType.includes("text/html")) {
    return null;
  }
  const data = Buffer.from(await response.arrayBuffer());
  const isIco = contentType.includes("icon") || /\.ico(\?|$)/i.test(url) || data.readUInt16LE(2) === 1;
  const image = (isIco ? decodeIco(data) : null) ?? sharp(data, { density: 300 });
  const resized = image
    .resize(ICON_SIZE, ICON_SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha();
  // Some icons (often SVGs styled by page CSS) render as nothing, so try the next candidate
  const pixels = await resized.raw().toBuffer();
  if (!pixels.some((value, index) => index % 4 === 3 && value >= 32)) {
    return null;
  }
  return sharp(pixels, { raw: { width: ICON_SIZE, height: ICON_SIZE, channels: 4 } })
    .webp({ quality: 80, alphaQuality: 90, effort: 6 })
    .toBuffer();
}

async function fetchFavicon(origin: string): Promise<Buffer | null> {
  let candidates: IconCandidate[] = [];
  try {
    const response = await fetchWithTimeout(origin);
    if (response.ok && (response.headers.get("content-type") ?? "").includes("text/html")) {
      candidates = findIconCandidates(await response.text(), response.url);
    }
  } catch {
    // Fall through to /favicon.ico
  }
  candidates.push({ href: new URL("/favicon.ico", origin).toString(), score: 0 });

  for (const { href } of candidates) {
    try {
      const icon = await downloadIcon(href);
      if (icon) {
        return icon;
      }
    } catch {
      // Try the next candidate
    }
  }
  return null;
}

async function runPool<T>(items: T[], worker: (item: T) => Promise<void>): Promise<void> {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (next < items.length) {
        await worker(items[next++]);
      }
    }),
  );
}

function writeManifest(hostnames: string[]): void {
  const lines = hostnames.map((hostname) => `  ${JSON.stringify(hostname)},`).join("\n");
  fs.writeFileSync(
    MANIFEST_PATH,
    `// Generated by scripts/fetch-bookmark-favicons.ts. Do not edit by hand.
// Hostnames with a downloaded icon at /images/bookmarks/favicons/<hostname>.webp
export const FAVICON_HOSTNAMES: ReadonlySet<string> = new Set([
${lines}
]);
`,
  );
}

async function main(): Promise<void> {
  const force = process.argv.includes("--force");
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const origins = new Map<string, string>();
  for (const { url } of BOOKMARKS) {
    const { hostname, origin } = new URL(url);
    origins.set(hostname, origin);
  }

  const iconPath = (hostname: string) => path.join(OUTPUT_DIR, `${hostname}.webp`);
  const pending = [...origins.keys()].filter((hostname) => force || !fs.existsSync(iconPath(hostname)));
  console.log(`Fetching ${pending.length} of ${origins.size} favicons...`);

  const missing: string[] = [];
  await runPool(pending, async (hostname) => {
    const icon = await fetchFavicon(origins.get(hostname)!);
    if (icon) {
      fs.writeFileSync(iconPath(hostname), icon);
    } else {
      missing.push(hostname);
    }
  });

  const available = [...origins.keys()].filter((hostname) => fs.existsSync(iconPath(hostname))).sort();
  writeManifest(available);

  console.log(`${available.length} of ${origins.size} hostnames have a favicon.`);
  if (missing.length > 0) {
    console.log(`No favicon found (link icon used instead):\n  ${missing.sort().join("\n  ")}`);
  }
}

await main();
