import { BOOKMARKS } from "./bookmarks";
import { Metadata } from "next";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Bookmarks | Nathan Thomas",
  description: "Nathan Thomas' bookmarks page",
};

export default function Page() {
  return (
    <section className="w-full max-w-2xl mx-5">
      <ul className="w-full">
        {BOOKMARKS.map((bookmark, i) => (
          <li className={clsx("flex gap-5 before:content-[''] pl-0", i > 0 && "")} key={bookmark.url}>
            <p className="font-mono text-sm whitespace-nowrap leading-normal">{bookmark.date}</p>
            <a className="font-mono text-sm wrap-break-words leading-normal" href={bookmark.url}>
              {bookmark.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
