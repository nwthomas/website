import { BlogPost } from "./sortBlogPosts";
import fs from "fs";
import getConfig from "next/config";
import matter from "gray-matter";
import path from "path";

export const BLOG_FILES_PATH = "/constants/blogs";

export type Files = Array<{
  fileContents: BlogPost;
  filePath: string;
  name: string;
}>;

export function getDirectoryFiles(relativeDirectoryPath: string): Files {
  const { serverRuntimeConfig } = getConfig();

  const directory = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    relativeDirectoryPath
  );

  const filenames = fs.readdirSync(directory);

  const files: Files = [];

  for (const filename of filenames) {
    const filePath = path.join(directory, filename);
    const name = path.parse(filename).name;
    const fileContents = readFileContentsObject(filePath);

    if (fileContents && !fileContents?.data?.isDraft) {
      // Mutate a new slug value on data for ease of use on pages
      fileContents.data.slug = name;

      files.push({
        fileContents,
        filePath,
        name,
      });
    }
  }

  return files;
}

function readFileContentsObject(filePath: string): BlogPost | null {
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const convertedFileDataObject = matter(fileData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { orig, ...remainingProperties } = convertedFileDataObject;

    return remainingProperties;
  } catch (_) {
    return null;
  }
}
