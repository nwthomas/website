import type { CSSProperties } from "react";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  style?: CSSProperties;
  title?: string;
}

export function LinkIcon({ color, isAriaHidden, style, title }: Props) {
  return (
    <svg
      aria-hidden={isAriaHidden}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={style}
      viewBox="0 0 24 24"
    >
      <title>{title || "Link icon"}</title>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
