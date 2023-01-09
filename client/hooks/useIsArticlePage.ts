import { BLOG_ARTICLE_PAGE } from "../constants/routes";
import * as React from "react";
import { useRouter } from "next/router";

export const useIsArticlePage = (): boolean => {
  const { pathname } = useRouter();
  const [isArticlePage] = React.useState(pathname === BLOG_ARTICLE_PAGE);

  return isArticlePage;
};
