import { Post } from "@/app/(writing)/utils/types";
import postsJson from "@/app/(writing)/posts.json";

export const dynamic = "force-static";

export function GET() {
  const posts = (postsJson.posts as Post[])
    .filter((post) => !post.draft)
    .map(({ id, title, description, date }) => ({ slug: id, title, description, date, url: `/${id}` }));

  return Response.json(posts);
}
