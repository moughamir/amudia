# Amudia — AGENTS.md

## Quick start

```sh
bun install          # install all workspace deps
bun run generate:types  # generate proto → Go/Java/C#/Rust/TS/OpenAPI (requires Docker)
bun run typecheck    # typechecks all packages (builds contracts first)
```

## Repo

- **GitHub**: `github.com/moughamir/amudia`
- **Container registry**: `ghcr.io/moughamir/amudia-{api,web,worker}`
- **License**: MIT
- **Author**: Moughamir

## Monorepo structure

| Package | Entry | Dev | Build | Notes |
|---|---|---|---|---|
| `@amudia/contracts` | `src/index.ts` re-exports `gen/ts/` | — | `bun tsc` | `"type": "module"` |
| `@amudia/shared` | no barrel — imported via relative paths | — | (none) | `core/` has DDD primitives (Entity, ValueObject, UseCase, etc.) |
| `@amudia/api` | `src/index.ts` | `bun --watch src/index.ts` | `tsc` | Express, commonjs |
| `@amudia/web` | `src/app/layout.tsx` | `next dev` | `next build` | Next.js standalone output |
| `@amudia/worker` | `src/index.ts` | `bun --watch src/index.ts` | `tsc` | BullMQ consumer, commonjs |

## Hard-won lessons

### Proto codegen (contracts/)
- **Requires Docker** — buf runs inside a container from `contracts/tools/docker-compose.yml`
- Rust plugin is `buf.build/community/neoeinstein-prost` (official one doesn't exist on BSR)
- gRPC-web requires `opt: mode=grpcwebtext`
- Generated files go to `contracts/gen/` (gitignored), then built to `contracts/dist/`
- Command: `bun run generate:types` (alias for `turbo run generate --filter=@amudia/contracts`)

### Typecheck
- `turbo.json` declares `typecheck` depends on `^build` — so `@amudia/contracts` must build first
- `@amudia/shared` has no build/typecheck script; turbo skips it
- Pre-commit hook runs `bun run typecheck` (the whole monorepo)

### Imports
- Internal packages **use relative paths** across workspace boundaries (e.g. `../../shared/infrastructure/...`)
- tsconfig `paths` aliases exist (`@amudia/contracts`, `@amudia/shared`) but are **not used** in source code
- `@amudia/shared` has **no barrel file** (`index.ts`) at package root

### Docker infra
- Nginx gateway routes: `/` → web:3000, `/api` → api:8080, `/media` → minio:9000
- DB schema: `postgres/init.sql` auto-runs on first container start
- `storage/data/` is gitignored (runtime media files)

## Commands

| Command | What |
|---|---|
| `bun run dev` | Run all packages in dev mode (turbo) |
| `bun run build` | Build all packages |
| `bun run generate:types` | Regenerate proto types (Docker required) |
| `bun run build:types` | Rebuild contracts (no proto gen) |
| `bun run typecheck` | Typecheck all packages |
| `bun run clean` | Remove `dist/`, `gen/`, `.next/` |
| `bun run changelog` | `standard-version --dry-run` |
| `bun run release` | `standard-version` (conventional commits → semver) |

## CI

- **ci.yml**: `bun install` → `bun run typecheck` (bun 1.3.14)
- **contracts.yml**: `buf lint` → `buf breaking` → `buf generate` → `tsc --noEmit` (Docker not needed — `bufbuild/buf-setup-action` CLI)

## Docker images

- **api**, **web**, **worker** each have a `Dockerfile` with OCI labels (source, description, licenses)
- Images are built and pushed to `ghcr.io/moughamir/amudia-{service}`
- Runner images use `oven/bun:1.3-alpine`
- `contracts/` and `shared/` are not deployed standalone — they are compiled into api/web/worker

## Conventions

- **Commits**: conventional commits enforced by commitlint + husky
- **Auto-commit**: always stage and commit changes after each task unless told otherwise
- **No tests** — no test framework or scripts exist anywhere
- **Package manager**: bun 1.3.14 (pinned in CI and root package.json)
