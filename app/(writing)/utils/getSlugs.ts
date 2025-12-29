import postsJson from "../posts.json";

type Slug = { slug: string };
export type Slugs = Slug[];

export function getSlugs(): Slugs {
  const slugs = postsJson.posts.map((post) => ({
    slug: post.id,
  }));

  return slugs;
}
