import { DARK_THEME } from "../store/reducers/themeSlice";
import { DEFAULT_SEO_VALUES } from "../constants/seo";
import Head from "next/head";
import { ORIGIN } from "../constants/routes";
import { generateNextSeo } from "next-seo/pages";
import { useTheme as useEmotionTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { useTheme } from "../hooks";

interface Props {
  customDescription?: string;
  customImageUrl?: string;
  isArticle?: boolean;
  pageName: string;
}

function buildUrlWithOrigin(currentUrl: string): string {
  return `${ORIGIN}${currentUrl}`;
}

function SEO({ customDescription, customImageUrl, isArticle, pageName }: Props) {
  const { asPath } = useRouter();
  const [currentTheme] = useTheme();
  const { colorsHex } = useEmotionTheme();

  const { baseUrl, description, imageUrl, title, social } = DEFAULT_SEO_VALUES;

  const currentUrl = `${baseUrl}${asPath}`;

  return (
    <Head>
      {generateNextSeo({
        title,
        description: customDescription || description,
        canonical: currentUrl,
        openGraph: {
          url: currentUrl,
          title: pageName,
          description: customDescription || description,
          images: [
            {
              url: buildUrlWithOrigin(customImageUrl || imageUrl),
              type: "image/webp",
            },
          ],
          type: isArticle ? "article" : "website",
        },
        twitter: {
          handle: social.twitter.handle,
          site: social.twitter.site,
          cardType: "summary_large_image",
        },
      })}
      {/* This handles the color for the "safe area" notch on iOS */}
      {currentTheme ? (
        <meta name="theme-color" content={currentTheme === DARK_THEME ? colorsHex.black : colorsHex.white}></meta>
      ) : null}
    </Head>
  );
}

export default SEO;
