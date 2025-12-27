import withMDX from "@next/mdx";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = withMDX({
  // NextJS generic configurations
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  turbopack: [],
  images: {
    qualities: [75, 100],
  },
  experimental: {
    mdxRs: true,
  },
  reactCompiler: true,
  // Turn off NextJS icon if needed while taking screenshots for SEO home pre-generated image
  // devIndicators: false,
});

const sentryWebpackPluginOptions = {
  // For all available configuration options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  silent: true,
  target: "experimental-serverless-trace",
};

// The Sentry function must run last before exporting
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
