import { getPostViewsRedisKey, redis } from "@/app/utils/redis";

import Link from "next/link";
import { Metadata } from "next";
import { clsx } from "clsx";
import postsJson from "@/app/(writing)/posts.json";

export const metadata: Metadata = {
  title: "Writing | Nathan Thomas",
  description: "Nathan Thomas' writing page",
};

// Render the page dynamically per request
export const dynamic = "force-dynamic";

export default async function Page() {
  const { posts } = postsJson;
  const postViews = await redis.mGet<number | null>(posts.map((post) => getPostViewsRedisKey(post.id)));

  return (
    <section className="w-full max-w-2xl mx-5">
      <p>
        Below is a curated collection of my writing. I also have an{" "}
        <Link aria-label="Link to Nathan's Atom RSS feed" href="/atom">
          RSS feed
        </Link>{" "}
        you can follow.
      </p>
      <ul className="mt-5">
        {posts.map((post, i) => (
          <li className={clsx("flex before:content-[''] pl-0", i > 0 && "mt-1")} key={post.id}>
            <Link className="text-sm font-mono flex gap-5 no-underline w-full" href={`/${post.id}`}>
              <span className="whitespace-nowrap">{post.date}</span>
              <span className="underline decoration-dotted decoration-gray-500 flex-2">{post.title}</span>
              {postViews[getPostViewsRedisKey(post.id)] != null ? (
                <span className="text-s">{`${postViews[getPostViewsRedisKey(post.id)]}`}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
