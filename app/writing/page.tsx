import Link from "next/link";
import { Metadata } from "next";
import postsJson from "@/app/(writing)/posts.json";

export const metadata: Metadata = {
  title: "Writing | Nathan Thomas",
  description: "Nathan Thomas' writing page",
};

export default function Page() {
  const { posts } = postsJson;

  return (
    <section className="w-full max-w-2xl mx-5">
      <ul>
        {posts.map((post) => (
          <li className="flex before:content-[''] pl-0" key={post.id}>
            <p className="text-sm font-mono">{post.date}</p>
            <Link className="text-sm font-mono ml-4" href={`/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
