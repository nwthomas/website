import Link from "next/link";
import { Metadata } from "next";
import { clsx } from "clsx";
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
        {posts.map((post, i) => (
          <li className={clsx("flex before:content-[''] pl-0", i > 0 && "mt-1")} key={post.id}>
            <Link className="text-sm font-mono flex gap-5 no-underline" href={`/${post.id}`}>
              <span className="whitespace-nowrap">{post.date}</span>
              <span className="underline decoration-dotted decoration-gray-400">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
