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
      <path
        d="M48 48h416a16 16 0 0 1 16 16v256a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V64a16 16 0 0 1 16-16zm16 32v224h384V80H64z"
        fill={color}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M236 336h40v72h56v24H180v-24h56z"
        fill={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
}
