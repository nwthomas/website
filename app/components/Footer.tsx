"use client";

import * as stylex from "@stylexjs/stylex";
import { sharedStyles } from "@/app/styles";
import { useSyncExternalStore } from "react";

if (typeof window !== "undefined" && !window.__nathanLocationPatched) {
  window.__nathanLocationPatched = true;

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function pushState(...args) {
    originalPushState.apply(this, args as never);
    window.dispatchEvent(new Event("locationchange"));
  };

  window.history.replaceState = function replaceState(...args) {
    originalReplaceState.apply(this, args as never);
    window.dispatchEvent(new Event("locationchange"));
  };
}

declare global {
  interface Window {
    __nathanLocationPatched?: boolean;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("locationchange", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("locationchange", callback);
  };
}

function getSnapshot() {
  return window.location.pathname;
}

function getServerSnapshot() {
  return "/";
}

export function Footer() {
  const pathname = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isHomePage = pathname === "/";

  if (!isHomePage) {
    return null;
  }

  return (
    <footer {...stylex.props(styles.footer, sharedStyles.pageSection)}>
      <div {...stylex.props(styles.inner)}>
        <ul {...stylex.props(styles.list)}>
          <li data-unstyled="true">
            <p {...stylex.props(styles.text)}>
              Nathan Thomas (
              <a
                href="https://x.com/nwthomas"
                aria-label="Link to Nathan's profile on X"
                rel="noopener noreferrer"
                target="_blank"
                {...stylex.props(styles.profileLink)}
              >
                @nwthomas
              </a>
              )
            </p>
          </li>
          <li data-unstyled="true" {...stylex.props(styles.sourceItem)}>
            <a
              href="https://github.com/nwthomas/website"
              aria-label="Link to the source repository on GitHub for this website"
              rel="noopener noreferrer"
              target="_blank"
              {...stylex.props(styles.sourceLink)}
            >
              Source
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

const styles = stylex.create({
  footer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  inner: {
    display: "flex",
    justifyContent: "flex-end",
  },
  list: {
    gap: {
      default: "0.75rem",
      "@media (min-width: 640px)": "1.25rem",
    },
    display: "flex",
  },
  profileLink: {
    color: "var(--foreground)",
    fontSize: "0.875rem",
    textDecorationLine: "none",
  },
  sourceItem: {
    color: "var(--muted)",
    display: "flex",
  },
  sourceLink: {
    color: "inherit",
    fontSize: "0.875rem",
    marginLeft: "auto",
    textDecorationLine: "none",
  },
  text: {
    color: "var(--muted)",
    fontSize: "0.875rem",
  },
});
