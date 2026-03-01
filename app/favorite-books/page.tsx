import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorite Books | Nathan Thomas",
  description: "Nathan Thomas' favorite books page",
  metadataBase: new URL("https://www.nathanthomas.dev"),
  openGraph: {
    title: "Favorite Books",
    description: "Nathan Thomas' favorite books page",
    url: "https://www.nathanthomas.dev",
    siteName: "Nathan Thomas",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function Page() {
  return (
    <section className="w-full max-w-2xl mx-5">
      <p>I love to read and have a few favorite books that I've read multiple times.</p>
    </section>
  );
}
