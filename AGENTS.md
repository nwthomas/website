# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Project Overview

This is a personal portfolio and blog website built with Next.js. It features a static blog powered by MDX files, a contact form with email functionality, and a custom theme system with light/dark mode support.

## Package Manager

This project uses **Bun** as the package manager, not npm or yarn. The `preinstall` script enforces this with `npx only-allow bun`.

## Development Commands

### Essential Commands

- `make dev` or `bun run dev` - Start development server
- `make build` or `bun run build` - Build for production (also runs sitemap generation via postbuild)
- `make lint` or `bun run lint` - Run ESLint
- `make install` or `bun install` - Install dependencies
- `make start` or `bun run start` - Start production server

### Other Commands

- `bun run postbuild` - Generate sitemap (runs automatically after build)
- `bun run export` - Export static site

## Environment Variables

Set up a `.env` file modeled after `.env.example`. The site will run without it, but email functionality requires:

- `EMAIL_PORT`, `HOST_NAME`, `PASSWORD`, `PERSONAL_EMAIL`, `TLS`, `USERNAME` - Email configuration for contact form
- `SENTRY_DSN`, `SENTRY_URL`, `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` - Sentry error tracking

## Architecture

### Blog System

- Blog posts are stored as **MDX files** in `/constants/blogs/`
- Each MDX file has frontmatter with metadata: `title`, `description`, `imageUrl`, `dateWritten`, `dateUpdated`, `isDraft`, `tags`
- Draft posts (`isDraft: true`) are excluded in production (see `utils/readBlogFiles.ts:27`)
- The blog uses Next.js static generation with `getStaticProps` and `getStaticPaths`
- Blog posts are read from the file system at build time using `gray-matter` to parse frontmatter
- The slug is derived from the filename (see `utils/readBlogFiles.ts:31`)

### Pages Structure (Pages Router)

This project uses the **Next.js Pages Router**, not the App Router:

- `/pages/index.tsx` - Homepage
- `/pages/blog/index.tsx` - Blog listing page
- `/pages/blog/[blogId].tsx` - Individual blog post (dynamic route)
- `/pages/tag/[tagId].tsx` - Tag filtering page
- `/pages/contact.tsx` - Contact form page
- `/pages/api/send-email.ts` - API route for contact form (includes rate limiting and honeypot protection)
- `/pages/og-image.tsx` - Dynamic OG image generation using Playwright/Chromium
- `/pages/404.tsx` - Custom 404 page

### State Management

Uses Redux Toolkit with the following slices:

- `blogSlice` - Blog image overlay state
- `contactFormSlice` - Contact form state
- `modalSlice` - Modal visibility state
- `themeSlice` - Theme (light/dark mode) state

All slices are in `/store/reducers/` with corresponding selectors in `/store/selectors/`.

### Styling

- Uses **styled-components** for component styling
- Global styles defined in `/styles/libs/global`
- Theme system in `/styles/libs/theme` with light/dark mode support
- The `preload` class on `<body>` prevents CSS transitions on page load (removed via useEffect in `_app.tsx:56-60`)
- CSS variables used for spacing, colors, and responsive breakpoints

### React Query

- Configured with a 24-hour stale time (`_app.tsx:20-27`)
- Used for client-side data fetching (though most data is static)
- DevTools enabled in development only

### Key Custom Hooks

- `useTheme` - Access and update theme state
- `useScrollPosition` - Track scroll position
- `useIsArticlePage` - Detect if on article page
- `useLockBodyScroll` - Lock body scroll (for modals)
- `useGetScreenDimensions` - Get viewport dimensions
- `useGetMouseRadian` - Calculate mouse position in radians

### API Route Protection

The `/api/send-email` endpoint includes:

- **Rate limiting** - Implemented in `utils/rateLimit.ts` using express-rate-limit and express-slow-down
- **Honeypot field** - A hidden "fax" field to catch bots (`send-email.ts:41`)
- Only accepts POST requests

### Markdown Rendering

- Blog content uses `react-markdown` with custom renderers in `/components/BlogArticle/`
- Rehype plugins: `rehype-highlight`, `rehype-raw`, `rehype-unwrap-images`, `rehype-external-links`
- Remark plugins: `remark-gfm`, `@fec/remark-a11y-emoji`
- Custom components for headings, code blocks, images, blockquotes, lists, etc.

### Image Handling

- Blog images have an overlay feature - clicking an image shows it in a fullscreen modal (controlled by Redux blogSlice)
- Hero images are specified in blog post frontmatter
- OG images are dynamically generated at `/og-image` using Playwright and Chromium

### SEO

- Uses `next-seo` for SEO metadata
- Sitemap generation via `next-sitemap` (configured in `next-sitemap.config.cjs`)
- Custom SEO component in `/components/SEO/`

### URL Redirects

Permanent redirects are configured in `next.config.js`:

- `/tag` → `/blog`
- `/tag/soft-skills` → `/tag/personal`

## TypeScript Configuration

- `noImplicitAny: false` - Allows implicit any types
- Strict mode enabled
- No emit (Next.js handles compilation)
- Targets ESNext

## ESLint Configuration

- Extends Next.js recommended config, jsx-a11y, and react-hooks
- Many style rules disabled (indent, arrow-body-style, etc.) - project likely uses Prettier
- Custom rule: `@typescript-eslint/no-unused-vars` warns on unused vars except function arguments
- `@next/next/no-img-element` is disabled (project uses `<img>` instead of `<Image>`)

## Important Notes

- The codebase has flexbox `min-width: 0` fixes for code block overflow (see `pages/blog/[blogId].tsx:90` and :105`)
- Sentry is configured for error tracking (client, server, and edge runtime)
- Vercel Analytics is integrated (`_app.tsx:75`)
- Node version is locked to Node 22 (`package.json:77-79`)
