import { createFileRoute } from "@tanstack/react-router";

import { getPostViewsRedisKey, getRedis } from "@/utils/redis";

const ALLOWED_ORIGINS = ["https://nathanthomas.dev", "https://www.nathanthomas.dev"];
if (import.meta.env.DEV) {
  ALLOWED_ORIGINS.push("http://localhost:3000");
}

export const Route = createFileRoute("/views")({
  server: {
    handlers: {
      POST: async ({ request }) => {
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
            return new Response(null, { status: 403 });
          }
        } else {
          return new Response(null, { status: 403 });
        }

        const url = new URL(request.url);
        const slug = url.searchParams.get("slug");

        if (!slug) {
          return new Response(null, { status: 400 });
        }

        const redis = getRedis();
        if (!redis) {
          return new Response(null, { status: 204 });
        }

        const result = await redis.get(getPostViewsRedisKey(slug));
        if (result == null) {
          return new Response(null, { status: 404 });
        }

        await redis.increment(getPostViewsRedisKey(slug));

        return new Response(null, { status: 204 });
      },
    },
  },
});
