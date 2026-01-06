"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (!isHomePage) {
    return null;
  }

  return (
    <footer className="flex justify-end w-full max-w-2xl">
      <div className="flex justify-end">
        <ul className="flex gap-3 sm:gap-5">
          <li className="before:hidden pl-0">
            <p className="text-sm text-gray-500">
              Nathan Thomas (
              <a
                className="text-sm no-underline text-foreground"
                href="https://x.com/nwthomas"
                aria-label="Link to Nathan's profile on X"
                rel="noopener noreferrer"
                target="_blank"
              >
                @nwthomas
              </a>
              )
            </p>
          </li>
          <li className="flex before:hidden pl-0 align-">
            <a
              className="text-sm ml-auto text-gray-500 no-underline"
              href="https://github.com/nwthomas/website"
              aria-label="Link to the source repository on GitHub for this website"
              rel="noopener noreferrer"
              target="_blank"
            >
              Source
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
