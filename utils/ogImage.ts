import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "../pages/og-image";

import { DEFAULT_SEO_VALUES } from "../constants/seo";
import { ORIGIN } from "../constants/routes";
// This solution was originally based off of:
// https://github.com/JupiterOne/playwright-aws-lambda/issues/15#issuecomment-1243395780
import chromium from "@sparticuz/chromium";
import { createHash } from "crypto";
import fs from "fs";
import { isProductionEnvironment } from "./../constants/environments";
import { chromium as playwright } from "playwright-core";

// File-based lock to prevent concurrent browser launches across processes
const LOCK_FILE = "/tmp/chromium-launch.lock";
const MAX_LOCK_WAIT = 30000; // 30 seconds
const LOCK_CHECK_INTERVAL = 100; // 100ms

async function acquireLock(): Promise<void> {
  const startTime = Date.now();

  while (true) {
    try {
      // Try to create the lock file exclusively
      fs.writeFileSync(LOCK_FILE, process.pid.toString(), { flag: "wx" });
      return; // Lock acquired
    } catch (error) {
      // Lock file exists, wait and retry
      if (Date.now() - startTime > MAX_LOCK_WAIT) {
        // Force remove stale lock after timeout
        try {
          fs.unlinkSync(LOCK_FILE);
        } catch {
          // Ignore if already removed
        }
        continue;
      }

      await new Promise((resolve) => setTimeout(resolve, LOCK_CHECK_INTERVAL));
    }
  }
}

function releaseLock(): void {
  try {
    fs.unlinkSync(LOCK_FILE);
  } catch {
    // Ignore if already removed
  }
}

// While Vercel has an edge function way of rendering dynamic OG images, I didn't want to deal with edge function.
// Instead, I generate OG images at build time and thereby offload any future costs of image generation to Vercel.
//
// See: https://phiilu.com/generate-open-graph-images-for-your-static-next-js-site
// Also: /pages/og.tsx
export async function createOgImage(path: string) {
  // Dynamic OG images are only built at build time for production
  if (!isProductionEnvironment) {
    return DEFAULT_SEO_VALUES.imageUrl;
  }

  const url = `${ORIGIN}${path}`;
  const hash = createHash("md5").update(url).digest("hex");
  const ogImageDir = "./public/images/og";
  const imagePath = `${ogImageDir}/${hash}.jpeg`;
  const publicPath = `/images/og/${hash}.jpeg`;

  console.log(`Creating new og image for ${hash} at: ${ogImageDir}`);

  try {
    fs.statSync(imagePath);
    console.log(`Image already created for ${hash}. Returning.`);
    return publicPath;
  } catch (error) {
    // If this is hit, it means the file has not been created yet, so
    // the rest of the function will run
  }

  // Acquire lock to ensure only one browser instance runs at a time
  await acquireLock();

  let buffer: Buffer;
  try {
    const executablePath = await chromium.executablePath();

    console.log(`Launching browser for ${hash}.`);
    const browser = await playwright.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    });

    console.log(`Taking screenshot for ${hash}.`);
    const page = await browser.newPage();
    await page.setViewportSize({
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
    });
    await page.goto(url, { waitUntil: "networkidle" });
    buffer = (await page.screenshot({ quality: 75, type: "jpeg" })) as Buffer;
    await browser.close();
  } finally {
    // Always release the lock, even if an error occurs
    releaseLock();
  }

  console.log(`Writing to file for ${hash}: `, imagePath);
  fs.mkdirSync(ogImageDir, { recursive: true });
  fs.writeFileSync(imagePath, new Uint8Array(buffer));

  return publicPath;
}
