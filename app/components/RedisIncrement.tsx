"use client";

import { useEffect } from "react";

export function RedisIncrement({ slug }: { slug: string }) {
  // Very simple request to route for incrementing the view count. Abuse isn't a big deal here.
  useEffect(() => {
    fetch(`/views?slug=${slug}`, {
      method: "POST",
    });
  }, [slug]);

  return null;
}
