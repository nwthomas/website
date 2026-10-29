import { Post } from "@/app/(writing)/utils/types";
import type { RowListItem } from "@/app/components/RowList";

export function postToRowListItem(post: Post): RowListItem {
  return {
    date: post.date,
    description: post.description,
    href: `/${post.id}`,
    title: post.title,
  };
}
