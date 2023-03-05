import { Request, RequestHandler, Response } from "express";

import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

// A lot of this work is pulled from an excellent article I found on rate limiting in NextJS:
// https://kittygiraudel.com/2022/05/16/rate-limit-nextjs-api-routes/
const FALLBACK_IP_STRING_NAME = "fallback";
export const RATE_LIMIT = 10;
export const RATE_LIMIT_WINDOW_MS = 60 * 1_000;
export const RATE_LIMIT_DELAY_AFTER = Math.round(RATE_LIMIT / 2);
export const RATE_LIMIT_DELAY_MS = 500;

const getIP = (request: Request): string => {
  const ipAddress =
    request.ip ||
    request.headers["x-forwarded-for"] ||
    request.headers["x-real-ip"] ||
    request.connection.remoteAddress;

  // Returns a concatenated string of values in place of a single original string
  if (Array.isArray(ipAddress)) {
    return ipAddress.reduce((accum, value) => {
      return accum + value;
    }, "");
  }

  // A fallback string here is not ideal, but should not be hit. If it does, having the string be
  // truthy ("fallback") will still enable the rate limit. Worst case, multiple malicious users
  // will hit the rate limit with is actually a positive outcome.
  return ipAddress || FALLBACK_IP_STRING_NAME;
};

// Even though this function is only used here and not exported, these parameters are kept here in
// case this is used elsewhere in the future or even lifted quickly into another app (as a lot of
// work in this repository is viewed as prep work and learning for another future app).
const getRateLimitMiddlewares = ({
  limit = RATE_LIMIT,
  windowMs = RATE_LIMIT_WINDOW_MS,
  delayAfter = RATE_LIMIT_DELAY_AFTER,
  delayMs = RATE_LIMIT_DELAY_MS,
} = {}) => [
  slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

// This function could move to a more generalized file in the future if more express middleware
// ends up being needed on other API routes
export const applyMiddleware =
  (middleware: RequestHandler) => (request: Request, response: Response) => {
    new Promise((resolve, reject) => {
      middleware(request, response, (result) => {
        result instanceof Error ? reject(result) : resolve(result);
      });
    });
  };

// These need to be created here in order for the in-memory key-value store for rate limiting to work
export const middlewares = getRateLimitMiddlewares();

// This is where the final magic happens. This function can now be used inside the API handlers that
// NextJS surfaces to the application.
export const applyRateLimit = async (request: Request, response: Response) => {
  await Promise.all(
    middlewares
      .map(applyMiddleware)
      .map((middleware) => middleware(request, response))
  );
};
