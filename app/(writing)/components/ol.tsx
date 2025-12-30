import type { ReactNode } from "react";

export function Ol({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center mb-5">
      <ol className="w-full max-w-2xl list-inside mx-5">{children}</ol>
    </div>
  );
}
