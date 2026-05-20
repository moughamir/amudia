.PHONY: lint breaking generate build all clean mod-update

lint:
	docker compose -f tools/docker-compose.yml run --rm buf lint

breaking:
	docker compose -f tools/docker-compose.yml run --rm buf breaking --against '.git#branch=main'

generate:
	docker compose -f tools/docker-compose.yml run --rm buf generate

build: generate
	bun run tsc

mod-update:
	docker compose -f tools/docker-compose.yml run --rm buf mod update

all: lint build

clean:
	rm -rf gen/* dist
