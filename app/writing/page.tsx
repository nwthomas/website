import { sx } from "@/app/styles/tw.stylex";
import { getPostViewsRedisKey, redis } from "@/app/utils/redis";

import Link from "next/link";
import { Metadata } from "next";
import { Post } from "@/app/(writing)/utils/types";
import postsJson from "@/app/(writing)/posts.json";

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
    <section {...sx("wFull maxW2xl mx5")}>
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
      <ul {...sx("mt5")}>
        {sortedPosts.map((post, i) => (
          <li {...sx("flex beforeEmpty pl0", i > 0 && "mt1")} key={post.id}>
            <Link {...sx("textSm fontMono flex gap5 noUnderline wFull")} href={`/${post.id}`}>
              <span {...sx("whitespaceNowrap")}>{post.date}</span>
              <span {...sx("underline decorationDotted decorationGray500 flex2")}>{post.title}</span>
              <span {...sx("textSm textGray500")}>
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
