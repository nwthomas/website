"use client";

import Link from "next/link";
import { ThemeSwitch } from "./ThemeSwitch";
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
  const isBlogPage = postsJson.posts.find((post: Post) => `/${post.id}` === pathname.split("#")[0]);
  let titleText = <h1>Nathan Thomas</h1>;
  if (isBookmarksPage) {
    titleText = <h1>Bookmarks</h1>;
  }
  if (isWritingPage) {
    titleText = <h1>Writing</h1>;
  }
  if (isBlogPage) {
    titleText = <h1 id={isBlogPage.id}>{isBlogPage.title}</h1>;
  }
  return (
    <header className="flex justify-between w-full max-w-2xl mx-5 items-start">
      <div className="flex flex-col">
        {titleText}
        {!isHomePage ? (
          <p className="text-sm text-gray-500">
            by{" "}
            <Link aria-label="Link to Nathan's home page" className="no-underline" href="/">
              Nathan Thomas
            </Link>
          </p>
        ) : null}
      </div>
      <div className="flex gap-3 sm:gap-5 items-center">
        <ThemeSwitch />
      </div>
    </header>
  );
}
