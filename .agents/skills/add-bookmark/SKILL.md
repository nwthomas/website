---
name: add-bookmark
description: Add new bookmarks to this website repository. Use when the user asks to save, add, create, or record a bookmark in this repository.
---

# Add Bookmark

Add bookmarks to `app/bookmarks/bookmarks.ts` in this repository.

Always generate bookmark IDs with make uuid, use the current local date when no date is provided, and normalize bookmark titles to MLA-style title case.

Use when the user asks to save, add, create, or record a bookmark/link in app/bookmarks/bookmarks.ts.

## Workflow

1. Work from the repository root.
2. Run `make uuid` and use the printed UUID as the bookmark `id`.
3. Determine the date:
   - Use the user-provided date when present.
   - If no date is provided, use the current local date from the environment context in `YYYY-MM-DD` format.
   - Do not use the article publish date, page updated date, or fetch date unless the user explicitly asks for that.
4. Determine the title:
   - Use the user-provided title when present.
   - If no title is provided, fetch the page and use the HTML `<title>`.
   - If the page title cannot be fetched, ask the user for a title.
   - Normalize the final title to MLA-style title case.
5. Edit `app/bookmarks/bookmarks.ts`.
6. Insert the new bookmark into `BOOKMARKS` in newest-first date order.
7. Run `make lint` after editing.

## Bookmark Shape

Use this shape:

```ts
{
  id: "<uuid>",
  date: "YYYY-MM-DD",
  title: "<MLA-style title>",
  url: "<url>",
}
```

Include `postfix` or `footnotes` only when the user provides them or explicitly asks for them.

## Title Case

Normalize bookmark titles to MLA-style title case:

- Capitalize the first and last word.
- Capitalize nouns, pronouns, verbs, adjectives, adverbs, and subordinating conjunctions.
- Lowercase articles, coordinating conjunctions, and short prepositions unless they are first or last.
- Preserve intentional brand casing, acronyms, product names, domains, and code/library names when obvious.

Examples of casing to preserve:

- `React`
- `NextJS`
- `web.dev`
- `CRDT`
- `HTTP`
- `OpenAI`
- `GitHub`

Avoid using `<` or `>` brackets in the title field as this breaks the syntax for the live generated RSS feed. Use changed titles like `img vs picture` instead of `<img> vs <picture>`.

When deriving a title from a page `<title>`, remove obvious site suffixes when appropriate, such as ` | Site Name` or ` - Site Name`, then normalize the remaining title.
