"use client";

import { sx } from "@/app/styles/tw.stylex";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (!isHomePage) {
    return null;
  }

  return (
    <footer {...sx("flex justifyEnd wFull maxW2xl")}>
      <div {...sx("flex justifyEnd")}>
        <ul {...sx("flex gap5")}>
          <li {...sx("hiddenBefore pl0")}>
            <p {...sx("textSm textGray500")}>
              Nathan Thomas (
              <a
                {...sx("textSm noUnderline textForeground")}
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
          <li {...sx("flex hiddenBefore pl0")}>
            <a
              {...sx("textSm mlAuto textGray500 noUnderline")}
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
