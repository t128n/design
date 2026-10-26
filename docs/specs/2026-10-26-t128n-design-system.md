# t128n Design System — Requirements

**Status:** Approved for build (AI orchestrator).
**Format:** [DESIGN.md spec](https://raw.githubusercontent.com/google-labs-code/design.md/refs/heads/main/docs/spec.md), version `alpha`.

## 1. Source of truth

`DESIGN.md` at the repository root is the single normative source for tokens and design guidance. It must contain:

- YAML front matter with exactly these top-level keys: `version`, `name`, `description`, `colors`, `typography`, `spacing`, `rounded`, `components`.
- Markdown sections in the canonical order: `Overview`, `Colors`, `Typography`, `Layout`, `Elevation & Depth`, `Shapes`, `Components`, `Do's and Don'ts`. `Iconography` is an additional section between `Shapes` and `Components`.
- No second YAML token block. `elevation`, `icons`, and `motion` are prose or tables, because they are not schema keys and would be silently ignored by exporters.
- A one-page Application Profile requirement, backed by `app-profile.template.md`.

The `version: alpha` value is the DESIGN.md format version. The design system's own version lives in `package.json`.

## 2. Token conformance

- `designmd lint DESIGN.md` reports `errors: 0` and `warnings: 0`. The one `token-summary` info finding is allowed.
- Every `{path.to.token}` reference in the prose resolves to a token in the merged YAML tree.
- Every `dark-*` color has a base counterpart with the same suffix, and every base color has a `dark-*` counterpart. There are 28 pairs.
- No text token is below `10px`. Body and cell data are `12px`.
- All component `backgroundColor`/`textColor` pairs meet WCAG AA `4.5:1`.
- Control boundaries use `border-control` and meet `3:1`. `border` and `border-strong` are non-interactive structure.

## 3. Light and dark palette

### Light palette

| Token | Value | Role |
| :--- | :--- | :--- |
| `primary` | `#2E63CC` | Accent, links, focus, primary buttons |
| `secondary` | `#6C707E` | Monochrome metadata and secondary ink |
| `tertiary` | `#2051B5` | Primary hover and active accent |
| `neutral` | `#EBECF0` | Inactive controls, wells, neutral badge background |
| `surface` | `#FFFFFF` | Base canvas |
| `surface-tinted` | `#F7F8FA` | Alternating rows, fieldsets, secondary panels |
| `surface-header` | `#DFE1E5` | Table and toolbar headers |
| `on-surface` | `#1E1F22` | Primary ink |
| `on-surface-muted` | `#5F6473` | Labels, timestamps, captions, metadata |
| `on-primary` | `#FFFFFF` | Ink on filled accent or destructive surfaces |
| `border` | `#D3D5DB` | Table and section rules |
| `border-strong` | `#C9CCD6` | Section header rules and overlay edges |
| `border-control` | `#8A8F9C` | Interactive control boundaries, `3:1` |
| `state-neutral-fg` | `#4A5568` | Neutral state text |
| `state-neutral-bg` | `#EBECF0` | Neutral state fill |
| `state-info-fg` | `#1D4ED8` | Info state text |
| `state-info-bg` | `#DBEAFE` | Info state fill |
| `state-progress-fg` | `#0C5460` | Progress state text |
| `state-progress-bg` | `#D1ECF1` | Progress state fill |
| `state-success-fg` | `#1F6B35` | Success state text |
| `state-success-bg` | `#DCFCE7` | Success state fill |
| `state-warning-fg` | `#854D0E` | Warning state text |
| `state-warning-bg` | `#FEF3C7` | Warning state fill |
| `state-danger-fg` | `#B91C1C` | Danger state text |
| `state-danger-bg` | `#FEE2E2` | Danger state fill |
| `state-disabled-fg` | `#565B66` | Disabled state text |
| `state-disabled-bg` | `#E5E7EB` | Disabled state fill |
| `error` | `#C62839` | Error banner fill |

### Dark palette

Every base token above has a `dark-` counterpart:

| Base | Dark value | Base | Dark value |
| :--- | :--- | :--- | :--- |
| `primary` | `#548AF7` | `secondary` | `#A7ABB5` |
| `tertiary` | `#7EA6FF` | `neutral` | `#2B2D30` |
| `surface` | `#1E1F22` | `surface-tinted` | `#25272B` |
| `surface-header` | `#2B2D30` | `on-surface` | `#BCBEC4` |
| `on-surface-muted` | `#92979F` | `on-primary` | `#101114` |
| `border` | `#393B40` | `border-strong` | `#4A4D53` |
| `border-control` | `#6B707B` | `error` | `#F75464` |
| `state-neutral-fg` | `#C9CCD6` | `state-neutral-bg` | `#2F3136` |
| `state-info-fg` | `#8AB4F8` | `state-info-bg` | `#1E3A5F` |
| `state-progress-fg` | `#7FD1DE` | `state-progress-bg` | `#143A42` |
| `state-success-fg` | `#86D9A5` | `state-success-bg` | `#153B25` |
| `state-warning-fg` | `#F2C879` | `state-warning-bg` | `#3D2E12` |
| `state-danger-fg` | `#F59A9A` | `state-danger-bg` | `#4A1D1D` |
| `state-disabled-fg` | `#9DA1A9` | `state-disabled-bg` | `#2B2D30` |

The dark tokens are named `dark-` plus the base token name. The generated CSS maps each pair to the base `--color-*` variable under `[data-theme="dark"]`, and under `prefers-color-scheme: dark` when no explicit `data-theme` is set.

## 4. Typography

| Token | Size | Weight | Line height | Family | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `headline-lg` | `18px` | `700` | `1.2` | system sans | Page title |
| `headline-md` | `14px` | `700` | `1.25` | system sans | Section header |
| `body-lg` | `12px` | `400` | `1.4` | system sans | Prose and comments |
| `body-md` | `12px` | `400` | `1.3` | system sans | Default body and cells |
| `body-sm` | `11px` | `400` | `1.25` | system sans | Dense secondary cells |
| `label-md` | `12px` | `700` | `1.25` | system sans | Field labels |
| `label-sm` | `10px` | `600` | `1.2` | system sans | Table headers, badges |
| `code-md` | `12px` | `400` | `1.3` | monospace | IDs, hashes, logs |
| `numeric-md` | `12px` | `400` | `1.3` | system sans | Right-aligned numbers; `fontFeature: "'tnum' 1"` |

System sans stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`.
Monospace stack: `Consolas, Menlo, Monaco, 'Courier New', monospace`.

## 5. Layout and shapes

Spacing: `xxs: 2px`, `xs: 4px`, `sm: 6px`, `md: 8px`, `lg: 12px`, `xl: 16px`, `2xl: 24px`, `3xl: 32px`.
Rounded: `none: 0px`, `sm: 2px`, `md: 3px`.
No radius above `3px`, no pill shapes, no shadows on records or panels, and no card-grid replacement for record tables at narrow widths.

## 6. Components

The front matter must define all 68 components below. Light components use the base name; dark components add `-dark`.

**Buttons** (typography `label-md`, rounded `md`, padding `4px`, height `24px`):

- `button-primary`: bg `primary`, text `on-primary`.
- `button-primary-hover`: bg `tertiary`, text `on-primary`.
- `button-primary-disabled`: bg `state-disabled-bg`, text `state-disabled-fg`.
- `button-secondary`: bg `surface-tinted`, text `on-surface`, typography `body-md`.
- `button-secondary-hover`: bg `neutral`, text `on-surface`.
- `button-secondary-disabled`: bg `state-disabled-bg`, text `state-disabled-fg`, typography `body-md`.
- `button-destructive`: bg `state-danger-bg`, text `state-danger-fg`.
- `button-destructive-hover`: bg `state-danger-fg`, text `on-primary`.
- `button-primary-dark`: bg `dark-primary`, text `dark-on-primary`.
- `button-primary-dark-hover`: bg `dark-tertiary`, text `dark-on-primary`.
- `button-primary-dark-disabled`: bg `dark-state-disabled-bg`, text `dark-state-disabled-fg`.
- `button-secondary-dark`: bg `dark-surface-tinted`, text `dark-on-surface`, typography `body-md`.
- `button-secondary-dark-hover`: bg `dark-neutral`, text `dark-on-surface`.
- `button-secondary-dark-disabled`: bg `dark-state-disabled-bg`, text `dark-state-disabled-fg`, typography `body-md`.
- `button-destructive-dark`: bg `dark-state-danger-bg`, text `dark-state-danger-fg`.
- `button-destructive-dark-hover`: bg `dark-state-danger-fg`, text `dark-on-primary`.

**Inputs** (typography `body-md`, rounded `sm`, padding `4px`, height `24px`):

- `input-field`: bg `surface`, text `on-surface`.
- `input-field-disabled`: bg `state-disabled-bg`, text `state-disabled-fg`.
- `input-field-dark`: bg `dark-surface`, text `dark-on-surface`.
- `input-field-dark-disabled`: bg `dark-state-disabled-bg`, text `dark-state-disabled-fg`.

**Tables** (rounded `none`, padding `6px`):

- `table-cell`: bg `surface`, text `on-surface`, typography `body-md`.
- `table-cell-alt`: bg `surface-tinted`, text `on-surface`, typography `body-md`.
- `table-cell-dark`: bg `dark-surface`, text `dark-on-surface`, typography `body-md`.
- `table-cell-alt-dark`: bg `dark-surface-tinted`, text `dark-on-surface`, typography `body-md`.
- `table-numeric`: bg `surface`, text `on-surface`, typography `numeric-md`.
- `table-numeric-dark`: bg `dark-surface`, text `dark-on-surface`, typography `numeric-md`.
- `table-header`: bg `surface-header`, text `on-surface`, typography `label-sm`, padding `4px`, height `24px`.
- `table-header-dark`: bg `dark-surface-header`, text `dark-on-surface`, typography `label-sm`, padding `4px`, height `24px`.

**Status badges** (typography `label-sm`, rounded `sm`, padding `2px`):

- Light: `status-badge` (neutral), `status-badge-info`, `status-badge-progress`, `status-badge-success`, `status-badge-warning`, `status-badge-danger`, `status-badge-disabled`.
- Dark: `status-badge-dark` (neutral), `status-badge-info-dark`, `status-badge-progress-dark`, `status-badge-success-dark`, `status-badge-warning-dark`, `status-badge-danger-dark`, `status-badge-disabled-dark`.
- Each uses the matching `state-<role>-bg` / `state-<role>-fg` or `dark-state-<role>-bg` / `dark-state-<role>-fg` pair.

**Everything else**:

- `link`: bg `surface`, text `primary`, typography `body-md`; `link-dark`: bg `dark-surface`, text `dark-primary`, typography `body-md`.
- `metadata`: bg `surface-tinted`, text `secondary`, typography `body-sm`; `metadata-dark`: bg `dark-surface-tinted`, text `dark-secondary`, typography `body-sm`.
- `toolbar`: bg `surface-header`, text `on-surface`, typography `label-md`, padding `4px`, height `28px`; `toolbar-dark`: same with `dark-surface-header` / `dark-on-surface`.
- `rule`: bg `border`, height `1px`; `rule-strong`: bg `border-strong`, height `1px`; `control-rule`: bg `border-control`, height `1px`.
- `rule-dark`: bg `dark-border`, height `1px`; `rule-strong-dark`: bg `dark-border-strong`, height `1px`; `control-rule-dark`: bg `dark-border-control`, height `1px`.
- `dialog`: bg `surface`, text `on-surface`, typography `body-md`, rounded `none`, padding `12px`; `dialog-dark`: same with `dark-surface` / `dark-on-surface`.
- `empty-state`: bg `surface-tinted`, text `on-surface-muted`, typography `body-md`, padding `12px`; `empty-state-dark`: same with `dark-surface-tinted` / `dark-on-surface-muted`.
- `key-value-label`: bg `surface`, text `on-surface-muted`, typography `label-md`; `key-value-label-dark`: same with `dark-surface` / `dark-on-surface-muted`.
- `icon-button`: bg `surface`, text `on-surface-muted`, rounded `sm`, size `24px`; `icon-button-dark`: same with `dark-surface` / `dark-on-surface-muted`.
- `code-block`: bg `surface-tinted`, text `on-surface`, typography `code-md`, rounded `sm`, padding `8px`; `code-block-dark`: same with `dark-surface-tinted` / `dark-on-surface`.
- `tooltip`: bg `on-surface`, text `surface`, typography `body-sm`, rounded `sm`, padding `4px`; `tooltip-dark`: bg `dark-on-surface`, text `dark-surface`, typography `body-sm`, rounded `sm`, padding `4px`.
- `error-banner`: bg `error`, text `on-primary`, typography `body-md`, rounded `sm`, padding `8px`; `error-banner-dark`: bg `dark-error`, text `dark-on-primary`, typography `body-md`, rounded `sm`, padding `8px`.

## 7. Application Profile

`app-profile.template.md` must contain these sections and fields:

- Header table: application, owner, profile version, review date, design-system version, stack.
- Records: record, stable identifier, primary view, key fields, lifecycle owner.
- Status vocabulary: local status, semantic role (one of the seven), meaning, allowed next states, actor, audit entry.
- Transitions: from, action, to, actor, audit entry.
- Mobile table strategy: view, strategy 1/2/3, sticky identifier column, notes.
- Exceptions: rule, reason, scope, owner, review date.
- Conformance checklist: `DESIGN.md` adopted, all statuses mapped, all mutations audited, keyboard and 200% zoom verified, exceptions documented.

## 8. Build artifact

- `scripts/build.mjs` reads `DESIGN.md` front matter with `yaml`, validates the token groups, and writes `dist/tokens.css`.
- `readDesignTokens(markdown: string) -> DesignTokens` extracts and parses the front matter.
- `renderTokensCss(tokens: DesignTokens) -> string` returns deterministic CSS.
- CSS naming: `--color-<name>`, `--font-<type>`, `--text-<type>-size`, `--text-<type>-weight`, `--text-<type>-line-height`, `--text-<type>-letter-spacing` (when present), `--text-<type>-font-feature` (when present), `--space-<name>`, `--radius-<name>`.
- `:root` contains light values and `color-scheme: light`. It must not expose raw `--color-dark-*` variables.
- `[data-theme="dark"]` redefines every base `--color-*` with its dark counterpart and sets `color-scheme: dark`.
- `@media (prefers-color-scheme: dark)` applies the same overrides to `:root:not([data-theme])`.
- Build fails on a missing required group, a broken color pair, or a duplicate variable name.
- `dist/tokens.css` is generated, committed, and never hand-edited.

## 9. Specimen

`specimen.html` is a static visual acceptance page that links `dist/tokens.css` and demonstrates:

- page header, toolbar, primary/secondary/destructive/disabled buttons;
- a key-value grid, a data table with tinted header, alternating rows, a numeric column, status badges, and `---` for missing values;
- a fieldset with visible labels, input, select, checkbox, radio, and focus treatment;
- empty state, error banner, code block, tooltip, and a native dialog;
- a light/dark theme toggle using `data-theme`.

Forbidden in the specimen: gradients, glass effects, shadows on records or panels, border radius above `3px`, pill shapes, card grids, placeholder-only labels, and color-only status.

## 10. Repository operations

- `package.json`: private package, `type: module`, Node `>=20`, scripts `lint`, `build`, `check`, `test`.
- Dev dependencies: `@google/design.md@0.4.0`, `yaml@2.8.1`.
- `npm run lint` runs `designmd lint DESIGN.md`.
- `npm run build` runs lint and then `node scripts/build.mjs`.
- `npm run check` runs build and fails if `dist/` is dirty (`git diff --exit-code -- dist`).
- `npm test` runs `node --test`.
- `.github/workflows/design.yml` runs on push and pull request: checkout, Node 24, `npm ci`, `npm test`, `npm run check`.
- `README.md` documents purpose, layout, quick start, consumption, dark mode, versioning, enforcement, and contributing.
- `CHANGELOG.md` starts at `0.1.0`.
- No component library, Tailwind preset, or npm publish in this scope.

## 11. Acceptance

- `npm ci && npm test` passes.
- `npm run check` passes and leaves `dist/` clean.
- `designmd lint DESIGN.md` reports `0 errors`, `0 warnings`, and one token-summary info.
- `dist/tokens.css` contains light values in `:root`, dark overrides in both dark selectors, and typography, spacing, and radius variables.
- `specimen.html` renders in light and dark with no console errors.
- The Application Profile template names all seven roles and all required fields.
