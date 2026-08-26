import * as Sentry from "@sentry/nextjs";

import * as stylex from "@stylexjs/stylex";
import { ImageOverlayContainer } from "@/app/components/ImageOverlay";
import { Metadata } from "next";
import { RedisIncrement } from "@/app/components/RedisIncrement";
import { getSlugs } from "../utils/getSlugs";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

// Ensure that only the statically generated pages are valid routes
export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const importPath = `../content/${slug}.mdx`;
  const { metadata } = await import(importPath);

  return {
    title: `${metadata.title} | Nathan Thomas`,
    description: metadata.description,
    metadataBase: new URL("https://www.nathanthomas.dev"),
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: "https://www.nathanthomas.dev",
      siteName: "Nathan Thomas",
      locale: "en_US",
      type: "website",
      images: [{ url: `/${slug}/opengraph-image` }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const importPath = `../content/${slug}.mdx`;
  let Post = null;

  try {
    const post = await import(importPath);
    if (post.default == null) {
      return notFound();
    }
    Post = post.default;
  } catch (error) {
    Sentry.captureException(error);

    return notFound();
  }

  return (
    // Negative margin is here to compensate for the final blog item element
    // with padding bottom. MDX gives no API for disovery of last index. This
    // could move to mapping all items and passing an index on props, but
    // that's overkill for this problem.
    <article {...stylex.props(styles.article)}>
      <Post />
      <ImageOverlayContainer />
      {process.env.NODE_ENV === "production" ? <RedisIncrement slug={slug} /> : null}
    </article>
  );
}

const styles = stylex.create({
  article: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: "-1.25rem",
    width: "100%",
  },
});
