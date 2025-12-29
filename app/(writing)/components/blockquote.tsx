import type { ReactNode } from "react";

export function Blockquote({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center mt-5">
      <blockquote className="w-full max-w-2xl text-gray-500 ml-3 border-l-4 border-gray-500">{children}</blockquote>
    </div>
  );
}
