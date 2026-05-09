import { A } from "@/writing/a";
import { Blockquote } from "@/writing/blockquote";
import { Code } from "@/writing/code";
import type { ComponentType } from "react";
import { H1 } from "@/writing/h1";
import { H2 } from "@/writing/h2";
import { H3 } from "@/writing/h3";
import { Image } from "@/writing/image";
import { Li } from "@/writing/li";
import type { MDXComponents } from "mdx/types";
import { Ol } from "@/writing/ol";
import { P } from "@/writing/p";
import { Pre } from "@/writing/pre";
import { Ul } from "@/writing/ul";

export const mdxProviderComponents: MDXComponents = {
  a: A,
  blockquote: Blockquote,
  code: Code,
  h1: H1,
  h2: H2,
  h3: H3,
  img: Image,
  li: Li,
  p: P,
  pre: Pre,
  ol: Ol,
  ul: Ul,
};

export function useMDXComponents(components: { [component: string]: ComponentType<object> }): MDXComponents {
  return {
    ...components,
    ...mdxProviderComponents,
  };
}
