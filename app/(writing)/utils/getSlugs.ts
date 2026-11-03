import { Post, Slugs } from "./types";

import postsJson from "../posts.json";

export function getSlugs(): Slugs {
  const posts = postsJson.posts as Post[];
  const slugs = posts
    .filter((post) => !post?.draft)
    .map((post) => ({
      slug: post.id,
    }));
  console.log({ slugs });

  return slugs;
}
