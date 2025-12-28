import type { ReactNode } from "react";

export function P({ children }: { children: ReactNode }) {
  return <p className="pt-5 px-5">{children}</p>;
}
