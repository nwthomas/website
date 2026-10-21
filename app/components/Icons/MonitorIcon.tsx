import type { CSSProperties } from "react";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  style?: CSSProperties;
  title?: string;
}

export function MonitorIcon({ color, isAriaHidden, style, title }: Props) {
  return (
    <svg aria-hidden={isAriaHidden} color={color} style={style} viewBox="0 0 512 512">
      <title>{title || "Monitor icon"}</title>
      <rect
        x="80"
        y="96"
        width="352"
        height="240"
        rx="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M176 416h160M256 336v80"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
}
