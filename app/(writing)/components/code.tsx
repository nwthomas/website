import { sx } from "@/app/styles/tw.stylex";
import type { ReactNode } from "react";

export const Code = ({ children }: { children: ReactNode }) => {
  return <code {...sx("textSm px1 py05 roundedSm bgNeutral200")}>{children}</code>;
};
