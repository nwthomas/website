/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_SITE_URL || "https://www.nathanthomas.dev",
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  // Non-page routes (icons, generated images, feeds, API routes) shouldn't be indexed as pages
  exclude: ["/icon.png", "/opengraph-image", "/*/opengraph-image", "/atom", "/bookmarks/atom", "/views"],
  // Dynamically rendered pages aren't in the build manifest, so next-sitemap skips them unless listed here
  additionalPaths: async (config) => [await config.transform(config, "/writing")],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", crawlDelay: 1 }],
  },
};
