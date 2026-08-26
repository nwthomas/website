import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

export function Li({ children }: { children: ReactNode }) {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <li {...stylex.props(styles.item)}>{children}</li>
    </div>
  );
}

const styles = stylex.create({
  item: {
    fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    fontSize: "1rem",
    position: "relative",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});
