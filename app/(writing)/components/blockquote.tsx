import { sx } from "@/app/styles/tw.stylex";
import { Children, type ReactNode } from "react";

export function Blockquote({ children }: { children: ReactNode }) {
  const normalizedChildren = Children.toArray(children).reduce<ReactNode[]>((acc, child, childIndex) => {
    if (typeof child !== "string") {
      acc.push(child);
      return acc;
    }
    if (childIndex <= 0 || childIndex >= Children.toArray(children).length - 1) {
      return acc;
    }

    const parts = child.split("\n");
    parts.forEach((part, partIndex) => {
      if (partIndex > 0) {
        acc.push(<div {...sx("mb5")} key={`br-${childIndex}-${partIndex}`}></div>);
      }

      if (part !== "") {
        acc.push(part);
      }
    });

    return acc;
  }, []);

  return (
    <div {...sx("wFull flex justifyCenter mb5")}>
      <blockquote {...sx("wFull maxW2xl borderL4 borderGray500 mx5 italic whitespacePreLine blockquoteText")}>
        {normalizedChildren}
      </blockquote>
    </div>
  );
}
