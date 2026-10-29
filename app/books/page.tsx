import * as stylex from "@stylexjs/stylex";

import { BOOKS } from "./books";
import { BookCard } from "@/app/components/BookCard";
import { Metadata } from "next";
import { sharedStyles } from "@/app/styles";

const PRELOADED_COVER_COUNT = 15;

export const metadata: Metadata = {
  title: "Books | Nathan Thomas",
  description: "A list of Nathan Thomas' favorite books",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  alternates: { canonical: "/books" },
  openGraph: {
    title: "Books",
    description: "A list of Nathan Thomas' favorite books",
    url: "https://www.nathanthomas.dev/books",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function Page() {
  return (
    <section {...stylex.props(sharedStyles.pageSection)}>
      <p {...stylex.props(sharedStyles.textSecondary)}>
        I have a life-long love of reading and like to keep an ever-growing list of my favorite books here. I have a
        sneaking suspicion you might like them too.
      </p>
      <div {...stylex.props(styles.booksGrid)}>
        {BOOKS.map((book, index) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            cover={book.cover}
            url={book.url}
            height={book.height}
            width={book.width}
            preload={index < PRELOADED_COVER_COUNT}
            unoptimized
          />
        ))}
      </div>
    </section>
  );
}

const styles = stylex.create({
  booksGrid: {
    columnGap: "1.5rem",
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(auto-fill, minmax(8rem, 1fr))",
      "@media (min-width: 640px)": "repeat(auto-fill, minmax(12.5rem, 1fr))",
    },
    rowGap: "2rem",
    marginLeft: "calc(50% - 50cqw)",
    marginTop: "2.5rem",
    paddingLeft: {
      default: "1.25rem",
      "@media (min-width: 1024px)": "2.5rem",
    },
    paddingRight: {
      default: "1.25rem",
      "@media (min-width: 1024px)": "2.5rem",
    },
    width: "100cqw",
  },
});
