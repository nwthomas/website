import type { ReactNode } from "react";

export function P({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center p-wrapper [&:not(blockquote_&)]:mt-5">
      <p className="w-full max-w-2xl mx-5">{children}</p>
    </div>
  );
}
