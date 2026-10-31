# syntax=docker/dockerfile:1

# Storybook preview image.
#
# Coolify builds this image and serves the static Storybook build behind nginx.
# Bun is used explicitly because the repository ships a `bun.lock` (there is no
# pnpm lockfile), even though `package.json` still declares pnpm as the
# package manager.
#
# Build:  docker build -t design-storybook .
# Run:    docker run --rm -p 8080:80 design-storybook

# ---- build ----------------------------------------------------------------
FROM oven/bun:1 AS build
WORKDIR /app

# Skip the anonymous usage telemetry ping during CI builds.
ENV STORYBOOK_DISABLE_TELEMETRY=1

# The Docker context is trimmed by .dockerignore, so this stays small.
COPY . .

# `--frozen-lockfile` keeps the image reproducible; the lockfile is committed.
RUN bun install --frozen-lockfile \
 && bun run build-storybook

# ---- runtime --------------------------------------------------------------
FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/healthz || exit 1
