import { getPostViewsRedisKey, redis } from "@/app/utils/redis";

import Link from "next/link";
import { Metadata } from "next";
import { Post } from "@/app/(writing)/utils/types";
import { clsx } from "clsx";
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
    <section className="w-full max-w-2xl mx-5">
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
      <ul className="mt-5">
        {sortedPosts.map((post, i) => (
          <li className={clsx("flex before:content-[''] pl-0", i > 0 && "mt-1")} key={post.id}>
            <Link className="text-sm font-mono flex gap-5 no-underline w-full" href={`/${post.id}`}>
              <span className="whitespace-nowrap">{post.date}</span>
              <span className="underline decoration-dotted decoration-gray-500 flex-2">{post.title}</span>
              <span className="text-s text-gray-500">
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
