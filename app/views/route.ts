import { getPostViewsRedisKey, redis } from "@/app/utils/redis";

export async function POST(request: Request): Promise<Response> {
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
