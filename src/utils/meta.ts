export const SITE_URL = "https://www.nathanthomas.dev";

export function pageMeta(opts: {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
}) {
  const description = opts.description ?? "";
  const ogUrl = opts.ogUrl ?? SITE_URL;
  const ogImage = opts.ogImage ?? `${SITE_URL}/opengraph-image`;
  const ogTitle = opts.ogTitle ?? opts.title;
  const ogDescription = opts.ogDescription ?? description;

  return [
    { title: opts.title },
    { name: "description", content: description },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { property: "og:url", content: ogUrl },
    { property: "og:site_name", content: "Nathan Thomas" },
    { property: "og:locale", content: "en_US" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: ogImage },
  ];
}
