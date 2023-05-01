// The contents of this file were taken from here:
// https://github.com/getsentry/sentry-javascript/issues/4206
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || "YOUR DSN HERE",
  tracesSampleRate: 1.0,
});
