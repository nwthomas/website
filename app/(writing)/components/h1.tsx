import type { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="mt-5 mx-5">{children}</h1>;
}
