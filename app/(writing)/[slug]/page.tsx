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
    metadataBase: new URL("https://www.nathanthomas.dev"),
    openGraph: {
      title: metadata.title,
      description: metadata.excerpt,
      url: "https://www.nathanthomas.dev",
      siteName: "Nathan Thomas",
      locale: "en_US",
      type: "website",
      // TODO: Build og images for blog posts
      images: [{ url: "/opengraph-image" }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const importPath = `../content/${slug}.mdx`;
  const { default: Post } = await import(importPath);

  return (
    // Negative margin is here to compensate for the final blog item element
    // with padding bottom. MDX gives no API for disovery of last index. This
    // could move to mapping all items and passing an index on props, but
    // that's overkill for this problem.
    <article className="w-full -mb-5">
      <Post />
      <ImageOverlayContainer />
    </article>
  );
}
