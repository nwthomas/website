# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Package Manager

This project uses **bun** as the package manager. The repository enforces this via a `preinstall` script, so do not use npm, yarn, or pnpm.

## Common Commands

### Development

- `make dev` or `bun run dev` - Start the Next.js development server
- `make build` or `bun run build` - Build the production application
- `bun run postbuild` - Generate sitemap (runs automatically after build)

### Code Quality

- `make lint` or `bun run lint` - Run ESLint
- `make format` or `bun run format` - Format code with Prettier

### Installation

- `make install` or `make i` or `bun install` - Install dependencies

### Production

- `make start` or `bun run start` - Start the production server
- `make export` - Export static site

## Architecture Overview

### Next.js App Router Structure

This is a Next.js 16 application using the App Router (not Pages Router). The main application code lives in the `app/` directory.

### Key Directories

- `app/` - Next.js app router pages and components
  - `app/(writing)/` - Route group for blog content (doesn't affect URL structure)
    - `app/(writing)/content/` - MDX blog post files
    - `app/(writing)/[slug]/page.tsx` - Dynamic route for individual blog posts
    - `app/(writing)/posts.json` - Post metadata (id, title, date) for static generation
  - `app/components/` - Shared components (Navbar, Footer, ThemeSwitch, etc.)
  - `app/writing/page.tsx` - Blog listing page
  - `app/bio/page.tsx` - Bio page
  - `app/bookmarks/page.tsx` - Bookmarks page
- `store/` - Redux Toolkit store and slices
  - `store/reducers/themeSlice.ts` - Theme state management
  - `store/reducers/writingSlice.ts` - Image overlay state for blog posts
- `hooks/` - Custom React hooks (useTheme, useLockBodyScroll)
- `mdx-components.ts` - MDX component mappings for blog posts

### State Management

Redux Toolkit is used for global state management with two slices:

- **theme**: Manages dark/light theme state
- **writing**: Manages image overlay functionality for blog posts

The Redux store is provided to the app via `app/components/Providers.tsx` which wraps the application in `app/layout.tsx`.

### Theme System

The theme uses a hybrid approach:

1. An inline script in `app/layout.tsx` runs before React hydration to prevent flash of incorrect theme
2. The script reads from localStorage and sets the initial theme class on the `<html>` element
3. React components (ThemeSwitch) sync with this via the Redux store
4. This avoids server/client mismatch while maintaining fast theme initialization

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

Create a `.env` file based on `.env.example`. Sentry variables are optional - the site functions without them.

### Styling

- TailwindCSS 4.x is used for styling
- Uses Geist and Geist Mono fonts from `next/font/google`
- Dark mode is implemented via the `dark` class on the `<html>` element

### React Compiler

This project uses the experimental React Compiler (`reactCompiler: true` in next.config.js) for automatic memoization.

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
