"use client";

import * as stylex from "@stylexjs/stylex";

import { HeadingLevel } from "../(writing)/utils/types";
import Link from "next/link";
import { ReactNode } from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { formatUTCTimestampToDateString } from "../utils/dates";
import { getHeading } from "@/app/(writing)/utils/heading";
import postsJson from "@/app/(writing)/posts.json";
import { sharedStyles } from "@/app/styles";
import { usePathname } from "next/navigation";

type Post = {
  id: string;
  title: string;
  date: string;
};

// ISR regeneration of the root route can report its pathname as "/index" instead of "/", which
// would otherwise render the header without the title and theme switch until hydration.
function normalizePathname(pathname: string): string {
  return pathname === "/index" ? "/" : pathname;
}

export function Navbar() {
  const pathname = normalizePathname(usePathname());
  const isHomePage = pathname === "/";
  const isBookmarksPage = pathname === "/bookmarks";
  const isBooksPage = pathname === "/books";
  const isWritingPage = pathname === "/writing";
  const isBlogPage = postsJson.posts.find((post: Post) => `/${post.id}` === pathname.split("#")[0]);

  let dateText: ReactNode | null = null;
  if (isBlogPage && isBlogPage.date) {
    const date = formatUTCTimestampToDateString(isBlogPage.date);
    dateText = <span> • {date}</span>;
  }

  let showThemeSwitch = true;
  let titleText: ReactNode | null = <h1>Nathan Thomas</h1>;
  let subtitleText: ReactNode | null = (
    <p {...stylex.props(styles.subtitle)}>
      by{" "}
      <Link aria-label="Link to Nathan's home page" href="/">
        Nathan Thomas
      </Link>
      {dateText}
    </p>
  );
  if (isBookmarksPage) {
    titleText = <h1>Bookmarks</h1>;
  } else if (isBooksPage) {
    titleText = <h1>Books</h1>;
  } else if (isWritingPage) {
    titleText = <h1>Writing</h1>;
  } else if (isBlogPage) {
    const writingTitleWithId = `${isBlogPage.title} [#${isBlogPage.id}]`;
    titleText = getHeading(writingTitleWithId, HeadingLevel.H1);
  } else if (!isHomePage) {
    titleText = null;
    subtitleText = null;
    showThemeSwitch = false;
  }

  return (
    <header {...stylex.props(styles.header, sharedStyles.pageSection)}>
      <div {...stylex.props(styles.bar)}>
        <div {...stylex.props(styles.titleStack)}>
          {titleText}
          {!isHomePage ? subtitleText : null}
        </div>
        {showThemeSwitch ? (
          <div {...stylex.props(styles.controls)}>
            <ThemeSwitch />
          </div>
        ) : null}
      </div>
    </header>
  );
}

const styles = stylex.create({
  controls: {
    gap: {
      default: "0.75rem",
      "@media (min-width: 640px)": "1.25rem",
    },
    alignItems: "center",
    display: "flex",
  },
  header: {
    alignItems: "flex-start",
    display: {
      default: "flex",
      [stylex.when.ancestor(":has([data-hide-site-chrome])")]: "none",
    },
  },
  bar: {
    // Top-align so the theme switch lines up with the title rather than the title + subtitle stack
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  subtitle: {
    color: "var(--foreground-muted)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  titleStack: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1,
  },
});
