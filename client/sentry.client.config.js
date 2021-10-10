// This file configures the intialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const DEV_ENVIRONMENT = process.env.NEXT_PUBLIC_RUNTIME_ENV || "production";

Sentry.init({
  dsn: SENTRY_DSN,
  environment: DEV_ENVIRONMENT,
  maxBreadcrumbs: 100,
  release: process.env.NEXT_PUBLIC_RELEASE_VERSION,
});
