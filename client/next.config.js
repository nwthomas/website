const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
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
  sentry: {
    hideSourceMaps: true,
  },
};

const SentryWebpackPluginOptions = {
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

// This must run last before exporting
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
