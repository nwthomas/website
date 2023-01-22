import { DEFAULT_SEO_VALUES } from "../constants/seo";
import { ORIGIN } from "../constants/routes";
import { createHash } from "crypto";
import fs from "fs";
import { isProductionEnvironment } from "./../constants/environments";
import playwright from "playwright-aws-lambda";

// While Vercel has an edge function way of rendering dynamic OG images, I didn't want to deal with edge function.
// Instead, I generate OG images at build time and thereby offload any future costs of image generation to Vercel.
//
// See: https://phiilu.com/generate-open-graph-images-for-your-static-next-js-site
// Also: /pages/og.tsx
export async function getOgImage(path: string) {
  // Dynamic OG images are only build at build time for production
  if (!isProductionEnvironment) {
    return DEFAULT_SEO_VALUES.imageUrl;
  }

  const url = `${ORIGIN}${path}`;
  const hash = createHash("md5").update(url).digest("hex");
  const browser = await playwright.launchChromium({ headless: true });
  const ogImageDir = `./public/images/og`;
  const imagePath = `${ogImageDir}/${hash}.png`;
  const publicPath = `${ORIGIN}/images/og/${hash}.png`;

  try {
    fs.statSync(imagePath);

    return publicPath;
  } catch (error) {
    // If this is hit, it means the file has not been created yet, so
    // the rest of the function will run
  }

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(url, { waitUntil: "networkidle" });
  const buffer = await page.screenshot({ type: "png" });
  await browser.close();

  fs.mkdirSync(ogImageDir, { recursive: true });
  fs.writeFileSync(imagePath, buffer);

  return publicPath;
}
