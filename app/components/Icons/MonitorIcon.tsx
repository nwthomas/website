import type { CSSProperties } from "react";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  style?: CSSProperties;
  title?: string;
}

export function MonitorIcon({ color, isAriaHidden, style, title }: Props) {
  return (
    <svg aria-hidden={isAriaHidden} fill="none" stroke={color} style={style} viewBox="0 0 24 24">
      <title>{title || "Monitor icon"}</title>
      <rect x="3" y="3" width="18" height="13" rx="2" strokeWidth="2" />
      <path d="M12 16v5m-4 0h8" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
