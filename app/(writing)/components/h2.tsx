import type { ReactNode } from "react";

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-5 mx-5">{children}</h2>;
}
