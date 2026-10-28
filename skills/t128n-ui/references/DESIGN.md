---
version: alpha
name: "t128n's personal design system"
description: Dense, flat, record-first web UI for operational tools, with one accent color and full light and dark parity.
colors:
  primary: "#2E63CC"
  accent: "#3574F0"
  secondary: "#6C707E"
  tertiary: "#2051B5"
  neutral: "#EBECF0"
  surface: "#FFFFFF"
  surface-tinted: "#F7F8FA"
  surface-header: "#DFE1E5"
  on-surface: "#1E1F22"
  on-surface-muted: "#5F6473"
  on-primary: "#FFFFFF"
  selection: "#DBEAFE"
  border: "#D3D5DB"
  border-strong: "#C9CCD6"
  border-control: "#8A8F9C"
  state-neutral-fg: "#4A5568"
  state-neutral-bg: "#EBECF0"
  state-info-fg: "#1D4ED8"
  state-info-bg: "#DBEAFE"
  state-progress-fg: "#0C5460"
  state-progress-bg: "#D1ECF1"
  state-success-fg: "#1F6B35"
  state-success-bg: "#DCFCE7"
  state-warning-fg: "#854D0E"
  state-warning-bg: "#FEF3C7"
  state-danger-fg: "#B91C1C"
  state-danger-bg: "#FEE2E2"
  state-disabled-fg: "#4A5568"
  state-disabled-bg: "#E5E7EB"
  error: "#C62839"
  dark-primary: "#548AF7"
  dark-accent: "#3574F0"
  dark-secondary: "#C0C4CC"
  dark-tertiary: "#7EA6FF"
  dark-neutral: "#2B2D30"
  dark-surface: "#1E1F22"
  dark-surface-tinted: "#191A1C"
  dark-surface-header: "#26282D"
  dark-on-surface: "#D4D6DB"
  dark-on-surface-muted: "#B4B8C0"
  dark-on-primary: "#101114"
  dark-selection: "#2E436E"
  dark-border: "#2B2D30"
  dark-border-strong: "#393B40"
  dark-border-control: "#6B707B"
  dark-state-neutral-fg: "#C9CCD6"
  dark-state-neutral-bg: "#2B2D30"
  dark-state-info-fg: "#8AB4F8"
  dark-state-info-bg: "#1E3A5F"
  dark-state-progress-fg: "#7FD1DE"
  dark-state-progress-bg: "#143A42"
  dark-state-success-fg: "#86D9A5"
  dark-state-success-bg: "#153B25"
  dark-state-warning-fg: "#F2C879"
  dark-state-warning-bg: "#3D2E12"
  dark-state-danger-fg: "#F59A9A"
  dark-state-danger-bg: "#4A1D1D"
  dark-state-disabled-fg: "#B4B8C0"
  dark-state-disabled-bg: "#2B2D30"
  dark-error: "#F75464"
typography:
  headline-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: "1.2"
  headline-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 700
    lineHeight: "1.25"
  body-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: "1.4"
  body-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: "1.35"
  body-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: "1.3"
  label-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: "1.25"
  label-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: "1.2"
  code-md:
    fontFamily: "Consolas, Menlo, Monaco, 'Courier New', monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: "1.3"
  numeric-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: "1.3"
    fontFeature: "'tnum' 1"
spacing:
  xxs: 2px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
  3xl: 32px
  touch: 44px
rounded:
  none: 0px
  sm: 2px
  md: 3px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-primary-disabled:
    backgroundColor: "{colors.state-disabled-bg}"
    textColor: "{colors.state-disabled-fg}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-secondary:
    backgroundColor: "{colors.surface-tinted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-secondary-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-secondary-disabled:
    backgroundColor: "{colors.state-disabled-bg}"
    textColor: "{colors.state-disabled-fg}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-destructive:
    backgroundColor: "{colors.state-danger-bg}"
    textColor: "{colors.state-danger-fg}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-destructive-hover:
    backgroundColor: "{colors.state-danger-fg}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-primary-dark:
    backgroundColor: "{colors.dark-primary}"
    textColor: "{colors.dark-on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-primary-dark-hover:
    backgroundColor: "{colors.dark-tertiary}"
    textColor: "{colors.dark-on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-primary-dark-disabled:
    backgroundColor: "{colors.dark-state-disabled-bg}"
    textColor: "{colors.dark-state-disabled-fg}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-secondary-dark:
    backgroundColor: "{colors.dark-surface-tinted}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-secondary-dark-hover:
    backgroundColor: "{colors.dark-neutral}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-secondary-dark-disabled:
    backgroundColor: "{colors.dark-state-disabled-bg}"
    textColor: "{colors.dark-state-disabled-fg}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-destructive-dark:
    backgroundColor: "{colors.dark-state-danger-bg}"
    textColor: "{colors.dark-state-danger-fg}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  button-destructive-dark-hover:
    backgroundColor: "{colors.dark-state-danger-fg}"
    textColor: "{colors.dark-on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 4px
    height: 28px
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 4px
    height: 28px
  input-field-disabled:
    backgroundColor: "{colors.state-disabled-bg}"
    textColor: "{colors.state-disabled-fg}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 4px
    height: 28px
  input-field-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 4px
    height: 28px
  input-field-dark-disabled:
    backgroundColor: "{colors.dark-state-disabled-bg}"
    textColor: "{colors.dark-state-disabled-fg}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 4px
    height: 28px
  table-cell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 6px
  table-cell-alt:
    backgroundColor: "{colors.surface-tinted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 6px
  table-cell-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 6px
  table-cell-alt-dark:
    backgroundColor: "{colors.dark-surface-tinted}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 6px
  table-numeric:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.numeric-md}"
    rounded: "{rounded.none}"
    padding: 6px
  table-numeric-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.numeric-md}"
    rounded: "{rounded.none}"
    padding: 6px
  table-header:
    backgroundColor: "{colors.surface-header}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 6px
    height: 32px
  table-header-dark:
    backgroundColor: "{colors.dark-surface-header}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 6px
    height: 32px
  status-badge:
    backgroundColor: "{colors.state-neutral-bg}"
    textColor: "{colors.state-neutral-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-info:
    backgroundColor: "{colors.state-info-bg}"
    textColor: "{colors.state-info-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-progress:
    backgroundColor: "{colors.state-progress-bg}"
    textColor: "{colors.state-progress-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-success:
    backgroundColor: "{colors.state-success-bg}"
    textColor: "{colors.state-success-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-warning:
    backgroundColor: "{colors.state-warning-bg}"
    textColor: "{colors.state-warning-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-danger:
    backgroundColor: "{colors.state-danger-bg}"
    textColor: "{colors.state-danger-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-disabled:
    backgroundColor: "{colors.state-disabled-bg}"
    textColor: "{colors.state-disabled-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-dark:
    backgroundColor: "{colors.dark-state-neutral-bg}"
    textColor: "{colors.dark-state-neutral-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-info-dark:
    backgroundColor: "{colors.dark-state-info-bg}"
    textColor: "{colors.dark-state-info-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-progress-dark:
    backgroundColor: "{colors.dark-state-progress-bg}"
    textColor: "{colors.dark-state-progress-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-success-dark:
    backgroundColor: "{colors.dark-state-success-bg}"
    textColor: "{colors.dark-state-success-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-warning-dark:
    backgroundColor: "{colors.dark-state-warning-bg}"
    textColor: "{colors.dark-state-warning-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-danger-dark:
    backgroundColor: "{colors.dark-state-danger-bg}"
    textColor: "{colors.dark-state-danger-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  status-badge-disabled-dark:
    backgroundColor: "{colors.dark-state-disabled-bg}"
    textColor: "{colors.dark-state-disabled-fg}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    padding: 2px
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  link-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-primary}"
    typography: "{typography.body-md}"
  metadata:
    backgroundColor: "{colors.surface-tinted}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
  metadata-dark:
    backgroundColor: "{colors.dark-surface-tinted}"
    textColor: "{colors.dark-secondary}"
    typography: "{typography.body-sm}"
  toolbar:
    backgroundColor: "{colors.surface-header}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    padding: 4px
    height: 36px
  toolbar-dark:
    backgroundColor: "{colors.dark-surface-header}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.label-md}"
    padding: 4px
    height: 36px
  rule:
    backgroundColor: "{colors.border}"
    height: 1px
  rule-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
  control-rule:
    backgroundColor: "{colors.border-control}"
    height: 1px
  rule-dark:
    backgroundColor: "{colors.dark-border}"
    height: 1px
  rule-strong-dark:
    backgroundColor: "{colors.dark-border-strong}"
    height: 1px
  control-rule-dark:
    backgroundColor: "{colors.dark-border-control}"
    height: 1px
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 12px
  dialog-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 12px
  empty-state:
    backgroundColor: "{colors.surface-tinted}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.body-md}"
    padding: 12px
  empty-state-dark:
    backgroundColor: "{colors.dark-surface-tinted}"
    textColor: "{colors.dark-on-surface-muted}"
    typography: "{typography.body-md}"
    padding: 12px
  key-value-label:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.body-md}"
  key-value-label-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-on-surface-muted}"
    typography: "{typography.body-md}"
  icon-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.sm}"
    size: 28px
  icon-button-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-on-surface-muted}"
    rounded: "{rounded.sm}"
    size: 28px
  code-block:
    backgroundColor: "{colors.surface-tinted}"
    textColor: "{colors.on-surface}"
    typography: "{typography.code-md}"
    rounded: "{rounded.sm}"
    padding: 8px
  code-block-dark:
    backgroundColor: "{colors.dark-surface-tinted}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.code-md}"
    rounded: "{rounded.sm}"
    padding: 8px
  tooltip:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 4px
  tooltip-dark:
    backgroundColor: "{colors.dark-on-surface}"
    textColor: "{colors.dark-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 4px
  error-banner:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px
  error-banner-dark:
    backgroundColor: "{colors.dark-error}"
    textColor: "{colors.dark-on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px
  focus-rule:
    backgroundColor: "{colors.accent}"
    height: 2px
  focus-rule-dark:
    backgroundColor: "{colors.dark-accent}"
    height: 2px
  table-row-selected:
    backgroundColor: "{colors.selection}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 6px
  table-row-selected-dark:
    backgroundColor: "{colors.dark-selection}"
    textColor: "{colors.dark-on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 6px
---

# t128n's personal design system

## Overview

t128n's personal design system serves dense operational web tools: admin consoles, record browsers, audit views, and internal dashboards. The interface should feel precise, quiet, and fast to scan. Records and their fields are the primary object; chrome exists only to orient the reader and expose the next action.

The visual identity is flat and monochrome by default, with a single blue accent for interaction. Surfaces step from `{colors.surface}` to `{colors.surface-tinted}` to `{colors.surface-header}` to separate layers without shadows or decoration. Body copy is set in `{typography.body-md}` at 14px, while `{typography.headline-lg}` carries the page title. Spacing stays on the compact `{spacing.xxs}`–`{spacing.3xl}` scale so that tables and forms remain legible at operational density.

Prefer structure over embellishment: rules, headers, and aligned numeric columns do the work that cards and shadows do elsewhere. Do not soften the interface into a marketing surface.

Each application maps its own status vocabulary onto the seven semantic roles; local status names are welcome, but local state colors are not.

### Interface Integrity

These patterns are non-conformant regardless of how they are produced. The positive rules they replace live in **Interaction Standards**.

| Telltale | Broken principle | Normative rule | Check |
| :--- | :--- | :--- | :--- |
| Bento grid of meaningless metrics | Form follows function; hierarchy | A metric appears only with a defined source, time window, owner, and drill-down. Dashboards are registers, not grids of equal-weight cards. No arbitrary trendlines or percentage pills. | Every metric opens the filtered records or definition that produced it. |
| Glass, neon blur, and glows | Accessibility; functionalism | No frosted glass, neon blur, glows, gradient borders, or shadows on records, forms, tables, or chrome. Separation is `1px` rules, tints, and spacing. | CSS scan finds none; text stays legible at 200% zoom. |
| Orphaned micro-elements | Hierarchy; affordance | No decorative pills, floating chips, or uppercase mini-headers above titles. Every label belongs to a field, state, or section it names. | Remove it; if no navigation, grouping, or state meaning is lost, it stays removed. |
| Vestigial interactivity | Affordance and signifiers | Every control performs its advertised action. Sort arrows sort, chevrons open, pagination pages, segmented controls change the view. Static text never looks interactive. | Keyboard and pointer test every control; no dead target and no placeholder route. |
| Happy-path-only data | Visibility of system status; robustness | Design with 40-character names, long numbers, missing values, empty collections, loading, partial failure, and 500 errors. No clipping, overlap, or layout collapse. | Fixtures cover long text, empty, loading, error, and 0/1/many rows. |
| Sparkle icons | Consistency; affordance | Standard search, filter, and submit actions use plain labels and standard icons. No sparkle or AI icon unless the action is genuinely generative and explains its input, output, and cost. | Search and filter controls carry no sparkle; any generative action is labelled. |

## Colors

The palette is a neutral grayscale with one accent, plus explicit state roles for status communication. Light values live under the base color names. Dark values live under `dark-` names and are mapped onto the same base color names by the generated CSS.

### Light palette

| Token | Value | Role |
| :--- | :--- | :--- |
| `primary` | `#2E63CC` | Readable accent for links, text, and primary buttons |
| `accent` | `#3574F0` | Non-text accent for focus rings and selection edges |
| `secondary` | `#6C707E` | Monochrome metadata and secondary ink |
| `tertiary` | `#2051B5` | Primary hover and active accent |
| `neutral` | `#EBECF0` | Inactive controls, wells, neutral badge background |
| `surface` | `#FFFFFF` | Base canvas |
| `surface-tinted` | `#F7F8FA` | Alternating rows, fieldsets, secondary panels |
| `surface-header` | `#DFE1E5` | Table and toolbar headers |
| `on-surface` | `#1E1F22` | Primary ink |
| `on-surface-muted` | `#5F6473` | Labels, timestamps, captions, metadata |
| `on-primary` | `#FFFFFF` | Ink on filled accent or destructive surfaces |
| `selection` | `#DBEAFE` | Selected row background |
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
| `state-disabled-fg` | `#4A5568` | Disabled state text |
| `state-disabled-bg` | `#E5E7EB` | Disabled state fill |
| `error` | `#C62839` | Error banner fill |

### Dark palette

Every base token has exactly one `dark-` counterpart. These values are not exposed as separate CSS variables; the build maps them onto the base names inside the dark selectors.

| Token | Value | Base token |
| :--- | :--- | :--- |
| `dark-primary` | `#548AF7` | `primary` |
| `dark-accent` | `#3574F0` | `accent` |
| `dark-secondary` | `#C0C4CC` | `secondary` |
| `dark-tertiary` | `#7EA6FF` | `tertiary` |
| `dark-neutral` | `#2B2D30` | `neutral` |
| `dark-surface` | `#1E1F22` | `surface` |
| `dark-surface-tinted` | `#191A1C` | `surface-tinted` |
| `dark-surface-header` | `#26282D` | `surface-header` |
| `dark-on-surface` | `#D4D6DB` | `on-surface` |
| `dark-on-surface-muted` | `#B4B8C0` | `on-surface-muted` |
| `dark-on-primary` | `#101114` | `on-primary` |
| `dark-selection` | `#2E436E` | `selection` |
| `dark-border` | `#2B2D30` | `border` |
| `dark-border-strong` | `#393B40` | `border-strong` |
| `dark-border-control` | `#6B707B` | `border-control` |
| `dark-state-neutral-fg` | `#C9CCD6` | `state-neutral-fg` |
| `dark-state-neutral-bg` | `#2B2D30` | `state-neutral-bg` |
| `dark-state-info-fg` | `#8AB4F8` | `state-info-fg` |
| `dark-state-info-bg` | `#1E3A5F` | `state-info-bg` |
| `dark-state-progress-fg` | `#7FD1DE` | `state-progress-fg` |
| `dark-state-progress-bg` | `#143A42` | `state-progress-bg` |
| `dark-state-success-fg` | `#86D9A5` | `state-success-fg` |
| `dark-state-success-bg` | `#153B25` | `state-success-bg` |
| `dark-state-warning-fg` | `#F2C879` | `state-warning-fg` |
| `dark-state-warning-bg` | `#3D2E12` | `state-warning-bg` |
| `dark-state-danger-fg` | `#F59A9A` | `state-danger-fg` |
| `dark-state-danger-bg` | `#4A1D1D` | `state-danger-bg` |
| `dark-state-disabled-fg` | `#B4B8C0` | `state-disabled-fg` |
| `dark-state-disabled-bg` | `#2B2D30` | `state-disabled-bg` |
| `dark-error` | `#F75464` | `error` |

### JetBrains New UI alignment

The dark surfaces and primary text follow the JetBrains New UI dark palette: main canvas `#1E1F22`, island `#191A1C`, active tab `#26282D`, hover `#2B2D30`, selection `#2E436E`, primary text `#BCBEC4`, and accent `#3574F0`. The readable accent is `#548AF7`; `#3574F0` is used for non-text focus rings and selection edges. The JetBrains secondary value `#7A7E85` does not meet AA on these surfaces. Readable text is brightened to `#D4D6DB` for primary ink and `#B4B8C0` for muted text; `#7A7E85` is reserved for editor comments and non-text chrome. The light palette keeps `#2E63CC` for text and uses `#3574F0` only for non-text focus.

### Editor palette

These colors are for code surfaces and syntax highlighting. They are not UI state roles; UI state uses the seven roles above.

| Token | Value | Use |
| :--- | :--- | :--- |
| Keyword | `#CF8E6D` | `if`, `return`, control flow |
| String | `#6AAB73` | String literals |
| Function | `#56A8F5` | Functions, methods, links in code |
| Number | `#2AACB8` | Numbers and constants |
| Type | `#E5C07B` | Classes, types, annotations |
| Type alt | `#B3AE60` | Secondary type emphasis |
| Comment | `#7A7E85` | Comments and muted editor chrome |
| Error | `#F75464` | Error squiggles, deleted markers |
| Warning | `#F5A623` | Warnings, inspect alerts |
| Added | `#62B543` | Added lines, untracked files |
| Modified | `#56A8F5` | Modified lines |

### Theme mapping

The generated CSS puts every base color in `:root` with its light value. It redefines every base color in `[data-theme="dark"]`, and again under `@media (prefers-color-scheme: dark)` for `:root:not([data-theme])`. Raw `--color-dark-*` names never reach the stylesheet.

Use `{colors.border-control}` for every interactive boundary so the control keeps a `3:1` edge. Use `{colors.border}` and `{colors.border-strong}` only for non-interactive structure. Never communicate state with color alone; pair `{colors.state-danger-fg}` with a text label and a border or icon.

## Typography

Typography is compact and utilitarian. The system sans stack carries prose, labels, and headings. The monospace stack is reserved for identifiers, hashes, and logs. Numeric columns use tabular figures through `{typography.numeric-md}` so digits align across rows.

| Token | Size | Weight | Line height | Family | Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `headline-lg` | `24px` | `700` | `1.2` | system sans | Page title |
| `headline-md` | `18px` | `700` | `1.25` | system sans | Section header |
| `body-lg` | `14px` | `400` | `1.4` | system sans | Prose and comments |
| `body-md` | `14px` | `400` | `1.35` | system sans | Default body and cells |
| `body-sm` | `13px` | `400` | `1.3` | system sans | Dense secondary cells |
| `label-md` | `14px` | `700` | `1.25` | system sans | Field labels |
| `label-sm` | `12px` | `600` | `1.2` | system sans | Badges |
| `code-md` | `14px` | `400` | `1.3` | monospace | IDs, hashes, logs |
| `numeric-md` | `14px` | `400` | `1.3` | system sans | Right-aligned numbers, tabular figures |

System sans: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`.
Monospace: `Consolas, Menlo, Monaco, 'Courier New', monospace`.

No text may fall below `12px`. Body copy and table data use `{typography.body-md}`; table headers and field labels use `{typography.label-md}`; badges use `{typography.label-sm}`. Do not scale type fluidly; the compact scale is deliberate.

## Layout

Layout follows a record-first, fixed-density model composed mobile-first. The phone composition is the default: one column, real page gutters, and full-width touch targets. Content sits in a single main column or in a table that fills the available width; columns are added with `min-width` upgrades, never removed with `max-width` patches. Panels use flat surfaces and spacing, not cards. At narrow widths, tables keep their record structure: preserve the identifier column and horizontal scroll rather than replacing the table with a card grid.

| Token | Value | Use |
| :--- | :--- | :--- |
| `xxs` | `2px` | Badge inset, hairline offsets |
| `xs` | `4px` | Control padding, icon gaps |
| `sm` | `6px` | Table cell padding |
| `md` | `8px` | Default gap between related elements |
| `lg` | `12px` | Panel and dialog padding |
| `xl` | `16px` | Mobile page gutter, section gap |
| `2xl` | `24px` | Dialog inset, major section break |
| `3xl` | `32px` | Desktop page gutter, page top and bottom margin |
| `touch` | `44px` | Minimum touch target on phones |

Radius is limited to `{rounded.none}`, `{rounded.sm}`, and `{rounded.md}`. There is no radius above `3px`, no pill shape, and no card grid that replaces a record table at narrow widths.

### Mobile and touch

Phones are the base viewport, not a fallback. Compose the single-column layout first and add columns with `min-width` upgrades at `640px`, `800px`, and `1024px`; never start from a desktop composition and subtract.

- Page gutters are `{spacing.xl}` (16px) at the base and `{spacing.3xl}` (32px) from `800px`, applied with `max()` against `env(safe-area-inset-left)` and `env(safe-area-inset-right)` so content clears notches, rounded corners, and home indicators.
- Interactive targets — buttons, inputs, icon buttons, row actions, and navigation links — present at least `{spacing.touch}` (44px) at the base. Desktop `28px` control geometry returns at `800px`; a phone never gets a target smaller than the touch size.
- App shells and full-height panes use `100dvh` with a `100vh` fallback so mobile browser chrome cannot clip content.
- Record tables stay tables. Wrap them in `.t128n-table-scroll` with an explicit minimum width, and add `.t128n-table-scroll--pin-first` to keep the identifier column visible below `800px`. Horizontal scroll is the mobile behavior; a card grid is not.
- Type stays on the nine scales above, with no reading text below `12px`. The mobile fix is composition, padding, gutters, and target size — never a smaller type scale.

### Standard Layouts

`assets/layouts.css` is the generated artifact that provides the shared CSS grid templates. It is built from the fenced block below; edit the block here, never the generated file. Import it after `assets/tokens.css`. Applications may compose these classes, but should not replace them with a different page skeleton.

| Class | Grid | Use |
| :--- | :--- | :--- |
| `t128n-page` | Centered `calc(1120px + 2 * 32px)` frame with `16px` mobile gutters | Page frame |
| `t128n-grid` | `repeat(var(--t128n-columns), minmax(0, 1fr))`, gap `--t128n-gap` | Equal-column content grid |
| `t128n-grid--1` / `--2` / `--3` | Sets `--t128n-columns` | One, two, or three equal columns |
| `t128n-grid__full` | `grid-column: 1 / -1` | Span the full grid |
| `t128n-app-shell` | `220px minmax(0, 1fr)` with `header`, `nav`, `main` areas | Application chrome |
| `t128n-register` | Rows: header, toolbar, register body, footer | Record registers |
| `t128n-split` | `minmax(220px, 320px) minmax(0, 1fr)` | List and detail |
| `t128n-record` | `minmax(180px, 240px) minmax(0, 1fr)` with `meta` and `body` areas | Record detail |
| `t128n-form-grid` | `repeat(auto-fit, minmax(220px, 1fr))` | Forms with aligned fields |
| `t128n-stack` | Vertical grid with `md` gap | Stacked sections and state panels |
| `t128n-cluster` | Wrapping flex row with `xs` gap | Toolbars, actions, badges |
| `t128n-table-scroll` | Horizontal scroll container with a `44rem` minimum table width | Wide record tables on phones |
| `t128n-table-scroll--pin-first` | Sticky first cell with a `{colors.surface}` background below `800px` | Keeps the identifier visible while scrolling |

The app shell is a single column at the phone base and splits into `220px` navigation plus main at `800px`. Split and record layouts stack below `800px`; form grids stay one column until `800px`. Record tables keep their identifier column and scroll horizontally rather than becoming cards.

Equal-column grids start at one column and add width: three-column grids become two at `640px` and three at `1024px`; two-column grids split at `800px`. Override `--t128n-columns` or `--t128n-gap` on the grid element for a one-off composition.

<!-- t128n:layouts:start -->
```css
.t128n-page {
  box-sizing: border-box;
  width: 100%;
  max-width: calc(1120px + 2 * var(--space-3xl));
  margin-inline: auto;
  padding-block: var(--space-xl);
  padding-inline: max(var(--space-xl), env(safe-area-inset-left)) max(var(--space-xl), env(safe-area-inset-right));
  display: grid;
  gap: var(--space-lg);
}

.t128n-grid {
  --t128n-columns: 1;
  --t128n-gap: var(--space-md);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(var(--t128n-columns), minmax(0, 1fr));
  gap: var(--t128n-gap);
}

.t128n-grid > * {
  min-width: 0;
}

.t128n-grid--1 {
  --t128n-columns: 1;
}

.t128n-grid--2 {
  --t128n-columns: 1;
}

.t128n-grid--3 {
  --t128n-columns: 1;
}

.t128n-grid__full {
  grid-column: 1 / -1;
}

.t128n-app-shell {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr) auto;
  grid-template-areas:
    'header'
    'main'
    'nav';
  min-height: 100vh;
  min-height: 100dvh;
}

.t128n-app-shell__header {
  grid-area: header;
}

.t128n-app-shell__nav {
  grid-area: nav;
  min-width: 0;
  border-top: 1px solid var(--color-border);
}

.t128n-app-shell__main {
  grid-area: main;
  min-width: 0;
}

.t128n-register {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  grid-template-areas:
    'header'
    'toolbar'
    'body'
    'footer';
  gap: var(--space-md);
  min-height: 0;
}

.t128n-register__header {
  grid-area: header;
}

.t128n-register__toolbar {
  grid-area: toolbar;
}

.t128n-register__body {
  grid-area: body;
  min-width: 0;
  min-height: 0;
}

.t128n-register__footer {
  grid-area: footer;
}

.t128n-split {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-lg);
  min-height: 0;
}

.t128n-record {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    'meta'
    'body';
  gap: var(--space-lg);
}

.t128n-record__meta {
  grid-area: meta;
  min-width: 0;
}

.t128n-record__body {
  grid-area: body;
  min-width: 0;
}

.t128n-form-grid {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-md);
}

.t128n-form-grid__wide {
  grid-column: 1 / -1;
}

.t128n-stack {
  display: grid;
  gap: var(--space-md);
}

.t128n-cluster {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs);
}

.t128n-table-scroll {
  --t128n-table-min: 44rem;
  box-sizing: border-box;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
}

.t128n-table-scroll > table {
  min-width: var(--t128n-table-min);
}

.t128n-table-scroll--pin-first > table > * > tr > :first-child {
  position: sticky;
  left: 0;
  z-index: 1;
  background: var(--color-surface);
}

.t128n-table-scroll--pin-first > table > thead > tr > :first-child {
  background: var(--color-surface-header);
}

@media (min-width: 640px) {
  .t128n-grid--3 {
    --t128n-columns: 2;
  }
}

@media (min-width: 800px) {
  .t128n-page {
    padding-inline: max(var(--space-3xl), env(safe-area-inset-left)) max(var(--space-3xl), env(safe-area-inset-right));
  }

  .t128n-grid--2 {
    --t128n-columns: 2;
  }

  .t128n-app-shell {
    grid-template-columns: 220px minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-areas:
      'header header'
      'nav main';
  }

  .t128n-app-shell__nav {
    border-top: 0;
    border-right: 1px solid var(--color-border);
  }

  .t128n-split {
    grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);
  }

  .t128n-record {
    grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
    grid-template-areas: 'meta body';
  }

  .t128n-form-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .t128n-table-scroll--pin-first > table > * > tr > :first-child {
    position: static;
  }
}

@media (min-width: 1024px) {
  .t128n-grid--3 {
    --t128n-columns: 3;
  }
}
```
<!-- t128n:layouts:end -->

## Elevation & Depth

The system is flat. Depth is expressed with surface tint, border rules, and header fills, never with shadows or blur. Records and panels do not float; they sit in the reading plane.

| Layer | Treatment |
| :--- | :--- |
| Page | `{colors.surface}` |
| Secondary panel, fieldset, alternating row | `{colors.surface-tinted}` |
| Table header, toolbar | `{colors.surface-header}` |
| Divider | `{colors.border}` at `1px` |
| Section header rule, overlay edge | `{colors.border-strong}` |
| Dialog | `{colors.surface}` with a `{colors.border-strong}` edge |

A native dialog is the only overlay. Give it a visible edge and a clear focus target; do not add a backdrop blur, glass effect, or drop shadow. Tooltips use `{colors.on-surface}` as their background so they read as ink lifted above the page without elevation.

## Shapes

Shapes are rectilinear and quiet. Controls use `{rounded.sm}` or `{rounded.md}`; tables and dialogs use `{rounded.none}`. Badges use `{rounded.sm}`. Nothing is a pill, and nothing rounds beyond `3px`.

Use a `1px` rule for every separator. The `control-rule` token (`{colors.border-control}`) is mandatory for interactive control boundaries because it meets `3:1` against adjacent surfaces. Dividers and section rules use `{colors.border}` or `{colors.border-strong}` and are not interactive.

## Iconography

Icons come from **Octicons** (`@primer/octicons`), the 16px GitHub set. Carbon is the approved fallback for infrastructure glyphs Octicons does not cover. An icon is functional only—never decorative—and must be hidden from assistive technology unless it carries meaning. Icon color follows the surrounding text: `{colors.on-surface}` for active content, `{colors.on-surface-muted}` for secondary chrome, and `{colors.primary}` for interactive emphasis.

| Context | Treatment |
| :--- | :--- |
| Toolbar and icon button | Octicon, `16px` grid, rendered at `14px`, `{colors.on-surface-muted}` |
| Inline with body text | `14px`, optically aligned to the baseline |
| Status badge | Text label first; an icon may supplement but never replace it |
| Decorative | `aria-hidden="true"` |

Do not use icon fonts, emoji as controls, or color-only icons. Do not hand-draw an icon when Octicons has the glyph. An icon button always has an accessible name, and its target is at least `{spacing.touch}` square on phones and `28px` square on desktop.

## Components

Components are defined as tokens rather than as a library. Each component records the properties it needs — background, text, typography, radius, and padding or size — so an implementation can reproduce it exactly in both themes. All 72 components live in the front matter: 36 light components and 36 dark counterparts. The dark counterparts use `dark-` colors and the same geometry as their light twin.

### Buttons

Buttons are `28px` tall with `4px` padding, `{rounded.md}`, and `{typography.label-md}`, except `button-secondary` and `button-secondary-disabled`, which use `{typography.body-md}`; their hover states return to `{typography.label-md}`. Primary actions use `{components.button-primary}` and darken to `{components.button-primary-hover}`. Secondary actions use `{components.button-secondary}`. Destructive actions use `{components.button-destructive}` and its hover state. Disabled buttons use the disabled state pair and keep their label visible. On phones buttons are at least `{spacing.touch}` tall; the `28px` geometry returns at `800px`.

### Inputs and fields

Inputs are `28px` tall with `4px` padding and `{rounded.sm}`. The default field is `{components.input-field}`; the disabled field is `{components.input-field-disabled}`. Every input has a visible label, and the focus treatment uses the accent color with the `{components.focus-rule}` line. Placeholders may repeat an example but never replace a label.

### Tables

Tables are the primary record surface. Cells use `{components.table-cell}` and alternate with `{components.table-cell-alt}`. Selected rows use `{components.table-row-selected}`. Numeric columns use `{components.table-numeric}` with tabular figures. Headers use `{components.table-header}` with `{typography.label-md}`, `6px` padding, and a `32px` height; below `800px` the header grows to `{spacing.touch}` and cells pad to `12px` inside `.t128n-table-scroll`. Row and outer boundaries use `{components.control-rule}` so the structural rule meets `3:1`; keep a stable identifier column and never collapse a record table into a card grid.

### Status badges

Status badges use `{typography.label-sm}`, `{rounded.sm}`, `2px` padding, and a `1px solid currentColor` border. Each semantic role has a light and dark pair: neutral (`{components.status-badge}`), info, progress, success, warning, danger, and disabled. The text label is mandatory; color is supplementary. A badge that loses its label is a defect.

### Everything else

- Links use `{components.link}`; metadata uses `{components.metadata}`.
- Toolbars use `{components.toolbar}` at `36px` height with at least `8px` between actions.
- Rules use `{components.rule}`, `{components.rule-strong}`, and `{components.control-rule}`.
- Dialogs use `{components.dialog}` with a native `dialog` element.
- Empty states use `{components.empty-state}`; key-value labels use `{components.key-value-label}` in regular `{typography.body-md}` and muted ink, with values in `{colors.on-surface}`.
- Icon buttons use `{components.icon-button}` at `28px` square.
- Code blocks use `{components.code-block}`; tooltips use `{components.tooltip}`.
- Error banners use `{components.error-banner}` and always include a message.

## Interaction Standards

These are the positive rules every view must satisfy; Interface Integrity in Overview names the anti-patterns that fail them. A view is conformant only when a reviewer can answer three questions for every control: what it is, what state it is in, and what happens when it is used.

### Platform-first

Build on the element that already carries the semantics and behavior. Use `button` for actions, `a href` for navigation, `form` for submission, `input` and `select` for entry, `table` for records, `dialog` for overlays, and `details` with `summary` for disclosure. A `div` with a click handler is not a control.

CSS owns presentation, and native HTML owns the behavior and state the platform can express. Script is justified only for behavior the platform cannot express; before adding a script or dependency, state the native capability that was rejected and why, and record a lasting exception in the Application Profile. Keep native constraint attributes (`required`, `type`, `pattern`, `min`, `max`, `step`) as the validation source of truth; visible messages mirror them.

Each view answers one question and names one primary action; a second, unrelated job belongs on another view. Prefer deleting markup, states, and options to adding them. Core tasks work with scripts disabled wherever the platform allows: links navigate, forms submit, details expand.

### Controls and affordances

- Every control shows its label, its current state, and the result of using it.
- Actions use plain text labels. Icon-only controls are limited to universally understood, reversible actions and always carry an accessible name; critical workflows never depend on an ambiguous icon.
- One primary action per view uses `{components.button-primary}` and `{colors.primary}`. Destructive actions use `{components.button-destructive}` and are visually separated from the primary cluster.
- Disabled controls are unavailable and announced as such. Read-only fields stay focusable, selectable, and visibly marked read-only with the reason. Never use disabled to mean "not allowed yet" without saying what unlocks it.
- Static text never looks interactive, and no control advertises an action it does not perform.

### Forms

- Labels are always visible and tied to their field; placeholders may show an example but never replace the label. Mark required fields, label optional fields optional, and show an example for format-sensitive fields.
- Validate on submit with native constraint attributes; every message derives from the constraint and may explain it but never contradict it.
- Mirror each failure inline beside its field, in the same position every time, and summarize the count above the form. A message says what is wrong and how to fix it.
- Format-sensitive fields also validate when focus leaves them. Inline mirroring, blur validation, and moving focus to the first invalid field are script exceptions under Platform-first; none of them may duplicate or replace the native constraint.
- On submit failure, keep every value and focus the first invalid field. Never clear input or move focus to the top of the page.
- Document disabled and read-only behavior where the field appears. A field that cannot be edited says who can change it and how to request it.

### Records and tables

- Keep the identifier column first and sticky; the row's name or id never scrolls out of view. Use `{components.table-header}` and the shared table components instead of a card grid.
- Sortable columns expose `aria-sort` on the active header and show direction in text or icon; unsorted columns look unsorted. A sort arrow that does nothing is a defect.
- Every collection covers empty, loading, error, and no-results. Each state names itself and the next action: create the first record, retry, clear filters, or adjust the query. Loading reserves its final layout with a plain text row, never an animated gradient.
- Bulk selection uses a header checkbox with an indeterminate state, shows the selected count, and names the scope ("12 of 340 selected"). Bulk actions are labelled with the count, and destructive ones confirm before running.
- Long values truncate with an ellipsis, keep the full value in the accessible name, and reveal it on focus or hover with a copy affordance. Never truncate the identifier without a way to read it.

### Status and feedback

- The seven semantic roles carry all status meaning. Every status includes text; color, icon, and border are supplementary. A badge without a label is a defect, and users never have to learn a color legend.
- Success states say what changed and what to do next, not just "Saved". Warning states appear before the consequence. In-progress states name the operation and offer cancel when it is safe.
- Errors lead with recovery: what failed, what to do next, and what was preserved. Put them inline when they belong to a field, in `{components.error-banner}` when they belong to the view, and never only in a transient toast.
- Transient messages confirm completed work; anything the user must act on stays until it is resolved or dismissed.
- Never report success before the server confirms it.

### Navigation and task flow

- Back and cancel are predictable: they return to the previous view with its filters, sort, and position intact, and a dirty form confirms before discarding. Browser back and in-app back do the same thing.
- Advanced options are collapsed by default, grouped under a labelled disclosure such as `details`, and never hide required fields.
- Multi-step tasks show position as text ("Step 2 of 4"), preserve entered data on back and reload, offer save and resume for long tasks, and confirm completion with what changed and the next action.
- Every view has one entry point and one exit, and no dead end: empty, error, and completion states all offer the next step.

### Accessibility baseline

- Every workflow completes with the keyboard alone in a logical tab order, with a visible focus indicator from `{components.focus-rule}`. Do not remove focus outlines; fix the layout instead.
- Give controls semantic names: every input has a label, every icon button an accessible name, every dialog a title, and every table a caption and scoped headers.
- Text meets `4.5:1` against its background and control boundaries meet `3:1`. Status never relies on color: pair it with text, and with an icon or border where the role matters.
- Targets are at least `24px` square and primary touch actions at least `44px`. Text stays readable at `200%` zoom without loss of function or content.
- Respect reduced-motion preferences and keep motion functional rather than decorative.

### Content

- Label actions by their result: "Save changes", "Delete 3 records", "Export CSV", not "Submit", "OK", or "Yes".
- Use one term per concept across every view, matching the term used by the API and the records. Define an abbreviation the first time it appears.
- Microcopy is short and operational: what happened, what it affects, what to do next. Errors do not blame the user and never expose a stack trace or internal code.
- Use sentence case, no exclamation marks, and no filler. A control's label and its resulting message use the same words.

### Conformance checklist

Review every view against this table; a failing row blocks the change. Record approved exceptions in the Application Profile.

| Check | Passes when |
| :--- | :--- |
| Platform fit | Each control uses the native element or attribute that already provides its behavior; any script or dependency has a stated reason. |
| Form states | Labels are visible, required and optional are marked, inline messages say how to fix the input, and errors preserve every value. |
| Table states | Empty, loading, error, and no-results each name the state and offer the next action; long values stay readable. |
| Error recovery | Every failure says what failed, what to do next, and what was preserved. |
| Keyboard flow | The whole task completes keyboard-only, focus is visible and ordered, and dialogs return focus. |
| Status clarity | Every status has text and a semantic role; color is supplementary and no legend is required. |
| Scope | One question and one primary action per view; optional and advanced controls are disclosed, not stacked. |

## Do's and Don'ts

Do:

- Use `{colors.primary}` for one clear action per view, and keep the accent scarce.
- Use `{colors.accent}` for visible focus rings and selection edges; never remove the focus indicator.
- Use `{colors.border-control}` on every input, select, checkbox, radio, and button boundary.
- Use `{colors.surface-tinted}` to alternate rows and separate secondary panels.
- Set body and cell text in `{typography.body-md}` and numeric columns in `{typography.numeric-md}`.
- Keep spacing on the `{spacing.xxs}` through `{spacing.3xl}` scale, and use `{spacing.touch}` for touch targets.
- Verify keyboard order, visible focus, and 200% zoom before shipping a view.
- Name every status with text and a role, not color alone.
- Use a native dialog for overlays and return focus when it closes.
- Give every metric a source, time window, owner, and drill-down.
- Exercise long labels, empty, loading, error, and 0/1/many-row fixtures.
- Make every control perform its advertised action; leave static text static.

Don't:

- Don't add shadows, gradients, glass effects, blur, glows, or gradient borders to records, forms, tables, or chrome.
- Don't use a radius above `{rounded.md}` or turn badges and buttons into pills.
- Don't replace a record table with a card grid at narrow widths.
- Don't use `{colors.border}` or `{colors.border-strong}` as an interactive boundary.
- Don't set text below `12px` or invent a type scale outside the nine defined scales.
- Don't invent colors, spacing, or radii; every value must come from the front matter.
- Don't use placeholder-only labels or icon-only controls without an accessible name.
- Don't use color alone to signal success, warning, danger, or disabled state.
- Don't use bento grids, arbitrary trendlines, or percentage pills without a source and drill-down.
- Don't add decorative pills, floating chips, uppercase mini-headers, or sparkle icons.
- Don't ship dead sort arrows, pagination dots, chevrons, or segmented controls.
- Don't design for idealized content; real names, missing values, and errors must fit.
