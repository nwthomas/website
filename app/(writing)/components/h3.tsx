import type { ReactNode } from "react";

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-5 mx-5">{children}</h3>;
}
