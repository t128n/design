# Plan: Implement Missing Bits UI Components

## Goal
Implement all missing components from the provided list using bits-ui v2 primitives and style them to match `DESIGN.md`. Add each as a styled wrapper in `packages/ui/src/lib/`, export from `packages/ui/src/index.ts`, and add Storybook stories under `packages/ui/src/stories/`.

## Missing Components (from list)
- Accordion
- Alert Dialog
- Aspect Ratio
- Avatar
- Calendar
- Collapsible
- Combobox
- Command
- Context Menu
- Date Field
- Date Picker
- Date Range Field
- Date Range Picker
- Dropdown Menu
- Label
- Link Preview
- Menubar
- Meter
- Navigation Menu
- Pagination
- PIN Input
- Popover
- Progress
- Radio Group
- Range Calendar
- Rating Group
- Scroll Area
- Separator
- Slider
- Time Field
- Time Range Field
- Toggle
- Toggle Group
- Toolbar

## Existing Patterns (must follow)
- Use bits-ui primitives (e.g., `Dialog`, `Tooltip`, `Tabs`, `Checkbox`, `Select`) as shown in existing components.
- Style via CSS custom properties from design tokens (colors/spacing/typography/radius/shadows). Never hardcode raw hex/px in component styles except inside token references.
- Use Carbon icons via `~icons/carbon/*` only when icons add meaning (R37). Icon-only actions need accessible names and >=44px touch targets.
- Focus states: use `:focus-visible` with visible focus ring (R49). No `outline: none` without replacement.
- Respect motion preferences (`prefers-reduced-motion`).
- Follow border ownership, surface continuity, no cards around ordinary content by default.
- Status/feedback rules per DESIGN.md.

## Component Groups & Order
Implement in dependency order to avoid churn:

### Group 1: Primitives/structure (low complexity)
1. Label (bits-ui Label) - used by forms
2. Separator
3. Aspect Ratio
4. Avatar
5. Scroll Area
6. Collapsible
7. Toggle
8. Toggle Group

### Group 2: Overlays/menus
9. Popover
10. Tooltip (exists) - ensure consistency
11. Dropdown Menu
12. Context Menu
13. Menubar
14. Navigation Menu
15. Alert Dialog (bits-ui AlertDialog) - different from custom Alert
16. Dialog (exists) - ensure consistency

### Group 3: Navigation/feedback
17. Accordion
18. Progress
19. Meter
20. Pagination
21. Tabs (exists) - ensure consistency

### Group 4: Inputs/selection
22. Radio Group
23. Slider
24. Switch (exists)
25. Checkbox (exists)
26. Select (exists)
27. Combobox
28. PIN Input

### Group 5: Date/Time
29. Calendar
30. Range Calendar
31. Date Field
32. Time Field
33. Date Picker
34. Date Range Field
35. Date Range Picker
36. Time Range Field

### Group 6: Complex
37. Command
38. Link Preview
39. Toolbar
40. Rating Group

## Per-Component Checklist
- [ ] Create `packages/ui/src/lib/<Component>.svelte` wrapping bits-ui primitives
- [ ] Use semantic props, sensible defaults, support snippets/children where appropriate
- [ ] Style with tokens, proper states (hover/focus/active/disabled/invalid)
- [ ] Add ARIA/behavior via bits-ui (don't re-implement a11y)
- [ ] Export from `packages/ui/src/index.ts`
- [ ] Add story in `packages/ui/src/stories/<Component>.stories.svelte`
- [ ] Follow DESIGN.md rules (no raw hex/px, focus-visible, icons only if needed, etc.)
- [ ] Run typecheck/build if needed

## Agent Strategy
Spawn parallel subagents by group. Each agent gets:
- DESIGN.md content
- Existing component examples (Dialog, Tooltip, Tabs, Checkbox, Select)
- bits-ui API for target components (from node_modules)
- Checklist above
- Instructions to not deviate from tokens/patterns

## Validation
- Check for raw hex/px violations: `grep -rn '#[0-9a-fA-F]\{3,6\}' packages/ui/src/lib | grep -v node_modules` should be empty (or only token refs)
- Check focus-visible: every interactive component has `:focus-visible`
- Check exports compile
- Build: `cd packages/ui && bun run build` (or check)
- Stories render conceptually

## Execution Steps
1. Write this plan (done)
2. Spawn Group 1 agents in parallel
3. Review, fix issues, merge
4. Spawn Group 2...
5. Continue through groups
6. Final validation and summary

---

## Outcome

All 34 components are implemented, exported from `packages/ui/src/index.ts`, styled with design tokens, and covered by Storybook stories.

### Fixes made during validation
- Added `@internationalized/date` to `packages/ui` dependencies (date/time types).
- Repaired v2 API usage: `Slider` (no `Track`), `PinInput` (no `CellText`/`CellCaret`), `Combobox` (removed `Empty`; client-side filtering), `RatingGroup` (`index` prop, no nested button), `Pagination` (`Page` object), `Calendar`/`RangeCalendar` (snippet-driven months/weeks).
- Fixed overlays: `DropdownMenu`/`ContextMenu`/`Menubar` group headings moved inside `Group`; `NavigationMenu` viewport positioning.
- Accessibility: labels for `Progress`/`Meter`, `PinInput` label/input association, `Slider` thumb names, focusable `ScrollArea` viewport, radio/combobox labelledby, LinkPreview anchor semantics.
- Design: neutral pressed state for `ToggleGroup`, neutral `Meter` fill, removed non-overlay shadow from `Command`, danger variant for `Button` + destructive `AlertDialog`.
- Storybook: correct `asChild` usage (no accidental double-wrapping), added missing token stylesheet imports, valid story names.

### Verification
- `packages/ui`: build passes; `svelte-check` reports 0 errors and 2 pre-existing `AppShell` unused-selector warnings.
- Unit tests: 22 files / 214 tests pass.
- Storybook build passes.
- Storybook Vitest (render + axe a11y): 58 files / 142 tests pass.
