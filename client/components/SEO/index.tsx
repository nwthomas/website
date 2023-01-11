import * as React from "react";
import { DARK_THEME } from "../../store/themeSlice";
import Head from "next/head";
import { buildSeoConfig } from "../../constants/seo";
import { useGetPreferredTheme } from "../../hooks";

const darkModeFaviconPath = "/dark-mode-favicon.ico";
const lightModeFaviconPath = "/light-mode-favicon.ico";

function buildImageUrlWithOrigin(imageUrl: string): string {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  return `${origin}${imageUrl}`;
}

interface Props {
  customDescription?: string;
  customImageUrl?: string;
  isArticle?: boolean;
  pageName: string;
  withPageNameEmojis?: boolean;
}

function SEO({
  customDescription,
  customImageUrl,
  isArticle,
  pageName,
  withPageNameEmojis,
}: Props) {
  const [currentTheme] = useGetPreferredTheme();

  const currentPageMetadata = React.useMemo(() => {
    return buildSeoConfig(pageName);
  }, [pageName]);

  const {
    currentUrl,
    description,
    imageUrl,
    siteName,
    social: { twitter: twitterHandle },
    title,
  } = currentPageMetadata;

  return (
    <Head>
      {/* Miscellaneous Meta Tags */}
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={customDescription || description} />
      <meta
        name="image"
        content={buildImageUrlWithOrigin(customImageUrl || imageUrl)}
      />
      <link
        rel="icon"
        href={
          currentTheme === DARK_THEME
            ? darkModeFaviconPath
            : lightModeFaviconPath
        }
      />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageName} />
      <meta
        property="og:description"
        content={customDescription || description}
      />
      <meta
        property="og:image"
        content={buildImageUrlWithOrigin(customImageUrl || imageUrl)}
      />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={pageName} />
      <meta
        name="twitter:description"
        content={customDescription || description}
      />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta
        name="twitter:image:src"
        content={buildImageUrlWithOrigin(customImageUrl || imageUrl)}
      />
    </Head>
  );
}

export default SEO;
