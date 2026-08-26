"use client";

import * as Sentry from "@sentry/nextjs";
import * as stylex from "@stylexjs/stylex";

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
          <div {...stylex.props(styles.fallback)}>
            <h1>Something went wrong</h1>
            <p>Please try again later</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

const styles = stylex.create({
  fallback: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100svh",
    paddingBottom: "1.25rem",
    paddingLeft: "1.25rem",
    paddingRight: "1.25rem",
    paddingTop: "1.25rem",
    width: "100%",
  },
});
