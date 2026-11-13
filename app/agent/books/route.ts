import { BOOKS } from "@/app/books/books";

export const dynamic = "force-static";

export function GET() {
  return Response.json(BOOKS.map(({ title, author, url }) => ({ title, author, url })));
}
