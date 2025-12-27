import { BOOKMARKS } from "./bookmarks";
import { Metadata } from "next";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Bookmarks | Nathan Thomas",
  description: "Nathan Thomas' bookmarks page",
};

export default function Page() {
  return (
    <section>
      {BOOKMARKS.map((bookmark, i) => (
        <div className={clsx("flex gap-5", i > 0 && "mt-1")} key={bookmark.url}>
          <p className="font-mono text-sm whitespace-nowrap">{bookmark.date}</p>
          <a className="font-mono text-sm wrap-break-words" href={bookmark.url}>
            {bookmark.title}
          </a>
        </div>
      ))}
    </section>
  );
}
