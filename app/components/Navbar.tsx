"use client";

import { sx } from "@/app/styles/tw.stylex";

import { HeadingLevel, getHeading } from "@/app/(writing)/utils/heading";

import Link from "next/link";
import { ReactNode } from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { formatUTCTimestampToDateString } from "../utils/dates";
import postsJson from "@/app/(writing)/posts.json";
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
    <p {...sx("textSm textGray500")}>
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
    <header {...sx("flex wFull maxW2xl mx5 itemsStart")}>
      <ul {...sx("flex wFull justifyBetween")}>
        <li {...sx("hiddenBefore pl0")}>
          <div {...sx("flex flexCol")}>
            {titleText}
            {!isHomePage ? subtitleText : null}
          </div>
        </li>
        {showThemeSwitch ? (
          <li {...sx("hiddenBefore pl0")}>
            <div {...sx("flex gap5 itemsCenter")}>
              <ThemeSwitch />
            </div>
          </li>
        ) : null}
      </ul>
    </header>
  );
}
