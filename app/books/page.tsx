import { BOOKS } from "./books";
import { BookCard } from "@/app/components/BookCard";
import { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { sharedStyles } from "@/app/styles";

export const metadata: Metadata = {
  title: "Books | Nathan Thomas",
  description: "Excellent books I've read",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "Books",
    description: "Excellent books I've read",
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
      <p>
        I have a life-long love of reading and like to keep an ever-growing list of my favorite books here. I have a
        sneaking suspicion you might like them too.
      </p>
      <div {...stylex.props(styles.booksGrid)}>
        {BOOKS.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            cover={book.cover}
            url={book.url}
            height={book.height}
            width={book.width}
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
      default: "repeat(2, 1fr)",
      "@media (min-width: 640px)": "repeat(3, 1fr)",
    },
    rowGap: "2rem",
    marginTop: "2.5rem",
  },
});
