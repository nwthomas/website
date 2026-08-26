import type { CSSProperties } from "react";

interface Props {
  color: string;
  isAriaHidden?: boolean;
  style?: CSSProperties;
  title?: string;
}

export function CloseIcon({ color, isAriaHidden, style, title }: Props) {
  return (
    <svg aria-hidden={isAriaHidden} color={color} style={style} viewBox="0 0 512 512">
      <title>{title || "Close"}</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="70"
        d="M368 368L144 144M368 144L144 368"
      />
    </svg>
  );
}
