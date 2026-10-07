.PHONY: install i dev lint postbuild start export format db-up db-down db-reset db-psql

build:
	bun run build

db-up:
	docker compose up -d --wait db

db-down:
	docker compose down

db-reset:
	docker compose down -v
	$(MAKE) db-up

db-psql:
	docker compose exec db psql -U website -d website

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
	bun run postbuild

start:
	bun run start

uuid:
	./scripts/get-uuid.sh
