import { BOOKMARKS } from "@/constants/bookmarks";
import { Navbar } from "@/components/Navbar";
import { clsx } from "clsx";

export default function Page() {
  return (
    <div className="w-2xl px-10">
      <Navbar title="Bookmarks" />
      {BOOKMARKS.map((bookmark, i) => (
        <div className={clsx("flex gap-5", i > 0 ? "mt-2" : "mt-5")} key={bookmark.url}>
          <p className="font-mono whitespace-nowrap">{bookmark.date}</p>
          <a className="wrap-break-words" href={bookmark.url}>
            {bookmark.title}
          </a>
        </div>
      ))}
    </div>
  );
}
