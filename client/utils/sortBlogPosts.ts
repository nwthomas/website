import { Files } from "./readBlogFiles";
import { GrayMatterFile } from "gray-matter";
import { buildKebabCaseParam } from "./routes";

export type BlogPost = Omit<GrayMatterFile<string>, "orig">;

export type BlogPosts = Array<BlogPost>;

// Handles comparison of tagId to tags and returns the normal tag title
export function getTagTitleFromTagId(
  tagId: string,
  tags: Array<string>
): string {
  for (const tag of tags) {
    const convertedTag = buildKebabCaseParam(tag);

    if (convertedTag === tagId) {
      return tag;
    }
  }

  return "";
}

// Takes in any list of tags and returns them fully sorted
export function getSortedTagsList(tags: Array<string>): Array<string> {
  // This is purely a formality to keep TypeScript happy and conform to the required callback
  // because of the way I wrote my reusable merge sort
  function getTagTitle(tag: any): string {
    return tag as string;
  }

  return mergeSort(tags, getTagTitle);
}

// Keys all blog posts by associated slug for quick selection
export function buildSlugToBlogPostMap(files: Files): {
  [key: string]: BlogPost;
} {
  const slugToBlogPostMap: { [key: string]: BlogPost } = {};

  for (const { fileContents } of files) {
    slugToBlogPostMap[fileContents.data.slug] = fileContents;
  }

  return slugToBlogPostMap;
}

interface BlogPostsByTags {
  [key: string]: BlogPosts;
}

// Organizes blog posts by tags
export function bucketAndSortBlogPostsByTags(
  blogPosts: BlogPosts
): BlogPostsByTags {
  const blogPostsByTags = {};

  for (const blogPost of blogPosts) {
    const {
      data: { tags },
    } = blogPost;

    for (const tag of tags) {
      blogPostsByTags[tag] = blogPostsByTags[tag] || [];

      blogPostsByTags[tag].push(blogPost);
    }
  }

  // This merely pulls the graymatter date for use in comparisons
  function getBlogPostAuthoredDate(blogPost: BlogPost): Date {
    const blogPostAuthoredDateString = blogPost.data.dateWritten;

    return new Date(blogPostAuthoredDateString);
  }

  for (const tag in blogPostsByTags) {
    blogPostsByTags[tag] = mergeSort(
      blogPostsByTags[tag],
      getBlogPostAuthoredDate
    );
  }

  return blogPostsByTags;
}

// Merge sort for sorting any list of items into an ordered group
export function mergeSort(
  items: any,
  getComparator: (item: BlogPost) => Date | string
) {
  if (items.length <= 1) {
    return items;
  }

  const pivot = Math.floor(items.length / 2);
  const leftHalf = items.slice(0, pivot);
  const rightHalf = items.slice(pivot);

  return mergeItems(
    mergeSort(leftHalf, getComparator),
    mergeSort(rightHalf, getComparator),
    getComparator
  );
}

// Combines any two arrays via pulling string values from the provided getComparator function
function mergeItems(
  firstArray: any,
  secondArray: any,
  getComparator: (item: BlogPost) => Date | string
) {
  const result: BlogPosts = [];
  let firstIndex = 0;
  let secondIndex = 0;

  while (firstIndex < firstArray.length || secondIndex < secondArray.length) {
    if (firstIndex >= firstArray.length) {
      result.push(secondArray[secondIndex]);
      secondIndex += 1;
    } else if (secondIndex >= secondArray.length) {
      result.push(firstArray[firstIndex]);
      firstIndex += 1;
    } else {
      const firstComparator = getComparator(firstArray[firstIndex]);
      const secondComparator = getComparator(secondArray[secondIndex]);

      if (compareValuesFromComparator(firstComparator, secondComparator) < 0) {
        result.push(firstArray[firstIndex]);
        firstIndex += 1;
      } else {
        result.push(secondArray[secondIndex]);
        secondIndex += 1;
      }
    }
  }

  return result;
}

// Comparison function against different types of strings
function compareValuesFromComparator(
  a: Date | string,
  b: Date | string
): -1 | 0 | 1 {
  if (a < b) {
    return 1;
  } else if (b < a) {
    return -1;
  }

  return 0;
}
