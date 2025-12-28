"use client";

import Link from "next/link";
import { ThemeSwitch } from "./ThemeSwitch";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isWritingPage = pathname === "/writing";
  const isBookmarksPage = pathname === "/bookmarks";

  const homeText = <h1>Nathan Thomas</h1>;
  const writingText = <p className="text-sm">Writing</p>;
  const bookmarksText = <p className="text-sm">Bookmarks</p>;

  return (
    <header className="flex justify-between items-center">
      <div>
        {isHomePage ? (
          homeText
        ) : (
          <Link className="no-underline" aria-label="Link to Nathan's home page" href="/">
            {homeText}
          </Link>
        )}
      </div>
      <div className="flex gap-3 sm:gap-5 items-center">
        {isWritingPage ? (
          writingText
        ) : (
          <Link className="no-underline" aria-label="Link to Nathan's biography page" href="/writing">
            {writingText}
          </Link>
        )}
        {isBookmarksPage ? (
          bookmarksText
        ) : (
          <Link className="no-underline" aria-label="Link to Nathan's bookmarks page" href="/bookmarks">
            {bookmarksText}
          </Link>
        )}
        <ThemeSwitch />
      </div>
    </header>
  );
}
