# AGENTS.md

This file provides guidance for coding agents when working with code in this repository.

## Package Manager

This project uses **bun** as the package manager. The repository enforces this via a `preinstall` script, so do not use npm, yarn, or pnpm.

## Common Commands

### Development

- `make dev` or `bun run dev` — Start the TanStack Start (Vite) development server (port 3000)
- `make build` or `bun run build` — Production build (Vite + Nitro server output)
- `bun run postbuild` — Post-build hook (placeholder for sitemap or other tasks)

### Code Quality

- `make lint` or `bun run lint` — Run ESLint on `src`, config, and `scripts`
- `make format` or `bun run format` — Format code with Prettier

### Installation

- `make install` or `make i` or `bun install` — Install dependencies

### Production

- `make start` or `bun run start` — Run the Nitro Node server locally (`node .output/server/index.mjs`). This matches the **non-Vercel** Nitro preset (`VERCEL` unset during `bun run build`).

### Deploying to Vercel

- The repo includes **`vercel.json`** with `installCommand: bun install` and `buildCommand: bun run build`, plus **`packageManager`** in `package.json`, so installs use **Bun** (required by `preinstall` / lockfile) and Vercel does not fall back to `npm install` + Next.js defaults.
- During build, **`VERCEL`** is set on Vercel; **`vite.config.ts`** passes **`nitro({ preset: 'vercel' })`** so Nitro emits **`.vercel/output`** for Functions.
- **Nitro must be ≥ `3.0.260311-beta`**: Nitro **3.0.0 stable** shipped a Vercel Web preset bug where SSR called plain `fetch()` back into the same deployment → **508 `INFINITE_LOOP_DETECTED`**. Newer Nitros bridge SSR via `fetchViteEnv` / `globalThis.__nitro_vite_envs__` (see [nitrojs/nitro#4011](https://github.com/nitrojs/nitro/pull/4011), community write-up in Roxabi talks PR).

Prerender is explicitly **`disabled`** for Start (`tanstackStart.prerender.enabled: false`) so builds stay compatible with the Vercel serverless preset.

- In Vercel project settings, clear any legacy **Next.js** framework preset if the dashboard still shows it; `vercel.json` sets `"framework": null`.

## Architecture Overview

### TanStack Start + TanStack Router

The app uses **TanStack Start** with file-based routes under `src/routes/`. The route tree is generated as `src/routeTree.gen.ts` (do not edit by hand).

### Key directories

- `src/routes/` — Pages and server HTTP handlers (`server.handlers` on route definitions)
- `src/content/` — MDX blog posts (`*.mdx`)
- `src/posts.json` — Post listing metadata (must stay in sync with MDX files)
- `src/components/` — Shared UI
- `src/store/` — Redux Toolkit (theme + writing overlay)
- `src/writing/` — MDX-specific components (paragraphs, code blocks, images)
- `src/styles/globals.css` — Tailwind v4 entry (`@import "tailwindcss" source("../")`)
- `public/` — Static assets

### Blog / MDX

Posts are MDX files in `src/content/`. They may import `@/writing/image` where needed. Custom MDX element mappings live in `src/mdx-components.ts` and are applied via `MDXProvider` on post routes.

### State Management

Redux Toolkit provides **theme** and **writing** (image overlay) slices. The store is wired in `src/components/Providers.tsx`.

### Theme

An inline script in `src/routes/__root.tsx` runs before hydration to read `localStorage` and set the `dark` class on `<html>`. React stays in sync via the theme slice.

### Path aliases

`@/*` maps to `./src/*` (see `tsconfig.json`).

### Environment variables

Copy `.env.example` to `.env`. Client-visible Sentry DSN uses `VITE_SENTRY_DSN` if you enable browser reporting.

### Styling

Tailwind CSS v4 with `@tailwindcss/vite`. Dark mode uses the `dark` class on `<html>`.

### Monitoring

Sentry: `@sentry/react` (client, initialized from `src/sentry.client.ts` via `Providers`) and `@sentry/node` on the server where applicable. Vercel Analytics / Speed Insights use the React framework-agnostic packages.
