FROM oven/bun:1.3-alpine AS base
RUN apk add --no-cache ffmpeg
WORKDIR /app

FROM base AS builder
COPY package.json tsconfig.json ./
RUN bun install
COPY src/ src/
RUN bun run build

FROM base AS runner
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["bun", "dist/worker/src/index.js"]
