import type { ReactNode } from "react";

export function P({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center [&:not(blockquote_&)]:mb-5">
      <p className="w-full max-w-2xl mx-5">{children}</p>
    </div>
  );
}
