import type { ReactNode } from "react";

export function H2({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <h2 className="w-full max-w-2xl mt-5 mx-5">{children}</h2>
    </div>
  );
}
