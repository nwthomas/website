.PHONY: install i dev lint postbuild start export format

build:
	bun run build

dev:
	bun run dev

export:
	@echo "Static export is not used with TanStack Start by default"

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
