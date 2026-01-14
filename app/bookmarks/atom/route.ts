import { BOOKMARKS } from "../bookmarks";
import { formatUTCTimestampToDateString } from "@/app/utils/dates";

const MAX_ATOM_ITEMS = 100;

export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>Nathan Thomas | Bookmarks</title>
    <subtitle>Bookmarks</subtitle>
    <link href="https://nathanthomas.dev/bookmarks/atom" rel="self"/>
    <link href="https://nathanthomas.dev/"/>
    <updated>${formatUTCTimestampToDateString(BOOKMARKS[0].date)}</updated>
    <id>https://nathanthomas.dev/</id>
    <author>
        <name>Nathan Thomas | Bookmarks</name>
        <email>contact@nathanthomas.dev</email>
    </author>
    ${BOOKMARKS.slice(0, MAX_ATOM_ITEMS).reduce((acc, bookmark) => {
      const dateMatch = bookmark.date.match(/\d{4}/);
      if (!dateMatch) {
        return "";
      }

      const bookmarkDate = formatUTCTimestampToDateString(bookmark.date);

      const entryContent = `<entry>
        <id>${bookmark.title}</id>
        <title>${bookmark.title}</title>
        <link href="${bookmark.url}"/>
        <updated>${bookmarkDate}</updated>
    </entry>`;

      return acc.length
        ? `${acc}
    ${entryContent}`
        : `${entryContent}`;
    }, "")}
</feed>`,
    {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    },
  );
}
