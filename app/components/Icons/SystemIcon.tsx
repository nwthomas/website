import type { CSSProperties } from "react";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  style?: CSSProperties;
  title?: string;
}

export function SystemIcon({ color, isAriaHidden, style, title }: Props) {
  return (
    <svg aria-hidden={isAriaHidden} fill="none" stroke={color} style={style} viewBox="0 0 24 24">
      <title>{title || "System theme icon"}</title>
      <rect height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" width="16" x="4" y="5" />
      <path d="M9 19h6M12 16v3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}
