import * as React from "react";

import { DARK_THEME } from "../../store/reducers/themeSlice";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { ORIGIN } from "../../constants/routes";
import { ThemeContext } from "styled-components";
import { buildSeoConfig } from "../../constants/seo";
import { useTheme } from "../../hooks";

const darkModeFaviconPath = "/dark-mode-favicon.ico";
const lightModeFaviconPath = "/light-mode-favicon.ico";

function buildUrlWithOrigin(currentUrl: string): string {
  return `${ORIGIN}${currentUrl}`;
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
  const [currentTheme] = useTheme();
  const { colorsHex } = React.useContext(ThemeContext);

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
              url: buildUrlWithOrigin(customImageUrl || imageUrl),
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
        {/* This handles the color for the "safe area" notch on iOS */}
        {currentTheme ? (
          <meta
            name="theme-color"
            content={
              currentTheme === DARK_THEME ? colorsHex.codGray : colorsHex.white
            }
          ></meta>
        ) : null}
      </Head>
    </>
  );
}

export default SEO;
