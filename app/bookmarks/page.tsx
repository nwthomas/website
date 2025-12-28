import { BOOKMARKS } from "./bookmarks";
import { Metadata } from "next";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Bookmarks | Nathan Thomas",
  description: "Nathan Thomas' bookmarks page",
};

export default function Page() {
  return (
    <section className="mx-5">
      {BOOKMARKS.map((bookmark, i) => (
        <div className={clsx("flex gap-5", i > 0 && "")} key={bookmark.url}>
          <p className="font-mono text-sm whitespace-nowrap leading-normal">{bookmark.date}</p>
          <a className="font-mono text-sm wrap-break-words leading-normal" href={bookmark.url}>
            {bookmark.title}
          </a>
        </div>
      ))}
    </section>
  );
}
