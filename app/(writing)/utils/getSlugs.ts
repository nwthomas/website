import fs from "fs";
import path from "path";

export const WRITING_CONTENT_PATH = "/app/(writing)/content";

type Slug = { slug: string };
export type Slugs = Slug[];

export function getSlugs(): Slugs {
  const directory = path.join(process.cwd(), WRITING_CONTENT_PATH);
  const filenames = fs.readdirSync(directory);
  const slugs: Slugs = filenames.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return slugs;
}
