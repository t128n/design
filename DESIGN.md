---
version: alpha
name: t128n
description: Personal, utility-first visual language for software applications and websites.
updated: "2026-11-01"
scheme:
  name: Oxocarbon
  source: https://github.com/nyoom-engineering/base16-oxocarbon
colors:
  light:
    canvas: "#FFFFFF"
    surface: "#F2F4F8"
    surface-2: "#DDE1E6"
    border-subtle: "#DDE1E6"
    border-strong: "#7A7A7A"
    text-primary: "#161616"
    text-secondary: "#525252"
    text-muted: "#6F6F6F"
    text-disabled: "#A8A8A8"
    primary: "#0F62FE"
    primary-hover: "#0353E9"
    on-primary: "#FFFFFF"
    accent-on-dark: "#33B1FF"
    app-bar: "#161616"
    app-bar-raised: "#262626"
    app-bar-text: "#F2F4F8"
    app-bar-text-secondary: "#C6C6C6"
    app-bar-divider: "#393939"
    selection: "rgba(15, 98, 254, 0.12)"
    error: "#DA1E28"
    error-hover: "#B81922"
    on-error: "#FFFFFF"
    warning: "#8A5A00"
    success: "#0E6027"
    overlay: "rgba(22, 22, 22, 0.5)"
  dark:
    canvas: "#161616"
    surface: "#262626"
    surface-2: "#393939"
    border-subtle: "#393939"
    border-strong: "#7A7A7A"
    text-primary: "#F2F4F8"
    text-secondary: "#C6C6C6"
    text-muted: "#8D8D8D"
    text-disabled: "#525252"
    primary: "#33B1FF"
    primary-hover: "#78A9FF"
    on-primary: "#161616"
    accent-on-dark: "#33B1FF"
    app-bar: "#262626"
    app-bar-raised: "#393939"
    app-bar-text: "#F2F4F8"
    app-bar-text-secondary: "#C6C6C6"
    app-bar-divider: "#393939"
    selection: "rgba(51, 177, 255, 0.16)"
    error: "#FF8389"
    error-hover: "#FF6B72"
    on-error: "#161616"
    warning: "#F1C21B"
    success: "#42BE65"
    overlay: "rgba(0, 0, 0, 0.6)"
charts:
  light: ["#0F62FE", "#0E6027", "#EE5396", "#673AB7", "#37474F", "#8A5A00"]
  dark: ["#33B1FF", "#42BE65", "#FF7EB6", "#BE95FF", "#82CFFF", "#F1C21B"]
typography:
  font-sans: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  font-mono: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
  caption:
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  body-content:
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-strong:
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.5
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
spacing:
  unit: 4px
  scale: [4, 8, 12, 16, 24, 32, 48, 64]
  page-desktop: 24px
  page-mobile: 16px
sizes:
  control-sm: 28px
  control-md: 36px
  control-lg: 44px
  app-bar-height: 48px
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
  light:
    raised: "0 1px 2px rgb(0 0 0 / 0.10)"
    overlay: "0 8px 24px rgb(0 0 0 / 0.18)"
  dark:
    raised: "0 1px 2px rgb(0 0 0 / 0.48)"
    overlay: "0 8px 24px rgb(0 0 0 / 0.56)"
motion:
  fast: 120ms
  base: 180ms
  overlay: 240ms
  easing: "cubic-bezier(0.2, 0, 0.38, 0.9)"
z:
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

A minimal, technical, enterprise-influenced visual language for personal applications, developer tools, dashboards, and consumer-facing experiences. Optimize for clarity, utility, predictability, and low visual noise; the identity should be subtly recognizable rather than expressive. The result should feel like a precision instrument: calm, dense, and legible under pressure.

> **Prefer defaults over rules.** This document defines a consistent starting point, not a complete specification of every interface. Reuse established components and platform conventions. Deviate when the application needs it; add shared rules only when repeated implementations demonstrate a genuine need.

This document owns cross-application decisions: tokens, component appearance, and acceptance criteria. Applications implement their own components from it rather than building a parallel language.

When rules conflict, resolve in this order: accessibility and platform correctness → browser and OS convention → this document → application-local choices → component-library defaults. Deliberate deviations are fine; record them in the application's design notes.

**Rule tiers.** MUST is reserved for accessibility, tokens/contrast/focus, and destructive honesty. SHOULD is the default; deviate with a one-line reason. MAY is context-dependent.

**Open.** Not decided here: logo and mark usage, illustration style, email and document templates, icon sets beyond Lucide, and application information architecture, navigation labels, and page structure.

## Identity

### Principles

Where principles conflict, legibility and safety outrank density and speed.

1. **Every pixel carries information.** If removing it doesn't cost comprehension or speed, remove it.
2. **Density is a feature; legibility is the floor.** A returning power user should finish the primary task without scrolling or drilling in — but density never wins a contrast, target-size, or focus test.
3. **One accent, earned.** More than one accent-colored element in a region needs a reason.
4. **Structure comes from alignment and rules, not depth.** Disable every shadow; hierarchy must survive.
5. **Predictability over novelty.** A user should be able to guess where a control lives and what it is called.

### Signature moves

The recognizable t128n traits. Use these consistently; they are the identity.

- A **48px app bar** above the canvas, a **240px sidebar** on `surface`, and a 1px `app-bar-divider` between the bar and the page.
- **1px `border-subtle`** doing the structural work instead of shadows.
- **Oxocarbon blue** as the only accent: `primary` in content and `accent-on-dark` on the app bar. The wordmark uses the same accent — there is no separate brand color.
- **14px Geist Sans** at 400 and 600 (16px on content screens). **Geist Mono** only for code, technical identifiers, and aligned numerals.
- **Subtly striped tables** on `surface`, never enclosed in a container.
- **36px default controls** with 24px page padding, and 36px compact rows.

## Tokens

Token values live in the front matter. This section governs their use.

### Color

The palette is derived from **Oxocarbon** (base16). Components consume role tokens — never raw hex, and never `base00`–`base0F`: Oxocarbon Light inverts its ramp, so base16 slot numbers do not map to UI roles across themes.

Oxocarbon contains **no red**; `base08` is cyan in dark and pink in light. Error, warning, and success come from outside the scheme, chosen for contrast. Do not "correct" them back toward slot names.

**Roles:**

| Role | Use |
| --- | --- |
| `canvas` | Page background; the base layer |
| `surface` | Sidebar, stripes, blocked regions; the first tint |
| `surface-2` | Table headers, hover, selected rows; the state layer |
| `border-subtle` | Structural separation |
| `border-strong` | Interactive boundaries: inputs, controls, buttons |
| `text-primary` | Body, headings |
| `text-secondary` | Supporting copy, labels, and metadata on any layer |
| `text-muted` | Placeholders and helper text on `canvas` and `surface` only |
| `text-disabled` | Disabled labels only |
| `primary` | Wordmark, actions, selection, and the focus ring |
| `primary-hover` | Hover and pressed state for primary actions |
| `accent-on-dark` | Wordmark and focus ring on the dark app bar |
| `app-bar`, `app-bar-raised`, `app-bar-text`, `app-bar-text-secondary`, `app-bar-divider` | The dark chrome and its states |
| `on-primary`, `on-error` | Text on solid `primary` and `error` fills |
| `error`, `error-hover` | Error text, error borders, and the danger button |
| `warning` | Warning text and icons |
| `success` | Success text and icons |
| `selection` | Text-selection overlay |
| `overlay` | Modal backdrop |

**Contrast (MUST).** Body text ≥ 4.5:1, large text ≥ 3:1, interactive boundaries and focus rings ≥ 3:1 — measured on the layer the element actually sits on. Verified against canvas: `text-primary` 18.1/16.4, `text-secondary` 7.8/10.6, `text-muted` 5.0/5.5, `primary` 5.0/7.7. On the app bar, `app-bar-text` clears 16.4/13.7, `app-bar-text-secondary` 10.6/8.9, and `accent-on-dark` 6.4.

**State layer.** `surface-2` is a fill-only state layer: `text-primary` and `text-secondary` only — no `text-muted`, status text, borders, or controls. Metadata inside a selected row uses `text-secondary`, and `primary` as text on `surface-2` is 3.8:1, below threshold. The ramp shortens on tints instead of gaining variations.

**Accent on dark chrome.** The app bar is dark in both themes, so the accent resolves to `accent-on-dark` there — wordmark and focus ring, never `primary`.

**Accent budget.** One primary action per screen; a dialog or independent section is its own scope. Accent marks the wordmark, the primary action, selection, focus, and current state — not headings, surfaces, or decorative borders.

**Selection.** Text selection uses the `selection` overlay and keeps `text-primary`. Persistent selection — rows, list items, navigation — uses `surface-2` plus the leading bar described under Interactive states. Never invert text or fill a row with solid primary.

**Status.** Always icon and text, never color alone. Status colors are text and icons; the only solid status fill is the danger button, `error` with `on-error`.

**Charts.** Use the ordered `charts` set, maximum 6 series, each labelled. Chart colors are positional, not semantic: never borrow a status color to mean status. Area fills ≤ 20% opacity.

**Theme.** Follow the OS preference with a manual override persisted per user, and ship both themes complete — never a light-only or dark-only screen. The override survives reloads and, where there are accounts, follows the user; clearing it returns to the OS preference.

### Typography

- **Fonts:** Geist Sans for UI and prose; Geist Mono only for code, technical identifiers, and aligned numerics. Monospace is functional, never stylistic: no mono for labels, headings, or decoration. Weights: **400 and 600** only; no italics in UI chrome.
- **Scale:** 12 caption · 14 body · 16 `body-content` · 20 section heading · 24 page heading · 32 page title · 13 mono. **MUST NOT** add interface sizes between these or go below 12px.
- **Per shell:** app and focused app screens run body at **14px** with a 24px page heading. Content screens run `body-content` at **16px** with a 32px page title and 20px section headings. Navigation, tables, controls, and captions stay at 14/12; monospace at 13.
- **Line height:** 1.2 for the 32px title, 1.25–1.3 for 20–24px headings, 1.5 for UI, 1.6 for prose.
- **Tracking:** 0 by default; `-0.01em` at 24px and above.
- **Case:** sentence case for headings, labels, navigation, buttons, table headers, and menu items. No all-caps or title case except proper nouns.
- **Hierarchy:** establish with size, weight, and spacing — not color, underlines, or rules. No more than 3 content sizes and 2 weights in one screen; chrome sizes (14/12/13) are exempt.
- **Prose:** 60–80 characters per line (`prose-max: 72ch`). Dashboards, tables, code, and tools use available width.
- **Numerals:** tabular figures in tables, metrics, and any vertically aligned figures.
- **Label–value rows:** label left at body size, value right-aligned on the same baseline, one pair per line, tabular figures. Identifiers take mono 13 (12 in table cells); dates, counts, and figures stay in sans. Rows take their height from the density scale, sit on 1px `border-subtle` rules with a top rule under the heading, and carry no container.
- **Truncation:** end-truncate prose, middle-truncate identifiers (`abcdef…xyz`); full value on hover and focus. **MUST NOT** truncate the only copy of a value.

### Spacing and density

- **MUST** use the 4px scale for layout spacing: `4 8 12 16 24 32 48 64`. Icon sizes, radii, border widths, and control heights are separate tokens, not spacing.
- Page padding: **24px** desktop, **16px** below 768px.
- **Rhythm:** groups 4–8 inside a field or row; blocks 12–24 apart; page regions 24–32; form and content sections 48. A section gap is always larger than the gap inside it.
- **Alignment:** one edge per region. Left-align content, labels, and headings; right-align numeric table columns and trailing actions.
- **Density:**

| Mode | Control height | Row height | Typical use |
| --- | --- | --- | --- |
| Compact | 28px | 36px | Monitoring, triage, power tools |
| Default | 36px | 44px | Most application UI |
| Comfortable | 44px | 48px | Touch-first and low-frequency forms |

Density is declared once per product, not per screen. App and focused app shells default to **Default**; a monitoring or triage tool may declare **Compact**; a touch-first flow may declare **Comfortable**. The declaration applies to controls, navigation rows, list rows, and table rows alike. Below 768px, controls and rows have a 44px minimum; a comfortable 48px row stays 48.

### Shape

- Radius follows the element class, not the component: **2px** for controls, inputs, tags, checkboxes, and code; **4px** for containers — cards, menus, popovers; **6px** for dialogs and drawers; **999px** only for avatars and status dots.
- Nested controls stay concentric: `outer − inset`, minimum 2px. Mixed radii inside one component are expected once a control sits in a container.
- Borders are 1px; 2px is reserved for focus rings and selection indicators.
- No pill-shaped buttons, no fully rounded cards, and outlined fields only.

### Elevation

- Default to no elevation. Separate with whitespace, `surface`, and `border-subtle`.
- Shadows are theme-scoped — same geometry, stronger in dark. Menus and popovers use `raised`; dialogs and the mobile drawer use `overlay` with a backdrop.
- Overlays animate at 240ms and use the fixed `z` order: sticky 10, dropdown 20, backdrop 30, dialog 40. Do not invent intermediate values.
- Every overlay establishes its own stacking context, so a menu inside a dialog sits above that dialog. A dialog and a drawer never stack.
- Containers are for things that float, scroll, or are discrete objects: menus, dialogs, drawers, code blocks, callouts. Tables, lists, grouped stats, and form sections get whitespace and rules, not containers.
- **MUST NOT** put shadows on cards, inputs, table rows, or buttons, or build an elevation scale beyond these two.

### Motion

- 120ms for hover, focus, and toggles; 180ms for expand and view changes; 240ms for overlays.
- Easing: `cubic-bezier(0.2, 0, 0.38, 0.9)`. No bounce, spring overshoot, or parallax.
- Animate color, background, border, opacity, and transform; never layout. No decorative or looping animation, and do not mix snap states with animated ones.
- **MUST** honor `prefers-reduced-motion: reduce` by removing transforms and shortening transitions to an instant state change.

### Iconography

- **Lucide outlined icons only**: 16px inline, 20px in controls, 24px for standalone actions. Library-default stroke width; never mix filled and outlined styles.
- Icons supplement labels. Icon-only controls need an accessible name and reveal it on hover and focus.
- **MUST NOT** use emoji, flags, or bespoke SVG sets as UI chrome.

## Layout

### Shells

- **App shell** (tools, dashboards): 48px app bar, 240px sidebar, 24px content padding. App bar uses `app-bar` with a 1px `app-bar-divider` bottom edge; sidebar is `surface`; content is fluid. The sidebar begins below the app bar.
- **Content shell** (marketing, docs, reading): no sidebar, optional compact header, prose constrained to `prose-max`, 48–64px between sections. Its mobile navigation is a panel below the header, not a drawer.
- **Focused shell** (auth, onboarding, single-task): no navigation chrome, a centered column no wider than 640px, one primary action.
- **Focused app shell** (launchers, search-first tools): a 48px app bar carrying identity, context, and account only — no navigation — and a centered column no wider than 640px. The column is a single task, left-aligned inside.

The shell is chosen per screen, not per product: a marketing page and the app it advertises may share tokens and share no layout.

**Page header.** Title 24px/600 (32px on content screens), optional description 14px `text-secondary` capped at 72ch, primary action aligned right on the same baseline — the one deliberate exception to the single alignment edge — and a 24px gap to content. When the page is a single form, the primary action belongs to the end of that form instead.

**Responsive.** Adopt the framework breakpoints (640/768/1024/1280). Below 1024px the app-shell sidebar becomes a modal drawer below the app bar: focus is trapped and returns to the toggle; Escape, backdrop click, or the toggle closes it. Below 768px padding drops to 16px and controls and rows have a 44px minimum. Tables scroll horizontally by default; another responsive presentation is acceptable when cross-column comparison isn't the reading task. Verify no horizontal page scroll at 320px.

## Components

Components come from the application's existing library. These rules constrain configuration, not implementation.

### Interactive states

Define the states that apply to each control — loading and error only where they can occur. Color alone never carries a state.

| State | Treatment |
| --- | --- |
| Default | role tokens only |
| Hover | one layer down: `canvas` steps to `surface`, `surface` to `surface-2`. Striped table rows always hover to `surface-2`. |
| Active | `surface-2`; primary and danger buttons use their variant hover color |
| Focus | 2px `primary` ring, 2px offset; `accent-on-dark` on the app bar |
| Selected / current | `surface-2` fill plus the 2px `primary` leading bar; navigation adds 600 weight. A hovered row shows no bar, so fill alone never means selected. Rows keep 400 weight so columns do not shift. |
| Disabled | `surface-2` fill plus `text-disabled`; may fall below 4.5:1 but must still read as disabled by fill and label together. Prefer a persistent reason beside the control. |
| Loading | Interaction disabled, the label replaced by a progress indicator, the accessible name preserved, and the width stable |
| Error (fields) | `error` border plus 12px `error` text with a 16px icon, tied to the field |

Hover, focus, and active transitions run at 120ms. No component invents its own state colors.

### Control sizing

Height, horizontal padding, and icon size are bound. Buttons, inputs, selects, and date fields use the triple below; textareas use the same horizontal padding and a minimum of 3 rows.

| Height | Horizontal padding | Icon |
| --- | --- | --- |
| 28 | 8 | 16 |
| 36 | 12 | 20 |
| 44 | 16 | 20 |

Navigation and menu rows follow the density's control height with 8px horizontal padding and a 16px icon: their labels lead, the icon supports. Below 768px the touch override raises heights to 44px without changing horizontal padding.

### Buttons

| Variant | Background | Text | Border | Use |
| --- | --- | --- | --- | --- |
| Primary | `primary` | `on-primary` | none | The main action |
| Secondary | `canvas` | `text-primary` | 1px `border-strong` | Alternate, cancel, non-destructive |
| Ghost | transparent | `text-primary` | none | Toolbars, repeated row actions |
| Danger | `error` | `on-error` | none | Destructive action |
| Icon | transparent or secondary | currentColor | contextual | Space-constrained actions |

- Sizes follow control sizing; 8px gap between icon and label; radius 2px; 14px/600 label.
- One primary button per screen or independent section; never two in one dialog.
- Disabled buttons use the disabled state. If the reason is not obvious, prefer an enabled button that explains on click, or persistent helper text.
- Destructive buttons label the action ("Delete project"), never "Yes" or "OK".

### Inputs and forms

- Height 36px (28/44 by density); radius 2px; 1px `border-strong`; background `canvas`; horizontal padding from control sizing.
- **Persistent labels above the field**, 14px/400 `text-primary`, 4px gap. Placeholders are examples only and never replace a label.
- Helper text 12px `text-muted`, 4px below the field. Error text 12px `error` with a 16px icon.
- Focus is the standard 2px ring; the border does not change color alone.
- Single column. Two columns are allowed only for short, independent pairs (city/postal code, start/end date), and collapse below 768px.
- Required fields are marked; optional fields are marked "optional" when most fields are required. Do not mark both.
- Selects, textareas, and date fields share these metrics. Textareas are at least 3 rows and resize vertically. Form width caps at 640px.

### Navigation

- Sidebar width 240px; items at the density's control height, 8px horizontal padding, radius 2px, 16px icon, 14px/400 label.
- Selected state: `surface-2` fill, `text-primary` at 600, and a 2px `primary` bar inset 8px from the top and bottom of the item's left edge. Fill, weight, and the bar carry the state together — never color alone.
- Hover uses `surface-2`; focus uses the standard ring. No underlines on nav items.
- Secondary navigation sits inline under a 1px `border-subtle` divider; do not pin it to the bottom of the sidebar.
- App bar: 48px, `app-bar` background with a 1px `app-bar-divider` bottom edge, `app-bar-text` labels, `app-bar-text-secondary` for secondary context, 20px icons, 14px/400 labels. Slots: menu (mobile only), wordmark, divider, workspace, spacer, theme toggle. It may be omitted on content, auth, and focused screens.
- **MUST** keep a skip link to main content in every app shell.
- Mobile navigation is contextual, but must be reachable in one tap and must not hide the current location.

### Tables

- Header 36px, `surface-2`, 14px/600; text left-aligned, numerics right-aligned with tabular figures.
- Rows 36/44/48 by density, striped `surface` against `canvas`, 8px × 12px cell padding, 1px `border-subtle` below the header only. A table is page structure, not an object: no surrounding border, radius, or card.
- Hover uses `surface-2` on every row. Selected rows use `surface-2` plus the 2px `primary` leading bar and keep 400 weight so columns do not shift.
- Sorting is shown by an icon on the header control plus a change in its label, never color alone.
- Row actions appear on hover and focus, and are always available in a menu for keyboard and touch users.
- Search and filters sit in the table or list toolbar as visible controls; avoid hidden filter menus for primary filtering.
- Sticky headers are allowed for long tables. Empty results use the empty-state pattern, never a blank table body.

**Table or list?** Use a table when rows are scanned or compared across columns, or when sorting applies. Use a list when there is one primary column plus metadata and a trailing action, with no sorting axis. Lists use the same row heights (36/44/48) and a 1px `border-subtle` rule between rows; they never stripe.

### Dialogs and overlays

- Width 480/640/800 by content; padding 24px; radius 6px; `overlay` shadow; backdrop `overlay` color. Max height 80vh with internal scrolling.
- Title 20px/600; actions bottom-right, secondary before primary.
- **MUST** be a real modal: focus trapped, labelled by its title, dismissed by Escape, and focus returned to the trigger. Do not imitate one with a positioned div.
- **MUST NOT** stack dialogs. If a flow needs two, it is a page.
- Prefer inline panels and drawers over dialogs for edit flows; reserve dialogs for confirmations, short forms, and blocking decisions.

### Feedback

- Inline is the default: field errors under the field, outcomes beside the action or section heading until the next change, background results in the region they affect, copy confirmations beside the trigger. Floating notifications are acceptable only for global background events that have no persistent region.
- Success, warning, and error are always icon and text; neutral confirmations may be text only. Failures persist until the next change; confirmations may clear.
- No indicator under 300ms. Above that, show progress in the region that is waiting; reserve skeletons for layouts already known and never block the whole screen for a partial refresh. Progress is determinate when measurable.
- Async results are announced without moving focus.

### Destructive actions

- Confirm when the action is irreversible or high-impact, in a dialog that names the object and the consequence and repeats the verb in the button ("Delete 3 files", not "Continue"). Low-impact, easily reversible removals may proceed without a dialog.
- Undo is allowed where the application supports it reliably; the dialog must be honest about what is removed and whether it can be recreated.
- Destructive actions live on the object's own screen — the row menu, the detail page, the danger zone — never inside an edit form or an edit drawer.
- **MUST NOT** ask for confirmation on non-destructive actions — "Save", "Archive", and "Copy" never open a dialog. Actions sit bottom-right, secondary before the destructive action, and the destructive button uses danger, never primary.

### Patterns

**Empty states.** Two kinds, both in the document flow and neither a dead end. "Nothing yet" states the fact and offers one action — primary unless the screen already owns one, then secondary. "No results" states the fact and offers a secondary "Clear filters" as the only action.

**Settings.** Single column, capped at 800px, grouped by task with 20px section headings. Destructive settings are isolated in a final, clearly labelled section. When the page is one form, the save action sits at the end of the form and the page header carries no primary action.

**Auth and onboarding.** Focused shell, no navigation, 400–640px column; labels above fields, one primary action, inline errors, password-manager-friendly. Social or alternate methods sit below the primary form, separated by a rule.

### Component inventory

Illustrative, not exhaustive. Anything else is application-local: keep it consistent with these rules and add it here when it ships.

- **Shell:** app bar, sidebar navigation, skip link, page header.
- **Data:** table, list.
- **Input:** button, icon button, text field, select, textarea, date field, checkbox, radio.
- **Overlay:** menu, drawer, dialog.
- **Content:** code block, callout, inline status.

## Quality bar

### Accessibility

Acceptance criteria; a screen that fails one is not done.

- Text ≥ 4.5:1 (disabled labels exempt); large text ≥ 3:1; interactive boundaries and focus rings ≥ 3:1 — measured on the layer the element sits on.
- Focus is always visible: 2px ring, 2px offset, on keyboard focus. Never remove it without an equivalent.
- Full keyboard operation in DOM order: Tab and Shift-Tab, Enter or Space to activate, Escape to close, arrows inside menus and composite widgets. Focus is trapped only in modal overlays.
- Every control is reachable and operable without a pointer. Drag interactions have a keyboard equivalent.
- Pointer targets ≥ 24px on desktop; touch targets ≥ 44px. A compact 28px control does not shrink the touch target.
- Every field has a visible label and an accessible name; every icon-only control carries a name and reveals its label on hover and focus.
- Errors are tied to their field and announced; the first invalid field receives focus on submit.
- No meaning is carried by color alone: status, selection, and sorting each have a second channel.
- Reflow at 320px and 400% zoom without two-dimensional page scrolling.
- `prefers-reduced-motion` is honored; no information exists only in motion.
- Every app shell has a skip link, one main landmark, one `h1` per screen, and no skipped heading levels.
- Focus moves only in response to the user's action — never on a timer, a background update, or a filter change.

### Content

- **Sentence case everywhere.** No all-caps labels, no title-case headings.
- **Buttons:** verb-first, 1–3 words — "Save changes", "Create project", "Delete file". Not "OK", "Submit", or "Yes" where a verb fits.
- **Errors:** what happened, why, and what to do next. Two sentences maximum, no blame, no raw codes. "Couldn't save the project. The server returned an error — try again."
- **Voice:** second person, plain, specific. No exclamation marks, no jokes in error paths, no emoji in UI chrome.
- **Dates and identifiers:** ISO `2026-11-01` in tools and logs, localized in prose; dates in sans with tabular figures, never mono. Slugs, email addresses, IDs, and code use mono 13 (12 in table cells).
- **Numbers and links:** thousands separators, units always labelled, real plurals. Describe link destinations ("Billing settings"); prose links use `primary` with a 1px underline and 2px offset.

### Self-review checklist

1. One primary action per scope, and the accent only on the wordmark, action, selection, focus, and current state.
2. Role tokens only — no raw hex — and both themes render complete.
3. Contrast floors met on the layer each element actually sits on (no muted or status text on `surface-2`).
4. The primary task completes with the keyboard alone, with visible focus and the applicable states defined.
5. Every field has a persistent label; errors are inline, specific, and announced.
6. Destructive actions are named and honest about their consequence, and confirmed when irreversible.
7. The layout reflows at 320px and 400% zoom, and respects `prefers-reduced-motion`.
8. Copy is sentence case, buttons are verb-first, and empty, loading, and error states are designed.
