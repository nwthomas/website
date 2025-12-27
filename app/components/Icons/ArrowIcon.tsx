interface Props {
  color: string;
  isAriaHidden?: boolean;
  title?: string;
}

export function ArrowIcon({ color, isAriaHidden, title }: Props) {
  return (
    <svg aria-hidden={isAriaHidden} color={color} viewBox="0 0 512 512">
      <title>{title || "Arrow Forwards"}</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M268 112l144 144-144 144M392 256H100"
      />
    </svg>
  );
}
