import Link from "next/link";
import { Post } from "@/app/(writing)/utils/types";
import { RecentlyPlayed } from "@/app/components/RecentlyPlayed";
import { getNowPlaying } from "@/app/utils/spotify";
import postsJson from "@/app/(writing)/posts.json";

export default async function Page() {
  const { posts } = postsJson;
  const lastThreePosts: Post[] = posts.slice(0, 3);
  const nowPlaying = await getNowPlaying();

  return (
    <section className="w-full max-w-2xl mx-5">
      <p>
        I push the frontier of what's possible with cloud-based AI coding agents at{" "}
        <a href="https://cursor.com" aria-label="Link to Cursor's website" rel="noopener noreferrer" target="_target">
          Cursor
        </a>{" "}
        and previously led core work at{" "}
        <a href="https://tesla.com" aria-label="Link to Tesla's website" rel="noopener noreferrer" target="_target">
          Tesla
        </a>
        ,{" "}
        <a href="https://loom.com" aria-label="Link to Loom's website" rel="noopener noreferrer" target="_target">
          Loom
        </a>
        , and{" "}
        <a
          className="break-keep whitespace-nowrap"
          href="https://x.com"
          aria-label="Link to X's website"
          rel="noopener noreferrer"
          target="_target"
        >
          Twitter (X)
        </a>
        .
      </p>
      <p className="mt-5">
        At the end of the day, I'm still that kid who grew up playing with his parents' Macintosh and ripping CDs for
        his friends.
      </p>
      <h2 className="mt-5">Writing</h2>
      <ul className="mt-4">
        {lastThreePosts.map((post) => (
          <li key={post.id}>
            <Link href={`/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-5">Teaching</h2>
      <ul className="mt-4">
        <li>
          <a
            href="https://www.codetenderloin.org/"
            aria-label="Link to Code Tenderloin"
            rel="noopener noreferrer"
            target="_blank"
          >
            Code Tenderloin (volunteer, 10 cohorts)
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=GNrQTbIFsG4&t=2909s"
            aria-label="Link to Nathan's React Native Web at Twitter talk on YouTube"
            rel="noopener noreferrer"
            target="_blank"
          >
            React Native Web at Twitter
          </a>
        </li>
      </ul>
      <h2 className="mt-5">Projects</h2>
      <ul className="mt-4">
        <li>
          <a
            href="https://github.com/nwthomas/gitops"
            aria-label="Link to the Nathan's gitops repository on GitHub"
            rel="noopener noreferrer"
            target="_blank"
          >
            Local AI models on Kubernetes
          </a>
        </li>
        <li>
          <a
            href="https://github.com/nwthomas/oura-ring-mcp-server"
            aria-label="Link to Nathan's Oura Ring MPC Server repository on GitHub"
            rel="noopener noreferrer"
            target="_blank"
          >
            Oura Ring MCP Server
          </a>
        </li>
        <li>
          <a
            href="https://github.com/nwthomas/watcher-in-the-water"
            aria-label="Link to Nathan's Watcher in the Water repository on GitHub"
            rel="noopener noreferrer"
            target="_blank"
          >
            Watcher in the Water
          </a>
        </li>
      </ul>
      {nowPlaying ? <RecentlyPlayed track={nowPlaying} /> : null}
      <p className="mt-5">
        You can read my{" "}
        <Link aria-label="Link to Nathan's writing" href="/writing">
          writing
        </Link>
        ,{" "}
        <Link aria-label="Link to Nathan's bookmarks" href="/bookmarks">
          bookmarks
        </Link>
        ,{" "}
        <Link aria-label="Link to Nathan's bikes page" href="/bikes">
          bikes
        </Link>
        , <Link href="/books">booklist</Link>,{" "}
        <a
          href="https://nathanthomas.substack.com/"
          aria-label="Link to Nathan's profile on Substack"
          rel="noopener noreferrer"
          target="_blank"
        >
          newsletter
        </a>
        ,{" "}
        <a
          href="https://github.com/nwthomas"
          aria-label="Link to Nathan's GitHub"
          rel="noopener noreferrer"
          target="_blank"
        >
          code
        </a>
        , or{" "}
        <a
          href="https://x.com/nwthomas"
          aria-label="Link to Nathan's profile on X"
          rel="noopener noreferrer"
          target="_blank"
        >
          follow me online.
        </a>{" "}
        I also angel invest in startups, so please <a href="mailto:contact@nathanthomas.dev">reach out</a> if
        interested.
      </p>
    </section>
  );
}
