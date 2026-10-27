import { getPostViewsRedisKey, redis } from "@/app/utils/redis";
import postsJson from "@/app/(writing)/posts.json";

const POST_IDS = new Set(postsJson.posts.map((post) => post.id));

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

  // Only track real articles so arbitrary slugs can't create keys
  if (!POST_IDS.has(slug)) {
    return new Response(null, { status: 404 });
  }

  // Start new articles at 0 (NX keeps this from resetting an existing count during concurrent first views)
  const viewsKey = getPostViewsRedisKey(slug);
  await redis.setIfMissing(viewsKey, 0);
  await redis.increment(viewsKey);

  return new Response(null, { status: 204 });
}
