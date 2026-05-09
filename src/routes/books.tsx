import { createFileRoute } from "@tanstack/react-router";

import { BOOKS } from "@/books/books";
import { BookCard } from "@/components/BookCard";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: pageMeta({
      title: "Books | Nathan Thomas",
      description: "Excellent books I've read",
      ogTitle: "Books",
      ogDescription: "Excellent books I've read",
      ogUrl: "https://www.nathanthomas.dev/books",
    }),
  }),
  component: BooksPage,
});

function BooksPage() {
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
          />
        ))}
      </div>
    </section>
  );
}
