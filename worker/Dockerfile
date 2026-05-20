FROM oven/bun:1.3-alpine AS base
RUN apk add --no-cache ffmpeg
WORKDIR /app

FROM base AS builder
COPY package.json tsconfig.json ./
RUN bun install
COPY src/ src/
RUN bun run build

FROM base AS runner
LABEL org.opencontainers.image.source="https://github.com/moughamir/amudia"
LABEL org.opencontainers.image.description="Amudia Worker — BullMQ consumer"
LABEL org.opencontainers.image.licenses="MIT"
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["bun", "dist/worker/src/index.js"]
