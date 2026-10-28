import * as stylex from "@stylexjs/stylex";

export const colors = {
  background: "var(--background)",
  borderImageDark: "var(--border-image-dark)",
  borderImageLight: "var(--border-image-light)",
  borderSubtle: "var(--border-subtle)",
  focusRing: "var(--focus-ring)",
  foreground: "var(--foreground)",
  foregroundMuted: "var(--foreground-muted)",
  selectionBackground: "var(--selection-background)",
  selectionForeground: "var(--selection-foreground)",
  skeletonBase: "var(--skeleton-base)",
  skeletonHighlight: "var(--skeleton-highlight)",
  surface: "var(--surface)",
  surfaceForeground: "var(--surface-foreground)",
  themeSwitch: "var(--theme-switch)",
  themeSwitchKnob: "var(--theme-switch-knob)",
  themeSwitchMoon: "var(--theme-switch-moon)",
  themeSwitchTrack: "var(--theme-switch-track)",
};

export const fonts = {
  mono: "var(--font-geist-mono), monospace",
  sans: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

export const breakpoints = {
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
};

export const sharedStyles = stylex.create({
  centered: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  pageSection: {
    marginLeft: "1.25rem",
    marginRight: "1.25rem",
    maxWidth: "42rem",
    width: "100%",
  },
  rssFeedLink: {
    whiteSpace: "nowrap",
  },
  textMuted: {
    color: "var(--foreground-muted)",
  },
  textNoUnderline: {
    textDecorationLine: "none",
  },
});
