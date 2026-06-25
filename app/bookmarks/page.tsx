import { sx } from "@/app/styles/tw.stylex";
import { BOOKMARKS } from "./bookmarks";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks | Nathan Thomas",
  description: "Nathan Thomas' bookmarks page",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "Bookmarks",
    description: "Nathan Thomas' bookmarks page",
    url: "https://www.nathanthomas.dev",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function Page() {
  return (
    <section {...sx("wFull maxW2xl mx5")}>
      <p>
        I love to learn and bookmark what I've read here. I also have an{" "}
        <Link aria-label="Link to Nathan's Atom RSS feed" href="/bookmarks/atom">
          RSS feed
        </Link>{" "}
        you can follow.
      </p>
      <ul {...sx("wFull mt5")}>
        {BOOKMARKS.map((bookmark, i) => (
          <li {...sx("flex beforeEmpty pl0", i > 0 && "mt1")} key={bookmark.url + bookmark.id}>
            <>
              <a
                aria-label={`Link to ${bookmark.title}`}
                {...sx("flex fontMono textSm wrapBreakWords leadingNormal noUnderline")}
                href={bookmark.url}
              >
                <span {...sx("whitespaceNowrap noUnderline")}>{bookmark.date}</span>
                <span {...sx("underline decorationDotted decorationGray500 ml5")}>{bookmark.title}</span>
              </a>
              {bookmark?.footnotes && bookmark.footnotes.length > 0
                ? bookmark.footnotes.map((footnote, f_i) => (
                    <a
                      aria-label={`Link to footnote ${f_i + 1} for ${bookmark.title}`}
                      href={footnote}
                      {...sx("textXs fontMono ml1 noUnderline cursorPointer textGray500")}
                      key={footnote}
                    >
                      {f_i + 1}
                    </a>
                  ))
                : null}
            </>
          </li>
        ))}
      </ul>
    </section>
  );
}
