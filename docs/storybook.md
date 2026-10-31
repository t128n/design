# Storybook information architecture

The Storybook sidebar is organised by the role a component plays in an
interface, not by the file that happens to contain it. The five top-level
groups are fixed, and the order is set by `options.storySort` in
`.storybook/preview.ts`.

## Sidebar taxonomy

```
Foundations
  Overview
  Theming

Primitives
  Text, Code, List, Icon, Visually hidden, Avatar, Badge, Separator,
  AspectRatio, ScrollArea

Layouts
  Stack, Inline, Grid, Container, Card, App shell, Page header, Hero,
  Footer, Navbar, Sidebar

Components
  Controls
    Button, Link, Toggle, ToggleGroup, Toolbar, Pagination
  Forms
    Input, Label, Field, Select, Combobox, Checkbox, Switch, RadioGroup,
    Slider, PinInput, RatingGroup, DateField, DatePicker, DateRangeField,
    DateRangePicker, TimeField, TimeRangeField, Calendar, RangeCalendar
  Data
    Table
  Feedback
    Alert, Progress, Meter, EmptyState
  Overlays
    Dialog, AlertDialog, Popover, Tooltip, DropdownMenu, ContextMenu,
    Menubar, Command, LinkPreview
  Navigation
    Breadcrumbs, Tabs, Accordion, Collapsible, NavigationMenu

Views
  Dashboard, Settings, Landing, Personal
```

`Calendar`, `RangeCalendar`, and `LinkPreview` are supporting components rather
than headline entries in the original tree. They follow the same task-area rule
as everything else: the calendars are form controls, and the link preview is an
overlay.

## Classification rules

- **Foundations** is documentation only: tokens, type specimens, theming, and
  design rules. It is not a component category and contains no interactive API.
- **Primitives** are low-level, non-compositional building blocks: typography,
  icons, badges, separators, media, and accessibility utilities. A primitive
  does not own a page region and does not compose other components into a
  workflow.
- **Layouts** own structure, rhythm, surfaces, and page regions. `Card`,
  `AppShell`, `Navbar`, and `Sidebar` belong here because they are structural,
  even though some of them expose navigation slots.
- **Components** are interactive or composed UI. The subgroup names the user
  task:
  - **Controls** trigger an action or change a view state.
  - **Forms** collect and validate input, including date and time values.
  - **Data** presents structured records.
  - **Feedback** reports status, progress, measurement, or emptiness.
  - **Overlays** place a temporary layer above the page.
  - **Navigation** moves between pages, views, or disclosure regions.
- **Views** are composed screens. A view may use layouts, components, and
  primitives, but it must not become the home of a reusable primitive.

## Where a new component belongs

1. Does it only document tokens or rules? Put it under **Foundations**.
2. Is it a non-interactive building block with no page structure? Put it under
   **Primitives**.
3. Does it own spacing, width, surface, or a page region, even if it is not
   interactive? Put it under **Layouts**.
4. Does it collect input? Put it under **Components/Forms**.
5. Does it trigger an action or toggle a view state? Put it under
   **Components/Controls**.
6. Does it present records or a dataset? Put it under **Components/Data**.
7. Does it report state, progress, or emptiness? Put it under
   **Components/Feedback**.
8. Does it float above the page and dismiss? Put it under
   **Components/Overlays**.
9. Does it move between destinations or disclosure regions? Put it under
   **Components/Navigation**.
10. Is it a complete screen assembled from the layers above? Put it under
    **Views**.

If a component fits two groups, choose the group that describes what the reader
does with it. A date picker is a form control even though it opens an overlay; a
sidebar is a layout even though it contains navigation.

## Design intent and voice

Storybook is the worked example of `DESIGN.md`, not a catalogue of everything the
components can do. Read **Design intent**, **Identity and differentiation**, and
**Voice and tone** in [`DESIGN.md`](../DESIGN.md) before adding a story.

- A component description states its purpose, its boundary, and the intent
  constraint it protects: content leads, one primary action, feedback in place,
  a continuous workspace, or text plus one role for status.
- A composed view names the surface it uses (`workspace` or `reading`) and the
  signature patterns it demonstrates. At least two patterns are required.
- Story copy follows the voice rules: sentence case, verb-first actions, and the
  object, cause, and fix. It never uses “Oops”, “Uh oh”, “Something went wrong”,
  “Invalid input”, or “Successfully”.
- A story that contradicts a refusal is a bug. Fix the story or record a dated
  exception in `DESIGN.md`; do not quietly invent a variant in Storybook.

## Story metadata requirements

Every `defineMeta` call must include:

```ts
tags: ['autodocs'],
parameters: {
  docs: {
    description: {
      component: 'Purpose, what it is not for, and one composition or variant rule.'
    }
  }
}
```

The component description is the single place for do/don't guidance. Controls,
tables, forms, and navigation components must state both a "Do" rule and a
"Do not" rule. Table guidance must cover `TableRow`/`TableCell`, the empty
state, numeric alignment, and the density limit.

The description must also name the intent constraint the component protects.
Composed views add `Signature patterns:` and name the surface. A description is
not a restatement of the props table; it explains when the component is the
right choice and when it is not.

## Enforcement

Three unit tests keep the contract honest:

- `packages/ui/tests/story-taxonomy.test.ts` parses every story title, rejects
  an unapproved top-level group, and checks the exact target for every
  classified story file. A new story file must be added to its registry.
- `packages/ui/tests/story-docs.test.ts` requires autodocs, a component
  description, explicit do/don't guidance for the key controls, table, forms,
  and navigation stories, a voice-safe description, and the surface plus
  signature patterns for every composed view.
- `packages/ui/tests/design-intent.test.ts` keeps the intent, precedence,
  differentiation, and voice sections in `DESIGN.md`, and checks that the
  Storybook guidance and Foundations story document the same contract.

Run `bun run test` after changing a title or description, and
`bun run test:storybook` to confirm the stories still render.
