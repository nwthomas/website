import * as stylex from "@stylexjs/stylex";
import { Bookmarks, Bookmark } from "./bookmarks";

type BookmarkRowProps = {
  bookmark: Bookmark;
};

function BookmarkRow({ bookmark }: BookmarkRowProps) {
  return (
    <div role="listitem" {...stylex.props(styles.item)}>
      <a aria-label={`Link to ${bookmark.title}`} href={bookmark.url} {...stylex.props(styles.link)}>
        <span {...stylex.props(styles.date)}>{bookmark.date}</span>
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
  footnote: {
    color: "var(--muted)",
    cursor: "pointer",
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "0.75rem",
    textDecorationLine: "none",
    marginLeft: "0.25rem",
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
  // A column flex container so the rows' negative vertical margins add up instead of collapsing
  list: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "-0.125rem",
    marginTop: "1.125rem",
    width: "100%",
  },
  title: {
    textDecorationColor: "var(--muted)",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    marginLeft: "1.25rem",
  },
});
