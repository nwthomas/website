import * as stylex from "@stylexjs/stylex";

import { BOOKMARKS } from "./bookmarks";
import { BookmarksList } from "./BookmarksList";
import Link from "next/link";
import { Metadata } from "next";
import { RssIcon } from "@/app/components/Icons/RssIcon";
import { sharedStyles } from "@/app/styles";

export const metadata: Metadata = {
  title: "Bookmarks | Nathan Thomas",
  description: "Articles and resources Nathan Thomas has read and learned from",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  alternates: { canonical: "/bookmarks" },
  openGraph: {
    title: "Bookmarks",
    description: "Articles and resources Nathan Thomas has read and learned from",
    url: "https://www.nathanthomas.dev/bookmarks",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function Page() {
  return (
    <section {...stylex.props(sharedStyles.pageSection)}>
      <p {...stylex.props(sharedStyles.textSecondary)}>
        I love to learn and bookmark what I've read here. I also have an{" "}
        <Link
          aria-label="Link to Nathan's Atom RSS feed"
          href="/bookmarks/atom"
          {...stylex.props(sharedStyles.rssFeedLink)}
        >
          RSS feed{"\u00a0"}
          <RssIcon />
        </Link>{" "}
        you can follow.
      </p>
      <BookmarksList bookmarks={BOOKMARKS} />
    </section>
  );
}
