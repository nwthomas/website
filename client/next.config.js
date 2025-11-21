const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  // NextJS generic configurations
  reactStrictMode: true,
  // serverRuntimeConfig: {
  //   PROJECT_ROOT: __dirname,
  // },
  // experimental: {
  //   ppr: true,
  // },
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

// The Sentry function must run last before exporting
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
