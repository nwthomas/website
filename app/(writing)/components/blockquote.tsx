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
        acc.push(<br key={`br-${childIndex}-${partIndex}`} />);
      }

      if (part !== "") {
        acc.push(part);
      }
    });

    return acc;
  }, []);

  return (
    <div className="w-full flex justify-center mb-5">
      <blockquote className="w-full max-w-2xl text-5 border-l-4 border-gray-500 mx-5 [&_p]:text-gray-500 italic whitespace-pre-line">
        {normalizedChildren}
      </blockquote>
    </div>
  );
}
