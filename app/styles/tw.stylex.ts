import * as stylex from "@stylexjs/stylex";

type Style = Parameters<typeof stylex.props>[number];
type UtilityStyle = (typeof utilityStyles)[keyof typeof utilityStyles];
type StyleInput = string | Style | false | null | undefined;

export function sx(...inputs: StyleInput[]) {
  const styles: Style[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (typeof input !== "string") {
      styles.push(input);
      continue;
    }
    for (const token of input.trim().split(/\s+/)) {
      if (!token) continue;
      const style = utilityStyles[token as keyof typeof utilityStyles];
      if (!style) throw new Error(`Unknown StyleX utility: ${token}`);
      styles.push(style as UtilityStyle as Style);
    }
  }

  return stylex.props(...styles);
}

export const utilityStyles = stylex.create({
  absolute: { position: "absolute" },
  relative: { position: "relative" },
  fixed: { position: "fixed" },
  block: { display: "block" },
  flex: { display: "flex" },
  inlineFlex: { display: "inline-flex" },
  grid: { display: "grid" },
  hiddenBefore: { "::before": { display: "none" } },
  beforeEmpty: { "::before": { content: "" } },
  wFull: { width: "100%" },
  hFull: { height: "100%" },
  hSvh: { height: "100svh" },
  minHSvh: { minHeight: "100svh" },
  wFit: { width: "fit-content" },
  h6: { height: "1.5rem" },
  w6: { width: "1.5rem" },
  w50: { width: 50 },
  h26: { height: 26 },
  h18: { height: 18 },
  w18: { width: 18 },
  maxW2xl: { maxWidth: "42rem" },
  maxW4xl: { maxWidth: "56rem" },
  inset0: { inset: 0 },
  top0: { top: 0 },
  left0: { left: 0 },
  right0: { right: 0 },
  bottom0: { bottom: 0 },
  top2px: { top: 2 },
  left2px: { left: 2 },
  top5: { top: "1.25rem" },
  right5: { right: "1.25rem" },
  z10: { zIndex: 10 },
  mx5: { marginInline: "1.25rem" },
  ml1: { marginLeft: "0.25rem" },
  ml4: { marginLeft: "1rem" },
  ml5: { marginLeft: "1.25rem" },
  mlAuto: { marginLeft: "auto" },
  mt1: { marginTop: "0.25rem" },
  mt2: { marginTop: "0.5rem" },
  mt4: { marginTop: "1rem" },
  mt5: { marginTop: "1.25rem" },
  mt10: { marginTop: "2.5rem" },
  mb3px: { marginBottom: 3 },
  mb5: { marginBottom: "1.25rem" },
  negMb5: { marginBottom: "-1.25rem" },
  m0: { margin: 0 },
  p0: { padding: 0 },
  p5: { padding: "1.25rem" },
  px5: { paddingInline: "1.25rem" },
  py10: { paddingBlock: "2.5rem" },
  ptPx: { paddingTop: 1 },
  pt10: { paddingTop: "2.5rem" },
  pl0: { paddingLeft: 0 },
  pl4: { paddingLeft: "1rem" },
  flexCol: { flexDirection: "column" },
  itemsCenter: { alignItems: "center" },
  itemsStart: { alignItems: "flex-start" },
  justifyCenter: { justifyContent: "center" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyBetween: { justifyContent: "space-between" },
  gap05: { gap: "0.125rem" },
  gap3: { gap: "0.75rem" },
  gap5: { gap: { default: "0.75rem", "@media (min-width: 640px)": "1.25rem" } },
  overflowHidden: { overflow: "hidden" },
  cursorPointer: { cursor: "pointer" },
  cursorZoomIn: { cursor: "zoom-in" },
  roundedFull: { borderRadius: 9999 },
  roundedSm: { borderRadius: "0.125rem" },
  border: { borderWidth: 1, borderStyle: "solid" },
  border2: { borderWidth: 2, borderStyle: "solid" },
  borderL4: { borderLeftWidth: 4, borderLeftStyle: "solid" },
  borderMuted: { borderColor: "var(--border-muted)" },
  borderBackground: { borderColor: "var(--background)" },
  borderGray500: { borderColor: "#6b7280" },
  bgBackground: { backgroundColor: "var(--background)" },
  bgBlack: { backgroundColor: "#000" },
  bgWhite: { backgroundColor: "#fff" },
  textForeground: { color: "var(--foreground)" },
  textGray500: { color: "#6b7280" },
  textSoft: { color: "var(--text-soft)" },
  textStrong: { color: "var(--text-strong)" },
  fontSans: {
    fontFamily:
      "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  fontMono: { fontFamily: "var(--font-geist-mono), monospace" },
  textXs: { fontSize: "0.75rem" },
  textSm: { fontSize: "0.875rem" },
  textBase: { fontSize: "1rem" },
  text3px: { fontSize: { default: 3, "@media (min-width: 640px)": 4, "@media (min-width: 768px)": 5 } },
  fontMedium: { fontWeight: 500 },
  fontSemibold: { fontWeight: 600 },
  fontBold: { fontWeight: 700 },
  leadingNormal: { lineHeight: 1.5 },
  leadingSnug: { lineHeight: 1.375 },
  leadingNone: { lineHeight: 1 },
  noUnderline: { textDecoration: "none" },
  underline: { textDecorationLine: "underline" },
  decorationDotted: { textDecorationStyle: "dotted" },
  decorationGray500: { textDecorationColor: "#6b7280" },
  italic: { fontStyle: "italic" },
  whitespaceNowrap: { whiteSpace: "nowrap" },
  whitespacePreLine: { whiteSpace: "pre-line" },
  breakKeep: { wordBreak: "keep-all" },
  wrapBreakWords: { overflowWrap: "break-word" },
  listInside: { listStylePosition: "inside" },
  objectCover: { objectFit: "cover" },
  flex2: { flex: 2 },
  opacityHover60: { transitionProperty: "opacity", transitionDuration: "200ms", ":hover": { opacity: 0.6 } },
  opacityHover80: { transitionProperty: "opacity", transitionDuration: "200ms", ":hover": { opacity: 0.8 } },
  opacityHover100: { ":hover": { opacity: 1 } },
  transitionOpacity: { transitionProperty: "opacity", transitionDuration: "200ms" },
  transitionShadow: { transitionProperty: "box-shadow", transitionDuration: "200ms" },
  transitionTransform: {
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
  },
  translateX0: { transform: "translateX(0)" },
  translateX6: { transform: "translateX(1.5rem)" },
  selectNone: { userSelect: "none" },
  touchPanX: { touchAction: "pan-x" },
  shadowNone: { boxShadow: "none" },
  outlineNone: { outline: "none" },
  focusRing: { ":focus-visible": { outline: "2px solid #3b82f6", outlineOffset: 2 } },
  focusWithinRing: { ":focus-within": { outline: "2px solid #3b82f6", outlineOffset: 2 } },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  svg15: {},

  boxBorder: { boxSizing: "border-box" },
  maxOverlay: { maxWidth: "min(80rem, calc(100vw - 2.5rem))", maxHeight: "min(80rem, calc(100vh - 2.5rem))" },
  p4: { padding: "1rem" },
  px1: { paddingInline: "0.25rem" },
  py05: { paddingBlock: "0.125rem" },
  overflowAuto: { overflow: "auto" },
  whitespacePreWrap: { whiteSpace: "pre-wrap" },
  breakAll: { wordBreak: "break-all" },
  textNeutral700: { color: "var(--code-text)" },
  bgNeutral200: { backgroundColor: "var(--code-bg)" },
  blockquoteText: {},
  booksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2rem 1.5rem",
    "@media (min-width: 640px)": { gridTemplateColumns: "repeat(3, 1fr)" },
  },
  shellPadding: {
    paddingBlock: { default: "2.5rem", "@media (min-width: 768px)": "5rem", "@media (min-width: 1024px)": "6.25rem" },
  },
});

export const u = utilityStyles;
