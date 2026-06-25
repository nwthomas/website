import { sx } from "@/app/styles/tw.stylex";
import type { ReactNode } from "react";

export function Ul({ children }: { children: ReactNode }) {
  return (
    <div {...sx("wFull flex justifyCenter mb5")}>
      <ul {...sx("wFull maxW2xl listInside mx5")}>{children}</ul>
    </div>
  );
}
