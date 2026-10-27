"use client";

import * as stylex from "@stylexjs/stylex";
import { type ReactNode, useEffect, useRef } from "react";

type Anchor = {
  index: number;
  // How far past the anchored item's left edge the row is scrolled, as a fraction of its width
  progress: number;
};

type Props = {
  children: ReactNode;
  label: string;
  style?: stylex.StyleXStyles;
};

// A horizontally scrolling list that keeps whichever item is left-aligned in place
// when the viewport resizes, letting the right side grow or slide off instead.
export function HorizontalScroller({ children, label, style }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    let anchor: Anchor = { index: 0, progress: 0 };
    let lastWidth = list.clientWidth;
    // The scroll position our last restore landed on, so its scroll event isn't recorded as a new anchor
    let restoredScrollLeft: number | null = null;

    const getStartEdge = () => parseFloat(getComputedStyle(list).paddingLeft) || 0;
    const getItems = () => Array.from(list.children) as HTMLElement[];

    const recordAnchor = () => {
      // Ignore scroll events from the browser clamping during a resize, before the observer restores
      if (list.clientWidth !== lastWidth) {
        return;
      }

      if (restoredScrollLeft !== null && Math.abs(list.scrollLeft - restoredScrollLeft) < 1) {
        restoredScrollLeft = null;
        return;
      }
      restoredScrollLeft = null;

      const scrollStart = list.scrollLeft + getStartEdge();
      const items = getItems();
      const index = items.findIndex((item) => item.offsetLeft + item.offsetWidth > scrollStart);
      if (index === -1) {
        return;
      }

      const item = items[index];
      anchor = { index, progress: Math.max(0, (scrollStart - item.offsetLeft) / item.offsetWidth) };
    };

    const restoreAnchor = () => {
      if (list.clientWidth === lastWidth) {
        return;
      }
      lastWidth = list.clientWidth;

      const item = getItems()[anchor.index];
      if (!item) {
        return;
      }

      list.scrollLeft = item.offsetLeft - getStartEdge() + anchor.progress * item.offsetWidth;
      restoredScrollLeft = list.scrollLeft;
    };

    const resizeObserver = new ResizeObserver(restoreAnchor);
    resizeObserver.observe(list);
    list.addEventListener("scroll", recordAnchor, { passive: true });

    return () => {
      resizeObserver.disconnect();
      list.removeEventListener("scroll", recordAnchor);
    };
  }, []);

  return (
    <ul ref={listRef} aria-label={label} tabIndex={0} {...stylex.props(styles.list, style)}>
      {children}
    </ul>
  );
}

const styles = stylex.create({
  list: {
    display: "flex",
    listStyleType: "none",
    // Draw the focus outline inside the list so it isn't cut off when the list spans the full viewport
    outlineOffset: "-2px",
    position: "relative",
    scrollbarWidth: "none",
    overflowX: "auto",
    overflowY: "hidden",
    overscrollBehaviorX: "contain",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
});
