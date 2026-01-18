import { HeadingLevel, getHeading } from "../utils/heading";

import type { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center mb-5">
      <div className="w-full max-w-2xl mx-5">
        {getHeading(children, HeadingLevel.H1)}
      </div>
    </div>
  );
}
