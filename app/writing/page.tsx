import { getPostViewsRedisKey, redis } from "@/app/utils/redis";

import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import { Metadata } from "next";
import { Post } from "@/app/(writing)/utils/types";
import postsJson from "@/app/(writing)/posts.json";
import { sharedStyles } from "@/app/styles";

export const metadata: Metadata = {
  title: "Writing | Nathan Thomas",
  description: "Nathan Thomas' writing page",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "Writing",
    description: "Nathan Thomas' writing page",
    url: "https://www.nathanthomas.dev",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export const dynamic = "force-dynamic"; // Render the page dynamically per request

const VIEWS_PLACEHOLDER = "-";

export default async function Page() {
  const { posts } = postsJson;
  const sortedPosts: Post[] = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let postViews: Record<string, number | null> = {};
  if (process.env.NODE_ENV === "production") {
    postViews = await redis.mGet<number | null>(posts.map((post) => getPostViewsRedisKey(post.id)));
  }

  return (
    <section {...stylex.props(sharedStyles.pageSection)}>
      <p>
        Below is a curated collection of my writing. I also have an{" "}
        <Link aria-label="Link to Nathan's Atom RSS feed" href="/atom">
          RSS feed
        </Link>{" "}
        you can follow and a{" "}
        <a
          href="https://nathanthomas.substack.com/"
          aria-label="Link to Nathan's profile on Substack"
          rel="noopener noreferrer"
          target="_blank"
        >
          newsletter
        </a>{" "}
        you can subscribe to.
      </p>
      <ul {...stylex.props(styles.list)}>
        {sortedPosts.map((post, i) => (
          <li data-unstyled="true" {...stylex.props(styles.item, i > 0 && styles.itemOffset)} key={post.id}>
            <Link href={`/${post.id}`} {...stylex.props(styles.link)}>
              <span {...stylex.props(styles.date)}>{post.date}</span>
              <span {...stylex.props(styles.title)}>{post.title}</span>
              <span {...stylex.props(styles.views)}>
                {postViews[getPostViewsRedisKey(post.id)] != null
                  ? `${postViews[getPostViewsRedisKey(post.id)]}`
                  : VIEWS_PLACEHOLDER}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

const styles = stylex.create({
  date: {
    whiteSpace: "nowrap",
  },
  item: {
    display: "flex",
  },
  itemOffset: {
    marginTop: "0.25rem",
  },
  link: {
    gap: "1.25rem",
    display: "flex",
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "0.875rem",
    textDecorationLine: "none",
    width: "100%",
  },
  list: {
    marginTop: "1.25rem",
  },
  title: {
    flexBasis: 0,
    flexGrow: 2,
    flexShrink: 1,
    textDecorationColor: "var(--muted)",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
  views: {
    color: "var(--muted)",
    fontSize: "0.875rem",
  },
});
