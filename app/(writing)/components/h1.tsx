import * as stylex from "@stylexjs/stylex";

import { HeadingLevel } from "../utils/types";
import type { ReactNode } from "react";
import { getHeading } from "../utils/heading";
import { sharedStyles } from "@/app/styles";

export function H1({ children }: { children: ReactNode }) {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(sharedStyles.pageSection)}>{getHeading(children, HeadingLevel.H1)}</div>
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
