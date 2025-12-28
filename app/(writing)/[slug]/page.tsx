import { Metadata } from "next";
import { getSlugs } from "../utils/getSlugs";

type Params = { params: Promise<{ slug: string }> };

export const metadata: Metadata = {
  title: "Writing | Nathan Thomas",
  description: "Nathan Thomas' writing page",
};

export function generateStaticParams() {
  return getSlugs();
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const importPath = `../content/${slug}.mdx`;
  const { default: Post, metadata } = await import(importPath);
  console.log(metadata);

  return (
    <article className="w-full max-w-2xl">
      <Post />
    </article>
  );
}
