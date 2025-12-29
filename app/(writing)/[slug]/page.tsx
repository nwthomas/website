import { ImageOverlayContainer } from "@/app/components/ImageOverlay";
import { Metadata } from "next";
import { getSlugs } from "../utils/getSlugs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const importPath = `../content/${slug}.mdx`;
  const { metadata } = await import(importPath);

  return {
    title: `${metadata.title} | Nathan Thomas`,
    description: metadata.excerpt,
    openGraph: {
      title: metadata.title,
      description: metadata.excerpt,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const importPath = `../content/${slug}.mdx`;
  const { default: Post } = await import(importPath);

  return (
    <article className="w-full">
      <Post />
      <ImageOverlayContainer />
    </article>
  );
}
