FROM oven/bun:1.3-alpine AS base
WORKDIR /app

FROM base AS builder
COPY package.json tsconfig.json ./
RUN bun install
COPY src/ src/
RUN bun run build

FROM base AS runner
LABEL org.opencontainers.image.source="https://github.com/moughamir/amudia"
LABEL org.opencontainers.image.description="Amudia API — Express server"
LABEL org.opencontainers.image.licenses="MIT"
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["bun", "dist/api/src/index.js"]
