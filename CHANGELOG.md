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
- `app-profile.template.md` for recording adoption: records, status
  vocabulary, transitions, mobile table strategy, exceptions, and a
  conformance checklist.
- `specimen.html` as the visual acceptance page in light and dark.
- README covering purpose, layout, quick start, token usage, dark mode,
  adoption, versioning, enforcement, and contributing.
- GitHub Actions workflow gating push and pull request with `npm ci`,
  `npm test`, and `npm run check`.

### Notes

- Plain CSS only. No component library, no Tailwind preset, and no npm
  publish; apps pin a commit and vendor `dist/tokens.css`.
