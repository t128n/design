# Changelog

All notable changes to the t128n design system are recorded here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-10-26

### Added

- `DESIGN.md` as the single source of truth: 28 light/dark color pairs, nine
  typography scales, eight spacing tokens, three radii, and 68 component
  tokens.
- `scripts/build.mjs` and the generated, committed `dist/tokens.css` with
  `:root` light values and dark overrides for both `[data-theme="dark"]` and
  the `prefers-color-scheme` fallback.
- `specimen.html` as the visual acceptance page in light and dark.
- README covering purpose, layout, quick start, token usage, dark mode,
  adoption, versioning, enforcement, and contributing.
- Bun 1.4 toolchain; `Bun.YAML` parses the front matter and `bun test` runs
  the suites.
- GitHub Actions workflow gating push and pull request with
  `bun install --frozen-lockfile`, `bun test`, and `bun run check`.
