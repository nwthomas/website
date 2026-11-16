"use client";

import * as stylex from "@stylexjs/stylex";
import {
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { sharedStyles } from "@/app/styles";

const TOOLTIP_OFFSET = 8;
const ARROW_SIZE = 5;
const TOOLTIP_RADIUS = 6;
const VIEWPORT_MARGIN = 8;
const DAYS_PER_WEEK = 7;

type Placement = "above" | "below" | "left" | "right";

type Layout = {
  arrowOffset: number;
  cell: DOMRect;
  left: number;
  placement: Placement;
  top: number;
};

type Props = {
  children: ReactNode;
  style?: stylex.StyleXStyles;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export function ContributionsTooltip({ children, style }: Props) {
  const [cell, setCell] = useState<Element | null>(null);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const hide = useCallback(() => {
    setCell(null);
    setIsKeyboard(false);
    setLayout(null);
  }, []);

  const updateLayout = useCallback(() => {
    const tooltip = tooltipRef.current;
    if (!cell || !tooltip) {
      return;
    }

    const rect = cell.getBoundingClientRect();
    const cellCenterX = rect.left + rect.width / 2;
    const cellCenterY = rect.top + rect.height / 2;
    const { offsetHeight: height, offsetWidth: width } = tooltip;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const centeredLeft = cellCenterX - width / 2;
    const left = clamp(centeredLeft, VIEWPORT_MARGIN, viewportWidth - VIEWPORT_MARGIN - width);
    const arrowLeft = cellCenterX - left;
    const horizontalArrowInset = TOOLTIP_RADIUS + ARROW_SIZE;
    const arrowFits = arrowLeft >= horizontalArrowInset && arrowLeft <= width - horizontalArrowInset;

    if (!arrowFits) {
      const placement: Placement = centeredLeft < VIEWPORT_MARGIN ? "right" : "left";
      const sideLeft = placement === "right" ? rect.right + TOOLTIP_OFFSET : rect.left - TOOLTIP_OFFSET - width;
      const top = clamp(cellCenterY - height / 2, VIEWPORT_MARGIN, viewportHeight - VIEWPORT_MARGIN - height);
      const verticalArrowInset = ARROW_SIZE + 1;
      setLayout({
        arrowOffset: clamp(cellCenterY - top, verticalArrowInset, height - verticalArrowInset),
        cell: rect,
        left: sideLeft,
        placement,
        top,
      });
      return;
    }

    const aboveTop = rect.top - TOOLTIP_OFFSET - height;
    const placement: Placement = aboveTop >= VIEWPORT_MARGIN ? "above" : "below";
    const top = placement === "above" ? aboveTop : rect.bottom + TOOLTIP_OFFSET;
    setLayout({ arrowOffset: arrowLeft, cell: rect, left, placement, top });
  }, [cell]);

  useLayoutEffect(updateLayout, [updateLayout]);

  useEffect(() => {
    if (!cell) {
      return;
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        hide();
      }
    };

    window.addEventListener("scroll", updateLayout, { capture: true, passive: true });
    window.addEventListener("resize", updateLayout);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("scroll", updateLayout, { capture: true });
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [cell, hide, updateLayout]);

  const handlePointerOver = (event: PointerEvent<HTMLDivElement>) => {
    const target = (event.target as Element).closest("[data-tooltip]");
    if (target) {
      setCell(target);
      setIsKeyboard(false);
    } else {
      hide();
    }
  };

  const findCell = (week: number, day: number) =>
    containerRef.current?.querySelector(`[data-week="${week}"][data-day="${day}"]`) ?? null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const cells = containerRef.current?.querySelectorAll("[data-tooltip]");
    if (!cells?.length || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const first = cells[0];
    const last = cells[cells.length - 1];
    const current = isKeyboard ? cell : null;
    const week = Number(current?.getAttribute("data-week"));
    const day = Number(current?.getAttribute("data-day"));

    let next: Element | null;
    switch (event.key) {
      case "ArrowLeft":
        next = current ? findCell(week - 1, day) : last;
        break;
      case "ArrowRight":
        next = current ? findCell(week + 1, day) : last;
        break;
      case "ArrowUp":
        next = current ? (day > 0 ? findCell(week, day - 1) : null) : last;
        break;
      case "ArrowDown":
        next = current ? (day < DAYS_PER_WEEK - 1 ? findCell(week, day + 1) : null) : last;
        break;
      case "Home":
        next = first;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    if (!next || next === current) {
      return;
    }

    next.scrollIntoView({ block: "nearest", inline: "nearest" });
    setCell(next);
    setIsKeyboard(true);
    setAnnouncement(next.getAttribute("data-tooltip") ?? "");
  };

  const handleBlur = () => {
    if (isKeyboard) {
      hide();
    }
    setAnnouncement("");
  };

  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPointerLeave={hide}
      onPointerOver={handlePointerOver}
      {...stylex.props(style)}
    >
      {children}
      <span aria-live="polite" {...stylex.props(sharedStyles.visuallyHidden)}>
        {announcement}
      </span>
      {isKeyboard && layout ? (
        <div
          aria-hidden="true"
          {...stylex.props(
            styles.cellOutline,
            styles.cellBox(layout.cell.left, layout.cell.top, layout.cell.width, layout.cell.height),
          )}
        />
      ) : null}
      {cell ? (
        <div
          ref={tooltipRef}
          aria-hidden="true"
          {...stylex.props(styles.tooltip, layout ? styles.position(layout.left, layout.top) : styles.measuring)}
        >
          {cell.getAttribute("data-tooltip")}
          {layout ? (
            <span
              aria-hidden="true"
              {...stylex.props(
                styles.arrow,
                arrowPlacementStyles[layout.placement],
                layout.placement === "above" || layout.placement === "below"
                  ? styles.arrowX(layout.arrowOffset)
                  : styles.arrowY(layout.arrowOffset),
              )}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

const styles = stylex.create({
  arrow: {
    borderColor: "transparent",
    borderStyle: "solid",
    position: "absolute",
    height: 0,
    width: 0,
  },
  arrowX: (left: number) => ({
    left,
  }),
  arrowY: (top: number) => ({
    top,
  }),
  cellBox: (left: number, top: number, width: number, height: number) => ({
    height,
    left,
    top,
    width,
  }),
  cellOutline: {
    borderRadius: 2,
    outlineColor: "var(--focus-ring)",
    outlineOffset: 1,
    outlineStyle: "solid",
    outlineWidth: "2px",
    pointerEvents: "none",
    position: "fixed",
    zIndex: 50,
  },
  measuring: {
    visibility: "hidden",
    left: 0,
    top: 0,
  },
  position: (left: number, top: number) => ({
    left,
    top,
  }),
  tooltip: {
    borderRadius: TOOLTIP_RADIUS,
    backgroundColor: "var(--foreground)",
    color: "var(--background)",
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: 1.5,
    pointerEvents: "none",
    position: "fixed",
    whiteSpace: "nowrap",
    zIndex: 50,
    paddingBottom: "0.25rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "0.25rem",
  },
});

const arrowPlacementStyles = stylex.create({
  above: {
    transform: "translateX(-50%)",
    borderBottomWidth: 0,
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
    borderTopColor: "var(--foreground)",
    borderTopWidth: ARROW_SIZE,
    top: "100%",
  },
  below: {
    transform: "translateX(-50%)",
    borderBottomColor: "var(--foreground)",
    borderBottomWidth: ARROW_SIZE,
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
    borderTopWidth: 0,
    bottom: "100%",
  },
  left: {
    transform: "translateY(-50%)",
    borderBottomWidth: ARROW_SIZE,
    borderLeftColor: "var(--foreground)",
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: 0,
    borderTopWidth: ARROW_SIZE,
    left: "100%",
  },
  right: {
    transform: "translateY(-50%)",
    borderBottomWidth: ARROW_SIZE,
    borderLeftWidth: 0,
    borderRightColor: "var(--foreground)",
    borderRightWidth: ARROW_SIZE,
    borderTopWidth: ARROW_SIZE,
    right: "100%",
  },
});
