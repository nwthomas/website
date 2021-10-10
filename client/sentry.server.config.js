// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
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
