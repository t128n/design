# Theming

The framework ships one validated light theme. All tokens live in a single
`:root` block in `packages/ui/src/styles/tokens.css`; there is no second copy on
`ThemeScope`.

## ThemeScope

`ThemeScope` is a thin wrapper that sets `data-theme` and applies named custom
properties inline. Because CSS custom properties inherit, nested scopes inherit
the outer values and override only the tokens they name.

```svelte
<script lang="ts">
  import { Button, Card, Stack, Text, ThemeScope } from '@t128n/ui';
</script>

<ThemeScope tokens={{ '--color-accent': '#6929C4' }}>
  <Stack gap="lg">
    <Text variant="heading" as="h2">Purple workspace accent</Text>
    <Button>Primary action</Button>

    <ThemeScope
      tokens={{
        '--color-surface': '#F6F2FF',
        '--color-accent': '#0043CE'
      }}
    >
      <Card title="Nested scope">
        <Text variant="body" tone="secondary">
          The inner scope overrides the surface and accent but keeps the outer
          typography, spacing, and layout tokens.
        </Text>
      </Card>
    </ThemeScope>
  </Stack>
</ThemeScope>
```

API:

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `theme` | `'light'` | `'light'` | Rendered as `data-theme`. Dark mode is not implemented. |
| `tokens` | `Record<string, string>` | `{}` | Keys must start with `--`; other keys throw during render. |
| `class` | `string` | `''` | Merged onto the wrapper element. |
| `children` | `Snippet` | — | Rendered inside the scope. |

Invalid keys are rejected rather than silently ignored, because a plain `color`
or `background` override would bypass the semantic token contract:

```svelte
<!-- Throws: tokens must be custom properties starting with "--" -->
<ThemeScope tokens={{ color: 'red' }}>...</ThemeScope>
```

## Public token contract

These token families are public API. Name them in application CSS and in
`ThemeScope` overrides.

| Family | Tokens | Purpose |
| --- | --- | --- |
| Color | `--color-*` | Semantic surfaces, text, status, accent, focus, disabled, scrim |
| Typography | `--font-family-*`, `--font-size-*`, `--font-weight-*`, `--line-height-*` | Type scale and families |
| Spacing | `--space-xs` … `--space-3xl` | 4px-based rhythm |
| Layout | `--layout-content-width`, `--layout-reading-width`, `--layout-form-width`, `--layout-sidebar-width`, `--layout-aside-width`, `--layout-grid-min-*`, `--list-marker-indent`, `--panel-max-height` | Measures and structural geometry |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg` | 2px, 4px, and 6px corners |
| Control geometry | `--control-height-sm`, `--control-height`, `--control-height-lg`, `--touch-target`, `--icon-size-*`, `--avatar-size-*`, `--thumb-size`, `--checkbox-size`, `--checkbox-indicator-size`, `--radio-size`, `--radio-indicator-size`, `--switch-track-width`, `--switch-track-height`, `--switch-thumb-size`, `--track-size`, `--scrollbar-size`, `--calendar-cell-size` | Reusable control and icon sizes |
| Breakpoints | `--breakpoint-sm`, `--breakpoint-md`, `--breakpoint-lg` | Documentation source of truth for 640px, 800px, and 1024px |

Overriding a public token is supported. Examples: `--color-accent` for a
product accent, `--color-workspace` for a tinted embedded workspace, or
`--layout-content-width` for a wider application frame.

## Internal tokens

These are implementation details. They may change without a migration note and
should not be overridden by applications or stories.

| Token | Why internal |
| --- | --- |
| `--border-width`, `--border-width-emphasis`, `--border-width-accent` | Structural stroke scale; components choose the correct weight |
| `--radius-pill` | Reserved for switch tracks only (DESIGN.md R32) |
| `--shadow-overlay` | One overlay elevation for floating layers |
| `--transition-duration` | Motion timing owned by the framework |

## Breakpoints and media queries

CSS media queries cannot consume custom properties. Components therefore use
literal numbers with a comment naming the token:

```css
/* --breakpoint-md: 800px; media queries cannot consume the custom property. */
@media (max-width: 800px) {
  .inline.stack-md {
    flex-direction: column;
  }
}
```

`src/lib/layout.ts` mirrors the same values in TypeScript:

```ts
export const breakpoints = { sm: 640, md: 800, lg: 1024 } as const;
```

Keep tokens, the TypeScript constant, and component media queries in sync. The
layout foundation tests fail if a component introduces an unnamed breakpoint.

## Dark mode

Dark mode is explicitly out of scope. It is a future theme that needs its own
validated contrast pairings, status surfaces, and overlay colors. Do not invent
dark tokens or `ThemeScope theme="dark"` values before that work lands.
