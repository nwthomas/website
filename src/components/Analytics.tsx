"use client";

import { Analytics as AnalyticsComponent } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export function Analytics() {
  return (
    <>
      <AnalyticsComponent />
      <SpeedInsights />
    </>
  );
}
