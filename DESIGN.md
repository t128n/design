# DESIGN.md

## 1. Philosophy

One voice: **calm, dense, utilitarian, document-like.** The influences are Linear (surfaces, density), GitHub and GitLab (tables, lists, forms), Notion (pages, properties, database views, soft tags) and Obsidian (quiet chrome).

1. **Hierarchy by role.** Every size is a named type role on one of three text tiers. Every region has one dominant element.
2. **Surfaces before lines.** App, panel and sunken surfaces separate regions. Hairlines appear only at panel edges, between table rows and on controls.
3. **One header anatomy.** Every header looks the same (section 7.1).
4. **A 4px grid.** Rows 36, controls 28, property rows 32, headers 48.
5. **Soft but small.** 4px radius on controls, 7px on containers. Fully round only for avatars, switches and progress bars.
6. **Color is information.** Accent means interaction. Status color always pairs with a glyph or text.
7. **Quiet until needed.** Secondary actions appear on hover or selection. Selection is a tint.
8. **Feedback in place.** Inline errors, optimistic updates with rollback, no toasts.
9. **Flat, with overlays.** Only menus, popovers, dialogs and the command palette are elevated.
10. **Keyboard first.** Every list and menu is navigable. Focus is a 2px accent ring.

---

## 2. Tokens

Three layers, all CSS custom properties:

1. **Primitives:** raw values shared by two or more semantic tokens. Prefixed `--prim-`. Never referenced by components.
2. **Semantic:** the only layer components and agents may use.
3. **Density:** `--row-h` and the values that change with it.

A semantic token may hold a literal value directly. A primitive exists only when a value is shared: today that is `--prim-line-rgb` (`0 0 0` light, `255 255 255` dark), which the border tokens compose alpha onto.

Tokens are declared on `:root` and on a scoping class so any container can carry its own theme, density and line mode.

### 2.1 Surfaces and text

| Token | Light | Dark | Use |
|---|---|---|---|
| `--surface-app` | `#f1f2f5` | `#0e0e10` | App chrome, sidebar |
| `--surface-panel` | `#ffffff` | `#161618` | Content panels, controls, cards, headers, toolbars, overlays |
| `--surface-sunken` | `#f5f6f8` | `#1c1c1f` | Wells, code blocks, table header fills, callouts, disabled fills |
| `--surface-inverse` | `#1a1c20` | `#ececf0` | Tooltip background |
| `--text-1` | `#1a1c20` | `#ececf0` | Primary text, titles, values |
| `--text-2` | `#454c56` | `#a6abb4` | Secondary text, descriptions, labels, disabled text |
| `--text-3` | `#656c76` | `#868c96` | Metadata, timestamps, placeholders |
| `--text-on-inverse` | `#ffffff` | `#1a1c20` | Text on `--surface-inverse` |
| `--text-on-accent` | `#ffffff` | `#0e0e10` | Text on accent fills |
| `--text-on-danger` | `#ffffff` | `#0e0e10` | Text on danger fills |
| `--accent` | `#0f62fe` | `#78a9ff` | Links, primary buttons, focus, selection accents |

`--text-3` passes 4.5:1 on all three surfaces (section 3). Placeholders use `--text-3`; disabled text uses `--text-2` so the two are never confused.

**Region surfaces.** One surface per region, no exceptions:

| Region | Surface |
|---|---|
| Sidebar, app chrome | `--surface-app` |
| Panes, headers, toolbars, cards, overlays | `--surface-panel` |
| Table header row, wells, code, callouts | `--surface-sunken` |

### 2.2 Status and tags

Status tokens are semantic. Tag tokens are hues; a tag never carries status meaning.

| Status | Light | Dark |
|---|---|---|
| `--success` | `#198038` | `#42be65` |
| `--warning` | `#946200` | `#f1c21b` |
| `--danger` | `#da1e28` | `#fa4d56` |
| `--info` | `#0072c3` | `#33b1ff` |

| Tag | Light | Dark |
|---|---|---|
| `--tag-neutral` | `#454c56` | `#a6abb4` |
| `--tag-blue` | `#0f62fe` | `#78a9ff` |
| `--tag-green` | `#198038` | `#42be65` |
| `--tag-yellow` | `#946200` | `#f1c21b` |
| `--tag-red` | `#da1e28` | `#fa4d56` |
| `--tag-violet` | `#8a3ffc` | `#be95ff` |

**Accent or info, never both.** `--accent` is interaction only: links, primary actions, focus, selection. `--info` is informational status only and is never interactive. If a value could read as either, it is not status.

`--warning`, `--danger`, `--info` and `--tag-violet` extend the palette beyond Oxocarbon, which has no yellow or red. `--accent`, `--success` and the neutral ramp derive from Oxocarbon; the tag palette reuses those values rather than defining new ones.

### 2.3 Borders

One color token plus one alpha token, so the line mode changes without changing component code.

| Token | Definition | Use |
|---|---|---|
| `--border` | `rgb(var(--prim-line-rgb) / var(--border-alpha))` | Hairlines: panel edges, table rows |
| `--border-control` | `rgb(var(--prim-line-rgb) / max(var(--border-alpha) * 2, .2))` | Controls, so they stay visible when lines are off |
| `--border-strong` | `rgb(var(--prim-line-rgb) / max(var(--border-alpha) * 3, .24))` | Overlay edges, danger-zone frames |

Line mode is a container attribute:

```css
:root                    { --border-alpha: .08; } /* faint, the default */
[data-lines="none"]      { --border-alpha: 0; }
[data-lines="visible"]   { --border-alpha: .16; }
```

Every border token is a color in every mode. No token in this document ever holds an alpha value except the `*alpha` and `*tint*` knobs, and those are always consumed by a color function.

### 2.4 States and tints

| Token | Definition | Use |
|---|---|---|
| `--state-hover` | `color-mix(in srgb, var(--text-1) 5%, transparent)` | Row, item and control hover |
| `--state-selected` | `color-mix(in srgb, var(--text-1) 8%, transparent)` | Selected rows, cards, nav items, menu items |
| `--state-pressed` | `color-mix(in srgb, var(--text-1) 12%, transparent)` | Pressed controls |
| `--accent-soft` | `color-mix(in srgb, var(--accent) 12%, transparent)` | Selection accents, today's ring |
| `--surface-subtle` | `color-mix(in srgb, var(--text-1) 10%, transparent)` | Avatar fills, progress tracks, inert chips |
| `--tint-weak` | `9%` | Banner fills |
| `--tint` | `14%` | Tag fills, soft status chips |
| `--tint-strong` | `24%` | Banner borders, chart bars, emphasis fills |

Status and tag fills are composed at the point of use, so one pair of knobs covers the whole palette:

```css
background: color-mix(in srgb, var(--success) var(--tint-weak), var(--surface-panel));
border-color: color-mix(in srgb, var(--success) var(--tint-strong), var(--surface-panel));
```

### 2.5 Radius, spacing and size

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | `2px` | Checkboxes, kbd, inline code |
| `--radius-md` | `4px` | Controls, rows, card inner elements |
| `--radius-lg` | `7px` | Containers, panels, menus, dialogs |
| `--radius-full` | `999px` | Avatar, switch, progress only |
| `--space-1` | `4px` | Icon gap, tight pairs |
| `--space-2` | `8px` | Optical pull, control inset |
| `--space-3` | `12px` | Control padding, list inset |
| `--space-4` | `16px` | Board gap, block rhythm |
| `--space-5` | `20px` | Page inset |
| `--space-6` | `24px` | Section rhythm |
| `--size-0` to `--size-5` | `12, 16, 20, 24, 32, 40px` | Icons, avatars, chips, glyphs |
| `--icon` | `16px` | The one icon size in chrome (= `--size-1`) |

Radius values are fixed per theme, not multiplied. Off-grid values are not derived from `--radius-md`.

### 2.6 Density

Density is a property of a **container**, set with `data-density`. Components read the tokens; the values are never computed from each other.

| Mode | `--row-h` | `--row-h-sm` | `--control-h` |
|---|---|---|---|
| Compact | 32 | 28 | 24 |
| Default | 36 | 32 | 28 |
| Comfortable | 44 | 36 | 36 |

```css
:root                       { --row-h: 36px; --row-h-sm: 32px; --control-h: 28px; }
[data-density="compact"]    { --row-h: 32px; --row-h-sm: 28px; --control-h: 24px; }
[data-density="comfortable"]{ --row-h: 44px; --row-h-sm: 36px; --control-h: 36px; }
```

Default is 36. Compact is the exception for dense data views. Comfortable is applied to `:root` under `@media (pointer: coarse)`; container queries cannot set container tokens, so coarse pointers are a root-level default that a container may still override.

Fixed heights, independent of density:

| Token | Value | Use |
|---|---|---|
| `--header-h` | `48px` | Headers (7.1) and the command palette input |
| `--chip-h` | `20px` | Tags and badges (= `--size-2`) |
| `--calendar-cell-h` | `84px` | Minimum calendar cell |
| `--textarea-min-h` | `84px` | Minimum textarea |

### 2.7 Layout widths

| Token | Value | Use |
|---|---|---|
| `--page-inset` | `--space-5` | Horizontal inset for headers, page bodies, table first and last cells |
| `--list-inset` | `--space-3` | Gutter around list rows |
| `--width-detail` | `400px` | Detail pane in a split view |
| `--width-dialog` | `440px` | Dialog width |
| `--width-reading` | `720px` | Long-form reading column |
| `--width-label` | `128px` | Property label column |

### 2.8 Elevation, motion and layering

```css
:root {
  --shadow-overlay: 0 12px 32px rgb(20 24 31 / .16), 0 2px 6px rgb(20 24 31 / .08);
  --duration-fast: 90ms;
  --ease-standard: cubic-bezier(.2, 0, 0, 1);
  --ring-width: 2px;
  --ring-offset: 1px;
  --ring-color: var(--accent);
}

[data-theme="dark"] {
  --shadow-overlay: 0 12px 32px rgb(0 0 0 / .55), 0 2px 6px rgb(0 0 0 / .4);
}
```

The shadow is defined once per theme. A second declaration of the same property in the same block silently wins in every theme, which is how a light theme ends up with a dark shadow.

| Token | Value | Use |
|---|---|---|
| `--layer-popover` | `100` | Popovers, date picker |
| `--layer-menu` | `200` | Menus, slash menu |
| `--layer-dialog` | `300` | Dialogs |
| `--layer-palette` | `400` | Command palette |
| `--layer-tooltip` | `500` | Tooltips, always last |

### 2.9 Naming grammar

`--<role>[-<variant>]`, lower-case, hyphenated. Roles are nouns, such as: `surface`, `text`, `border`, `accent`, `success`, `tag`, `state`, `radius`, `space`, `size`, `inset`, `row`, `control`, `type`, `width`, `layer`.

1. One token, one CSS type. A color token is always a color; an alpha knob always ends in `-alpha` or is one of the `--tint*` knobs.
2. No single letters. No abbreviations: `--control-h`, not `--ctl`; `--radius-md`, not `--r`.
3. Digits take a separator: `--text-1`, not `--fg1`.
4. `--prim-` marks a primitive. A component that uses one is wrong, and a linter can see it.
5. Add a token only when a component needs a value no existing token can express. A new token needs a stated reason in the commit message.

---

## 3. Contrast (measured)

WCAG 2.x contrast ratios, computed from the values in section 2.

| Pair | Light | Dark |
|---|---|---|
| `--text-1` on panel | 17.1 | 15.3 |
| `--text-1` on app | 15.2 | 16.4 |
| `--text-2` on panel | 8.7 | 7.8 |
| `--text-2` on app | 7.8 | 8.4 |
| `--text-3` on panel | 5.3 | 5.3 |
| `--text-3` on sunken | 4.9 | 5.0 |
| `--text-3` on app | 4.7 | 5.7 |
| `--accent` on panel | 5.0 | 7.7 |
| `--accent` on app | 4.5 | 8.2 |
| `--text-on-accent` on accent | 5.0 | 8.2 |
| `--text-on-danger` on danger | 5.0 | 5.8 |
| `--text-on-inverse` on inverse | 17.1 | 14.5 |
| `--success` on panel | 5.0 | 7.6 |
| `--warning` on panel | 5.2 | 10.7 |
| `--danger` on panel | 5.0 | 5.4 |
| `--info` on panel | 5.0 | 7.6 |

**What the 3:1 rule covers.** Focus rings, status glyphs and meaningful fills meet 3:1 against the surface they sit on. Hairlines and control borders do not, and are not claimed to: `--border` is about 1.2:1 and `--border-control` about 1.6:1. They are decorative. A control is identified by its label, its text and its focus ring, never by its border alone — which is why every input carries a visible label (7.3) and every control has a 2px focus ring.

Tag text is `color-mix(in srgb, var(--tag-*) 75%, var(--text-1))`; re-measure when tag colors change. Re-measure the whole table after any token change.

---

## 4. Typography

Font stacks, then one shorthand per role. Components set type with `font: var(--type-*)` and never write a size, line height or weight.

```css
--font-ui: system-ui, -apple-system, "Segoe UI", sans-serif;
--font-code: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

--type-display: 500 32px/40px var(--font-ui);
--type-title:   500 20px/28px var(--font-ui);
--type-heading: 500 14px/20px var(--font-ui);
--type-prose:   400 14px/22px var(--font-ui);
--type-body:    400 13px/20px var(--font-ui);
--type-action:  500 13px/20px var(--font-ui);
--type-label:   500 12px/16px var(--font-ui);
--type-caption: 400 12px/16px var(--font-ui);
--type-mono:    400 12px/18px var(--font-code);
```

Numerals are tabular everywhere (`font-variant-numeric: tabular-nums`). Tracking is 0.

| Role | Size / line | Weight | Default color | Use |
|---|---|---|---|---|
| `display` | 32 / 40 | 500 | text-1 | Document and page titles |
| `title` | 20 / 28 | 500 | text-1 | Pane and section titles |
| `heading` | 14 / 20 | 500 | text-1 | Group and card headings |
| `prose` | 14 / 22 | 400 | text-1 | Long-form reading text in the `--width-reading` column |
| `body` | 13 / 20 | 400 | text-1 | Default text |
| `action` | 13 / 20 | 500 | text-1 | Buttons, active nav items, unread titles, banner titles |
| `label` | 12 / 16 | 500 | text-2 | Field labels, column headers, group labels |
| `caption` | 12 / 16 | 400 | text-3 | Timestamps, counts, hints |
| `mono` | 12 / 18 | 400 | inherit | Machine values only |

**Tiers are not roles.** Secondary text is `--type-body` + `--text-2`. Metadata is `--type-caption` + `--text-3`. There are no separate "secondary" or "meta" type tokens to drift.

**Weights:** 400 and 500, always inside a shorthand. No component sets `font-weight`; a role carries it.
**Mono** applies to machine values: IDs, hashes, keys, code, shortcuts.
**Size 14** exists twice: `heading` at 500 for structure, `prose` at 400 for reading. Both are tokens, so neither needs a weight override.

---

## 5. Icons

Carbon icons at `--icon` (**16px**), one size in chrome. Stroke 1.5px, round caps and joins.

Icons accompany labels or sit inside icon buttons carrying an `aria-label`. Status icons have adjacent text.

---

## 6. Shared behavior

### 6.1 States

Every interactive element defines five states.

| State | Treatment |
|---|---|
| Default | As specified per component |
| Hover | `--state-hover` tint (or `--surface-sunken` for bordered buttons) |
| Active (pressed) | `--state-pressed` tint |
| Focus-visible | `outline: var(--ring-width) solid var(--ring-color); outline-offset: var(--ring-offset)` (inputs: inset ring, offset −1px) |
| Disabled | `--text-2` text, `--surface-sunken` fill, no hover or active response, remains visible |

### 6.2 Selection

Selected rows, cards, nav items and menu items use **`--state-selected` tint**. Focus renders as an outline and selection as a fill, so the two are visually distinct.

### 6.3 Hover-revealed actions

Secondary row actions (favorite, more, archive) appear on hover via opacity, and are always reachable by keyboard focus. Primary actions are always visible.

### 6.4 Keyboard

- Every list, menu, tab set and table is navigable with arrow keys; `j`/`k` also work inside focused lists.
- Single-key shortcuts apply inside a focused list or view.
- One command palette (`Ctrl/⌘ K`) lists every action. It is a pattern, not a primitive.
- Focus is trapped only inside dialogs and the palette. `Esc` closes any overlay.

### 6.5 Motion

Overlay enter and exit fade over `--duration-fast` (90ms) with `--ease-standard`; `prefers-reduced-motion` makes them instant. Disclosure chevrons rotate without animation. No other motion exists, so there is no other duration token.

### 6.6 Responsive

Layouts respond to their **container** via container queries, so the same view works in a split pane or a narrow frame. Breakpoints: below 1060px the detail pane (`--width-detail`) hides; below 760px the sidebar hides and panels go full-bleed.

---

## 7. Components

Unspecified behavior inherits section 6.

### 7.1 Header (the anatomy rule)

- Height `--header-h` (48px), horizontal padding `--page-inset`, hairline `--border` below, `flex: none`, on `--surface-panel`.
- **Left:** context only. A breadcrumb, a title (`heading` role) or a back button. IDs are `mono`, in text-3, as the last breadcrumb segment.
- **Right:** actions. Ghost icon buttons, at most one primary button, at most one segmented control. Group right-aligned with `--space-1` gaps.
- **Optical alignment:** the outermost ghost icon buttons are pulled `--space-2` outward, so the glyph sits on the gutter line.
- Panes in a split view use the same height so their hairlines are continuous.

Related rows: **Toolbar** (height `--row-h`, same inset, hairline below, filters left, search and actions right) and **Section header** (height `--row-h-sm`, `heading` role left, ghost actions right, no hairline).

### 7.2 Button

Height `--control-h`, horizontal padding `--space-3`, radius `--radius-md`, `--type-action`.

| Variant | Fill | Border | Text |
|---|---|---|---|
| Secondary | `--surface-panel` | `--border-control` | text-1 |
| Primary | `--accent` | none | `--text-on-accent` |
| Ghost | transparent | none | text-2 → text-1 on hover |
| Danger | `--danger` | none | `--text-on-danger` |

Sizes: small (`--control-h − 4px`, `--type-caption`), default, large (`--control-h + 8px`, `--type-heading`). Size arithmetic on a token is allowed; a new unrelated number is not. Icon-only buttons are square at the control height and require `aria-label`.

One primary button per view. Danger applies to the confirming action of an irreversible step. Button labels name the action ("Delete 142 issues").

Hover and pressed states for every variant follow 6.1; no variant defines its own.

### 7.3 Form controls

- **Text input, select, textarea:** height `--control-h` (textarea `--textarea-min-h` min), padding 0 `--space-3`, `--border-control` border, radius `--radius-md`, placeholder in text-3. Long-form inputs get `--surface-sunken`.
- **Label** above the control (`label` role), **hint** below (`caption`), **error** below in `--danger` with a glyph. Error also sets the border to `--danger` and `aria-invalid="true"`.
- **Checkbox and radio:** `--icon` square, accent when checked.
- **Switch:** 32×20 (`--size-4` × `--size-2`), fully round, accent when on. Applies to immediate-effect settings; form fields use a checkbox.
- **Search field:** leading search glyph, trailing `kbd` hint.
- **Combobox:** input plus a menu; selected item shows a check; "create" is the last item after a separator.
- **Date picker:** a popover at `--layer-popover` with a 7-column month grid; selected day uses `--accent` fill, today a `--accent-soft` inset ring.
- **Form layout:** labels above, one column by default, two columns for short related fields, actions right-aligned under a hairline.

### 7.4 Navigation

- **Sidebar:** sits on `--surface-app` with no border of its own. Items are `--row-h-sm` tall, icon + label, `--type-body` in text-2; active item gets `--state-selected` tint and `--type-action`. Group labels are `label` role in text-3.
- **Tree:** `--control-h` rows, `--icon` indent per level, chevron to expand, hover reveals add and more.
- **Breadcrumbs:** last segment is text-1 at 500, earlier ones are text-2 links; separators are `--size-0` chevrons.
- **Tabs:** switch between different content. `--row-h` tall, underline in `--accent` plus text-1 when active, a hairline under the set.
- **Segmented control:** switches views of the same data. Selected segment is a `--surface-panel` chip with a hairline on a `--surface-sunken` track.
- **Pagination:** icon buttons for previous and next, numbered buttons, current page uses `--state-selected`.
- **Command palette:** an overlay at `--layer-palette` with a `--header-h` input, grouped actions, shortcut hints right-aligned.

### 7.5 Data display

- **Table:** header row `--row-h-sm` (`label` role, text-3, `--surface-sunken` fill, hairline below), body rows `--row-h`, one faint `--border` between rows. First and last cells use `--page-inset`. `--state-hover` tint on rows; selected rows get `--state-selected` and a checked box. Sorted column shows a `--size-0` arrow. A trailing "New" row in text-3 adds an item.
- **List row:** `--row-h` tall, `--space-2` horizontal padding inside a `--list-inset` gutter, radius `--radius-md`. Columns: ID (mono, text-3), status glyph, title (text-1, the only dominant element), labels (text-3 text), avatar, date. No dividers; whitespace and tint do the work.
- **Group header (in lists):** text only, `--row-h-sm`, status glyph + `label` + count. No fill.
- **Board:** columns of cards, `--space-4` gap. Card: `--surface-panel`, `--border` border, radius `--radius-lg`, `--space-2` × `--space-3` padding, title, then an ID / tag / avatar row. Hover uses `--surface-sunken`.
- **Gallery card:** cover area on `--surface-sunken`, hairline, then title and caption.
- **Calendar:** 7-column grid with hairlines, `--calendar-cell-h` min cell height, today's date in an `--accent` circle, events as soft tags.
- **Property row:** `--row-h-sm`, `--width-label` label column (icon + text-3 label), value cell that tints on hover when editable.
- **Tags:** `--chip-h`, radius `--radius-md`, `--type-label`. Fill is `color-mix(in srgb, var(--tag-*) var(--tint), var(--surface-panel))`; text is the tag color mixed 75% with text-1. A tag always contains its label as text.
- **Badge:** `--chip-h`, `--surface-sunken` fill with a hairline; a leading dot may carry a status color alongside the text label.
- **Avatar:** round, initials in text-2 on `--surface-subtle`. Sizes `--size-1` through `--size-5`.
- **Stat card:** `--surface-panel`, hairline, `--radius-lg`, label (`caption`), value (`title`), delta with an arrow and text.
- **Chart:** one series, one accent. Last value is `--accent`. Bars at `color-mix(in srgb, var(--accent) var(--tint-strong), var(--surface-panel))`. Gridlines: baseline only.
- **Progress:** `--space-1` tall, fully round, accent fill on `--surface-subtle`.
- **Callout:** `--surface-sunken` fill, hairline, `--radius-md`, leading icon. For context inside documents. System conditions use a banner.
- **Toggle (disclosure):** borderless row, chevron rotates.
- **Code block:** `--surface-sunken`, hairline, `--type-mono`.

### 7.6 Feedback

- **Banner:** system-level conditions. Status color at `--tint-weak` over `--surface-panel`, `--tint-strong` border, leading glyph, title in `--type-action`.
- **Inline error:** at the place of failure, with a Retry button.
- **Empty state:** icon in a bordered `--surface-sunken` square, `heading`, one sentence, one next-step button. States what is missing.
- **Loading:** nothing for the first 300ms. After that, a `caption` text label and row-height skeletons so nothing shifts.
- **Tooltip:** `--surface-inverse` background, `--text-on-inverse` text, `caption` role, optional shortcut, at `--layer-tooltip`. A few words.

### 7.7 Overlays

All overlays use `--surface-panel`, a `--border-strong` border, radius `--radius-lg` and `--shadow-overlay`. Each takes the z token from 2.8; overlays never guess a stacking order.

- **Menu:** `--layer-menu`, `--space-1` padding, `--control-h` items, selected item uses `--state-selected`, shortcut hints right-aligned in `kbd`, destructive item last after a separator in `--danger`.
- **Popover:** `--layer-popover`, a menu-styled surface holding a short message and one or two small buttons.
- **Dialog:** `--layer-dialog`, `--width-dialog` wide, title (`heading`), body in text-2, footer on `--surface-sunken` with right-aligned actions. Confirm only the irreversible; the primary button names the consequence.
- **Slash menu:** `--layer-menu`, block-insertion menu, `--size-4` icon tile, title and caption per row.

---

## 8. Views

All views use the app shell: sidebar on `--surface-app`, content in a rounded `--surface-panel` with a hairline, `--space-2` outer margin. Region surfaces follow 2.1 without exception.

| View | Structure |
|---|---|
| Issues | Header + grouped list, detail pane on the right (`--width-detail`). Selecting a row updates the detail. |
| Board | Header, toolbar, horizontally scrolling columns |
| Table database | Header, toolbar with view tabs, table, footer count |
| Page (document) | Header, then a `--width-reading` column: page icon, display title, properties, blocks (callout, heading, todos, toggle, code) |
| Settings | Header, section nav on the left, rows of label + description with the control right, danger zone framed in `--danger` at `--tint-strong` |
| Inbox | Header, tabs, rows with an unread dot and a `--type-action` title, hover swaps time for actions |
| Overview | Header with a range control, stat cards, chart and activity, projects table |
| Calendar | Header with navigation, month grid |
| Empty workspace | Centered empty state with one primary action |
| Error | Banner for the system condition, centered empty state with Retry |

Each view ships as a story. Until the story exists, the view is not built: the story is the reference composition, not a screenshot in a document.

---

## 9. UX patterns

### 9.1 Optimistic updates

Apply changes immediately. If the request fails, roll back the visible state and show an inline error at that place with a Retry button. The UI does not wait on the round trip.

### 9.2 Destructive actions

Prefer **undo** for reversible actions. Use a confirmation dialog only for the irreversible, and name the consequence in the button label.

### 9.3 Empty, loading, error

Empty: say what is missing and offer the next action. Loading: silent for 300ms, then label plus skeletons. Error: inline where it happened; a banner only for system-level problems such as offline or sync failure.

### 9.4 Unread and attention

Unread uses a dot plus `--type-action`. Deltas use an arrow and text.

---

## 10. Rules for agents

### Always

- Use semantic tokens only — never `--prim-*`. Use the type shorthands, spacing, size and height tokens.
- Follow the header anatomy for every new pane.
- Pair every status color with a glyph or text.
- Give icon-only buttons an `aria-label`. Give every input a label.
- Put new work in a story with controls where props exist, and add the principles that apply.

### Never

- No raw hex, no raw palette slots, no raw pixel sizes outside the ladders in 2.5–2.8.
- No font sizes or font weights outside the type shorthands. No uppercase text. No tracking.
- No shadow outside overlays. No radius outside `--radius-xs`, `--radius-md`, `--radius-lg` and `--radius-full`.
- No token that holds two CSS types. No alpha token used as a color.
- No border-only emphasis for selection; no accent edge on selected rows.
- No toasts. No global single-key shortcuts. No motion beyond the overlay fade.
- No filled status chips that rely on color alone. No color as the only emphasis.
- No second primary button in a view. No decoration in headers.
- No density branches inside components; read the tokens.
- No mono outside machine values. No `--info` on anything interactive, no `--accent` on status.

---

## 11. Accessibility

- Text meets 4.5:1 on every surface in both themes; focus rings, status glyphs and meaningful fills meet 3:1 (section 3). Decorative borders are excluded by design and by document.
- Focus is always visible: `var(--ring-width)` at `--ring-color`, offset by `var(--ring-offset)`. Interactive targets reach 36px under `pointer: coarse` through comfortable density, which sets `--control-h` and `--row-h-sm` to 36.
- State pairs color with a glyph or text.
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.
- Labels, `aria-invalid`, `aria-selected`, `aria-current` and `aria-pressed` are used for state.

---

## 12. Decision log

| Topic | Earlier | Now | Why | When |
|---|---|---|---|---|
| Corners | Square, 0 | 4px / 7px | Square corners read as dated and cramped; the reference apps use soft corners | v1 |
| Separation | Borders primary | Surfaces primary, faint hairlines | Borders everywhere read as a grid | v1 |
| Default row height | 28 | 36 | Tried 28, 32 and 36; 36 felt calm | v1 |
| Base text size | 14 | 13 | Matches 36px rows without feeling loose | v1 |
| Weights | 400 / 600 | 400 / 500 | 600 looked heavy at small sizes | v1 |
| Palette | Cold Oxocarbon, dark first | Light primary, Oxocarbon-derived, dark derived | You chose light | v1 |
| Icons | Carbon, one size | Same | Unchanged | v1 |
| Selection | Fill + 2px accent edge | Fill only | The edge added noise | v1 |
| Pills | None | Allowed only for switch, progress, avatar | Familiarity | v1 |
| Tags | No fills | Soft tinted tags with text | Notion-style databases need them | v1 |
| Toasts | Banned | Banned | Unchanged | v1 |
| Text tokens | `--fg1/2/3` | `--text-1/2/3` | Digit needs a separator; `fg` is not a noun | v2 |
| State tints | `--hover`, `--selected`, `--active` | `--state-hover`, `--state-selected`, `--state-pressed` | `--active` meant pressed, avatar fill and track fill at once | v2 |
| Borders | `--line` + `--line-strong` | `--border`, `--border-control`, `--border-strong` + `--border-alpha` | `--line-strong` was an alpha, not a color; components could not use it as a border | v2 |
| Density values | Derived (`--row − 8`) | Listed per mode | One source of truth; derivation made the table and the notes disagree | v2 |
| Comfortable density | Row 40, control 32 | Row 44, control 36 | The accessibility target of 36px could not be met at 32 | v2 |
| Type roles | Secondary and meta as roles | Tiers on body and caption | They differed only in color, so they were tiers pretending to be roles | v2 |
| Type enforcement | Prose sizes | `--type-*` font shorthands | A size outside the roles became impossible to write | v2 |
| Tag colors | Status tokens | `--tag-*` hues | A tag reused `--success` and implied status it did not have | v2 |
| Status vs accent | Two blues, no rule | Accent interactive, info status | Removed the "which blue?" decision | v2 |
| Control borders | Claimed 3:1 | Decorative, ~1.6:1 | The palette cannot meet 3:1 on a hairline without reading as a grid; the ring and the label carry the affordance | v2 |
| Radius | Multipliers of `--radius-md` | Fixed values | `.66` produced 2.64px, off the 4px grid | v2 |
| Disabled and placeholder | Both text-3 | Disabled text-2 | Placeholder and disabled must not look the same | v2 |

---

## 13. Verification checklist

Before declaring a component done:

- [ ] Uses only semantic tokens, the type shorthands and the size ladders
- [ ] No raw hex, no raw pixel value, no `--prim-*`
- [ ] Defines all five states
- [ ] Looks right in light and dark, at rows 32, 36 and 44, with lines none, faint and visible
- [ ] Works at the 390px viewport
- [ ] Contrast measured, not assumed, and the table in section 3 updated if a token changed
- [ ] Keyboard path exists for every pointer action
- [ ] Header, if present, follows 7.1
- [ ] Has a story, a controls table if it has props, and a principles note
