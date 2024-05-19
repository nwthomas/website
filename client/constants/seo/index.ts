export const BLOG_PAGE_NAME = "Blog";
export const CONTACT_PAGE_NAME = "Contact";
export const FOUR_OH_FOUR_PAGE_NAME = "404";
export const HOME_PAGE_NAME = "Home";
export const PLAYGROUND_PAGE_NAME = "Playground";
export const RIPPLE_PAGE_NAME = "Ripple";

interface SeoConfig {
  author: {
    name: String;
  };
  baseUrl: string;
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
  baseUrl: "https://www.nathanthomas.dev",
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
    case HOME_PAGE_NAME:
      return {
        ...DEFAULT_SEO_VALUES,
        imageUrl: "/images/og/home-page.webp",
        title: pageName,
      };
    default:
      return {
        ...DEFAULT_SEO_VALUES,
        title: pageName,
      };
  }
}
