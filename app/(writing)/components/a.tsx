import type { ReactNode } from "react";

export function A({ children, href }: { children: ReactNode; href: string }) {
  return <a href={href}>{children}</a>;
}
