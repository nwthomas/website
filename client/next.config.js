const { withSentryConfig } = require("@sentry/nextjs");
const SentryCliPlugin = require("@sentry/webpack-plugin");

const moduleExports = {
  reactStrictMode: true,
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
  plugins: [
    new SentryCliPlugin({
      include: ".",
      ignoreFile: ".sentrycliignore",
      ignore: ["node_modules", "webpack.config.js"],
      configFile: "sentry.properties",
    }),
  ],
};

// This must run last before exporting
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
