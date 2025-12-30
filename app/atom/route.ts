import postsJson from "@/app/(writing)/posts.json";

const MAX_ATOM_ITEMS = 100;

function convertDateToAtomFormat(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function GET() {
  const { posts } = postsJson;

  return new Response(
    `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>Nathan Thomas</title>
    <subtitle>Writing</subtitle>
    <link href="https://nathanthomas.dev/atom" rel="self"/>
    <link href="https://nathanthomas.dev/"/>
    <updated>${posts[0].date}</updated>
    <id>https://nathanthomas.dev/</id>
    <author>
        <name>Nathan Thomas</name>
        <email>contact@nathanthomas.dev</email>
    </author>
    ${posts.slice(0, MAX_ATOM_ITEMS).reduce((acc, post) => {
      const dateMatch = post.date.match(/\d{4}/);
      if (!dateMatch) {
        return "";
      }

      const postDate = convertDateToAtomFormat(post.date);

      return acc.length
        ? `${acc}
    <entry>
        <id>${post.id}</id>
        <title>${post.title}</title>
        <link href="https://nathanthomas.dev/${post.id}"/>
        <updated>${postDate}</updated>
    </entry>`
        : `<entry>
        <id>${post.id}</id>
        <title>${post.title}</title>
        <link href="https://nathanthomas.dev/${post.id}"/>
        <updated>${postDate}</updated>
    </entry>`;
    }, "")}
</feed>`,
    {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    },
  );
}
