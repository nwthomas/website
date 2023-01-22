export const HOME_PAGE_NAME = "Nathan Thomas";
export const CONTACT_PAGE_NAME = "Contact";
export const FOUR_OH_FOUR_PAGE_NAME = "404";
export const BLOG_PAGE_NAME = "Blog";

interface SeoConfig {
  author: {
    name: String;
  };
  currentUrl: string;
  description: string;
  imageUrl: string;
  siteName: string;
  social: {
    twitter: { handle: string; site: string };
    instagram: { handle: string };
  };
  title: string;
}

export const DEFAULT_SEO_VALUES: SeoConfig = {
  author: {
    name: "Nathan W Thomas",
  },
  currentUrl: "https://www.nathanthomas.dev",
  description:
    "Internet home for Nathan Thomas. Focus on articles and projects.",
  imageUrl: "/images/og/home-page.webp",
  siteName: "Nathan Thomas",
  social: {
    twitter: { handle: "@nwthomas_", site: "@nwthomas_" },
    instagram: { handle: "@nwthomas" },
  },
  title: "Nathan Thomas",
};

export function buildSeoConfig(pageName: string, route?: string): SeoConfig {
  switch (pageName) {
    case BLOG_PAGE_NAME:
      return {
        ...DEFAULT_SEO_VALUES,
        currentUrl: "https://www.nathanthomas.dev/blog",
        title: "Blog",
      };
    case CONTACT_PAGE_NAME:
      return {
        ...DEFAULT_SEO_VALUES,
        currentUrl: "https://www.nathanthomas.dev/contact",
        title: "Contact",
      };
    case FOUR_OH_FOUR_PAGE_NAME:
      return {
        ...DEFAULT_SEO_VALUES,
        imageUrl: "/images/og/404-page.webp",
        title: "404",
      };
    case HOME_PAGE_NAME:
      return {
        ...DEFAULT_SEO_VALUES,
        currentUrl: "https://www.nathanthomas.dev",
        imageUrl: "/images/og/home-page.webp",
      };
    default:
      return {
        ...DEFAULT_SEO_VALUES,
        title: pageName,
        currentUrl: route || DEFAULT_SEO_VALUES.currentUrl,
      };
  }
}
