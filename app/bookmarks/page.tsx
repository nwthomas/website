import { BOOKMARKS } from "./bookmarks";
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
      <ul {...stylex.props(styles.list)}>
        {BOOKMARKS.map((bookmark, i) => (
          <li
            data-unstyled="true"
            {...stylex.props(styles.item, i > 0 && styles.itemOffset)}
            key={bookmark.url + bookmark.id}
          >
            <>
              <a aria-label={`Link to ${bookmark.title}`} href={bookmark.url} {...stylex.props(styles.link)}>
                <span {...stylex.props(styles.date)}>{bookmark.date}</span>
                <span {...stylex.props(styles.title)}>{bookmark.title}</span>
              </a>
              {bookmark?.footnotes && bookmark.footnotes.length > 0
                ? bookmark.footnotes.map((footnote, f_i) => (
                    <a
                      aria-label={`Link to footnote ${f_i + 1} for ${bookmark.title}`}
                      href={footnote}
                      key={footnote}
                      {...stylex.props(styles.footnote)}
                    >
                      {f_i + 1}
                    </a>
                  ))
                : null}
            </>
          </li>
        ))}
      </ul>
    </section>
  );
}

const styles = stylex.create({
  date: {
    textDecorationLine: "none",
    whiteSpace: "nowrap",
  },
  footnote: {
    color: "var(--muted)",
    cursor: "pointer",
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "0.75rem",
    textDecorationLine: "none",
    marginLeft: "0.25rem",
  },
  item: {
    display: "flex",
  },
  itemOffset: {
    marginTop: "0.25rem",
  },
  link: {
    display: "flex",
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    overflowWrap: "break-word",
    textDecorationLine: "none",
  },
  list: {
    marginTop: "1.25rem",
    width: "100%",
  },
  title: {
    textDecorationColor: "var(--muted)",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    marginLeft: "1.25rem",
  },
});
