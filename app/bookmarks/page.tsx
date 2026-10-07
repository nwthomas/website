import { BOOKMARKS } from "./bookmarks";
import { BookmarksList } from "./BookmarksList";
import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import { Metadata } from "next";
import { sharedStyles } from "@/app/styles";

export const metadata: Metadata = {
  title: "Bookmarks | Nathan Thomas",
  description: "Nathan Thomas' bookmarks page",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "Bookmarks",
    description: "Nathan Thomas' bookmarks page",
    url: "https://www.nathanthomas.dev",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function Page() {
  return (
    <section {...stylex.props(sharedStyles.pageSection)}>
      <p>
        I love to learn and bookmark what I've read here. I also have an{" "}
        <Link aria-label="Link to Nathan's Atom RSS feed" href="/bookmarks/atom">
          RSS feed
        </Link>{" "}
        you can follow.
      </p>
      <BookmarksList bookmarks={BOOKMARKS} />
    </section>
  );
}
