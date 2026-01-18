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
        dark:in-[p]:bg-[#333]
        
      `}
    >
      {children}
    </code>
  );
};

export const Pre = ({
  children,
  scroll = true,
  // caption = null, // TODO: Add captions support for images
}: {
  children: ReactNode;
  scroll: boolean;
  caption: ReactNode | null;
}) => (
  <div className="mb-5 flex justify-center mx-5">
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
