import { sx } from "@/app/styles/tw.stylex";
import type { ReactNode } from "react";

export function P({ children }: { children: ReactNode }) {
  return (
    <div {...sx("wFull flex justifyCenter mb5")}>
      <p {...sx("wFull maxW2xl mx5")}>{children}</p>
    </div>
  );
}
