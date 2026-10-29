import * as stylex from "@stylexjs/stylex";

import Link from "next/link";
import type { ReactNode } from "react";
import { formatUTCTimestampToShortDateString } from "@/app/utils/dates";

export type RowListItem = {
  ariaLabel?: string;
  date?: string;
  description: string;
  external?: boolean;
  href: string;
  icon?: ReactNode;
  stat?: string;
  title: string;
};

type Props = {
  items: RowListItem[];
  style?: stylex.StyleXStyles;
};

export function RowList({ items, style }: Props) {
  return (
    <ul {...stylex.props(styles.list, style)}>
      {items.map((item) => {
        const content = (
          <>
            <span {...stylex.props(styles.text)}>
              <span {...stylex.props(styles.title)}>{item.title}</span>
              <span {...stylex.props(styles.description)}>{item.description}</span>
            </span>
            {item.date || item.stat ? (
              <span {...stylex.props(styles.meta)}>
                {item.stat ? <span>{item.stat}</span> : null}
                {item.date ? <time dateTime={item.date}>{formatUTCTimestampToShortDateString(item.date)}</time> : null}
              </span>
            ) : null}
            {item.icon ? <span {...stylex.props(styles.icon)}>{item.icon}</span> : null}
          </>
        );

        return (
          <li data-unstyled="true" key={item.href}>
            {item.external ? (
              <a
                aria-label={item.ariaLabel}
                href={item.href}
                rel="noopener noreferrer"
                target="_blank"
                {...stylex.props(styles.row)}
              >
                {content}
              </a>
            ) : (
              <Link aria-label={item.ariaLabel} href={item.href} {...stylex.props(styles.row)}>
                {content}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const styles = stylex.create({
  description: {
    color: "var(--foreground-secondary)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  icon: {
    color: "var(--foreground-secondary)",
    flexShrink: 0,
    marginBottom: "0.125rem",
  },
  list: {
    marginLeft: "-0.75rem",
    marginRight: "-0.75rem",
  },
  meta: {
    gap: "0.125rem",
    alignItems: "flex-end",
    color: "var(--foreground-secondary)",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    whiteSpace: "nowrap",
  },
  row: {
    gap: "1.25rem",
    alignItems: "flex-end",
    backgroundColor: {
      default: "transparent",
      ":hover": "var(--surface)",
    },
    display: "flex",
    justifyContent: "space-between",
    opacity: {
      default: 1,
      ":hover": 1,
    },
    textDecorationLine: "none",
    transitionProperty: "background-color",
    paddingBottom: "0.75rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    paddingTop: "0.75rem",
  },
  text: {
    gap: "0.125rem",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  title: {
    color: "var(--foreground)",
  },
});
