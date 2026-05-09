import { createRouter } from "@tanstack/react-router";

import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { SiteNotFound } from "@/components/SiteNotFound";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <SiteNotFound />,
    scrollRestoration: true,
  });
}
