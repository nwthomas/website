import * as stylex from "@stylexjs/stylex";

import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Not Found | Nathan Thomas",
  description: "The page you are looking for does not exist.",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "404 - Not Found",
    description: "The page you are looking for does not exist.",
    url: "https://www.nathanthomas.dev",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

const STRIP_ASPECT_RATIO = 838 / 1125;

const ORBS = ["small", "medium", "large"] as const;

export default function NotFound() {
  return (
    <section data-hide-bottom-blur {...stylex.props(styles.stage)}>
      {ORBS.map((orb) => (
        <div key={orb} aria-hidden="true" {...stylex.props(styles.orb, styles[orb])}>
          <div {...stylex.props(styles.sky)} />
        </div>
      ))}
      <Link href="/" {...stylex.props(styles.caption)}>
        <h1 {...stylex.props(styles.title)}>404 - Not Found</h1>
      </Link>
    </section>
  );
}

const drift = stylex.keyframes({
  from: { backgroundPositionX: "calc(-1 * var(--orb-x))" },
  to: { backgroundPositionX: "calc(-1 * var(--tile) - var(--orb-x))" },
});

const styles = stylex.create({
  caption: {
    position: "absolute",
    textAlign: "center",
    textDecorationLine: "none",
    bottom: {
      default: null,
      "@media (orientation: portrait)": "3rem",
    },
    left: "1.25rem",
    right: "1.25rem",
    top: {
      default: "calc(var(--frame-y) + var(--frame-h) * var(--u) + var(--gap))",
      "@media (orientation: portrait)": null,
    },
  },
  large: {
    "--orb-d": "var(--large)",
    "--orb-x-units": "calc(var(--lead) + var(--small) + var(--medium) + var(--space) * (2 + var(--optical)))",
  },
  medium: {
    "--orb-d": "var(--medium)",
    "--orb-x-units": "calc(var(--lead) + var(--small) + var(--space))",
  },
  orb: {
    "--orb-x": "calc(var(--orb-x-units) * var(--u))",
    "--orb-y": "calc((var(--large) - var(--orb-d)) / 2 * var(--u))",
    borderRadius: "50%",
    overflow: "hidden",
    aspectRatio: "1 / 1",
    position: "absolute",
    left: "calc(var(--frame-x) + var(--orb-x))",
    top: "calc(var(--frame-y) + var(--orb-y))",
    width: "calc(var(--orb-d) * var(--u))",
  },
  sky: {
    inset: 0,
    backgroundPosition: "calc(-1 * var(--orb-x)) calc(-1 * var(--orb-y))",
    animationDuration: "30s",
    animationIterationCount: "infinite",
    animationName: {
      default: drift,
      "@media (prefers-reduced-motion: reduce)": "none",
    },
    animationTimingFunction: "linear",
    backgroundImage: "url(/images/not-found/forest.webp)",
    backgroundRepeat: "repeat-x",
    backgroundSize: "auto var(--strip)",
    position: "absolute",
  },
  small: {
    "--orb-d": "var(--small)",
    "--orb-x-units": "var(--lead)",
  },
  stage: {
    "--below": {
      default: "calc(var(--gap) + 2rem)",
      "@media (orientation: portrait)": "0px",
    },
    "--cap": {
      default: 1,
      "@media (orientation: portrait)": 1.5,
    },
    "--frame-h": "var(--large)",
    "--frame-w": {
      default: "calc(var(--small) + var(--medium) + var(--large) + var(--space) * (2 + var(--optical)))",
      "@media (orientation: portrait)": 402,
    },
    "--frame-x": "calc(50cqw - var(--frame-w) * var(--u) / 2)",
    "--frame-y": "calc(50cqh - (var(--frame-h) * var(--u) + var(--below)) / 2)",
    "--gap": {
      default: "1.5rem",
      "@media (min-width: 768px)": "clamp(2rem, 6cqh, 6rem)",
    },
    "--large": {
      default: 940.4,
      "@media (orientation: portrait)": 314.2,
    },
    "--lead": {
      default: 0,
      "@media (orientation: portrait)": -10.17,
    },
    "--medium": {
      default: 564.6,
      "@media (orientation: portrait)": 154.2,
    },
    "--optical": 0.17,
    "--pad-x": {
      default: "1.25rem",
      "@media (min-width: 768px)": "3rem",
      "@media (orientation: portrait)": "0px",
    },
    "--pad-y": {
      default: "1.5rem",
      "@media (min-width: 768px) and (orientation: landscape)": "2rem",
      "@media (min-width: 768px) and (orientation: portrait)": "3rem",
    },
    "--small": {
      default: 257,
      "@media (orientation: portrait)": 70.2,
    },
    "--space": {
      default: 144,
      "@media (orientation: portrait)": 28.545,
    },
    "--strip": "calc(var(--frame-h) * var(--u) * 1.02 * 1.15)",
    "--tile": `calc(var(--strip) * ${STRIP_ASPECT_RATIO})`,
    "--u":
      "min((100cqw - 2 * var(--pad-x)) / var(--frame-w), (100cqh - 2 * var(--pad-y) - var(--below)) / var(--frame-h), var(--cap) * 1px)",
    containerType: "size",
    position: "relative",
    height: {
      default: "max(20rem, calc(100svh - 5rem))",
      "@media (min-width: 1024px)": "max(20rem, calc(100svh - 8.75rem))",
      "@media (min-width: 768px) and (max-width: 1023.98px)": "max(20rem, calc(100svh - 7.5rem))",
    },
    marginBottom: {
      default: "-5rem",
      "@media (min-width: 1024px)": "-8.75rem",
      "@media (min-width: 768px) and (max-width: 1023.98px)": "-7.5rem",
    },
    overflowX: "clip",
    width: "100cqw",
  },
  title: {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "0.875rem",
  },
});
