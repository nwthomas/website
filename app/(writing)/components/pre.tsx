import type { ReactNode } from "react";

export const Pre = ({
  children,
  scroll = true,
  caption = null,
}: {
  children: ReactNode;
  scroll: boolean;
  caption: ReactNode | null;
}) => (
  <div className="w-full mb-5 flex justify-center mx-5 flex-col items-center">
    <pre
      className={`
      p-4
      text-sm
      rounded-sm
      bg-neutral-200 text-neutral-700
      dark:bg-[#222222] dark:text-gray-300
      w-full max-w-2xl
      ${scroll ? "overflow-auto" : "whitespace-pre-wrap break-all overflow-hidden"}
    `}
    >
      <code>{children}</code>
    </pre>
    <p className="text-sm mt-2 text-gray-500">{caption}</p>
  </div>
);
