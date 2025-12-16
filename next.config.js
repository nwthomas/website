import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  // NextJS generic configurations
  reactStrictMode: true,
  turbopack: [],
  images: {
    qualities: [75, 100],
  },
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/tag",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/tag/soft-skills",
        destination: "/tag/personal",
        permanent: true,
      },
      {
        source: "/tag/soft-skills",
        destination: "/tag/personal",
        permanent: true,
      },
    ];
  },
  // Turn off NextJS icon if needed while taking screenshots for SEO home pre-generated image
  // devIndicators: false,
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  silent: true,
  target: "experimental-serverless-trace",
};

// The Sentry function must run last before exporting
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
