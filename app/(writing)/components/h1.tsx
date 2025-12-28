import type { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="pt-5 px-5">{children}</h1>;
}
