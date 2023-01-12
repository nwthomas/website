import * as React from "react";
import { DARK_THEME } from "../../store/themeSlice";
import Head from "next/head";
import { buildSeoConfig } from "../../constants/seo";
import { useGetPreferredTheme } from "../../hooks";
import { NextSeo } from "next-seo";

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
    social: {
      twitter: { handle, site },
    },
    title,
  } = currentPageMetadata;

  return (
    <>
      <NextSeo
        title={title}
        description={customDescription || description}
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title: pageName,
          description: customDescription || description,
          images: [
            {
              url: buildImageUrlWithOrigin(customImageUrl || imageUrl),
              type: "image/webp",
            },
          ],
          siteName,
          type: isArticle ? "article" : "website",
        }}
        twitter={{
          handle,
          site,
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <link
          rel="icon"
          href={
            currentTheme === DARK_THEME
              ? darkModeFaviconPath
              : lightModeFaviconPath
          }
        />
      </Head>
    </>
  );
}

export default SEO;
