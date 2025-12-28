import { Blockquote } from "./app/(writing)/components/blockquote";
import { H1 } from "./app/(writing)/components/h1";
import { H2 } from "./app/(writing)/components/h2";
import { H3 } from "./app/(writing)/components/h3";
import { Image } from "./app/(writing)/components/image";
import type { MDXComponents } from "mdx/types";
import { P } from "./app/(writing)/components/p";

export function useMDXComponents(components: { [component: string]: React.ComponentType }): MDXComponents {
  return {
    ...components,
    blockquote: Blockquote,
    h1: H1,
    h2: H2,
    h3: H3,
    img: Image,
    p: P,
  };
}
