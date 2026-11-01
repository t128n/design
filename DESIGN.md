---
version: alpha
name: t128n
description: Personal, utility-first visual language for software applications and websites.
updated: "2026-11-01"
scheme:
  name: Oxocarbon
  source: https://github.com/nyoom-engineering/base16-oxocarbon
  dark:
    base00: "#161616"
    base01: "#262626"
    base02: "#393939"
    base03: "#525252"
    base04: "#DDE1E6"
    base05: "#F2F4F8"
    base06: "#FFFFFF"
    base07: "#08BDBA"
    base08: "#3DDBD9"
    base09: "#78A9FF"
    base0A: "#EE5396"
    base0B: "#33B1FF"
    base0C: "#FF7EB6"
    base0D: "#42BE65"
    base0E: "#BE95FF"
    base0F: "#82CFFF"
  light:
    base00: "#F2F4F8"
    base01: "#DDE1E6"
    base02: "#525252"
    base03: "#161616"
    base04: "#262626"
    base05: "#393939"
    base06: "#525252"
    base07: "#08BDBA"
    base08: "#FF7EB6"
    base09: "#EE5396"
    base0A: "#FF6F00"
    base0B: "#0F62FE"
    base0C: "#673AB7"
    base0D: "#42BE65"
    base0E: "#BE95FF"
    base0F: "#37474F"
colors:
  light:
    canvas: "#FFFFFF"
    surface: "#F2F4F8"
    surface-2: "#DDE1E6"
    border-subtle: "#DDE1E6"
    border-strong: "#8D8D8D"
    text-primary: "#161616"
    text-secondary: "#525252"
    text-muted: "#6F6F6F"
    text-disabled: "#A8A8A8"
    primary: "#0F62FE"
    primary-hover: "#0353E9"
    on-primary: "#FFFFFF"
    focus: "#0F62FE"
    accent-on-dark: "#33B1FF"
    selection: "rgba(15, 98, 254, 0.12)"
    error: "#DA1E28"
    error-hover: "#B81922"
    on-error: "#FFFFFF"
    warning: "#8A5A00"
    warning-fill: "#F1C21B"
    on-warning: "#161616"
    success: "#0E6027"
    success-fill: "#1A7F37"
    on-success: "#FFFFFF"
    overlay: "rgba(22, 22, 22, 0.5)"
  dark:
    canvas: "#161616"
    surface: "#262626"
    surface-2: "#393939"
    border-subtle: "#393939"
    border-strong: "#6F6F6F"
    text-primary: "#F2F4F8"
    text-secondary: "#C6C6C6"
    text-muted: "#8D8D8D"
    text-disabled: "#525252"
    primary: "#33B1FF"
    primary-hover: "#78A9FF"
    on-primary: "#161616"
    focus: "#33B1FF"
    accent-on-dark: "#33B1FF"
    selection: "rgba(51, 177, 255, 0.16)"
    error: "#FF8389"
    error-hover: "#FF6B72"
    on-error: "#161616"
    warning: "#F1C21B"
    warning-fill: "#F1C21B"
    on-warning: "#161616"
    success: "#42BE65"
    success-fill: "#42BE65"
    on-success: "#161616"
    overlay: "rgba(0, 0, 0, 0.6)"
charts:
  light: ["#0F62FE", "#0E6027", "#EE5396", "#673AB7", "#37474F", "#8A5A00"]
  dark: ["#33B1FF", "#42BE65", "#FF7EB6", "#BE95FF", "#82CFFF", "#F1C21B"]
typography:
  font-sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  font-mono: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
  caption:
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  body-strong:
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.5
  lead:
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  heading-sm:
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  heading-md:
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  heading-lg:
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
  mono:
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
spacing:
  unit: 4px
  scale: [4, 8, 12, 16, 24, 32, 48, 64]
  page-desktop: 24px
  page-mobile: 16px
sizes:
  control-sm: 28px
  control-md: 36px
  control-lg: 44px
  app-bar: 48px
  sidebar: 240px
  icon-sm: 16px
  icon-md: 20px
  icon-lg: 24px
  table-header: 36px
  table-row-compact: 36px
  table-row: 44px
  table-row-comfortable: 48px
  dialog-sm: 480px
  dialog-md: 640px
  dialog-lg: 800px
  form-max: 640px
  settings-max: 800px
  prose-max: 72ch
radius:
  sm: 2px
  md: 4px
  lg: 6px
  full: 999px
elevation:
  raised: "0 1px 2px rgb(0 0 0 / 0.08)"
  overlay: "0 8px 24px rgb(0 0 0 / 0.16)"
  card: none
motion:
  fast: 120ms
  base: 180ms
  overlay: 240ms
  easing: "cubic-bezier(0.2, 0, 0.38, 0.9)"
z:
  base: 0
  sticky: 10
  dropdown: 20
  backdrop: 30
  dialog: 40
breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
---

# t128n Design

## How to use this document

A minimal, technical, enterprise-influenced visual language for personal applications, developer tools, dashboards, and consumer-facing experiences. Optimize for clarity, utility, predictability, and low visual noise. The identity should be subtly recognizable rather than expressive or decorative.

This document owns cross-application decisions: tokens, component rules, patterns, and acceptance criteria. Applications implement their own theme variables and components, but they derive them from here rather than inventing a parallel language.

The result should feel like a precision instrument: calm, dense, and legible under pressure.

### Precedence

When rules conflict, resolve in this order:

1. Accessibility and platform correctness
2. Browser and OS convention
3. This document
4. Application-local theme or pattern
5. Component-library defaults

An application may deviate, but only deliberately, and the deviation is recorded in that application's own design notes. Silent divergence is the failure mode this document exists to prevent.

### Rule tiers

- **MUST** — violating it produces an incoherent or inaccessible interface. Token values, contrast, focus, destructive safety.
- **SHOULD** — the default. Deviate with a one-line reason.
- **MAY** — context-dependent; use judgment.

### Deriving an application

1. **Classify the surface** — tool or dashboard, content site, focused workflow, or transactional flow.
2. **Choose the shell** — app shell, focused app shell, content shell, or focused shell (see Layout).
3. **Declare density** — compact, default, or comfortable, once per product (see Spacing and density).
4. **Reuse before creating** — existing local components, then accessible primitives. A component that is not in the inventory below is not yet part of the system.
5. **Apply role tokens only** — never raw hex values in components.
6. **Run the self-review checklist** at the end of this document.

**Definition of done for a screen:** both themes render correctly, every interactive state exists, keyboard-only use completes the primary task, the accent budget is respected, and the checklist passes.

### Status and authority

- **Confirmed:** the Oxocarbon-derived palette, semantic colors, type scale, spacing, sizing, radius, elevation, motion, and breakpoints in the front matter.
- **Open:** logo and mark usage, illustration style, email and document templates, and icon sets beyond Lucide. These are not implied by this document.
- **Not ours to decide:** application-specific information architecture, navigation labels, and page structure.

## Identity

### Principles

Each principle carries a test. If a design decision fails its test, the decision changes, not the principle.

1. **Every pixel carries information.** Test: remove it — does comprehension or task speed drop? If not, remove it.
2. **Density is a feature.** Test: can a returning power user finish the primary task without scrolling or drilling in? Compact is the default for tools, not a compromise.
3. **One accent, earned.** Test: count accent-colored elements in a view. More than one per region needs a stated reason.
4. **Structure comes from alignment and 1px borders, not depth.** Test: disable all shadows — hierarchy must survive.
5. **Predictability over novelty.** Test: would a user guess where this control lives and what it is called?
6. **Text is interface.** Test: does the label survive truncation to 24 characters and translation?
7. **Motion only explains change.** Test: does the animation communicate a state change or spatial origin? If not, delete it.
8. **Reversible by default.** Prefer designs whose results can be re-created. Destructive actions are confirmed in a dialog with the consequence named; no interface promises undo.

### Signature moves

The recognizable t128n traits. Use these consistently; they are the identity.

- A **dark 48px app bar** over a **white canvas** and a **tinted 240px sidebar** (`#F2F4F8`).
- **1px neutral borders** (`#DDE1E6`) doing the structural work instead of shadows.
- **Oxocarbon blue** as the only accent: `#0F62FE` in light, `#33B1FF` in dark and on dark chrome. The wordmark uses the same accent — there is no separate brand color.
- **14px Inter** at 400 and 600 (16px on content surfaces), with **Geist Mono** for identifiers and aligned numbers.
- **Subtly striped tables** on `#F2F4F8`, never boxed into cards.
- **Compact 36px controls** with 24px page padding.

Anti-signature: gradient heroes on tool screens, purple-blue "AI" gradients, shadowed cards, pill-shaped buttons, all-caps eyebrows, centered dashboards, three competing accents.

## Foundations

### Color

The palette is derived from **Oxocarbon** (base16), pinned above. These rules govern its use:

- **MUST** — components consume role tokens (`canvas`, `text-primary`, `primary`, …), never `base00`–`base0F` and never raw hex.
- **MUST NOT** — map base16 slot numbers to UI roles across themes. Oxocarbon Light inverts its ramp (base03–base06 are *darker* than base00) and duplicates `#525252` at base02 and base06. Slot numbers are not portable; the role tables are.

**Base16 caveat.** Oxocarbon remaps the accent slots and contains **no red**. `base08` is cyan in dark and pink in light. Error, warning, and success therefore come from outside the scheme, chosen for contrast and listed above. Do not "correct" them back toward slot names.

**Roles (light / dark):**

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| canvas | `#FFFFFF` | `#161616` | Page background |
| surface | `#F2F4F8` | `#262626` | Sidebar, stripes, blocked regions |
| surface-2 | `#DDE1E6` | `#393939` | Table headers, hover, selected rows |
| border-subtle | `#DDE1E6` | `#393939` | Structural separation |
| border-strong | `#8D8D8D` | `#6F6F6F` | Interactive boundaries (inputs, controls) |
| text-primary | `#161616` | `#F2F4F8` | Body, headings |
| text-secondary | `#525252` | `#C6C6C6` | Supporting copy, labels |
| text-muted | `#6F6F6F` | `#8D8D8D` | Metadata, placeholders, helper text |
| text-disabled | `#A8A8A8` | `#525252` | Disabled labels only |
| primary | `#0F62FE` | `#33B1FF` | Wordmark, actions, selection, focus |
| accent-on-dark | `#33B1FF` | `#33B1FF` | Wordmark and focus on the dark app bar |
| on-primary | `#FFFFFF` | `#161616` | Text on primary fills |
| error | `#DA1E28` | `#FF8389` | Error text, borders, fills |
| error-hover | `#B81922` | `#FF6B72` | Hover state for danger buttons |
| warning | `#8A5A00` | `#F1C21B` | Warning text and icons |
| success | `#0E6027` | `#42BE65` | Success text and icons |

**Contrast (MUST):** body text ≥ 4.5:1, large text ≥ 3:1, interactive boundaries and focus indicators ≥ 3:1. Verified ratios are light/dark against each canvas: `text-primary` 18.10/16.43, `text-secondary` 7.81/10.59, `text-muted` 5.02/5.45, `primary` 5.00/7.65. `primary` text on `#DDE1E6` is 3.81 — below threshold, so **never** use primary text on `surface-2`.

**Accent on dark chrome.** The app bar is dark in both themes, so the accent resolves to `accent-on-dark` (`#33B1FF`) there — used for the wordmark and for focus rings, never `focus`. It clears both `#161616` and `#262626`.

**Accent budget:** one primary action per view. Accent marks the wordmark, action, selection, focus, and current state — not headings, borders, backgrounds, or decoration. Hover and pressed states may darken or lighten primary but do not introduce a second hue.

**Selection:** selected rows, list items, and text use the `selection` overlay and keep `text-primary` unchanged. Do not invert text or fill the row with solid primary.

**Status:** always icon + text, never color alone. Error fills use `on-error`; warning fills use `on-warning` (`#F1C21B` always carries near-black text); success fills use `success-fill` + `on-success`. Icon-only status is not acceptable.

**Charts:** use the ordered `charts` set, maximum 6 series, series always labeled. Chart colors are positional, not semantic — distinguish them with labels and legends, and never borrow a status color to mean status in a chart. Area fills ≤ 20% opacity.

**Theme:** follow the OS preference with a manual override persisted per user. Light and dark must both be complete; never ship a light-only or dark-only surface. Implement it as follows:

- Expose roles as CSS custom properties per theme, set `color-scheme` to match, and apply the resolved theme before first paint to avoid a flash of the wrong theme.
- An override persists across reloads and, where the application has accounts, follows the user across devices; clearing it returns to the OS preference.

### Typography

- **Fonts:** Inter for all UI and prose; Geist Mono for code, identifiers, and aligned numerics. Weights are restricted to **400 and 600**. No 500, no 700, no italics in UI chrome.
- **Scale:** 12 caption · 14 body · 16 lead · 20 section heading · 24 page heading · 32 page title. **MUST NOT** introduce interface sizes between these; nothing below 12px. Monospace may use 12 or 13px for code, identifiers, and aligned numerics.
- **Sizes per shell (MUST):** application surfaces — app and focused app — run body at **14px** with a 24px page heading. Content surfaces run body at **16px** with a 32px page title and 20px section headings. Navigation, tables, controls, and captions stay at 14/12 in both; monospace at 13. Each surface declares one family and does not mix.
- **Line height:** 1.25–1.3 for headings, 1.5 for UI, 1.6 for prose.
- **Tracking:** 0 by default; `-0.01em` at 24px and above.
- **Case:** sentence case for headings, labels, navigation, buttons, table headers, and menu items. No all-caps, no title case, except proper nouns.
- **Hierarchy:** establish with size, weight, and spacing — not color, underlines, or rules. **SHOULD NOT** use more than 3 content sizes and 2 weights in a single view. Chrome sizes — 14 for navigation, tables, and controls, 12 for captions, 13 for monospace — are exempt and do not count against the limit.
- **Prose:** 60–80 characters per line (`prose-max: 72ch`). Dashboards, tables, code, and tools use available width.
- **Numerals:** tabular in tables, metrics, and any vertically aligned figures. Monospace is not mandatory for every number.
- **Truncation:** end-truncate prose, middle-truncate identifiers (`abcdef…xyz`). Full value available on hover and focus. **MUST NOT** truncate the only copy of a value.

### Spacing and density

- **MUST** use the 4px scale only: `4 8 12 16 24 32 48 64`. No arbitrary values.
- Page padding: **24px** desktop, **16px** below 768px.
- **Rhythm (MUST):** groups 4–8 inside a field or row; blocks 12–24 apart; page regions 24–32; form and content sections 48. A section gap is always larger than the gap inside it, and every value comes from the 4px scale.
- **MUST** keep a single alignment edge per region. Left-align content, labels, and headings; right-align numeric table columns and trailing actions.
- **Density modes:**

| Mode | Control height | Row height | Typical use |
| --- | --- | --- | --- |
| Compact | 28px | 36px | Monitoring, triage, power tools |
| Default | 36px | 44px | Most application UI |
| Comfortable | 44px | 48px | Touch-first and low-frequency forms |

Density is fixed by the shell and declared once per product, not chosen per screen. App and focused app shells default to **Default**; a monitoring or triage tool may declare **Compact**; a touch-first flow may declare **Comfortable**. The declaration applies to controls, list rows, and table rows alike. Do not mix control heights within one toolbar or form, and do not use a lower row height than the density declares.

### Layout and shells

- **App shell** (tools, dashboards): 48px app bar, 240px sidebar, 24px content padding. App bar is `#161616` in light theme and `#262626` in dark; sidebar is `surface`. Content is fluid. The sidebar begins below the app bar; it never runs behind it.
- **Content shell** (marketing, docs, reading): no sidebar, optional compact header, prose constrained to `prose-max`, generous vertical rhythm (48–64px between sections). Its mobile navigation is a panel below the header, not a drawer.
- **Focused shell** (auth, onboarding, single-task): no navigation chrome at all, centered column no wider than 640px, one primary action.
- **Focused app shell** (launchers, search-first tools, single-task applications): a 48px app bar carrying identity, context, and account only — **no navigation** — and a centered column no wider than 640px. The column is a single task, not a dashboard: content inside is left-aligned to one edge. One primary action at a time.

The shell is chosen per surface, not per product. A marketing page and the app it advertises may share tokens and share no layout. A product may use the app shell for its workspace and the focused app shell for its launcher without either becoming a second language.

**Page header:** title 24px/600 (32px on content pages), optional description 14px `text-secondary` capped at 72ch, primary action aligned right on the same baseline, 24px gap to content. One primary action per header. When the page is a single form, the primary action belongs to the end of that form instead, and the header carries none.

**Grid:** a 12-column grid MAY structure page-level composition (24px gutter). Component internals use ordinary Grid/Flexbox. **MUST NOT** force every element into 12 columns.

**Responsive:** adopt the framework breakpoints (640/768/1024/1280). Below 1024px the app-shell sidebar becomes an overlay drawer that starts below the 48px app bar, leaves the app bar visible and operable, locks body scrolling, closes on Escape, backdrop click, or the menu toggle, and returns focus to the toggle. The focused app shell has no drawer: its 640px column simply reflows. Below 768px padding drops to 16px, controls move to 44px, and tables keep their structure with horizontal scrolling rather than becoming cards. Verify no horizontal page scroll at 320px.

### Shape

- Radius: **2px** for inputs, tags, checkboxes, code; **4px** for buttons, cards, menus, table containers; **6px** for dialogs; **999px** only for avatars and status dots. Nothing else.
- Borders are 1px. 2px is reserved for focus rings and selection indicators.
- **MUST NOT** use pill-shaped buttons, fully rounded cards, or mixed radii within one component.
- Outlined fields are the default; filled fields are not part of this system.

### Elevation

- Default to no elevation. Separate with whitespace, `surface`, and `border-subtle`.
- Shadows are reserved for floating surfaces only: menus, popovers, dialogs, drawers.
- `raised` (`0 1px 2px`) for menus, popovers, and the mobile navigation panel. `overlay` (`0 8px 24px`) for dialogs and drawers.
- **MUST NOT** put shadows on cards, inputs, table rows, or buttons, and **MUST NOT** build an elevation scale beyond these two.
- Layering uses the fixed `z` order: sticky 10, dropdown 20, backdrop 30, dialog 40. Do not invent intermediate values.

### Surfaces and containers

Separate regions with whitespace and `surface` before reaching for a border. A container is allowed only when the region floats, scrolls, or is a discrete object:

| Gets a container | Does not |
| --- | --- |
| table, menu, dialog, drawer, code block, callout | grouped stats, form sections, page headers, list rows |

Tables and code blocks use 1px `border-subtle` with radius 4 (code 2). Lists use a 1px rule between rows — plus a top rule when the list sits directly under a heading — and no surrounding container. Form and content sections use whitespace; a `border-top` is reserved for the danger zone. Grouped read-only figures never sit in cards — align them and let the labels carry the grouping.

### Motion

- Duration: 120ms micro (hover, focus, toggles), 180ms standard (expand, drawers, view change), 240ms overlays.
- Easing: `cubic-bezier(0.2, 0, 0.38, 0.9)`. No bounce, spring overshoot, or parallax.
- Hover, focus, and active transitions are **120ms and mandatory** on background, border, and color. Do not ship snap states next to animated ones.
- Animate only `opacity`, `transform`, and color/border/background changes; never animate layout properties.
- No decorative or looping animation. Progress and status communication is allowed and must remain legible.
- In-page anchor navigation may scroll smoothly; that is navigation, not decoration, and it must be disabled under reduced motion.
- **MUST** honor `prefers-reduced-motion: reduce` by removing transforms and shortening transitions to an instant state change.

### Iconography

- **Lucide outlined icons only**, at 16px inline, 20px in controls, 24px for standalone actions. Stroke width stays at the library default; do not mix filled and outlined styles.
- Icons supplement labels; icon-only controls require an accessible name and a tooltip.
- **MUST NOT** use emoji, flags, or bespoke SVG sets as UI chrome.

## Components

Components come from the application's existing library. These rules constrain configuration, not implementation.

### Interactive states

Every interactive element defines the same states, with the same token behind each. Color alone never carries a state.

| State | Treatment |
| --- | --- |
| Default | role tokens only |
| Hover | `surface` fill; `surface-2` for nav items and menu items |
| Active | `surface-2` fill |
| Focus | 2px `focus` ring, 2px offset; `accent-on-dark` on the app bar |
| Selected / current | `surface-2` fill plus 600 weight; sidebar nav also gets the 2px primary bar |
| Disabled | `surface-2` fill plus `text-disabled`; state the reason on hover and focus |
| Loading | width preserved, interaction disabled, spinner replaces the label |

Hover, focus, and active transitions run at 120ms. No component invents its own state colors.

### Buttons

| Variant | Background | Text | Border | Use |
| --- | --- | --- | --- | --- |
| Primary | `primary` | `on-primary` | none | The one main action |
| Secondary | `canvas` | `text-primary` | 1px `border-strong` | Alternate, cancel, non-destructive |
| Ghost | transparent | `text-primary` | none | Toolbars, repeated row actions |
| Danger | `error` | `on-error` | none | Destructive action (always confirmed) |
| Icon | transparent or secondary | currentColor | contextual | Space-constrained actions |

- Heights and horizontal padding are paired. Do not mix them:

  | Height | Horizontal padding | Icon |
  | --- | --- | --- |
  | 28 | 8 | 16 |
  | 36 | 12 | 20 |
  | 44 | 16 | 20 |

- 8px gap between icon and label; radius 4px; 14px/600 label. Navigation and menu rows are the exception: 36px tall with 8px padding, because they are rows rather than controls. The ≤768px touch override raises heights to 44px without changing horizontal padding; the pairing governs the default control.
- One primary button per region. **MUST NOT** place two primary buttons in one view or one dialog.
- Disabled buttons are `text-disabled` on `surface-2` and **MUST** explain why on hover/focus. If the reason is not obvious, prefer an enabled button that explains on click.
- Loading buttons keep their width, disable interaction, and show a spinner in place of the label or icon.
- Destructive buttons label the action ("Delete project"), never "Yes" or "OK".

### Inputs and forms

- Height 36px (28 compact, 44 comfortable); radius 2px; 1px `border-strong`; background `canvas`; padding 0 12px.
- **Persistent labels above the field**, 14px/400 `text-primary`, 4px gap. Placeholders are examples only and never replace a label.
- Helper text 12px `text-muted`, 4px below the field. Error text 12px `error` with a 16px icon.
- Focus is a 2px `focus` ring with 2px offset; the border does not change color alone.
- **Validation:** validate on blur, then live after the first error. On submit, focus the first invalid field and announce the error via a polite live region. Never validate while the user is still typing the first attempt.
- **Layout:** single column. Two columns are allowed only for short, independent pairs (city/postal code, start/end date), and collapse below 768px.
- Required fields are marked; optional fields are marked "optional" when most fields are required. Do not mark both.
- Selects, textareas, and date fields share the same metrics. Textareas are at least 3 rows and resize vertically.
- Form width caps at 640px; prose between fields is capped at 72ch.

### Navigation

- Sidebar width 240px; items 36px tall, 8px horizontal padding, radius 4px, 16px icon, 14px/400 label.
- Selected state: `surface-2` fill, `text-primary` at 600, and a 2px `primary` bar inset 8px from the top and bottom of the item's left edge. **MUST NOT** rely on color alone; fill, weight, and the bar carry the state together.
- Hover uses `surface-2`; focus uses the standard ring. No underlines on nav items.
- Secondary navigation sits inline under a 1px `border-subtle` divider with 16px separation. Do not pin it to the bottom of the sidebar — its position is the same on every app shell.
- App bar: 48px, `#161616`/`#262626` background, 20px icons, 14px/400 labels, slots in order: menu (mobile only), wordmark, divider, workspace, spacer, theme toggle. It may be omitted on content, auth, and focused screens.
- **MUST** keep a skip link to main content in every app shell.
- Mobile navigation is contextual, but must be reachable in one tap and must not hide the current location.

### Tables

- Header 36px, `surface-2`, 14px/600, left-aligned text, right-aligned numerics with tabular figures.
- Rows 36px compact / 44px default, striped `surface` (alternating), 8px × 12px cell padding, 1px `border-subtle` below the header only.
- **MUST** preserve table structure below 768px via horizontal scrolling inside a bounded container. Never convert rows into cards.
- Sorting is indicated by an icon plus `aria-sort`; the active sort is never color-only.
- Row actions appear on hover and focus, and are always available in a menu for keyboard and touch users.
- Sticky headers are allowed for long tables. Empty results use the empty-state pattern, never a blank table body.

**Table or list?** Use a table when rows are scanned or compared across columns, or when sorting applies. Use a list when there is one primary column plus metadata and a trailing action, and no sorting axis. Lists use the same row heights (36/44/48) and a 1px `border-subtle` rule between rows; they never stripe. Do not convert one into the other to solve a layout problem — the choice is about the reading task, not the available width.

### Dialogs and overlays

- Width 480 / 640 / 800 by content; padding 24px; radius 6px; `overlay` shadow; backdrop `overlay` color. Max height 80vh with internal scrolling.
- Title 20px/600; actions bottom-right, secondary before primary. Escape closes, focus is trapped, and focus returns to the trigger.
- **MUST** be a real dialog primitive (focus trap, `role="dialog"`, `aria-modal`, labelled title). Do not imitate one with a positioned div.
- **MUST NOT** stack dialogs. If a flow needs two, it is a page.
- Prefer inline panels and drawers over dialogs for edit flows; reserve dialogs for confirmations, short forms, and blocking decisions.

### Feedback and loading

- Field errors inline. **MUST NOT** replace inline validation with a floating message.
- **MUST NOT use floating notifications (toasts).** Every outcome is reported in the document flow, next to the thing it describes:
  - Field error — inline under the field.
  - Save or action outcome — inline status beside the action or section heading; it persists until the next change.
  - Background completion or failure after navigation — inline status in the affected region, announced with `aria-live="polite"`.
  - Copy — a 2s inline confirmation next to the trigger.
- Success, warning, and error states are always icon + text. Neutral confirmations (copied, saved) may be text only. Errors persist; confirmations may clear after 6s. Nothing auto-dismisses while it is the only record of a failure.
- Success confirmation sits inline near the result. No celebratory messaging for ordinary saves.
- No indicator under 300ms. Above 300ms show local progress in the affected region; reserve skeletons for layouts already known, and never use a full-page spinner for a partial refresh.
- Progress is determinate when progress is measurable. Indeterminate spinners are acceptable only for unknown waits.
- **MUST** announce async state changes (`aria-live="polite"`) without stealing focus.

### Destructive actions

- **Every destructive action is confirmed** in a dialog that names the object and the consequence in the body and repeats the verb in the button ("Delete 3 files", not "Continue"). Removing a member, revoking access, and deleting a container all qualify.
- There is no undo affordance. Confirmation is the safety mechanism, so the dialog must be honest about what is removed, what happens to its contents, and whether it can be recreated.
- **MUST NOT** promise undo, and **MUST NOT** ask for confirmation on non-destructive actions — "Save", "Archive", and "Copy" never open a dialog.
- Deleting a container states what happens to its contents.
- Actions sit bottom-right, secondary before the destructive action. The destructive button uses `danger`, never `primary`.

### Component inventory

These are the components the system owns. Every one has an entry in this document; anything not listed is application-local and is added here before it ships.

- **App shell:** app bar, sidebar navigation, skip link, page header, section, toolbar.
- **Data:** table, list, tag, avatar, metric group, pagination, empty state.
- **Input:** button, icon button, text field, select, textarea, checkbox, radio.
- **Overlay:** menu, drawer, dialog.
- **Content:** code block, callout, table of contents, inline status.

Component anatomy is fixed: the same slots, metrics, and states everywhere. A second implementation of a listed component is a defect, not a variant.

## Patterns

**Empty states.** Two kinds, both in the document flow, neither illustration-heavy and neither a dead end.

- **Nothing yet** — the collection has never had items. One sentence of fact, one of action, one primary button: "No projects yet. Create a project to get started." If the view already owns a primary action, the empty state uses a secondary button so the view still has exactly one primary.
- **No results** — filters or search hid everything. State the fact and offer a secondary "Clear filters" as the only action; a primary here competes with the toolbar. Return focus to the search field.

**Search and filtering.** Search lives in the table or list toolbar, submits on Enter, and clears with Escape. Filters are visible controls with a count of active filters and a single "Clear all". Avoid hidden filter menus for primary filtering. Never debounce results past 300ms without showing a pending state.

**Search-first surfaces.** On a launcher or focused app, the search field is the first control and results sit directly below it. `/` focuses the field from anywhere outside an input, arrow keys move through results, Enter opens the focused result, Escape clears, and typing filters live. Show the `/` hint in the field, but never make the keyboard the only way to reach search.

**Settings.** Single column, capped at 800px, grouped by task with 24px section headings. Either save per section with inline confirmation, or autosave with a persistent status line — never both patterns on one page. Destructive settings are isolated in a final, clearly labelled section. When the page is one form, the save action sits at the end of the form and the page header carries no primary action.

**Auth and onboarding.** Focused shell, no navigation, 400–640px column. Labels above fields, one primary action, inline errors, password-manager-friendly (`autocomplete`, real `<form>`). Social or alternate methods sit below the primary form separated by a rule, never above it.

**Notifications.** Prefer inline status over badges. Badge counts cap at `99+`. No notification for anything the user just did and can already see.

## Content

- **Sentence case everywhere.** No all-caps labels, no title-case headings.
- **Buttons:** verb-first, 1–3 words — "Save changes", "Create project", "Delete file". Not "OK", "Submit", "Yes", or "Continue" where a verb fits.
- **Errors:** what happened, why, and what to do next. Two sentences maximum, no blame, no raw codes.
  - Good: "Couldn't save the project. The server returned an error — try again."
  - Bad: "Error 500: request failed."
- **Empty states:** one sentence of fact, one of action.
- **Confirmations:** the title asks the question, the body names the consequence, the button repeats the verb.
- **Voice:** second person, plain, specific. No exclamation marks, no "oops", no jokes in error paths, no emoji in UI chrome.
- **Dates:** ISO `2026-11-01` in tools and logs; localized in prose. Dates use the sans face with tabular figures — never monospace. Right-align them in table columns. Relative times only under 7 days, with the absolute value on hover and focus.
- **Identifiers:** slugs, email addresses, project IDs, and code use monospace at 13px (12px inside table cells), tabular where aligned. Never set a date in monospace.
- **Numbers and units:** thousands separators, always label the unit, tabular figures in columns.
- **Plurals:** use real pluralization, never "1 item(s)".
- **Links:** describe the destination ("Billing settings"), never "click here". Prose links use `primary` with a 1px underline and 2px offset; hover uses `primary-hover`. Prose is the only place `primary` may appear as text outside action, selection, and current state.

## Accessibility

These are acceptance criteria, not aspirations. A screen that fails one is not done.

- Text ≥ 4.5:1; large text ≥ 3:1; interactive boundaries and focus rings ≥ 3:1.
- **Focus is always visible:** 2px ring, 2px offset, `:focus-visible`. Never `outline: none` without an equivalent replacement. Verify on `canvas`, `surface`, `surface-2`, and both themes.
- Full keyboard operation in DOM order: Tab/Shift-Tab, Enter/Space to activate, Escape to close, arrow keys inside menus, tabs, and listboxes. No focus traps outside dialogs.
- Every control reachable and operable without a pointer. Drag interactions have a keyboard equivalent.
- Pointer targets ≥ 24px on desktop; touch targets ≥ 44px. The compact visual height of a 28px control does not reduce the touch target.
- Programmatic labels for every field; accessible names for icon-only buttons; meaningful `alt` text or `alt=""` for decorative images.
- Errors are announced and tied to their fields (`aria-describedby`); the first invalid field receives focus on submit.
- No meaning conveyed by color alone. Status, selection, and sorting all have a second channel.
- Reflow at 320px width and 400% zoom without two-dimensional page scrolling.
- `prefers-reduced-motion` respected; no essential information exists only in motion.
- Skip link in every app shell; `<main>` landmark; one `<h1>` per page; heading levels do not skip.

## Anti-patterns

| Symptom | Why it fails | Do instead |
| --- | --- | --- |
| Two or more primary buttons in a view | Competing calls to action, no hierarchy | One primary; demote the rest |
| Cards wrapping each table row | Destroys scanning and comparison | Keep the table; scroll horizontally |
| Shadowed cards and inputs | Elevation implies floating layers | Borders and whitespace |
| Gradient hero on a tool screen | Decoration competes with data | Flat canvas, strong type hierarchy |
| Purple-blue "AI" gradients | Off-system accent; instantly dated | Primary blue, restrained surfaces |
| All-caps eyebrows and labels | Reads as marketing chrome | Sentence case, weight for emphasis |
| Pill buttons and 16px radii | Off-system geometry, softens tool UI | 2/4/6px radius scale |
| Five accent colors on one dashboard | Nothing reads as important | One accent; status colors only for status |
| Centered dashboards and multi-zone forms | Breaks scanning and alignment | Left-align to a shared edge; a single-task focused column is the only centered form |
| Floating notification (toast) | Disappears, detaches from the thing it describes | Inline status beside the result |
| Confirming non-destructive actions | Trains users to click through dialogs | Confirm only destructive actions |
| Icon-only primary navigation on desktop | Slower to scan, hides labels | Labels with icons |
| Raw hex values in components | Bypasses theming and dark mode | Role tokens |
| Base16 slot numbers as roles | Light theme inverts the ramp | Role tokens per theme |
| Bordered cards around read-only stats | Adds containers that carry no information | Flatten; align labels and figures |
| A separate brand color for the wordmark | Splits the accent and implies a second system | Use `primary`, or `accent-on-dark` on the app bar |
| A second wordmark inside the drawer | Duplicates identity and steals focus | One app bar, one wordmark |
| Mixing padding across controls | Buttons and fields stop aligning | Bind padding to control height |

## Self-review checklist

Run before calling any screen finished.

1. Does the surface have exactly one primary action?
2. Is the accent confined to action, selection, focus, and current state?
3. Are all colors role tokens — zero raw hex in components?
4. Do both themes render with correct `on-primary`, borders, and status colors?
5. Is body text ≥ 4.5:1 and every interactive boundary ≥ 3:1?
6. Are type sizes from the scale, with no more than 3 content sizes in play (14 chrome, 12 caption, and 13 mono are exempt)?
7. Is every spacing value from the 4px scale?
8. Is there one alignment edge per region, and are numerics right-aligned?
9. Do all interactive controls define hover, focus, active, disabled, loading, and error states?
10. Is focus visible on every surface and in both themes?
11. Can the primary task be completed with the keyboard alone?
12. Does every field have a persistent visible label?
13. Are errors inline, specific, and announced?
14. Is every destructive action confirmed in a dialog that names the object and the consequence, with no undo promised and no confirmation on non-destructive actions?
15. Does the table survive 320px without becoming cards?
16. Does the layout reflow at 400% zoom?
17. Is motion removed under `prefers-reduced-motion`?
18. Is all copy sentence case, and does every button start with a verb?
19. Are empty, loading, and error states designed — not left blank?
20. Are icons Lucide, outlined, and labelled?
21. Does every region follow the container policy — no borders around read-only groups, lists, or form sections?
22. Do all interactive elements share the state table, including 120ms hover transitions?
23. Is every component on the screen listed in the inventory?
24. Is the theme preference stored under the same key as sibling applications?

## Decision log

| Date | Decision | Status |
| --- | --- | --- |
| 2026-11-01 | Adopt Oxocarbon base16 (dark and light) as the palette source | Confirmed |
| 2026-11-01 | Light canvas `#FFFFFF`; `#F2F4F8` as surface tint | Confirmed |
| 2026-11-01 | Primary resolves per theme: `#0F62FE` light, `#33B1FF` dark | Confirmed |
| 2026-11-01 | Error/warning/success defined outside base16, contrast-tested | Confirmed |
| 2026-11-01 | Radius 2/4/6px; `999px` for avatars and status dots only | Confirmed |
| 2026-11-01 | Type scale 12/14/16/20/24/32; weights 400 and 600 only | Confirmed |
| 2026-11-01 | Control heights 28/36/44; table rows 36/44 | Confirmed |
| 2026-11-01 | Two-level elevation: `raised` and `overlay`; no card shadow | Confirmed |
| 2026-11-01 | Motion 120/180/240ms with a single easing curve | Confirmed |
| 2026-11-01 | Adopt framework breakpoints 640/768/1024/1280 | Confirmed |
| 2026-11-01 | No floating notifications; feedback is inline only | Confirmed |
| 2026-11-01 | Destructive actions always confirmed; no undo affordance | Confirmed |
| 2026-11-01 | Control padding bound to control height (8/12/16 ↔ 28/36/44) | Confirmed |
| 2026-11-01 | Sidebar selection keeps the 2px primary bar | Confirmed |
| 2026-11-01 | App-shell drawer starts below the 48px app bar | Confirmed |
| 2026-11-01 | Grouped read-only stats carry no container | Confirmed |
| 2026-11-01 | One theme storage key and one token block across applications | Confirmed |
| 2026-11-01 | Focused app shell: 48px bar without navigation, 640px column | Confirmed |
| 2026-11-01 | Landing pages use the content shell; no marketing-only tokens | Confirmed |
| 2026-11-01 | Wordmark uses the accent (`primary` / `accent-on-dark`); no separate brand color | Confirmed |
| — | Logo/mark, illustration style, email templates | Open |
