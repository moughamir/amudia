FROM oven/bun:1.3-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json ./
RUN bun install

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json next.config.js ./
COPY src/ src/
COPY public/ public/
RUN bun run build

FROM oven/bun:1.3-alpine AS runner
LABEL org.opencontainers.image.source="https://github.com/moughamir/amudia"
LABEL org.opencontainers.image.description="Amudia Web — Next.js app"
LABEL org.opencontainers.image.licenses="MIT"
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["bun", "server.js"]
