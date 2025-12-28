import type { ReactNode } from "react";

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="pt-5 px-5">{children}</h2>;
}
