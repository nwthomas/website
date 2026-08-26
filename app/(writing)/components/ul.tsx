import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { sharedStyles } from "@/app/styles";

export function Ul({ children }: { children: ReactNode }) {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <ul {...stylex.props(sharedStyles.pageSection)}>{children}</ul>
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.25rem",
    width: "100%",
  },
});
