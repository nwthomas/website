import type { ComponentType } from "react";

import postsJson from "@/posts.json";
import { notFound } from "@tanstack/react-router";

export type PostFrontmatter = {
  title: string;
  excerpt: string;
};

const modules = import.meta.glob<{ default: ComponentType<object>; metadata: PostFrontmatter }>("./*.mdx", {
  eager: true,
});

export function getPostModule(slug: string) {
  const key = `./${slug}.mdx`;
  return modules[key] ?? null;
}

export function isValidSlug(slug: string): boolean {
  return postsJson.posts.some((p) => p.id === slug);
}

export function loadPostOrThrow(slug: string) {
  if (!isValidSlug(slug)) throw notFound();
  const mod = getPostModule(slug);
  if (!mod?.default) throw notFound();
  return mod;
}
