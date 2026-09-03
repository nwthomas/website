import * as stylex from "@stylexjs/stylex";

export const colors = {
  background: "var(--background)",
  borderImageDark: "var(--border-image-dark)",
  borderImageLight: "var(--border-image-light)",
  borderSubtle: "var(--border-subtle)",
  codeBackground: "var(--code-background)",
  codeForeground: "var(--code-foreground)",
  foreground: "var(--foreground)",
  muted: "var(--muted)",
  recentlyPlayedArtist: "var(--recently-played-artist)",
  recentlyPlayedTrack: "var(--recently-played-track)",
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
  textMuted: {
    color: "var(--muted)",
  },
  textNoUnderline: {
    textDecorationLine: "none",
  },
});
