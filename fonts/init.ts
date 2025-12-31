// This file is run by the package.json postinstall script to copy font
// files for use in opengraph-image generation. The actual site uses the
// npm installed geist package.

import fs from "fs";
import path from "path";

type FontConfig = {
  src: string;
  dest: string;
};

// Fonts needed for opengraph-image generation. NextJS' ImageResponse requires
// TTF fonts at time of this commit, so the below copies that file type instead
// of the WOFF2 ones.
const fontPaths: FontConfig[] = [
  {
    src: "node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf",
    dest: "GeistMono-Regular.ttf",
  },
  {
    src: "node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.ttf",
    dest: "GeistMono-Medium.ttf",
  },
  {
    src: "node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf",
    dest: "GeistMono-Bold.ttf",
  },
];

// Failures on copying fonts are fatal and stop postinstall. This is what
// should happen as build should fail if fonts are not copied or available.
// No fs.mkdirSync is needed as the destination fonts/ directory already exists.
fontPaths.forEach(({ src, dest }) => {
  const srcPath = path.join(process.cwd(), src);
  const destPath = path.join(import.meta.dirname, dest);
  fs.copyFileSync(srcPath, destPath);
});
