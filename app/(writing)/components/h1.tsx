import type { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <h1 className="w-full max-w-2xl mt-5 mx-5">{children}</h1>
    </div>
  );
}
