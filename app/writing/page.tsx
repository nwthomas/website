import { getPostViewsRedisKey, redis } from "@/app/utils/redis";

import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import { Metadata } from "next";
import { Post } from "@/app/(writing)/utils/types";
import { postToRowListItem } from "@/app/(writing)/utils/postToRowListItem";
import { RowList } from "@/app/components/RowList";
import { RssIcon } from "@/app/components/Icons/RssIcon";
import postsJson from "@/app/(writing)/posts.json";
import { sharedStyles } from "@/app/styles";

export const metadata: Metadata = {
  title: "Writing | Nathan Thomas",
  description: "Essays and technical posts by Nathan Thomas on software engineering, AI, and life",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing",
    description: "Essays and technical posts by Nathan Thomas on software engineering, AI, and life",
    url: "https://www.nathanthomas.dev/writing",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export const dynamic = "force-dynamic";

const VIEWS_PLACEHOLDER = "-";

function formatViews(views: number | string | null | undefined): string {
  if (views == null) {
    return VIEWS_PLACEHOLDER;
  }

  return Number(views).toLocaleString("en-US");
}

export default async function Page() {
  const { posts } = postsJson;
  const sortedPosts: Post[] = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let postViews: Record<string, number | null> = {};
  if (process.env.NODE_ENV === "production") {
    postViews = await redis.mGet<number | null>(posts.map((post) => getPostViewsRedisKey(post.id)));
  }

  return (
    <section {...stylex.props(sharedStyles.pageSection)}>
      <p {...stylex.props(sharedStyles.textSecondary)}>
        Below is a curated collection of my writing. I also have an{" "}
        <Link aria-label="Link to Nathan's Atom RSS feed" href="/atom" {...stylex.props(sharedStyles.rssFeedLink)}>
          RSS feed{"\u00a0"}
          <RssIcon />
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
      <RowList
        items={sortedPosts.map((post) => ({
          ...postToRowListItem(post),
          stat: formatViews(postViews[getPostViewsRedisKey(post.id)]),
        }))}
        style={styles.list}
      />
    </section>
  );
}

const styles = stylex.create({
  list: {
    marginTop: "1.25rem",
  },
});
