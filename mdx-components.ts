import { Blockquote } from "./app/(writing)/components/blockquote";
import { Code } from "./app/(writing)/components/code";
import { H1 } from "./app/(writing)/components/h1";
import { H2 } from "./app/(writing)/components/h2";
import { H3 } from "./app/(writing)/components/h3";
import { Image } from "./app/(writing)/components/image";
import { Li } from "./app/(writing)/components/li";
import type { MDXComponents } from "mdx/types";
import { P } from "./app/(writing)/components/p";
import { Pre } from "./app/(writing)/components/code";
import { Ul } from "./app/(writing)/components/ul";

export function useMDXComponents(components: { [component: string]: React.ComponentType }): MDXComponents {
  return {
    ...components,
    blockquote: Blockquote,
    code: Code,
    h1: H1,
    h2: H2,
    h3: H3,
    img: Image,
    li: Li,
    p: P,
    pre: Pre,
    ul: Ul,
  };
}
