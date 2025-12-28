import type { ReactNode } from "react";

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="pt-5 px-5">{children}</h3>;
}
