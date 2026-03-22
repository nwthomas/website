import { BOOKS } from "./books";
import { BookCard } from "@/app/components/BookCard";
import { Metadata } from "next";

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
    <section className="w-full max-w-2xl mx-5">
      <p>
        I have a life-long love of reading and like to keep an ever-growing list of my favorite books here. I have a
        sneaking suspicion you might like them too.
      </p>
      <div className=" books-grid mt-10">
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
