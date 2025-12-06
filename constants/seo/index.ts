export const BLOG_PAGE_NAME = "Blog";
export const CONTACT_PAGE_NAME = "Contact";
export const FOUR_OH_FOUR_PAGE_NAME = "404";
export const HOME_PAGE_NAME = "Home";
export const JOURNAL_PAGE_NAME = "Journal";

export const DEFAULT_SITE_OG_IMAGE_URL = "/images/og/home-page.webp";

export interface SeoConfig {
  author: {
    name: string;
  };
  baseUrl: string;
  description: string;
  imageUrl: string;
  social: {
    twitter: { handle: string; site: string };
    instagram: { handle: string };
  };
  title: string;
}

export const DEFAULT_SEO_VALUES: SeoConfig = {
  author: {
    name: "Nathan Thomas",
  },
  baseUrl: "https://www.nathanthomas.dev",
  description: "Internet home for Nathan Thomas. Focus on articles and projects.",
  imageUrl: DEFAULT_SITE_OG_IMAGE_URL,
  social: {
    twitter: { handle: "@nwthomas", site: "@nwthomas" },
    instagram: { handle: "@nwthomas" },
  },
  title: "Nathan Thomas",
};
