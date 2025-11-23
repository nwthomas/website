import { ArticleJsonLd } from "next-seo";
import { DARK_THEME } from "../../store/reducers/themeSlice";
import Head from "next/head";
import { ORIGIN } from "../../constants/routes";
import { buildSeoConfig } from "../../constants/seo";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { useTheme as useStyledTheme } from "styled-components";
import { useTheme } from "../../hooks";

function buildUrlWithOrigin(currentUrl: string): string {
  return `${ORIGIN}${currentUrl}`;
}

interface Props {
  customDescription?: string;
  customImageUrl?: string;
  isArticle?: boolean;
  pageName: string;
}

function SEO({ customDescription, customImageUrl, isArticle, pageName }: Props) {
  const { asPath } = useRouter();
  const [currentTheme] = useTheme();
  const { colorsHex } = useStyledTheme();

  const currentPageMetadata = useMemo(() => {
    return buildSeoConfig(pageName);
  }, [pageName]);

  const { author, baseUrl, description, imageUrl, title } = currentPageMetadata;

  const currentUrl = `${baseUrl}${asPath}`;

  return (
    <>
      <ArticleJsonLd
        headline={title}
        description={customDescription || description}
        url={currentUrl}
        author={author.name}
        image={buildUrlWithOrigin(customImageUrl || imageUrl)}
      />
      <Head>
        {/* This handles the color for the "safe area" notch on iOS */}
        {currentTheme ? (
          <meta name="theme-color" content={currentTheme === DARK_THEME ? colorsHex.black : colorsHex.white}></meta>
        ) : null}
      </Head>
    </>
  );
}

export default SEO;
