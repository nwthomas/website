import { sx } from "@/app/styles/tw.stylex";
import { HeadingLevel, getHeading } from "../utils/heading";

import type { ReactNode } from "react";

export function H3({ children }: { children: ReactNode }) {
  return (
    <div {...sx("wFull flex justifyCenter mb5")}>
      <div {...sx("wFull maxW2xl mx5")}>{getHeading(children, HeadingLevel.H3)}</div>
    </div>
  );
}
