import { Metadata } from "next";
import { OrbStage } from "@/app/components/OrbStage";

export const metadata: Metadata = {
  title: "404 - Not Found | Nathan Thomas",
  description: "The page you are looking for does not exist.",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "404 - Not Found",
    description: "The page you are looking for does not exist.",
    url: "https://www.nathanthomas.dev",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function NotFound() {
  return (
    <>
      <link rel="preload" as="image" href="/images/not-found/forest.webp" />
      <OrbStage title="404 - Not Found" />
    </>
  );
}
