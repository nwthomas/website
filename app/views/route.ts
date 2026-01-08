import { getPostViewsRedisKey, redis } from "@/app/utils/redis";

const ALLOWED_ORIGINS = ["https://nathanthomas.dev", "https://www.nathanthomas.dev"];
if (process.env.NODE_ENV === "development") {
  ALLOWED_ORIGINS.push("http://localhost:3000");
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get("origin") || request.headers.get("referer");
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const isOriginAllowed = ALLOWED_ORIGINS.some((allowedOrigin) => {
        try {
          const allowedUrl = new URL(allowedOrigin);
          return originUrl.origin === allowedUrl.origin;
        } catch {
          return false;
        }
      });

      if (!isOriginAllowed) {
        return new Response(null, { status: 403 });
      }
    } catch {
      // If origin URL parsing fails, reject the request
      return new Response(null, { status: 403 });
    }
  } else {
    // No origin header, reject the request
    return new Response(null, { status: 403 });
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return new Response(null, { status: 400 });
  }

  const result = await redis.get(getPostViewsRedisKey(slug));
  if (result == null) {
    return new Response(null, { status: 404 });
  }

  await redis.increment(getPostViewsRedisKey(slug));

  return new Response(null, { status: 204 });
}
