import { BLOG_ARTICLE_PAGE } from "../constants/routes";
import { useRouter } from "next/router";
import { useState } from "react";

export const useIsArticlePage = (): boolean => {
  const { pathname } = useRouter();
  const [isArticlePage] = useState(pathname === BLOG_ARTICLE_PAGE);

  return isArticlePage;
};
