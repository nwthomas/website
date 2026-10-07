"use client";

import * as stylex from "@stylexjs/stylex";
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps, WindowScroller } from "react-virtualized";
import { CSSProperties, useRef, useState, useSyncExternalStore } from "react";
import { Bookmarks, Bookmark } from "./bookmarks";

// Number of rows rendered on the server and before hydration so the page has content without JavaScript
const INITIAL_ROW_COUNT = 50;

// Approximate height of a single-line row (0.875rem * 1.5 line height + 0.25rem offset)
const DEFAULT_ROW_HEIGHT = 25;

const subscribeToNothing = () => () => {};

type BookmarkRowProps = {
  bookmark: Bookmark;
  isFirst: boolean;
  style?: CSSProperties;
  registerChild?: (element?: Element | null) => void;
};

function BookmarkRow({ bookmark, isFirst, style, registerChild }: BookmarkRowProps) {
  const { className, style: stylexStyle } = stylex.props(styles.item, !isFirst && styles.itemOffset);

  return (
    <div
      className={className}
      ref={(element) => registerChild?.(element)}
      role="listitem"
      style={{ ...stylexStyle, ...style }}
    >
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
  // WindowScroller and AutoSizer read window dimensions, so the virtualized list only renders after
  // mounting to avoid a hydration mismatch. Until then, a static slice of the list is rendered.
  const hasMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const listRef = useRef<List>(null);
  const widthRef = useRef(0);
  const [cache] = useState(() => new CellMeasurerCache({ defaultHeight: DEFAULT_ROW_HEIGHT, fixedWidth: true }));

  if (!hasMounted) {
    return (
      <div role="list" {...stylex.props(styles.list)}>
        {bookmarks.slice(0, INITIAL_ROW_COUNT).map((bookmark, i) => (
          <BookmarkRow bookmark={bookmark} isFirst={i === 0} key={bookmark.url + bookmark.id} />
        ))}
      </div>
    );
  }

  // Row heights depend on how titles wrap, so they must be remeasured whenever the width changes
  const handleResize = ({ width }: { width: number }) => {
    if (width !== widthRef.current) {
      widthRef.current = width;
      cache.clearAll();
      listRef.current?.recomputeRowHeights();
    }
  };

  const rowRenderer = ({ index, key, parent, style }: ListRowProps) => {
    const bookmark = bookmarks[index];

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {({ registerChild }) => (
          <BookmarkRow bookmark={bookmark} isFirst={index === 0} registerChild={registerChild} style={style} />
        )}
      </CellMeasurer>
    );
  };

  return (
    <div {...stylex.props(styles.list)}>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, registerChild, scrollTop }) => (
          <AutoSizer disableHeight onResize={handleResize}>
            {({ width }) => (
              <div ref={registerChild}>
                <List
                  aria-label="Bookmarks"
                  autoHeight
                  containerRole="presentation"
                  deferredMeasurementCache={cache}
                  height={height}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  overscanRowCount={10}
                  ref={listRef}
                  role="list"
                  rowCount={bookmarks.length}
                  rowHeight={cache.rowHeight}
                  rowRenderer={rowRenderer}
                  scrollTop={scrollTop}
                  style={{ outline: "none" }}
                  tabIndex={null}
                  width={width}
                />
              </div>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
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
  item: {
    display: "flex",
  },
  // Padding rather than margin so CellMeasurer includes the spacing in each row's measured height
  itemOffset: {
    paddingTop: "0.25rem",
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
