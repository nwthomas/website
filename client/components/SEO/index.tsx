import * as React from "react";

import Head from "next/head";
import { buildSeoConfig } from "../../constants/seo";
import { useGetPageName } from "../../hooks";

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

  const tabTitle = useGetPageName(title, withPageNameEmojis);

  return (
    <Head>
      <title>{tabTitle}</title>

      {/* Miscellaneous Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="description" content={customDescription || description} />
      <meta name="image" content={customImageUrl || imageUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:title" content={pageName} />
      <meta property="og:description" content={customDescription || description} />
      <meta property="og:image" content={customImageUrl || imageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={pageName} />
      <meta name="twitter:description" content={customDescription || description} />
      <meta name="twitter:image:src" content={customImageUrl || imageUrl} />
    </Head>
  );
}

export default SEO;
