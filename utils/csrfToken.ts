import { NextApiRequest, NextApiResponse } from "next";
import crypto, { timingSafeEqual } from "node:crypto";
import { parse, serialize } from "cookie";

const COOKIE_NAME = "csrf_token";

export async function generateCsrfToken(response: NextApiResponse, request: NextApiRequest) {
  // Keep existing token in cookie if it already exists. This prevents refreshing the token
  // unintentionally server-side on page updates such as in getServerSideProps.
  const existingToken = getCsrfToken(request);
  if (existingToken) {
    return existingToken;
  }

  // Else, generate a new token and set it in a cookie.
  const token = crypto.randomBytes(32).toString("hex");
  response.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      // Both expires and maxAge are set to ensure compatibility with older browsers.
      // These expire after 10 minutes, plenty of time for a user to send a message.
      expires: new Date(Date.now() + 60 * 10 * 1000),
      maxAge: 60 * 10,
    }),
  );

  return token;
}

export function getCsrfToken(req: NextApiRequest) {
  const cookies = parse(req.headers.cookie || "");
  return cookies.csrf_token;
}

export function verifyCsrfToken(req: NextApiRequest, bodyToken?: string) {
  const cookieToken = getCsrfToken(req);

  if (!cookieToken || !bodyToken) {
    throw new Error("Missing CSRF token");
  }

  const a = Buffer.from(cookieToken);
  const b = Buffer.from(bodyToken);

  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new Error("Invalid CSRF token");
  }
}
