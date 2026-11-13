# Personal Website

This is my personal website, a place for my writing and thoughts to live.

![Homepage Example](./assets/homepage.png)

## Table of Contents

- [Getting Started](#getting-started)
- [Project Management](#project-management)
- [Technology Stack](#technology-stack)
- [Acknowledgements](#acknowledgements)

## Getting Started

First, [install bun](https://bun.com).

Next, clone down this repository and run the following command to install dependencies:

```bash
make install
```

After that, you should be able to go ahead and start up the dev environment server by running:

```bash
make dev
```

Set up a `.env` file modeled after the `.env.example` in the root of this repository. Redis variables are required for writing views; Sentry, Spotify, GitHub, and WebMCP variables are optional.

### WebMCP

This site registers a [WebMCP](https://developer.chrome.com/docs/ai/webmcp) server for your agent to use. It primarily surfaces the ability to read the profile, writing, bookmarks, books, and music, but your agent can also use it to navigate the site.

If you want to try this, you'll need to enable `chrome://flags/#enable-webmcp-testing` in your Chrome instance and then inspect the tools in the DevTools WebMCP panel.

## Project Management

You can find work for this repository in this [Trello board](https://trello.com/b/48bwZhhe/nathans-personal-website).

## Technology Stack

- [Focus Trap React](https://github.com/focus-trap/focus-trap-react)
- [NextJS](https://nextjs.org)
- [NextJS MDX](https://www.npmjs.com/package/@next/mdx)
- [Redux](https://redux.js.org)
- [Redis](https://redis.io)
- [Sentry](https://sentry.io/welcome)
- [StyleX](https://stylexjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vercel](https://vercel.com)
- [Vercel Analytics](https://vercel.com/docs/analytics)

## Acknowledgements

- Thanks to my parents for always supporting me. I couldn't have done it without you.
