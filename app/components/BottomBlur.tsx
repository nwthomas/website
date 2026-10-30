"use client";

import * as stylex from "@stylexjs/stylex";

import { usePathname } from "next/navigation";

// Each layer blurs twice as much as the one before it and is masked to a band that sits lower on the
// screen, so the stacked blur ramps up toward the bottom edge instead of switching on all at once.
// Based on the layered progressive blur technique: https://tessl.io/registry/skills/github/MengTo/Skills/progressive-blur
const BLUR_LAYER_COUNT = 6;

const LAYER_STEP = 100 / (BLUR_LAYER_COUNT + 2);

function getLayerBlur(index: number) {
  return `blur(${0.5 * 2 ** index}px)`;
}

// Each band fades in, holds, then fades out as the next stronger layer takes over; the last one holds to the edge
function getLayerMask(index: number) {
  const stops = [`transparent ${index * LAYER_STEP}%`, `black ${(index + 1) * LAYER_STEP}%`];
  if (index < BLUR_LAYER_COUNT - 1) {
    stops.push(`black ${(index + 2) * LAYER_STEP}%`, `transparent ${(index + 3) * LAYER_STEP}%`);
  }

  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

export function BottomBlur() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) {
    return null;
  }

  return (
    <div aria-hidden="true" {...stylex.props(styles.container)}>
      {Array.from({ length: BLUR_LAYER_COUNT }, (_, index) => (
        <div key={index} {...stylex.props(styles.layer, styles.blurLayer(getLayerBlur(index), getLayerMask(index)))} />
      ))}
      <div {...stylex.props(styles.layer, styles.tint)} />
    </div>
  );
}

const styles = stylex.create({
  blurLayer: (blur: string, mask: string) => ({
    WebkitMaskImage: mask,
    backdropFilter: blur,
    maskImage: mask,
  }),
  container: {
    pointerEvents: "none",
    position: "fixed",
    zIndex: 5,
    bottom: 0,
    // A sixth of the viewport on desktop, kept shorter on smaller screens so it doesn't bury the last lines of
    // content, plus room for the home indicator. Max height prevents covering content on very tall screens.
    height: {
      default: "calc(4rem + env(safe-area-inset-bottom, 0px))",
      "@media (min-width: 1024px)": "calc(min(100svh / 6, 10rem) + env(safe-area-inset-bottom, 0px))",
      "@media (min-width: 768px) and (max-width: 1023.98px)": "calc(5rem + env(safe-area-inset-bottom, 0px))",
    },
    left: 0,
    right: 0,
  },
  layer: {
    inset: 0,
    position: "absolute",
  },
  // A wash of the page background that settles into it at the edge, like Apple's Liquid Glass material,
  // so text fading under the blur stays soft rather than muddy in both themes
  tint: {
    backgroundImage:
      "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--background) 40%, transparent) 50%, var(--background))",
  },
});
