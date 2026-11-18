import * as stylex from "@stylexjs/stylex";

export function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...stylex.props(styles.icon)}
    >
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M21 3l-9 9" />
    </svg>
  );
}

const styles = stylex.create({
  icon: {
    display: "block",
    height: "1rem",
    width: "1rem",
  },
});
