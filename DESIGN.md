---
name: t128n Personal Design System
version: "0.1"
description: Quiet, spacious, utilitarian interfaces for tools and applications, with a restrained technical character.
colors:
  canvas: "#F2F4F8"
  workspace: "#FFFFFF"
  surface: "#FFFFFF"
  surface-subtle: "#F2F4F8"
  navigation-surface: "#F7F8FA"
  navigation-selected: "#E8EBEE"
  text-primary: "#161616"
  text-secondary: "#525252"
  text-muted: "#697077"
  border: "#DDE1E6"
  accent: "#0F62FE"
  on-accent: "#FFFFFF"
  focus: "#0F62FE"
  info: "#0043CE"
  info-surface: "#EDF5FF"
  progress: "#6929C4"
  progress-surface: "#F6F2FF"
  success: "#0E6027"
  success-surface: "#DEFBE6"
  warning: "#684E00"
  warning-surface: "#FCF4D6"
  danger: "#DA1E28"
  danger-surface: "#FFF1F1"
  scrim: "rgb(22 22 22 / 45%)"
  disabled-bg: "#DDE1E6"
  disabled-text: "#697077"
typography:
  display:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
  heading:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  subheading:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.3
rounded:
  sm: 2px
  md: 4px
  lg: 6px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    height: 36px
    padding: 12px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    height: 36px
    padding: 12px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    height: 36px
    padding: 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 16px
---

## Overview

Design quiet, spacious, minimal tools and applications. Emphasize utility and technical precision without adopting the visual density of an IDE. Let content lead; use typography, alignment, and whitespace as the primary means of organizing information. Navigation, color, icons, motion, and borders must earn their place.

**Continuous workspaces over segmented dashboards.** Organization comes from typography, alignment, whitespace, and structure; use subtle surface differentiation only for orientation.

This is a **light-first** system. Dark mode is a future requirement, not a set of invented tokens in v0.1.

**Status:** The philosophy, IBM Plex Sans font family, blue accent, selective-boundary treatment, and Carbon icon family are selected preferences. Numeric sizing, spacing, and radius tokens are **initial implementation defaults** subject to validation on real screens. Application workspace, navigation surface, and navigation selected surfaces are validated.

## Colors

Use [Base16 Oxocarbon Light](https://github.com/nyoom-engineering/base16-oxocarbon/blob/main/base16-oxocarbon-light.yaml) as the palette foundation. Map palette colors to semantic application tokens instead of reusing Base16 editor-role names directly.

- Canvas `#F2F4F8`, border `#DDE1E6`, foreground `#161616`, secondary text `#525252`, and accent `#0F62FE` are grounded in Oxocarbon Light.
- White `#FFFFFF` is an intentional application-surface extension, not an Oxocarbon Base16 palette token.
- Semantic surfaces have distinct roles. **Canvas** `#F2F4F8` is the subdued public or empty context, limited to selected backgrounds or genuinely distinct contexts; it is never an application page background. **Workspace** `#FFFFFF` is the primary white application content region and the default for application views, Navbar, landing pages, workspaces, and persistent Sidebars. **Surface** `#FFFFFF` is a component fill, such as a card or control. **Navigation surface** `#F7F8FA` is a quiet sidebar or navigation region, deliberately lighter than canvas, used only for an explicitly requested navigation variant. **Navigation selected** `#E8EBEE` marks the selected navigation row and stays quieter than the border `#DDE1E6`.
- Workspace and surface are both white but semantically distinct: workspace is a region, surface is a component fill.
- The application surfaces are contrast-validated: primary and secondary text pass AA on workspace, navigation surface, and selected rows; muted text passes on the navigation surface; active-row badges use secondary text; accent focus indicators meet at least 3:1 on workspace and navigation surface.
- Use **only one expressive primary accent: blue `#0F62FE`**. Reserve it for primary actions, selected states, meaningful links, and focus indicators.
- Most of the interface should be neutral. Do not color every card, heading, number, or icon blue.
- Status roles are **neutral, info, progress, success, warning, danger, and disabled**. Each has a text token and, where useful, a surface tint. Status is always text plus one role; never color alone.
- Status text tokens pass AA on their own surfaces and on canvas. Use status color for state and feedback, not decoration. Danger remains the only role for invalid input and destructive actions.
- Meet WCAG AA contrast for ordinary text and visible focus indicators. Do not rely on color alone to convey state. Recheck contrast for muted text and disabled variants.

## Typography

Use **IBM Plex Sans** for headings, body text, labels, and controls. Use system sans-serif fallbacks when IBM Plex Sans is unavailable. Preserve restrained weight contrast: normal body text and medium/semibold headings. Avoid unnecessarily large headings and bold labels everywhere.

- Default body: 16px / 1.5. Small UI text: 14px / 1.5.
- Prefer sentence case, descriptive labels, and concise copy.
- Use tabular numerals when displaying metrics in aligned tables or lists.
- Use **IBM Plex Mono** for code snippets, file paths, technical identifiers, and other genuinely monospaced content. Do not switch ordinary UI labels or headings to monospace.

## Framework usage

The typography and layout primitives are the vocabulary for application and story content. They keep the scale, semantics, and spacing tied to tokens instead of local CSS.

- Use **`Text`** for prose and headings. `variant` controls appearance; `as` controls the native element. They are independent: choose both explicitly.
- Use **`Code`** for inline code and code blocks. Do not switch ordinary labels to mono.
- Use **`Stack`**, **`Inline`**, **`Grid`**, and **`Container`** for rhythm, rows, columns, and measure. `Text` has no margins; spacing belongs to the layout primitive.
- Use **`Link`** for navigation and **`Button`** for actions. `Text` never renders an anchor or button.
- Use the existing **`Label`** for form labels. `Text variant="label"` is display text, not a form association.
- Control internals (buttons, inputs, menus, date fields, tables) may keep local token-based CSS so their geometry and states remain precise. Application and story prose must not write raw typography CSS.

```svelte
<Stack gap="lg">
  <Text variant="heading" as="h2" id="recent-heading">Recent projects</Text>
  <Text variant="body" tone="secondary">
    Ownership, status, and the latest update for each project.
  </Text>
  <Text variant="label" as="span" tone="secondary" numeric>1,248</Text>
</Stack>
```

```svelte
<Text variant="body">Set <Code>projectId</Code> before creating the project.</Text>
```

## Layout

- Prefer generous outer margins and generous separation **between groups**, not oversized padding on every single control.
- Start from a 4px base spacing grid, with 8, 12, 16, and 24px as common steps. Favor compact groups over generous padding.
- Keep forms and reading surfaces at comfortable widths; do not spread short content across the whole viewport.
- Use **contextual, minimal navigation** as the default: breadcrumbs, concise headers, task-specific controls, and menus where helpful.
- Persistent sidebars are allowed for genuinely complex application navigation, not as the automatic starting template.
- Maintain clear responsive hierarchy and keyboard navigation.

### Application workspaces

Application workspaces are continuous and light-first. Organization comes from typography, alignment, whitespace, and structure, not from panels.

- Primary content sits on a white workspace; Navbar and persistent Sidebars share the same white by default, and the navigation surface is an explicit variant.
- Navigation is never more prominent than content. Promote content through hierarchy, not by tinting the workspace.
- Keep boundaries minimal; add a divider only where it clarifies a region.
- Avoid large contrasting regions that fragment the workspace.
- Let the workspace run continuously through tables, metrics, and forms; do not segment ordinary content into panels.
- Use whitespace and typography for grouping; do not wrap ordinary content in cards.
- Preserve canvas `#F2F4F8` for subdued public, marketing, and empty contexts.
- **Primary content > navigation > supporting surfaces** is a rule about prominence, not about using more colors.

### Surface continuity

White is the default. Navbar, main content, Landing, workspaces, and persistent Sidebars share one continuous white background; the page is one surface, not a set of panels.

Prefer **Shared background + selective structural borders + whitespace** over **Contrasting backgrounds + boxed sections + repeated dividers**.

- Do not introduce color differences merely to distinguish layout regions.
- A shared edge must not produce two overlapping borders.
- Use selective 1px borders only where a boundary carries meaning; a shared edge gets exactly one border.
- Prefer whitespace over boxed sections; do not wrap ordinary content in cards, panels, or alternating bands.
- Avoid repeated dividers; use spacing before adding another line.
- Reserve canvas for subdued public or marketing contexts, selected backgrounds, or genuinely distinct regions; never tint an application page.
- Use the navigation surface only for an explicitly requested navigation variant.

### Border ownership

A structural border belongs to exactly one region.

- Navbar owns its bottom border.
- Sidebar owns its right border.
- Footer owns an optional top border; show it only when the footer follows content directly.
- PageHeader owns no border.
- AppShell owns no border; AppShell arranges regions without drawing their borders.
- Content owns no top or left border, because Navbar and Sidebar own those edges.

## Elevation & Depth

- Prefer whitespace first, then subtle surface changes or 1px borders when the boundary helps comprehension.
- Use **selective boundaries**: cards for meaningful independent regions, not automatically around every number or block of text.
- Cards must earn their border: no default card wrapper around ordinary content on a white workspace.
- Avoid nested cards and excessive dividers.
- No decorative shadows by default. Consider elevation for temporary layers such as popovers and dialogs only when needed to distinguish them.

## Shapes

- Default control radius: **4px**; small elements: 2px; larger surfaces: 6px if their scale warrants it. Keep corners sharp enough to read as technical, not rounded.
- Keep corners modest and consistent. Avoid excessive rounding and pill-shaped controls unless the interaction calls for them.
- Prefer clean geometric alignment, consistent strokes, and restrained decoration.

## Components

### Buttons and controls

- Use a primary button only for the main action of a region or workflow; ordinary actions should be quieter.
- Controls should clearly show hover, keyboard focus, pressed, disabled, loading, and error states as applicable.
- Default control height is **36px**; this is provisional and must be tested for actual usability.
- Use explicit labels over icon-only buttons where space permits.

### Selection and overlay controls

- Use **Checkbox** for independent binary choices, **Switch** for settings that take effect immediately, and **Select** for one choice from a short list. Keep labels visible and put consequences in helper text, not placeholders.
- Invalid controls use danger `#DA1E28` for the border, message, and focus ring. The message names the field and the fix.
- **Tabs** switch between peer sections with one accent underline. Do not place a primary action inside the tab strip.
- **Dialog** is for a focused task or confirmation: trap focus, close on Escape, return focus to the trigger, and place the scrim behind it. **Tooltip** is supplementary; never make it the only place an action or error is explained.
- [Bits UI](https://bits-ui.com/) supplies behavior and accessibility. The styled wrappers own tokens, layout, and visual states.

### Layouts and views

- **AppShell** owns the frame: sidebar, navbar, a focusable main region, and a skip link. The main region is the white **workspace**; **Sidebar** and **Navbar** are independent so an app can use either alone. A structural border belongs to exactly one region: AppShell arranges regions without drawing their borders, and each region owns its own structural edge.
- **Sidebar** sits on the white **workspace** by default and stays quieter than the content it serves. Use the **navigation surface** only when an explicitly requested navigation variant calls for it. Selected rows use the neutral **navigation selected** surface with primary text; inactive items stay quiet. No blue bars; reserve blue for focus only. Use spacing before dividers rather than adding lines everywhere.
- **Navbar** shares the **workspace** and owns its bottom border so it reads as part of the page. Prefer ghost and link-level utilities; borders only where they carry meaning.
- **PageHeader** carries breadcrumbs, title, description, and page actions on the workspace itself: no background, no card. **Hero** is for landing or empty-state moments, not for ordinary application pages.
- **Settings** pages group ordinary preferences under section headings and whitespace, not cards. Reserve a bordered or tinted surface for exceptional regions: danger zones, audit and history panels, or genuinely independent sub-surfaces.
- **Badge** and **Alert** encode status as text plus one role. **Table** keeps rows aligned and scrolls horizontally rather than turning into cards. Tables are borderless in white workspaces when row separators are enough; add `bordered` only when the table needs a structural container.
- Composed pages live under **Views** in Storybook. They are examples of the pieces working together, not extra primitives.

### Sections and tables

A section owns its heading, description, optional actions, and the spacing that groups them. The table owns column headers, rows, and cells. A table never renders a section title or heading; use the surrounding section heading as the visual title and connect it with `aria-labelledby`, or keep a semantic `<caption>` for the table itself.

- Use the **subheading** scale (18px / 600) for section titles. Column headers are subordinate: use the existing 14px **label** scale in secondary text.
- Place the table directly on the white workspace. It is borderless by default, with subtle horizontal row separators and no vertical grid lines.
- Keep the gap between a section title and the column headers compact (8px). Use consistent, restrained cell padding, and align the first and last cells with the section edges.
- Do not wrap an ordinary data table in a full-width bordered card. Use `bordered` only when the table is a genuinely independent surface, and use `Card` only for that same reason.
- Keep status badges inside cells unchanged; they already carry role through text plus one tone.

### Iconography — concrete choice

**Primary icon pack: [IBM Carbon Icons](https://icones.js.org/collection/carbon)**, browsed through [Icônes](https://icones.js.org/). **Iconify collection prefix: `carbon`** (for example, `carbon:search`, `carbon:add`, `carbon:chevron-right`, `carbon:settings`). The Carbon collection is licensed Apache 2.0.

- Use **Carbon exclusively** for general UI iconography. Do not mix icon families unless a genuinely missing symbol warrants an explicit, documented exception.
- Use original Carbon icon artwork at its intended sizes: **16px by default** for inline controls, **20px** for more prominent actions, and **24px** for rare larger contexts. 32px is reserved for intentionally large representations.
- **Do not override SVG stroke width globally.** Carbon icons are optically designed for their artboard sizes and are not interchangeable with Lucide's 2px stroke convention.
- Use monochrome icon colors corresponding to surrounding text or affordance emphasis; reserve `#0F62FE` for meaningful active or interactive states.
- **Icons are optional by default**: prefer descriptive text and introduce icons only when they improve recognition, disambiguate actions, or reduce scanning effort.
- Do not prepend an icon to every heading, button, menu item, or navigation label for decoration.
- Icon-only actions require accessible names, visible focus states, and adequately sized touch targets; IBM recommends **at least 44×44px** for interactive icon touch targets.
- Center-align icons with associated labels. When pairing icon and text, match their colors unless there is a specific semantic reason not to.
- Prefer **build-time bundled icon imports** (e.g., `unplugin-icons` with `~icons/carbon/search` where applicable) to runtime network fetching. Icônes is the visual catalog, not a required production runtime.
- Official usage guidance: https://www.carbondesignsystem.com/building-blocks/foundations/icons/guidelines/

### Motion and interaction

- Feedback should feel immediate. Use **subtle, purposeful** transitions only where they clarify hover, selection, expansion, and state changes.
- Provisional transition duration: **120–180ms** for small state changes; avoid long entrance sequences.
- Respect `prefers-reduced-motion`. Do not animate for decoration or delay user action.

## Do

- Prioritize legibility, alignment, whitespace, and efficient task completion.
- Keep navigation contextual and secondary to content.
- Use Oxocarbon neutrals and the blue accent sparingly.
- Use IBM Plex Sans consistently; reserve IBM Plex Mono for technical content.
- Reuse the Carbon family and show icons only when they add useful meaning.
- Check keyboard usability, responsive layout, and accessible contrast.

## Refusals

These are deliberate omissions, not gaps. Each rule is a refusal paired with the substitute that takes its place, so removing a pattern never removes a capability. `▲` marks rules a reviewer or a CSS audit can check mechanically.

**Exceptions are allowed, and must be written below with the screen, the reason, and the date.** An exception that is not written here is a bug, and it is removed in review.

### Feedback and state

| #   | Never                                                                     | Instead                                                                                   |
| --- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| R1  | ▲ Toasts, snackbars, growls — any floating, self-dismissing message layer | An inline `Alert` at the point of action; stays until resolved or dismissed                |
| R2  | Undo inside a transient layer                                             | Inline undo next to the change, surviving until navigation                                |
| R3  | A success message for a change already visible on screen                  | The updated state is the confirmation; speak only when the result is off-screen            |
| R4  | Generic errors ("Something went wrong", "Invalid input")                  | Name the thing, the cause, and the fix                                                    |
| R5  | ▲ Full-page spinners and spinner-only states                              | Disable the control, label it ("Saving…"), keep the page usable                            |
| R6  | ▲ Animated skeletons, shimmer, pulsing placeholders                       | Static placeholder blocks in the content region only                                       |
| R7  | A fabricated percentage for work of unknown duration                      | One indeterminate indicator, or a step count you actually know                             |
| R8  | A confirmation dialog for a reversible action                             | Do it, then offer undo                                                                     |
| R9  | Dialogs for content that scrolls, for navigation, or for multi-step flows | A page                                                                                     |
| R10 | ▲ Nested dialogs, dialogs opened from dialogs, two overlays at once       | One overlay at a time; sequence them                                                       |
| R11 | A disabled control as the only explanation                                | Disabled state plus the reason in helper text                                              |
| R12 | Actions revealed only on hover                                            | Visible actions, or the same actions on keyboard focus                                     |

**Where feedback lives.** Field error: inline, under the field. Region status: an `Alert` in the region that owns the action. Page status: one page-level `Alert` for cross-region outcomes. Durable record: the history or run view. Nothing floats and nothing self-dismisses; that is the whole replacement for toasts.

### Layout and density

| #   | Never                                                            | Instead                                         |
| --- | ---------------------------------------------------------------- | ----------------------------------------------- |
| R13 | A card inside a card; a card wrapped around a single number      | Sections and metric rows                        |
| R14 | Uniform padding on every block                                   | Spacing carries grouping; padding belongs to controls |
| R15 | ▲ More than one sticky layer in a scroll container               | At most one sticky header                       |
| R16 | Centered body text in application surfaces                       | Left-aligned; centering only in `Hero` and empty states |
| R17 | ▲ Nested scroll containers; horizontally scrolling pages         | Tables scroll on their own axis; the page does not |
| R18 | Zebra striping plus row borders plus a hover tint, together      | One separator; borders first                    |
| R19 | Alternating background bands to segment content                  | Whitespace                                      |
| R20 | ▲ `100vh` shells with inner scroll on mobile                     | Normal document flow                            |

### Type

| #   | Never                                                    | Instead                                              |
| --- | -------------------------------------------------------- | ---------------------------------------------------- |
| R21 | ▲ Uppercase or letter-spaced micro-labels                | Sentence case at `label` or `caption`; separate sections with weight or spacing |
| R22 | Italics for emphasis; underlines on non-links            | Weight                                               |
| R23 | ▲ Type below 12px; any third typeface                    | The defined scale; Plex Sans and Plex Mono only      |
| R24 | Placeholder used as a label                              | Visible label; helper text for consequences          |
| R25 | Proportional figures in aligned tables                   | Tabular numerals                                     |

### Color and status

| #   | Never                                                                   | Instead                                                    |
| --- | ----------------------------------------------------------------------- | ---------------------------------------------------------- |
| R26 | More than one accent-filled element in a region                         | One primary action per region                              |
| R27 | ▲ Color-only status: dots, colored icons, tinted rows with no word     | Text plus one role, every time                             |
| R28 | Rainbow tags                                                            | One neutral tag, or one role                               |
| R29 | Red on anything non-destructive; accent blue on a destructive action     | `danger` is reserved and always paired with an explicit verb |
| R30 | ▲ Decorative shadows, hover-lift, more than one shadow token            | A single overlay shadow, for floating layers only          |
| R31 | ▲ Gradients, mesh, glass, noise, illustrations, mascots, stock photography in product surfaces | Flat surface and type                              |
| R32 | ▲ Radius beyond 6px; `9999px` pills                                     | `sm`, `md`, `lg` only; pills are for switch tracks only    |
| R33 | Inventing dark-mode or extra status colors before those themes are designed | Design the dark theme separately; validate statuses in light first |

### Motion

| #   | Never                                                                   | Instead                                                     |
| --- | ----------------------------------------------------------------------- | ----------------------------------------------------------- |
| R34 | Entrance animations, staggered lists, count-ups, confetti               | Content appears                                             |
| R35 | ▲ Infinite animation except a true indeterminate indicator              | A bounded transition triggered by a state change            |
| R36 | ▲ Spring or overshoot easing, scroll-jacking, parallax, hijacked smooth scroll | `ease-out`, 180ms or less, transform and opacity only |

### Chrome, copy, ethics

| #   | Never                                                              | Instead                                        |
| --- | ------------------------------------------------------------------ | ---------------------------------------------- |
| R37 | An icon on every heading, button, table row, or nav item           | Icons only where they disambiguate             |
| R38 | Emoji as icon or status; a second icon family                      | Carbon                                         |
| R39 | Badge counts on navigation that do not change where the user should go | Nothing, or a real status                  |
| R40 | Icon-only desktop navigation to save space                         | Labels                                          |
| R41 | Truncated identifiers with no way to reveal them                   | Mono type, wrapping, and a copy action         |
| R42 | Relative timestamps with no absolute value in the text             | Both                                           |
| R43 | `title` or a tooltip as the only source of an explanation          | Visible text                                   |
| R44 | Empty states without a next action, or with an illustration        | One sentence and one action                    |
| R45 | Dark patterns: fake urgency, pre-checked consent, confirm-shaming, hard cancellation, hidden cost | State the cost; make leaving easy |

### System governance

| #   | Never                                                                                      | Instead                                                    |
| --- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| R46 | ▲ Raw hex or px values inside a component                                                  | A token, or add the token                                  |
| R47 | A one-off variant bolted onto a shared component                                            | A documented prop, or a new component                      |
| R48 | A primitive without a story, a real screen using it, and a note on what it is not for       | All three together                                         |
| R49 | ▲ `!important`; `outline: none` without a `:focus-visible` replacement; a z-index outside the named layers | Named layers and a real focus ring; suppression is allowed only on a non-interactive focus target or where a listbox highlight is the visual focus |
| R50 | A "temporary" style that survives a release                                                 | Delete it or canonize it                                   |
| R51 | ▲ Raw `<p>`/`<h1>`–`<h6>` or local type classes in application and story prose              | `Text` and `Code`; layout through `Stack`, `Inline`, `Grid`, and `Container` |

### Budgets

Prefer budgets to bans where a ban is a judgement call: one accent-filled element per region, one overlay at a time, one sticky layer, one primary action per workflow, one animated property per interaction.

### Mechanically checkable

- No `position: fixed` outside overlay layers and the skip link.
- No `box-shadow` outside the overlay token.
- No `border-radius` above 6px, except switch tracks.
- No `animation-iteration-count: infinite`.
- No `text-transform: uppercase`.
- No `letter-spacing` above 0.02em.
- No `outline: none` without a `:focus-visible` rule, except on a non-interactive focus target or a listbox highlight.
- No raw hex values under `packages/ui/src/lib`.
- No literal `font-size`, `font-weight`, `line-height`, or `font-family` values under `packages/ui/src/lib`; use a token.
- No raw `<p>` or `<h1>`–`<h6>` in components or stories; use `Text`.
- No `font-size` below 12px.
- At least one `:focus-visible` rule per interactive component.

## Validation backlog

1. Test IBM Plex Sans sizes, weights, and line heights in an actual form and dashboard.
2. Compare selective borders against borderless sections in a realistic app screen.
3. Confirm primary blue contrast in all interactive states; define semantic status colors if needed.
4. Test 36px controls, Carbon 16px/20px visual alignment with IBM Plex Sans, and 44px icon-only touch targets.
5. Define and validate the dark theme independently.
