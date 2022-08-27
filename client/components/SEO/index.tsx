import Head from "next/head";
import type { ThemeEnum } from "../../hooks/useGetPreferredTheme";
import seoConfig from "../../constants/seo";

const {
  originalTitle,
  currentURL,
  originalImageURL,
  originalDescription,
  social,
  siteName,
} = seoConfig;

interface Props {
  currentTheme: ThemeEnum;
  description?: string;
  seoTitle?: string;
  tabTitle?: string;
  imageURL?: string;
  slug?: string;
  isArticle?: boolean;
}

function SEO({
  currentTheme,
  description,
  imageURL,
  isArticle,
  seoTitle,
  tabTitle,
  slug,
}: Props) {
  const finalDescription = description || originalDescription;
  const finalImageURL = imageURL || originalImageURL;
  const finalSEOTitle = seoTitle || originalTitle;
  const finalTabTitle = tabTitle || originalTitle;
  const finalURL = slug ? `${currentURL}${slug}` : currentURL;

  return (
    <Head>
      <title>{finalTabTitle}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={finalDescription} />
      <meta name="image" content={finalImageURL} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        property="og:type"
        content={isArticle ? "article" : "website"}
        key="ogtype"
      />
      <meta property="og:title" content={finalSEOTitle} key="ogtitle" />
      <meta property="og:description" content={finalDescription} key="ogdesc" />
      <meta property="og:image" content={finalImageURL} key="ogimage" />
      <meta property="og:url" content={finalURL} key="ogurl" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta
        property="twitter:card"
        content="summary_large_image"
        key="twcard"
      />
      <meta name="twitter:creator" content={social.twitter} key="twhandle" />
      <meta name="twitter:title" content={finalSEOTitle} key="twtitle" />
      <meta name="twitter:widgets:theme" content={currentTheme}></meta>
      <meta name="twitter:dnt" content="on"></meta>
      <meta
        name="twitter:description"
        content={finalDescription}
        key="twdescription"
      />
      <meta name="twitter:image" content={finalImageURL} key="twimage" />
    </Head>
  );
}

export default SEO;
