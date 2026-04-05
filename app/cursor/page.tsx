import { CursorAsciiFill } from "@/app/components/CursorAsciiFill";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursor | Nathan Thomas",
  description: "Nathan Thomas at Cursor",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "Cursor",
    description: "Nathan Thomas at Cursor",
    url: "https://www.nathanthomas.dev/cursor",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function Page() {
  return <CursorAsciiFill />;
}
