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
          <li className={clsx("flex before:content-[''] pl-0", i > 0 && "mt-1")} key={bookmark.url}>
            <a
              className="flex gap-5 font-mono text-sm wrap-break-words leading-normal no-underline"
              href={bookmark.url}
            >
              <span className="whitespace-nowrap no-underline">{bookmark.date}</span>
              <span className="underline decoration-dotted decoration-gray-500">{bookmark.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
