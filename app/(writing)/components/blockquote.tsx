import type { ReactNode } from "react";

export function Blockquote({ children }: { children: ReactNode }) {
  return <blockquote className="my-5 text-gray-500 ml-3 border-l-4 border-gray-500">{children}</blockquote>;
}
