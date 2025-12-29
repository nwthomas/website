import type { ReactNode } from "react";

export function Blockquote({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center mt-5">
      <blockquote className="w-full max-w-2xl text-5 border-l-4 border-gray-500 mx-5 [&_p]:text-gray-500">
        {children}
      </blockquote>
    </div>
  );
}
