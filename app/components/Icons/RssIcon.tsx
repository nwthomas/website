import * as stylex from "@stylexjs/stylex";

export function RssIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...stylex.props(styles.icon)}
    >
      <circle cx="5" cy="19" r="1" fill="currentColor" />
      <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
    </svg>
  );
}

const styles = stylex.create({
  icon: {
    display: "inline-block",
    verticalAlign: "-0.1em",
    height: "0.9em",
    width: "0.9em",
  },
});
