import type { ReactNode } from "react";

export const Code = ({ children }: { children: ReactNode }) => {
  return (
    <code
      className={`
        [p_&]:text-sm
        [p_&]:px-1
        [p_&]:py-0.5
        [p_&]:rounded-sm
        [p_&]:bg-neutral-200
        dark:[p_&]:bg-[#333]
      `}
    >
      {children}
    </code>
  );
};

export const Pre = ({
  children,
  scroll = true,
  caption = null,
}: {
  children: ReactNode;
  scroll: boolean;
  caption: ReactNode | null;
}) => (
  <div className="my-5 w-full flex justify-center mx-5">
    <pre
      className={`
      p-4
      text-sm
      bg-neutral-200 text-neutral-700
      dark:bg-[#222] dark:text-gray-300
      w-full max-w-2xl

      ${scroll ? "overflow-auto" : "whitespace-pre-wrap break-all overflow-hidden"}
    `}
    >
      <code>{children}</code>
    </pre>
  </div>
);
