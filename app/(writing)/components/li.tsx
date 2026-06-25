import { sx } from "@/app/styles/tw.stylex";
import type { ReactNode } from "react";

export function Li({ children }: { children: ReactNode }) {
  return (
    <div {...sx("wFull flex justifyCenter")}>
      <li {...sx("wFull fontSans textBase relative")}>{children}</li>
    </div>
  );
}
