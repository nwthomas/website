/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_SITE_URL || "https://www.nathanthomas.dev",
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/og-image" },
    ],
  },
  exclude: ["/og-image"],
};
