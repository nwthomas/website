import createMDX from "@next/mdx";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  // NextJS generic configurations
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  turbopack: [],
  images: {
    qualities: [75, 100],
    remotePatterns: [{ protocol: "https", hostname: "i.scdn.co", pathname: "/image/**" }],
  },
  experimental: {
    mdxRs: true,
  },
  reactCompiler: true,
  // Turn off NextJS icon if needed while taking screenshots for SEO home pre-generated image
  // devIndicators: false,
  async headers() {
    return [
      {
        source: "/images/blog/imagination/chrono-trigger.gif",
        // Below Cache-Control is for 1 day in seconds
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, immutable" }],
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@/mdx-components",
  },
});

const sentryWebpackPluginOptions = {
  // For all available configuration options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  silent: true,
  target: "experimental-serverless-trace",
};

// The Sentry function must run last before exporting
export default withSentryConfig(withMDX(nextConfig), sentryWebpackPluginOptions);
