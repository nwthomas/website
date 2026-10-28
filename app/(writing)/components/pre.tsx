import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { sharedStyles } from "@/app/styles";

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
    <div {...stylex.props(styles.content, sharedStyles.pageSection)}>
      <pre {...stylex.props(styles.pre, scroll ? styles.scroll : styles.noScroll)}>
        <code>{children}</code>
      </pre>
      <p {...stylex.props(styles.caption)}>{caption}</p>
    </div>
  </div>
);

const styles = stylex.create({
  caption: {
    color: "var(--foreground-muted)",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  noScroll: {
    overflow: "hidden",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
  },
  pre: {
    borderRadius: "0.125rem",
    backgroundColor: "var(--surface)",
    color: "var(--surface-foreground)",
    fontSize: "0.875rem",
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
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.25rem",
    width: "100%",
  },
});
