# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Package Manager

This project uses **bun** as the package manager. The repository enforces this via a `preinstall` script, so do not use npm, yarn, or pnpm.

## Common Commands

### Development

- `make dev` - Start the Next.js development server
- `make build` - Build the production application
- `make postbuild` - Generate sitemap (runs automatically after build)

### Code Quality

- `make lint` - Run ESLint
- `make format` - Format code with Prettier

### Installation

- `make install` or `make i` - Install dependencies

### Database

- `make db-up` - Start the local Postgres container (`compose.yaml`); schema in `db/init/` is applied on first start
- `make db-down` - Stop the local Postgres container
- `make db-reset` - Wipe the local Postgres volume and start fresh
- `make db-psql` - Open a psql shell against the local database

### Production

- `make start` - Start the production server after a build
- Static export is not currently configured; the legacy `make export` command does not work with Next.js 16

## Architecture Overview

### Next.js App Router Structure

This is a Next.js 16 application using the App Router (not Pages Router). The main application code lives in the `app/` directory.

### Key Directories

- `app/` - Next.js app router pages and components
  - `app/(writing)/` - Route group for blog content (doesn't affect URL structure)
    - `app/(writing)/content/` - MDX blog post files
    - `app/(writing)/components/` - Custom components used to render MDX elements
    - `app/(writing)/[slug]/page.tsx` - Dynamic route for individual blog posts
    - `app/(writing)/[slug]/opengraph-image/route.tsx` - Per-post Open Graph image route
    - `app/(writing)/posts.json` - Post metadata (id, title, description, date) for static generation
  - `app/components/` - Shared components (Navbar, Footer, ThemeSwitch, etc.)
  - `app/hooks/` - Custom React hooks (`useTheme`, `useLockBodyScroll`)
  - `app/store/` - Redux Toolkit store, reducers, and selectors
  - `app/utils/` - Shared utilities for constants, dates, Redis, and Spotify
  - `app/atom/route.ts` and `app/bookmarks/atom/route.ts` - Atom feed route handlers
  - `app/views/route.ts` - Redis-backed post view tracking endpoint
  - `app/writing/page.tsx` - Blog listing page
  - `app/bookmarks/page.tsx` - Bookmarks page
  - `app/books/page.tsx` - Book list page
- `app/styles.ts` - Shared StyleX styles
- `mdx-components.ts` - MDX component mappings for blog posts

### State Management

Redux Toolkit is used for global state management with two slices:

- **theme**: Manages dark/light theme state
- **writing**: Manages image overlay functionality for blog posts

The Redux store is provided to the app via `app/components/Providers.tsx` which wraps the application in `app/layout.tsx`.

### Theme System

The theme is stored per user in Postgres and uses a hybrid approach:

1. Users are anonymous and identified by a random UUID in an httpOnly `uid` cookie, created on the first theme save
2. `app/theme/route.ts` reads (`GET`) and saves (`POST`) the user's theme in the `users` table via `app/utils/db.ts`, and sets a readable `theme` cookie that mirrors it
3. An inline script in `app/layout.tsx` runs before React hydration, reads the `theme` cookie (falling back to the OS preference), and sets the initial theme class on the `<html>` element to prevent a flash of incorrect theme
4. React components (ThemeSwitch) sync with this via the Redux store; `useTheme` persists changes to the database and reconciles with it on load
5. This keeps pages static, avoids server/client mismatch, and degrades gracefully to the cookie/OS preference if the database is unavailable

### Blog Post Architecture

Blog posts are MDX files stored in `app/(writing)/content/`. Each post:

1. Exports a `metadata` object containing title, description, and openGraph data
2. Is dynamically imported in `app/(writing)/[slug]/page.tsx` based on the slug
3. Uses custom MDX components (h1, h2, p, code, image, etc.) defined in `mdx-components.ts`
4. Must be registered in `app/(writing)/posts.json` to appear in the blog listing and enable static generation

To add a new blog post:

1. Create a new `.mdx` file in `app/(writing)/content/` with a URL-friendly filename (e.g., `my-post-title.mdx`)
2. Add metadata export at the top of the file
3. Add the post to `posts.json` with matching id (filename without .mdx), title, and date

### Path Aliases

The project uses `@/*` path aliases (configured in `tsconfig.json`) that resolve to the root directory. Use these for imports: `@/app/components/Navbar` instead of relative paths.

### Environment Variables

Create a `.env` file based on `.env.example`. Redis variables are required for writing views; `DATABASE_URL` is required for saving themes (use the value in `.env.example` with `make db-up` locally); Sentry and Spotify variables are optional.

### Styling

- StyleX is used for styling
- Uses Geist Sans and Geist Mono from the `geist` package
- Dark mode is implemented via the `dark` class on the `<html>` element

### React Compiler

This project uses the React Compiler (`reactCompiler: true` in next.config.js) for automatic memoization.

### MDX Configuration

MDX is configured in `next.config.js` with:

- `@next/mdx` plugin
- `mdxRs: true` for the faster Rust-based MDX compiler
- Custom component provider pointing to `mdx-components.ts`

### Monitoring

Sentry is integrated for error tracking via `@sentry/nextjs` with configuration in:

- `sentry.client.config.ts`
- `sentry.edge.config.ts`
- `sentry.server.config.ts`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
