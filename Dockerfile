# syntax=docker/dockerfile:1

# SPDX-FileCopyrightText: 2026 t128n Torben Haack
#
# SPDX-License-Identifier: MPL-2.0
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

# Storybook preview image.
#
# Coolify builds this image and serves the static Storybook build behind nginx.
# The repository is Bun-native: it ships a `bun.lock` and declares Bun as the
# package manager in `package.json`.
#
# Build:  docker build -t design-storybook .
# Run:    docker run --rm -p 8080:80 design-storybook

# ---- build ----------------------------------------------------------------
FROM oven/bun:1.4.3 AS build
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
