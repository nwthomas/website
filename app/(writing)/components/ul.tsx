import type { ReactNode } from "react";

export function Ul({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center mt-5">
      <ul className="w-full max-w-2xl list-inside">{children}</ul>
    </div>
  );
}
