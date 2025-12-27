import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Writing | Nathan Thomas",
  description: "Nathan Thomas' writing page",
};

// Force static generation for bookmarks page
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="w-2xl px-10">
      <Navbar title="Nathan Thomas" />
      <div className="pt-10">
        <p>Writing Page Coming Soon</p>
      </div>
    </div>
  );
}
