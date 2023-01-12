export const HOME_PAGE_NAME = "Nathan Thomas";
export const CONTACT_PAGE_NAME = "Contact";
export const FOUR_OH_FOUR_PAGE_NAME = "404";
export const BLOG_PAGE_NAME = "Blog";

const DEFAULT_SEO_VALUES: SeoConfig = {
  author: {
    name: "Nathan W Thomas",
  },
  currentUrl: "https://www.nathanthomas.dev",
  description:
    "Internet home for Nathan Thomas. Focus on projects and blogging.",
  imageUrl: "/seo/home-page.webp",
  originalTitle: "Nathan Thomas",
  siteName: "Nathan Thomas",
  social: {
    twitter: "@nwthomas_",
    instagram: "nwthomas",
  },
  title: "Home",
};

interface SeoConfig {
  author: {
    name: String;
  };
  currentUrl: string;
  description: string;
  imageUrl: string;
  originalTitle: string;
  siteName: string;
  social: {
    twitter: string;
    instagram: string;
  };
  title: string;
}

export function buildSeoConfig(pageName: string, route?: string): SeoConfig {
  switch (pageName) {
    case BLOG_PAGE_NAME:
      return {
        ...DEFAULT_SEO_VALUES,
        currentUrl: "https://www.nathanthomas.dev/blog",
        imageUrl: "/seo/all-blogs-page.webp",
        title: "Blog",
      };
    case CONTACT_PAGE_NAME:
      return {
        ...DEFAULT_SEO_VALUES,
        currentUrl: "https://www.nathanthomas.dev/contact",
        imageUrl: "/seo/contact-page.webp",
        title: "Contact",
      };
    case FOUR_OH_FOUR_PAGE_NAME:
      return {
        ...DEFAULT_SEO_VALUES,
        imageUrl: "/seo/404-page.webp",
        title: "404",
      };
    case HOME_PAGE_NAME:
      return {
        ...DEFAULT_SEO_VALUES,
        currentUrl: "https://www.nathanthomas.dev",
        imageUrl: "/seo/home-page.webp",
        title: "Nathan Thomas's blog",
      };
    default:
      return { ...DEFAULT_SEO_VALUES, title: pageName };
  }
}
