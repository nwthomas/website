import { sx } from "@/app/styles/tw.stylex";
import { HeadingLevel, getHeading } from "../utils/heading";

import type { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return (
    <div {...sx("wFull flex justifyCenter mb5")}>
      <div {...sx("wFull maxW2xl mx5")}>{getHeading(children, HeadingLevel.H1)}</div>
    </div>
  );
}
