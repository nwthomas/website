import type { ReactNode } from "react";

export function H3({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center mb-5">
      <h3 className="w-full max-w-2xl mb-5 mx-5">{children}</h3>
    </div>
  );
}
