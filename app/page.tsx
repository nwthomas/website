import * as stylex from "@stylexjs/stylex";

import Link from "next/link";
import { Post } from "@/app/(writing)/utils/types";
import { postToRowListItem } from "@/app/(writing)/utils/postToRowListItem";
import { ExternalLinkIcon } from "@/app/components/Icons/ExternalLinkIcon";
import { GitHubContributions } from "@/app/components/GitHubContributions";
import { GitHubIcon } from "@/app/components/Icons/GitHubIcon";
import { RowList, type RowListItem } from "@/app/components/RowList";
import { SpotifyTopTracks } from "@/app/components/SpotifyTopTracks";
import postsJson from "@/app/(writing)/posts.json";
import { sharedStyles } from "@/app/styles";
import { withNewTabHint } from "@/app/utils/a11y";

// A failed fetch during regeneration keeps the last good page and retries on the next request;
// one during the build renders without that section until the first regeneration after this interval.
export const revalidate = 3600;

const PROJECTS: RowListItem[] = [
  {
    ariaLabel: "Link to Nathan's AI Training Roadmap",
    description: "Resources for humans to train models",
    external: true,
    icon: <ExternalLinkIcon />,
    href: "https://roadmap.nathanthomas.dev",
    title: "AI Training Roadmap",
  },
  {
    ariaLabel: "Link to the Nathan's gitops repository on GitHub",
    description: "Self-hosted AI models on Kubernetes with vLLM",
    external: true,
    icon: <GitHubIcon />,
    href: "https://github.com/nwthomas/gitops",
    title: "Local AI models on Kubernetes",
  },
  {
    ariaLabel: "Link to Nathan's Oura Ring MPC Server repository on GitHub",
    description: "Monitor health data from Oura Ring",
    external: true,
    icon: <GitHubIcon />,
    href: "https://github.com/nwthomas/oura-ring-mcp-server",
    title: "Oura Ring MCP Server",
  },
  {
    ariaLabel: "Link to Nathan's Watcher in the Water repository on GitHub",
    description: "Monitor for home IP changes from ISP DHCP",
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
        I'm a software engineer from San Francisco, CA with a multi-disciplinary background across engineering, design,
        and product. I've led work at Tesla, Loom, and X.
      </p>
      <p {...stylex.props(sharedStyles.textSecondary, styles.paragraph)}>
        Here's my{" "}
        <Link aria-label="Link to Nathan's writing" href="/writing">
          writing
        </Link>
        ,{" "}
        <a
          href="https://github.com/nwthomas"
          aria-label={withNewTabHint("Link to Nathan's GitHub")}
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
      <GitHubContributions />
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
  paragraph: {
    marginTop: "1rem",
  },
  rowList: {
    marginBottom: "-0.75rem",
    marginTop: "0.25rem",
  },
});
