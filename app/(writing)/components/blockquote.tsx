import { Children, type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { sharedStyles } from "@/app/styles";

export function Blockquote({ children }: { children: ReactNode }) {
  const normalizedChildren = Children.toArray(children).reduce<ReactNode[]>((acc, child, childIndex) => {
    if (typeof child !== "string") {
      acc.push(child);
      return acc;
    }
    if (childIndex <= 0 || childIndex >= Children.toArray(children).length - 1) {
      return acc;
    }

    const parts = child.split("\n");
    parts.forEach((part, partIndex) => {
      if (partIndex > 0) {
        acc.push(<div {...stylex.props(styles.break)} key={`br-${childIndex}-${partIndex}`}></div>);
      }

      if (part !== "") {
        acc.push(part);
      }
    });

    return acc;
  }, []);

  return (
    <div {...stylex.props(styles.wrapper)}>
      <blockquote {...stylex.props(styles.quote, sharedStyles.pageSection)}>{normalizedChildren}</blockquote>
    </div>
  );
}

const styles = stylex.create({
  break: {
    marginBottom: "1.25rem",
  },
  quote: {
    color: "var(--muted)",
    fontStyle: "italic",
    whiteSpace: "pre-line",
    borderLeftColor: "var(--muted)",
    borderLeftStyle: "solid",
    borderLeftWidth: 4,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.25rem",
    width: "100%",
  },
});
