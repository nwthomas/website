"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/store";

import "@/sentry.client";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
