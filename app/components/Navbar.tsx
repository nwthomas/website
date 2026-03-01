"use client";

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
  const isWritingPage = pathname === "/writing";
  const isFavoriteBooksPage = pathname === "/favorite-books";
  const isBlogPage = postsJson.posts.find((post: Post) => `/${post.id}` === pathname.split("#")[0]);

  let dateText: ReactNode | null = null;
  if (isBlogPage && isBlogPage.date) {
    const date = formatUTCTimestampToDateString(isBlogPage.date);
    dateText = <span> • {date}</span>;
  }

  let showThemeSwitch = true;
  let titleText: ReactNode | null = <h1>Nathan Thomas</h1>;
  let subtitleText: ReactNode | null = (
    <p className="text-sm text-gray-500">
      by{" "}
      <Link aria-label="Link to Nathan's home page" href="/">
        Nathan Thomas
      </Link>
      {dateText}
    </p>
  );
  if (isBookmarksPage) {
    titleText = <h1>Bookmarks</h1>;
  } else if (isWritingPage) {
    titleText = <h1>Writing</h1>;
  } else if (isBlogPage) {
    const writingTitleWithId = `${isBlogPage.title} [#${isBlogPage.id}]`;
    titleText = getHeading(writingTitleWithId, HeadingLevel.H1);
  } else if (isFavoriteBooksPage) {
    titleText = <h1>Favorite Books</h1>;
  } else if (!isHomePage) {
    titleText = null;
    subtitleText = null;
    showThemeSwitch = false;
  }

  return (
    <header className="flex w-full max-w-2xl mx-5 items-start">
      <ul className="flex w-full justify-between">
        <li className="before:hidden pl-0">
          <div className="flex flex-col">
            {titleText}
            {!isHomePage ? subtitleText : null}
          </div>
        </li>
        {showThemeSwitch ? (
          <li className="before:hidden pl-0">
            <div className="flex gap-3 sm:gap-5 items-center">
              <ThemeSwitch />
            </div>
          </li>
        ) : null}
      </ul>
    </header>
  );
}
