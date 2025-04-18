import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "../pages/og-image";

import { DEFAULT_SEO_VALUES } from "../constants/seo";
import { ORIGIN } from "../constants/routes";
import { createHash } from "crypto";
import fs from "fs";
import { isProductionEnvironment } from "./../constants/environments";
// This solution was pulled from:
// https://github.com/JupiterOne/playwright-aws-lambda/issues/15#issuecomment-1243395780
import { launchChromium } from "playwright-aws-lambda/dist/src/chromium";

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
  const browser = await launchChromium({ headless: true });
  const ogImageDir = "./public/images/og";

  console.log(`Creating new og image for ${hash} at: ${ogImageDir}`);
  const imagePath = `${ogImageDir}/${hash}.jpeg`;
  const publicPath = `/images/og/${hash}.jpeg`;

  try {
    fs.statSync(imagePath);
    console.log(`Image already created for ${hash}. Returning.`);

    return publicPath;
  } catch (error) {
    // If this is hit, it means the file has not been created yet, so
    // the rest of the function will run
  }

  console.log(`Taking screenshot for ${hash}.`);
  const page = await browser.newPage();
  await page.setViewportSize({
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  });
  await page.goto(url, { waitUntil: "networkidle" });
  const buffer = await page.screenshot({ quality: 75, type: "jpeg" });
  await browser.close();

  console.log(`Writing to file for ${hash}: `, imagePath);
  fs.mkdirSync(ogImageDir, { recursive: true });
  fs.writeFileSync(imagePath, buffer);

  return publicPath;
}
