import { BOOKMARKS } from "@/app/bookmarks/bookmarks";

export const dynamic = "force-static";

export function GET() {
  return Response.json(BOOKMARKS.map(({ date, title, url }) => ({ date, title, url })));
}
