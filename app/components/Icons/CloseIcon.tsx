import type { CSSProperties } from "react";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  style?: CSSProperties;
  title?: string;
}

export function CloseIcon({ color, isAriaHidden, style, title }: Props) {
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
      <title>{title || "Close"}</title>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
