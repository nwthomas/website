.PHONY: install i dev lint postbuild start export favicons format test

build:
	bun run build

dev:
	bun run dev

export:
	next export

favicons:
	bun run favicons

format:
	bun run format

install i:
	bun install

lint:
	bun run lint

postbuild:
	bun run postbuild

start:
	bun run start

uuid:
	./scripts/get-uuid.sh
