import { sx } from "@/app/styles/tw.stylex";
import type { ReactNode } from "react";

export function Ol({ children }: { children: ReactNode }) {
  return (
    <div {...sx("wFull flex justifyCenter mb5")}>
      <ol {...sx("wFull maxW2xl listInside mx5")}>{children}</ol>
    </div>
  );
}
