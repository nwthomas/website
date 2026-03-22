import type { ReactNode } from "react";

export const Code = ({ children }: { children: ReactNode }) => {
  return (
    <code
      className={`
        in-[p]:text-sm
        in-[p]:px-1
        in-[p]:py-0.5
        in-[p]:rounded-sm
        in-[p]:bg-neutral-200
        dark:in-[p]:bg-[#222222]
      `}
    >
      {children}
    </code>
  );
};
