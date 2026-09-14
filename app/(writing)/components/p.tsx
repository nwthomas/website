import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { sharedStyles } from "@/app/styles";

export function P({ children }: { children: ReactNode }) {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <p {...stylex.props(sharedStyles.pageSection)}>{children}</p>
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
