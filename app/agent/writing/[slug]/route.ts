import { getSlugs } from "@/app/(writing)/utils/getSlugs";
import { mdxToText } from "@/app/utils/webmcp";
import path from "node:path";
import { readFile } from "node:fs/promises";

export const dynamic = "force-static";
export const dynamicParams = false;

type Context = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSlugs();
}

export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;
  const source = await readFile(path.join(process.cwd(), "app/(writing)/content", `${slug}.mdx`), "utf8");

  return new Response(mdxToText(source), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
