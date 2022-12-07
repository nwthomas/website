import * as React from "react";

import Head from "next/head";
import { ThemeContext } from "styled-components";
import { buildSeoConfig } from "../../constants/seo";
import { useGetPageName } from "../../hooks/useGetPageName";
import { useRouter } from "next/router";

interface Props {
  isArticle?: boolean;
  pageName: string;
}

function SEO({ isArticle, pageName }: Props) {
  const { query } = useRouter();
  const { currentTheme } = React.useContext(ThemeContext);

  const isTag = Boolean(query?.tagId);

  console.log({ isTag });

  const currentPageMetadata = React.useMemo(() => {
    return buildSeoConfig(pageName);
  }, [pageName]);

  const {
    currentUrl,
    description,
    imageUrl,
    siteName,
    social: { twitter },
    title,
  } = currentPageMetadata;

  const tabTitle = useGetPageName(title);

  return (
    <Head>
      <title>{tabTitle}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="image" content={imageUrl} />
      <meta
        property="og:type"
        content={isArticle ? "article" : "website"}
        key="ogtype"
      />
      <meta property="og:title" content={pageName} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:image" content={imageUrl} key="ogimage" />
      <meta property="og:url" content={currentUrl} key="ogurl" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta
        property="twitter:card"
        content="summary_large_image"
        key="twcard"
      />
      <meta name="twitter:creator" content={twitter} key="twhandle" />
      <meta name="twitter:title" content={pageName} key="twtitle" />
      <meta name="twitter:widgets:theme" content={currentTheme}></meta>
      <meta name="twitter:dnt" content="on"></meta>
      <meta
        name="twitter:description"
        content={description}
        key="twdescription"
      />
      <meta name="twitter:image" content={imageUrl} key="twimage" />
    </Head>
  );
}

export default SEO;
