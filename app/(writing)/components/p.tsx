import type { ReactNode } from "react";

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-5 mx-5">{children}</p>;
}
