import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

export const Pre = ({
  children,
  scroll = true,
  caption = null,
}: {
  children: ReactNode;
  scroll: boolean;
  caption: ReactNode | null;
}) => (
  <div {...stylex.props(styles.wrapper)}>
    <pre {...stylex.props(styles.pre, scroll ? styles.scroll : styles.noScroll)}>
      <code>{children}</code>
    </pre>
    <p {...stylex.props(styles.caption)}>{caption}</p>
  </div>
);

const styles = stylex.create({
  caption: {
    color: "var(--muted)",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
  },
  noScroll: {
    overflow: "hidden",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
  },
  pre: {
    borderRadius: "0.125rem",
    backgroundColor: "var(--code-background)",
    color: "var(--code-foreground)",
    fontSize: "0.875rem",
    maxWidth: "42rem",
    paddingBottom: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "1rem",
    width: "100%",
  },
  scroll: {
    overflow: "auto",
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "1.25rem",
    marginLeft: "1.25rem",
    marginRight: "1.25rem",
    width: "100%",
  },
});
