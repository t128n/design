---
name: t128n Personal Design System
version: "0.1"
description: Quiet, spacious, utilitarian interfaces for tools and applications, with a restrained technical character.
colors:
  canvas: "#F2F4F8"
  surface: "#FFFFFF"
  surface-subtle: "#F2F4F8"
  text-primary: "#161616"
  text-secondary: "#525252"
  text-muted: "#697077"
  border: "#DDE1E6"
  accent: "#0F62FE"
  on-accent: "#FFFFFF"
  focus: "#0F62FE"
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
    lineHeight: 1.4
rounded:
  sm: 4px
  md: 8px
  lg: 12px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    height: 40px
    padding: 12px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    height: 40px
    padding: 12px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    height: 40px
    padding: 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 24px
---

## Overview

Design quiet, spacious, minimal tools and applications. Emphasize utility and technical precision without adopting the visual density of an IDE. Let content lead; use typography, alignment, and whitespace as the primary means of organizing information. Navigation, color, icons, motion, and borders must earn their place.

This is a **light-first** system. Dark mode is a future requirement, not a set of invented tokens in v0.1.

**Status:** The philosophy, IBM Plex Sans font family, blue accent, selective-boundary treatment, and Carbon icon family are selected preferences. Numeric sizing, spacing, and radius tokens are **initial implementation defaults** subject to validation on real screens.

## Colors

Use [Base16 Oxocarbon Light](https://github.com/nyoom-engineering/base16-oxocarbon/blob/main/base16-oxocarbon-light.yaml) as the palette foundation. Map palette colors to semantic application tokens instead of reusing Base16 editor-role names directly.

- Canvas `#F2F4F8`, border `#DDE1E6`, foreground `#161616`, secondary text `#525252`, and accent `#0F62FE` are grounded in Oxocarbon Light.
- White `#FFFFFF` is an intentional application-surface extension, not an Oxocarbon Base16 palette token.
- Use **only one expressive primary accent: blue `#0F62FE`**. Reserve it for primary actions, selected states, meaningful links, and focus indicators.
- Most of the interface should be neutral. Do not color every card, heading, number, or icon blue.
- Semantic success, warning, and error tokens are **not defined yet**. When a product needs them, add accessible semantic tokens deliberately; do not infer status from the accent color alone.
- Meet WCAG AA contrast for ordinary text and visible focus indicators. Do not rely on color alone to convey state. Recheck contrast for muted text and disabled variants.

## Typography

Use **IBM Plex Sans** for headings, body text, labels, and controls. Use system sans-serif fallbacks when IBM Plex Sans is unavailable. Preserve restrained weight contrast: normal body text and medium/semibold headings. Avoid unnecessarily large headings and bold labels everywhere.

- Default body: 16px / 1.5. Small UI text: 14px / 1.5.
- Prefer sentence case, descriptive labels, and concise copy.
- Use tabular numerals when displaying metrics in aligned tables or lists.
- Use **IBM Plex Mono** for code snippets, file paths, technical identifiers, and other genuinely monospaced content. Do not switch ordinary UI labels or headings to monospace.

## Layout

- Prefer generous outer margins and generous separation **between groups**, not oversized padding on every single control.
- Start from a 4px base spacing grid, with 8, 16, 24, and 32px as common steps.
- Keep forms and reading surfaces at comfortable widths; do not spread short content across the whole viewport.
- Use **contextual, minimal navigation** as the default: breadcrumbs, concise headers, task-specific controls, and menus where helpful.
- Persistent sidebars are allowed for genuinely complex application navigation, not as the automatic starting template.
- Maintain clear responsive hierarchy and keyboard navigation.

## Elevation & Depth

- Prefer whitespace first, then subtle surface changes or 1px borders when the boundary helps comprehension.
- Use **selective boundaries**: cards for meaningful independent regions, not automatically around every number or block of text.
- Avoid nested cards and excessive dividers.
- No decorative shadows by default. Consider elevation for temporary layers such as popovers and dialogs only when needed to distinguish them.

## Shapes

- Default control radius: **8px**; small elements: 4px; larger surfaces: 12px if their scale warrants it.
- Keep corners modest and consistent. Avoid excessive rounding and pill-shaped controls unless the interaction calls for them.
- Prefer clean geometric alignment, consistent strokes, and restrained decoration.

## Components

### Buttons and controls

- Use a primary button only for the main action of a region or workflow; ordinary actions should be quieter.
- Controls should clearly show hover, keyboard focus, pressed, disabled, loading, and error states as applicable.
- Default control height is **40px**; this is provisional and must be tested for actual usability.
- Use explicit labels over icon-only buttons where space permits.

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

## Do's and Don'ts

**Do**
- Prioritize legibility, alignment, whitespace, and efficient task completion.
- Keep navigation contextual and secondary to content.
- Use Oxocarbon neutrals and the blue accent sparingly.
- Use IBM Plex Sans consistently; reserve IBM Plex Mono for technical content.
- Reuse the Carbon family and show icons only when they add useful meaning.
- Check keyboard usability, responsive layout, and accessible contrast.

**Don't**
- Create cards for every content group.
- Use gradients, glass effects, decorative illustrations, or shadows merely to appear modern.
- Introduce multiple arbitrary accent colors.
- Mix icon families.
- Sacrifice clarity for minimalism: important controls must remain discoverable.
- Invent exact dark-mode colors or status colors before those themes/states are designed.

## Validation backlog

1. Test IBM Plex Sans sizes, weights, and line heights in an actual form and dashboard.
2. Compare selective borders against borderless sections in a realistic app screen.
3. Confirm primary blue contrast in all interactive states; define semantic status colors if needed.
4. Test 40px controls, Carbon 16px/20px visual alignment with IBM Plex Sans, and 44px icon-only touch targets.
5. Define and validate the dark theme independently.
