import { Link, createFileRoute } from "@tanstack/react-router";

import { clsx } from "clsx";
import postsJson from "@/posts.json";
import type { Post } from "@/writing/types";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/writing")({
  loader: async () => {
    const { posts } = postsJson;
    const sortedPosts: Post[] = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let postViews: Record<string, number | null> = {};
    if (import.meta.env.PROD) {
      const { redis, getPostViewsRedisKey } = await import("@/utils/redis");
      postViews = await redis.mGet<number | null>(posts.map((post) => getPostViewsRedisKey(post.id)));
    }

    return { sortedPosts, postViews };
  },
  head: () => ({
    meta: pageMeta({
      title: "Writing | Nathan Thomas",
      description: "Nathan Thomas' writing page",
      ogTitle: "Writing",
      ogDescription: "Nathan Thomas' writing page",
    }),
  }),
  component: WritingPage,
});

const VIEWS_PLACEHOLDER = "-";

function WritingPage() {
  const { sortedPosts, postViews } = Route.useLoaderData();

  return (
    <section className="w-full max-w-2xl mx-5">
      <p>
        Below is a curated collection of my writing. I also have an{" "}
        <Link aria-label="Link to Nathan's Atom RSS feed" to="/atom">
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
            <Link className="text-sm font-mono flex gap-5 no-underline w-full" to="/$slug" params={{ slug: post.id }}>
              <span className="whitespace-nowrap">{post.date}</span>
              <span className="underline decoration-dotted decoration-gray-500 flex-2">{post.title}</span>
              <span className="text-s text-gray-500">
                {postViews[`${post.id}-views`] != null ? `${postViews[`${post.id}-views`]}` : VIEWS_PLACEHOLDER}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
