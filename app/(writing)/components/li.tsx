import type { ReactNode } from "react";

export function Li({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <li className="w-full font-sans text-base relative">{children}</li>
    </div>
  );
}
