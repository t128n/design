# Changelog

All notable changes to the t128n design system are recorded here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-10-26

### Added

- `DESIGN.md` as the single source of truth: 30 light/dark color pairs, nine
  typography scales, eight spacing tokens, three radii, and 72 component
  tokens.
- `scripts/build.mjs` and the generated, committed `dist/tokens.css` with
  `:root` light values and dark overrides for both `[data-theme="dark"]` and
  the `prefers-color-scheme` fallback.
- `preview/` as the visual acceptance app: Vite, Svelte 5, and bits-ui
  primitives over the generated tokens, in light and dark.
- Octicons from `@primer/octicons` for preview actions.
- Standard CSS grid layouts in `layouts.css` for page frames, app shells,
  registers, split views, record details, forms, stacks, clusters, and
  one/two/three-column grids.
- Dark surfaces and text aligned to the JetBrains New UI palette, with
  AA-safe muted text.
- Accessibility pass: 14px body text, 12px labels, 28px controls, 32px
  table headers, brighter dark text, `3:1` table rules, and bordered status
  badges.
- README covering purpose, layout, quick start, token usage, dark mode,
  adoption, versioning, enforcement, and contributing.
- Bun 1.4 toolchain; `Bun.YAML` parses the front matter and `bun test` runs
  the suites.
- GitHub Actions workflow gating push and pull request with
  `bun install --frozen-lockfile`, `bun test`, and `bun run check`.
- GitHub Pages workflow deploying the built preview to
  `https://t128n.github.io/design/`.
