"use client";

import * as stylex from "@stylexjs/stylex";
import { HeadingLevel, getHeading } from "@/app/(writing)/utils/heading";

import Link from "next/link";
import { ReactNode } from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { formatUTCTimestampToDateString } from "../utils/dates";
import postsJson from "@/app/(writing)/posts.json";
import { sharedStyles } from "@/app/styles";
import { usePathname } from "next/navigation";

type Post = {
  id: string;
  title: string;
  date: string;
};

export function Navbar() {
  const pathname = usePathname();
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
      <ul {...stylex.props(styles.navList)}>
        <li data-unstyled="true">
          <div {...stylex.props(styles.titleStack)}>
            {titleText}
            {!isHomePage ? subtitleText : null}
          </div>
        </li>
        {showThemeSwitch ? (
          <li data-unstyled="true">
            <div {...stylex.props(styles.controls)}>
              <ThemeSwitch />
            </div>
          </li>
        ) : null}
      </ul>
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
    display: "flex",
  },
  navList: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  subtitle: {
    color: "var(--muted)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  titleStack: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1,
  },
});
