import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import { Bookmarks, Bookmark } from "./bookmarks";
import { FAVICON_HOSTNAMES } from "./favicons";
import { LinkIcon } from "@/app/components/Icons";

// Favicons are downloaded and shrunk ahead of time by scripts/fetch-bookmark-favicons.ts
function getFaviconSrc(url: string): string | null {
  const { hostname } = new URL(url);
  return FAVICON_HOSTNAMES.has(hostname) ? `/images/bookmarks/favicons/${hostname}.webp` : null;
}

function BookmarkIcon({ url }: { url: string }) {
  const src = getFaviconSrc(url);
  return (
    <span {...stylex.props(styles.icon)}>
      {src ? (
        // Already a tiny WebP, so the image optimizer would add nothing
        <Image
          alt=""
          aria-hidden="true"
          height={32}
          loading="lazy"
          src={src}
          unoptimized
          width={32}
          {...stylex.props(styles.favicon)}
        />
      ) : (
        <LinkIcon color="currentColor" isAriaHidden style={{ height: "1em", width: "1em" }} />
      )}
    </span>
  );
}

type BookmarkRowProps = {
  bookmark: Bookmark;
};

function BookmarkRow({ bookmark }: BookmarkRowProps) {
  return (
    <div role="listitem" {...stylex.props(styles.item)}>
      <a aria-label={`Link to ${bookmark.title}`} href={bookmark.url} {...stylex.props(styles.link)}>
        <span {...stylex.props(styles.date)}>{bookmark.date}</span>
        <BookmarkIcon url={bookmark.url} />
        <span {...stylex.props(styles.title)}>{bookmark.title}</span>
      </a>
      {bookmark.footnotes && bookmark.footnotes.length > 0
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
    </div>
  );
}

type BookmarksListProps = {
  bookmarks: Bookmarks;
};

export function BookmarksList({ bookmarks }: BookmarksListProps) {
  return (
    <div aria-label="Bookmarks" role="list" {...stylex.props(styles.list)}>
      {bookmarks.map((bookmark) => (
        <BookmarkRow bookmark={bookmark} key={bookmark.url + bookmark.id} />
      ))}
    </div>
  );
}

const styles = stylex.create({
  date: {
    textDecorationLine: "none",
    whiteSpace: "nowrap",
  },
  favicon: {
    display: "block",
    height: "1em",
    width: "1em",
  },
  footnote: {
    color: "var(--foreground-muted)",
    cursor: "pointer",
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "0.75rem",
    textDecorationLine: "none",
    marginLeft: "0.25rem",
  },
  // Sized to one line of text so the icon stays beside the first line of a wrapped title
  icon: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    height: "1.5em",
    marginLeft: "1.25rem",
  },
  // Every row stays in the DOM so find-in-page works, but off-screen rows skip layout and paint.
  // The intrinsic size is a single-line row estimate until the browser remembers the real height.
  // content-visibility also clips painting to the row, so padding leaves room for the link focus
  // ring and negative margins cancel it out, keeping 0.25rem between rows.
  item: {
    padding: "0.25rem",
    containIntrinsicSize: "auto 29px",
    marginBlock: "-0.125rem",
    marginInline: "-0.25rem",
    contentVisibility: "auto",
    display: "flex",
  },
  link: {
    display: "flex",
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    overflowWrap: "break-word",
    textDecorationLine: "none",
  },
  // A column flex container so the rows' negative vertical margins add up instead of collapsing.
  // Off-screen rows remember their last rendered width, so inline-size containment keeps that stale
  // width from propping the page open (and eating its side margins) after the viewport shrinks.
  list: {
    contain: "inline-size",
    display: "flex",
    flexDirection: "column",
    marginBottom: "-0.125rem",
    marginTop: "1.125rem",
    width: "100%",
  },
  title: {
    textDecorationColor: "var(--foreground-muted)",
    textDecorationLine: "underline",
    textUnderlineOffset: "3px",
    marginLeft: "0.5rem",
  },
});
