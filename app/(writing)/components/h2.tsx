import * as stylex from "@stylexjs/stylex";
import { HeadingLevel, getHeading } from "../utils/heading";

import type { ReactNode } from "react";
import { sharedStyles } from "@/app/styles";

export function H2({ children }: { children: ReactNode; id: string }) {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(sharedStyles.pageSection)}>{getHeading(children, HeadingLevel.H2)}</div>
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
