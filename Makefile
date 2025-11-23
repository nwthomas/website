.PHONY: install i dev lint postbuild start export format

build:
	bun run install-chromium && next build

dev:
	bun run dev

export:
	next export

format:
	bun run format

install i:
	bun install

lint:
	bun run lint

postbuild:
	next-sitemap

start:
	next start
