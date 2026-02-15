import { BOOKMARKS } from "./bookmarks";
import Link from "next/link";
import { Metadata } from "next";
import { clsx } from "clsx";

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
    <section className="w-full max-w-2xl mx-5">
      <p>
        I love to learn and bookmark what I've read here. I also have an{" "}
        <Link aria-label="Link to Nathan's Atom RSS feed" href="/bookmarks/atom">
          RSS feed
        </Link>{" "}
        you can follow.
      </p>
      <ul className="w-full mt-5">
        {BOOKMARKS.map((bookmark, i) => (
          <li className={clsx("flex before:content-[''] pl-0", i > 0 && "mt-1")} key={bookmark.url + bookmark.id}>
            <>
              <a
                aria-label={`Link to ${bookmark.title}`}
                className="flex font-mono text-sm wrap-break-words leading-normal no-underline"
                href={bookmark.url}
              >
                <span className="whitespace-nowrap no-underline">{bookmark.date}</span>
                <span className="underline decoration-dotted decoration-gray-500 ml-5">{bookmark.title}</span>
              </a>
              {bookmark?.footnotes && bookmark.footnotes.length > 0
                ? bookmark.footnotes.map((footnote, f_i) => (
                    <a
                      aria-label={`Link to footnote ${f_i + 1} for ${bookmark.title}`}
                      href={footnote}
                      className="text-xs font-mono ml-1 no-underline cursor-pointer text-gray-500"
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
