import { BOOKMARKS } from "@/constants/bookmarks";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Bookmarks | Nathan Thomas",
  description: "Nathan Thomas' bookmarks page",
};

// Force static generation for bookmarks page
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="w-2xl px-10">
      <Navbar title="Nathan Thomas" />
      <div className="pt-10">
        {BOOKMARKS.map((bookmark, i) => (
          <div className={clsx("flex gap-5", i > 0 && "mt-1")} key={bookmark.url}>
            <p className="font-mono whitespace-nowrap">{bookmark.date}</p>
            <a className="font-mono wrap-break-words" href={bookmark.url}>
              {bookmark.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
