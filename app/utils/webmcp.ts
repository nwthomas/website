import type { Bookmark } from "@/app/bookmarks/bookmarks";

const SITE_URL = "https://www.nathanthomas.dev";
const GITHUB_URL = "https://github.com/nwthomas";

const MAX_TOOL_OUTPUT_CHARS = 1500;
const DEFAULT_BOOKMARK_LIMIT = 10;
const MAX_BOOKMARK_LIMIT = 25;
const DEFAULT_TRACK_LIMIT = 10;
const MAX_TRACK_LIMIT = 30;

const DATE_PATTERN = "^\\d{4}-\\d{2}-\\d{2}$";
const SLUG_PATTERN = /^[a-z0-9-]+$/;
const METADATA_EXPORT_PATTERN = /^export const metadata = \{[\s\S]*?\n\};?\n/m;
const IMPORT_LINE_PATTERN = /^import .*$\n?/gm;
const IMAGE_COMPONENT_PATTERN = /<Image\b[\s\S]*?\/>/g;
const ALT_ATTRIBUTE_PATTERN = /\balt=(?:"([^"]*)"|'([^']*)'|\{"([^"]*)"\})/;

const DATA_ROUTES = {
  writing: "/agent/writing",
  bookmarks: "/agent/bookmarks",
  books: "/agent/books",
  music: "/agent/music",
  github: "/agent/github",
} as const;

const PAGES = {
  home: "/",
  writing: "/writing",
  bookmarks: "/bookmarks",
  books: "/books",
} as const;

const PROFILE = {
  name: "Nathan Thomas",
  role: "Software engineer, writer, and teacher",
  location: "San Francisco, CA",
  website: SITE_URL,
  links: {
    github: GITHUB_URL,
    x: "https://x.com/nwthomas",
    substack: "https://nathanthomas.substack.com/",
  },
  sections: {
    writing: `${SITE_URL}/writing`,
    bookmarks: `${SITE_URL}/bookmarks`,
    books: `${SITE_URL}/books`,
  },
  feeds: {
    writing: `${SITE_URL}/atom`,
    bookmarks: `${SITE_URL}/bookmarks/atom`,
  },
};

const READ_ONLY = { readOnlyHint: true } as const;
const NO_INPUT: JSONSchema = { type: "object", properties: {} };

type JSONSchema = {
  type?: "object" | "string" | "number" | "integer" | "boolean" | "array";
  description?: string;
  properties?: Record<string, JSONSchema>;
  required?: string[];
  enum?: Array<string | number>;
  items?: JSONSchema;
  minimum?: number;
  maximum?: number;
  pattern?: string;
  additionalProperties?: boolean;
};

type ModelContextToolAnnotations = {
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
  consequentialHint?: boolean;
};

type ModelContextTool<Args = Record<string, unknown>> = {
  name: string;
  description: string;
  inputSchema: JSONSchema;
  annotations?: ModelContextToolAnnotations;
  execute: (args: Args, options: { signal?: AbortSignal }) => Promise<string> | string;
};

type ModelContext = {
  registerTool: (tool: ModelContextTool, options?: { signal?: AbortSignal }) => Promise<void> | void;
};

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
}

type PageName = keyof typeof PAGES;

type TextChunk = {
  text: string;
  offset: number;
  nextOffset: number | null;
  totalLength: number;
};

type BookmarkSearch = {
  query?: string;
  since?: string;
  until?: string;
  limit?: number;
};

type BookmarkSearchResult = {
  total: number;
  bookmarks: Array<Pick<Bookmark, "date" | "title" | "url">>;
};

type ContributionSummary = {
  totalContributions: number;
  activeDays: number;
  busiestDay: { date: string; count: number } | null;
  lastSevenDays: number;
  from: string | null;
  to: string | null;
};

export type ToolDependencies = {
  fetchData: <T>(path: string, format: "json" | "text", signal?: AbortSignal) => Promise<T | null>;
  navigate: (path: string) => void;
};

function defineTool<Args>(tool: ModelContextTool<Args>): ModelContextTool {
  return tool as unknown as ModelContextTool;
}

function normalizeSlug(slug: unknown): string {
  return String(slug ?? "")
    .trim()
    .toLowerCase();
}

function isPageName(page: unknown): page is PageName {
  return typeof page === "string" && Object.hasOwn(PAGES, page);
}

function articleNotFound(slug: string): string {
  return `No article found with slug "${slug}". Call list_articles to get a valid article slug.`;
}

function clampLimit(limit: unknown, fallback: number, max: number): number {
  const value = Number(limit);
  if (!Number.isFinite(value) || value < 1) {
    return fallback;
  }
  return Math.min(Math.floor(value), max);
}

function chunkText(text: string, offset = 0, size = MAX_TOOL_OUTPUT_CHARS): TextChunk {
  const start = Math.max(0, Math.min(Math.floor(Number(offset) || 0), text.length));
  let end = Math.min(start + size, text.length);

  if (end < text.length) {
    const breakAt = text.slice(start, end).lastIndexOf("\n");
    if (breakAt > size / 2) {
      end = start + breakAt;
    }
  }

  return {
    text: text.slice(start, end).trim(),
    offset: start,
    nextOffset: end < text.length ? end : null,
    totalLength: text.length,
  };
}

function searchBookmarks(bookmarks: Bookmark[], { query, since, until, limit }: BookmarkSearch): BookmarkSearchResult {
  const terms = (query ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const matches = bookmarks.filter((bookmark) => {
    if (since && bookmark.date < since) return false;
    if (until && bookmark.date > until) return false;
    const haystack = `${bookmark.title} ${bookmark.url}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });

  return {
    total: matches.length,
    bookmarks: matches
      .slice(0, clampLimit(limit, DEFAULT_BOOKMARK_LIMIT, MAX_BOOKMARK_LIMIT))
      .map(({ date, title, url }) => ({ date, title, url })),
  };
}

export function mdxToText(source: string): string {
  return source
    .replace(METADATA_EXPORT_PATTERN, "")
    .replace(IMPORT_LINE_PATTERN, "")
    .replace(IMAGE_COMPONENT_PATTERN, (component) => {
      const match = component.match(ALT_ATTRIBUTE_PATTERN);
      const alt = match?.[1] ?? match?.[2] ?? match?.[3];
      return alt ? `[Image: ${alt}]` : "[Image]";
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function summarizeContributions(days: Array<{ date: string; count: number }>): ContributionSummary {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const busiestDay = sorted.reduce<ContributionSummary["busiestDay"]>(
    (best, { date, count }) => (count > (best?.count ?? 0) ? { date, count } : best),
    null,
  );

  return {
    totalContributions: sorted.reduce((sum, day) => sum + day.count, 0),
    activeDays: sorted.filter((day) => day.count > 0).length,
    busiestDay,
    lastSevenDays: sorted.slice(-7).reduce((sum, day) => sum + day.count, 0),
    from: sorted[0]?.date ?? null,
    to: sorted.at(-1)?.date ?? null,
  };
}

export function createTools({ fetchData, navigate }: ToolDependencies): ModelContextTool[] {
  return [
    defineTool({
      name: "get_profile",
      description:
        "Get who Nathan Thomas is: role, location, and links to his GitHub, X, Substack, and the main sections and feeds of this site.",
      inputSchema: NO_INPUT,
      annotations: READ_ONLY,
      execute: () => JSON.stringify(PROFILE),
    }),
    defineTool({
      name: "list_articles",
      description:
        "List Nathan's published articles, newest first, with each article's slug, title, description, date, and URL.",
      inputSchema: NO_INPUT,
      annotations: READ_ONLY,
      execute: async (_args, { signal }) => {
        const posts = await fetchData<unknown[]>(DATA_ROUTES.writing, "json", signal);
        return JSON.stringify(posts ?? []);
      },
    }),
    defineTool({
      name: "get_article",
      description:
        "Read the full text of one of Nathan's articles as Markdown, one page at a time. Get slugs from list_articles. When nextOffset is not null, call again with that offset to read the next page.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Article slug from list_articles, such as local-models" },
          offset: {
            type: "integer",
            description: "Character offset to start reading from; 0 for the start",
            minimum: 0,
          },
        },
        required: ["slug"],
      },
      annotations: READ_ONLY,
      execute: async ({ slug, offset }: { slug: string; offset?: number }, { signal }) => {
        const normalizedSlug = normalizeSlug(slug);
        if (!SLUG_PATTERN.test(normalizedSlug)) {
          return "Invalid slug. Call list_articles to get a valid article slug.";
        }

        const text = await fetchData<string>(`${DATA_ROUTES.writing}/${normalizedSlug}`, "text", signal);
        if (text === null) {
          return articleNotFound(normalizedSlug);
        }

        return JSON.stringify({
          slug: normalizedSlug,
          url: `${SITE_URL}/${normalizedSlug}`,
          ...chunkText(text, offset),
        });
      },
    }),
    defineTool({
      name: "search_bookmarks",
      description: `Search the links Nathan has bookmarked, newest first. Every word in query must appear in the bookmark's title or URL. Leave query empty to list the latest bookmarks. Returns up to ${MAX_BOOKMARK_LIMIT} results plus the total match count.`,
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Words to match in the title or URL, such as anthropic agents" },
          since: { type: "string", description: "Earliest date to include, as YYYY-MM-DD", pattern: DATE_PATTERN },
          until: { type: "string", description: "Latest date to include, as YYYY-MM-DD", pattern: DATE_PATTERN },
          limit: {
            type: "integer",
            description: `Maximum results to return; defaults to ${DEFAULT_BOOKMARK_LIMIT}`,
            minimum: 1,
            maximum: MAX_BOOKMARK_LIMIT,
          },
        },
      },
      annotations: READ_ONLY,
      execute: async (search: BookmarkSearch, { signal }) => {
        const bookmarks = await fetchData<Bookmark[]>(DATA_ROUTES.bookmarks, "json", signal);
        return JSON.stringify(searchBookmarks(bookmarks ?? [], search));
      },
    }),
    defineTool({
      name: "list_books",
      description: "List the books Nathan recommends on this site, with title, author, and a link to each.",
      inputSchema: NO_INPUT,
      annotations: READ_ONLY,
      execute: async (_args, { signal }) => {
        const books = await fetchData<unknown[]>(DATA_ROUTES.books, "json", signal);
        return JSON.stringify(books ?? []);
      },
    }),
    defineTool({
      name: "get_top_tracks",
      description:
        "Get the songs Nathan has listened to most on Spotify recently, with artist, album, and Spotify link.",
      inputSchema: {
        type: "object",
        properties: {
          limit: {
            type: "integer",
            description: `Maximum tracks to return; defaults to ${DEFAULT_TRACK_LIMIT}`,
            minimum: 1,
            maximum: MAX_TRACK_LIMIT,
          },
        },
      },
      annotations: { ...READ_ONLY, untrustedContentHint: true },
      execute: async ({ limit }: { limit?: number }, { signal }) => {
        const tracks = await fetchData<unknown[]>(DATA_ROUTES.music, "json", signal);
        if (!tracks?.length) {
          return "Top tracks are unavailable right now.";
        }
        return JSON.stringify(tracks.slice(0, clampLimit(limit, DEFAULT_TRACK_LIMIT, MAX_TRACK_LIMIT)));
      },
    }),
    defineTool({
      name: "get_github_activity",
      description:
        "Get a summary of Nathan's GitHub contributions over the past year: total contributions, active days, busiest day, and the last seven days.",
      inputSchema: NO_INPUT,
      annotations: READ_ONLY,
      execute: async (_args, { signal }) => {
        const summary = await fetchData<ContributionSummary>(DATA_ROUTES.github, "json", signal);
        return summary ? JSON.stringify(summary) : "GitHub activity is unavailable right now.";
      },
    }),
    defineTool({
      name: "open_page",
      description: "Navigate this browser tab to a section of Nathan's site, or to one article when slug is given.",
      inputSchema: {
        type: "object",
        properties: {
          page: { type: "string", description: "Section to open", enum: Object.keys(PAGES) },
          slug: {
            type: "string",
            description: "Article slug from list_articles; opens that article instead of a section",
          },
        },
      },
      execute: async ({ page, slug }: { page?: string; slug?: string }, { signal }) => {
        if (slug) {
          const normalizedSlug = normalizeSlug(slug);
          const posts = await fetchData<Array<{ slug: string }>>(DATA_ROUTES.writing, "json", signal);
          if (!SLUG_PATTERN.test(normalizedSlug) || !posts?.some((post) => post.slug === normalizedSlug)) {
            return articleNotFound(normalizedSlug);
          }
          navigate(`/${normalizedSlug}`);
          return `Opened ${SITE_URL}/${normalizedSlug}`;
        }

        if (isPageName(page)) {
          const path = PAGES[page];
          navigate(path);
          return `Opened ${SITE_URL}${path === "/" ? "" : path}`;
        }

        return `Provide a slug or one of these pages: ${Object.keys(PAGES).join(", ")}.`;
      },
    }),
  ];
}
