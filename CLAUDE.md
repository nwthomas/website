# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website and blog built with Next.js, TypeScript, and styled-components. Uses bun as the package manager and Makefile for common commands.

## Essential Commands

### Development

```bash
make install   # Install dependencies with bun
make dev       # Start development server (runs next dev)
make build     # Build production bundle (installs chromium, runs next build)
make lint      # Run ESLint
make start     # Start production server
```

### Blog Development

Blog posts are markdown (.mdx) files located in `constants/blogs/`. Each blog post includes frontmatter metadata (title, description, dateWritten, dateUpdated, imageUrl, tags, isDraft).

The blog system uses:

- `utils/readBlogFiles.ts` - Reads blog files from `constants/blogs/`
- `utils/sortBlogPosts.ts` - Sorts and builds slug-to-post mappings
- Draft posts (isDraft: true) are automatically filtered out in production

## Architecture

### Pages & Routing

- Next.js Pages Router (not App Router) in `/pages`
- Dynamic routes: `/blog/[blogId].tsx` and `/tag/[tagId].tsx`
- Static generation with `getStaticProps` and `getStaticPaths`
- API routes in `/pages/api` (e.g., send-email.ts for contact form)

### State Management

Redux Toolkit with 4 slices in `/store/reducers`:

- `blogSlice` - Blog image overlay state
- `contactFormSlice` - Contact form state
- `themeSlice` - Light/dark theme toggling
- `modalSlice` - Modal visibility

Selectors in `/store/selectors` for accessing state.

### Styling

- Styled-components for component styling with theme support
- Tailwind CSS v4 (via `@tailwindcss/postcss`) for utility classes
- Global styles in `/styles/libs/global.ts`
- Theme system in `/styles/libs/theme.ts` supports light/dark modes
- Theme persisted to localStorage and managed through Redux

### Components

Located in `/components`:

- `Layout` - Main layout wrapper with navbar and footer
- `BlogMarkdownRenderer` - Renders .mdx blog content with custom components
- `BlogArticle/*` - Custom markdown components (BlogImage, BlogHeading, BlogCodeBlock, etc.)
- `ThemeTransitionSwitch` - Light/dark theme toggle
- `ContactForm` - Formik-based contact form with Yup validation
- `Modal` - Focus-trapped modal component

### Data Flow for Blog Posts

1. Blog .mdx files in `constants/blogs/` contain frontmatter + markdown
2. `getDirectoryFiles()` reads files using gray-matter
3. `buildSlugToBlogPostMap()` creates slug lookup
4. Pages use `getStaticProps`/`getStaticPaths` for static generation
5. `BlogMarkdownRenderer` uses react-markdown with rehype plugins

### Environment Variables

See `.env.example` for required variables:

- Sentry configuration (DSN, org, project, auth token)
- Email service credentials for contact form (nodemailer)
- NODE_ENV for environment detection

### OG Images

Dynamic OG images generated at build time (not edge functions):

- `/pages/og-image.tsx` renders OG image template
- `utils/ogImage.ts` handles generation using Playwright/Chromium
- Generated during build via `bun run install-chromium`

## Development Notes

- **Package Manager**: This project uses bun exclusively. The preinstall script enforces this with `only-allow bun`.
- **React Query**: Configured with 1-day stale time since content doesn't change frequently.
- **React Strict Mode**: Enabled in next.config.js.
- **Styled Components**: SSR support configured in next.config.js compiler options.
- **Preload Class**: Body has `.preload` class removed on mount to prevent CSS transition flashing (see \_app.tsx and globals.css).
- **Node Version**: Engine requires Node 22 (see .nvmrc and package.json).
