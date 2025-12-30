import type { ReactNode } from "react";

export function H2({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center mb-5">
      <h2 className="w-full max-w-2xl mx-5">{children}</h2>
    </div>
  );
}
