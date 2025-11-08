# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Next.js, TypeScript, and Styled Components. The site features a blog with MDX content, a contact form, and a custom theme system with light/dark mode support.

## Development Commands

All development happens in the `client/` directory. Commands must be run from within the `client/` directory:

```bash
cd client

# Development
pnpm dev              # Start development server on localhost:3000

# Build & Production
pnpm build            # Build for production (includes Chromium install for OG images)
pnpm start            # Start production server
pnpm export           # Export static site

# Code Quality
pnpm lint             # Run ESLint

# Utilities
pnpm share            # Share local dev via ngrok
pnpm install-chromium # Install Chromium for Playwright (used for OG image generation)
```

**Important**: This project uses pnpm exclusively. A preinstall hook enforces this.

## Architecture

### Project Structure

- `client/` - Main Next.js application (all development happens here)
- `client/pages/` - Next.js pages and API routes
  - `pages/api/send-email.ts` - Contact form email API endpoint
  - `pages/blog/[blogId].tsx` - Dynamic blog post pages
  - `pages/og-image.tsx` - Dynamic OG image generation using Playwright
- `client/components/` - React components organized by feature
- `client/constants/blogs/` - MDX blog content files
- `client/store/` - Redux Toolkit store with slices for blog, contactForm, modal, and theme
- `client/styles/` - Styled Components theme system and global styles
- `client/hooks/` - Custom React hooks
- `client/utils/` - Utility functions

### State Management

Redux Toolkit is used for global state with four main slices:

1. **blog** - Blog post filtering and display state
2. **contactForm** - Contact form submission state
3. **modal** - Modal visibility and content
4. **theme** - Light/dark theme toggle (persists to localStorage)

Access via `useTheme()`, `useSelector()`, and `useDispatch()` hooks.

### Styling Architecture

The project uses **Styled Components** with a custom theme system:

- Theme defined in `client/styles/libs/theme.ts`
- Global styles in `client/styles/libs/global.ts`
- Theme provider wraps the entire app in `_app.tsx`
- Theme values accessed via `props.theme` in styled components
- **Tailwind CSS** is also configured but used minimally

### Blog System

Blog posts are MDX files in `client/constants/blogs/`:

- Each file has frontmatter with metadata (title, date, tags, isDraft, etc.)
- `gray-matter` parses frontmatter
- `readBlogFiles.ts` reads and processes blog files at build time
- Draft posts (isDraft: true) are hidden in production
- Dynamic routing via `[blogId].tsx` maps slugs to MDX files
- Supports syntax highlighting via `react-syntax-highlighter` and `rehype-highlight`

### Contact Form

- Form built with **Formik** and validated with **Yup**
- API route at `pages/api/send-email.ts` uses **Nodemailer**
- Rate limiting via `express-rate-limit` and `express-slow-down`
- Form state managed in Redux

### SEO & Meta

- **next-seo** for meta tags
- Custom OG image generation using Playwright + Chromium
- `next-sitemap` generates sitemap on postbuild

### Error Tracking

**Sentry** is configured for error monitoring:

- `sentry.client.config.ts` - Client-side errors
- `sentry.server.config.ts` - Server-side errors
- `sentry.edge.config.ts` - Edge runtime errors
- Source maps are hidden in production (`hideSourceMaps: true`)

## Configuration Files

- `next.config.js` - Next.js config with Sentry integration, redirects, and experimental PPR
- `tsconfig.json` - TypeScript configuration (target: es2015, strict mode)
- `.eslintrc.json` - ESLint with TypeScript, Next.js, jsx-a11y, and React hooks plugins
- `tailwind.config.js` - Tailwind CSS configuration
- `next-sitemap.config.js` - Sitemap generation config

## Key Implementation Details

### Theme System

The theme toggle works through:
1. User clicks theme switch → dispatches Redux action
2. Theme state updates in Redux store
3. `useTheme()` hook re-renders with new theme
4. `makeMainTheme()` creates new styled-components theme object
5. Theme persists to localStorage for next visit

### OG Image Generation

Dynamic OG images are generated at `pages/og-image.tsx` using:
- Playwright with Chromium to screenshot HTML
- Query params define image content (title, tags, etc.)
- Images cached by Vercel CDN

### Blog Post Rendering

1. `getStaticPaths()` reads all MDX files from `constants/blogs/`
2. `getStaticProps()` parses frontmatter and content for the specific post
3. `BlogArticle` component renders MDX with custom components
4. Markdown rendered via `react-markdown` with rehype plugins

## Environment Variables

See `.env.example` for required environment variables. The `.env` file is gitignored.

## Node Version

This project requires **Node 22** (specified in `package.json` engines).

## Deployment

Deployed on **Vercel** with analytics integration via `@vercel/analytics`.
