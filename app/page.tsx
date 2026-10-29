import * as stylex from "@stylexjs/stylex";

import Link from "next/link";
import { Post } from "@/app/(writing)/utils/types";
import { postToRowListItem } from "@/app/(writing)/utils/postToRowListItem";
import { GitHubIcon } from "@/app/components/Icons/GitHubIcon";
import { RowList, type RowListItem } from "@/app/components/RowList";
import { SpotifyTopTracks } from "@/app/components/SpotifyTopTracks";
import postsJson from "@/app/(writing)/posts.json";
import { sharedStyles } from "@/app/styles";

// A failed fetch during regeneration keeps the last good page and retries on the next request;
// one during the build renders without tracks until the first regeneration after this interval.
export const revalidate = 3600;

const PROJECTS: RowListItem[] = [
  {
    ariaLabel: "Link to the Nathan's gitops repository on GitHub",
    description: "Self-hosted AI models using Kubernetes with vLLM",
    external: true,
    icon: <GitHubIcon />,
    href: "https://github.com/nwthomas/gitops",
    title: "Local AI models on Kubernetes",
  },
  {
    ariaLabel: "Link to Nathan's Oura Ring MPC Server repository on GitHub",
    description: "Monitor personal health data from Oura Ring",
    external: true,
    icon: <GitHubIcon />,
    href: "https://github.com/nwthomas/oura-ring-mcp-server",
    title: "Oura Ring MCP Server",
  },
  {
    ariaLabel: "Link to Nathan's Watcher in the Water repository on GitHub",
    description: "Lightweight monitor for public IP changes due to ISP DHCP",
    external: true,
    icon: <GitHubIcon />,
    href: "https://github.com/nwthomas/watcher-in-the-water",
    title: "Watcher in the Water",
  },
];

export default async function Page() {
  const { posts } = postsJson;
  const lastThreePosts: Post[] = posts.slice(0, 3);

  return (
    <section {...stylex.props(sharedStyles.pageSection)}>
      <p {...stylex.props(sharedStyles.textSecondary)}>
        I'm a full-stack software engineer from San Francisco, CA. I previously led work at Tesla, Loom, and X. Here's
        my{" "}
        <Link aria-label="Link to Nathan's writing" href="/writing">
          writing
        </Link>
        ,{" "}
        <a
          href="https://github.com/nwthomas"
          aria-label="Link to Nathan's GitHub"
          rel="noopener noreferrer"
          target="_blank"
        >
          code
        </a>
        ,{" "}
        <Link aria-label="Link to Nathan's bookmarks" href="/bookmarks">
          bookmarks
        </Link>
        , and <Link href="/books">booklist</Link>. I also <a href="mailto:contact@nathanthomas.dev">angel invest</a> in
        startups.
      </p>
      <h2 {...stylex.props(styles.heading)}>Writing</h2>
      <RowList items={lastThreePosts.map(postToRowListItem)} style={styles.rowList} />
      <h2 {...stylex.props(styles.heading)}>Projects</h2>
      <RowList items={PROJECTS} style={styles.rowList} />
      <SpotifyTopTracks />
    </section>
  );
}

const styles = stylex.create({
  heading: {
    marginTop: "2.5rem",
  },
  rowList: {
    marginBottom: "-0.75rem",
    marginTop: "0.25rem",
  },
});
