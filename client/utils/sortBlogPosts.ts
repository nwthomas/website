import { GrayMatterFile } from "gray-matter";

export type BlogPost = Omit<GrayMatterFile<string>, "orig">;

export type BlogPosts = Array<BlogPost>;

type BlogPostsByTags = {
  [key: string]: BlogPosts;
};

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

  for (const tag in blogPostsByTags) {
    blogPostsByTags[tag] = mergeSortBlogPosts(blogPostsByTags[tag]);
  }

  return blogPostsByTags;
}

export function mergeSortBlogPosts(blogPosts: BlogPosts) {
  if (blogPosts.length <= 1) {
    return blogPosts;
  }

  const pivot = Math.floor(blogPosts.length / 2);
  const leftHalf = blogPosts.slice(0, pivot);
  const rightHalf = blogPosts.slice(pivot);

  return mergeBlogs(
    mergeSortBlogPosts(leftHalf),
    mergeSortBlogPosts(rightHalf)
  );
}

function mergeBlogs(firstBlogArray: BlogPosts, secondBlogArray: BlogPosts) {
  const result: BlogPosts = [];
  let firstIndex = 0;
  let secondIndex = 0;

  while (
    firstIndex < firstBlogArray.length ||
    secondIndex < secondBlogArray.length
  ) {
    if (firstIndex >= firstBlogArray.length) {
      result.push(secondBlogArray[secondIndex]);
      secondIndex += 1;
    } else if (secondIndex >= secondBlogArray.length) {
      result.push(firstBlogArray[firstIndex]);
      firstIndex += 1;
    } else {
      const firstTitle = firstBlogArray[firstIndex].data.title;
      const secondTitle = secondBlogArray[secondIndex].data.title;

      if (compareStrings(firstTitle, secondTitle) < 0) {
        result.push(firstBlogArray[firstIndex]);
        firstIndex += 1;
      } else {
        result.push(secondBlogArray[secondIndex]);
        secondIndex += 1;
      }
    }
  }

  return result;
}

function compareStrings(a: string, b: string): -1 | 0 | 1 {
  if (a < b) {
    return -1;
  } else if (b < a) {
    return 1;
  }

  return 0;
}
