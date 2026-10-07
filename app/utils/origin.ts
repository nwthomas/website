const ALLOWED_ORIGINS = ["https://nathanthomas.dev", "https://www.nathanthomas.dev"];
if (process.env.NODE_ENV === "development") {
  ALLOWED_ORIGINS.push("http://localhost:3000");
}

// Checks the origin (or referer) header against the site's allowed origins
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin") || request.headers.get("referer");
  if (!origin) {
    // No origin header, reject the request
    return false;
  }

  try {
    const originUrl = new URL(origin);
    return ALLOWED_ORIGINS.some((allowedOrigin) => {
      try {
        const allowedUrl = new URL(allowedOrigin);
        return originUrl.origin === allowedUrl.origin;
      } catch {
        return false;
      }
    });
  } catch {
    // If origin URL parsing fails, reject the request
    return false;
  }
}
