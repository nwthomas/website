import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My life in five minutes | Nathan Thomas",
  description: "Nathan Thomas' biography page",
};

// Force static generation for bookmarks page
export const dynamic = "force-static";

export default function Page() {
  return <section>Bio Page Coming Soon</section>;
}
