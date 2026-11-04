"use client";

import * as Sentry from "@sentry/nextjs";

import { OrbStage } from "@/app/components/OrbStage";
import { useEffect } from "react";

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <>
      <link rel="preload" as="image" href="/images/not-found/forest.webp" />
      <title>500 - Internal Server Error | Nathan Thomas</title>
      <OrbStage title="500 - Internal Server Error" />
    </>
  );
}
