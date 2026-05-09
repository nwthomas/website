import { createFileRoute } from "@tanstack/react-router";

import { CursorAsciiFill } from "@/components/CursorAsciiFill";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/cursor")({
  head: () => ({
    meta: pageMeta({
      title: "Cursor | Nathan Thomas",
      description: "Nathan Thomas at Cursor",
      ogTitle: "Cursor",
      ogDescription: "Nathan Thomas at Cursor",
      ogUrl: "https://www.nathanthomas.dev/cursor",
    }),
  }),
  component: CursorPage,
});

function CursorPage() {
  return <CursorAsciiFill />;
}
