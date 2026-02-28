"use client";

import * as Sentry from "@sentry/nextjs";

import { Component, ReactNode } from "react";

type Props = {
  fallback?: ReactNode;
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras({
        componentStack: info.componentStack,
      });

      Sentry.captureException(error);
    });
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center w-full h-svh p-5">
            <h1>Something went wrong</h1>
            <p>Please try again later</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
