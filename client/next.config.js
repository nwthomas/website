const { withPlaiceholder } = require("@plaiceholder/next");
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  // Plaiceholder configurations
  experimental: { externalDir: true },
  images: {
    domains: [__dirname], // nathanthomas.dev
  },
  // NextJS generic configurations
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/tag",
        destination: "/blog",
        permanent: false,
      },
    ];
  },
  // Sentry configurations
  sentry: {
    hideSourceMaps: true,
  },
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

const withPlaiceholderConfig = withPlaiceholder(nextConfig);

// The Sentry function must run last before exporting
module.exports = withSentryConfig(
  withPlaiceholderConfig,
  sentryWebpackPluginOptions
);
