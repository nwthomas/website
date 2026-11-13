"use client";

import * as Sentry from "@sentry/nextjs";

import { createTools, type ToolDependencies } from "@/app/utils/webmcp";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const fetchData: ToolDependencies["fetchData"] = async (path, format, signal) => {
  const response = await fetch(path, { signal });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Request to ${path} failed (${response.status})`);
  }
  return format === "json" ? response.json() : response.text();
};

export function WebMCP() {
  const router = useRouter();

  useEffect(() => {
    const modelContext = document.modelContext;
    if (!modelContext) {
      return;
    }

    const controller = new AbortController();
    const tools = createTools({ fetchData, navigate: (path) => router.push(path) });

    Promise.all(tools.map((tool) => modelContext.registerTool(tool, { signal: controller.signal }))).catch((error) => {
      controller.abort();
      Sentry.captureException(error);
    });

    return () => controller.abort();
  }, [router]);

  return null;
}
