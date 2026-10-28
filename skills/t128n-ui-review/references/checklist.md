# t128n review checklist

Every row is a pass/fail test against a rendered view. A row passes only when its
pass condition is observed in the evidence recorded for the review. Reading the
source and inferring the result is not a pass.

Rule IDs are stable. Cite them in findings. `DESIGN.md` is the authority for every
row; follow the pointer and do not restate or reinterpret the rule from memory.
Widths, zoom, themes, and fixture data come from the review scope.

## Integrity tells

| ID | Rule | Pass condition | Spec |
| :--- | :--- | :--- | :--- |
| R1 | Bento metric grid | No equal-weight metric grid; every metric opens the filtered records or definition that produced it, with a source, time window, owner, and drill-down. | `DESIGN.md` § Interface Integrity |
| R2 | Shadow, glass, glow | A CSS scan and the rendered view show no shadow, gradient, blur, glow, frosted glass, or gradient border on records, forms, tables, or chrome; text stays legible at 200% zoom. | `DESIGN.md` § Interface Integrity; § Elevation & Depth |
| R3 | Orphaned micro-elements | Every pill, chip, or mini-header names a field, state, or section; removing it loses no navigation, grouping, or state meaning. | `DESIGN.md` § Interface Integrity |
| R4 | Vestigial interactivity and dead sort | Every control performs its advertised action; test each sort arrow, chevron, pagination control, and segmented option by pointer and keyboard. A dead sort arrow fails the row. | `DESIGN.md` § Interface Integrity; § Tables |
| R5 | Happy-path-only data | Long names, long numbers, missing values, empty collections, loading, partial failure, and server errors render without clipping, overlap, or layout collapse. | `DESIGN.md` § Interface Integrity |
| R6 | Sparkle icons | Search, filter, and submit use plain labels and standard icons; no sparkle or AI icon appears unless the action is genuinely generative and explains its input, output, and cost. | `DESIGN.md` § Interface Integrity; § Iconography |

## Layout and shape

| ID | Rule | Pass condition | Spec |
| :--- | :--- | :--- | :--- |
| R7 | Record-first layout | The view is a single main column or a full-width register. At narrow width a record table keeps its identifier column and scrolls horizontally instead of collapsing into a card grid. | `DESIGN.md` § Layout |
| R8 | Standard layouts | The page skeleton uses the classes defined in `dist/layouts.css` and does not replace them with a different skeleton; composition only changes the documented custom properties. | `DESIGN.md` § Standard Layouts |
| R9 | Radius within scale | Radius comes only from the rounded scale in `DESIGN.md`; controls and badges stay rectilinear and nothing is a pill or rounds beyond the largest token. | `DESIGN.md` § Shapes; § Layout |
| R10 | Flat separation | Layers are separated by a hairline rule, surface tint, or header fill; panels and records sit in the reading plane with no floating treatment. | `DESIGN.md` § Elevation & Depth |
| R11 | Spacing on scale | Every gap, padding, and inset traces to the spacing scale in `DESIGN.md`; no invented intermediate values appear. | `DESIGN.md` § Layout |
| R12 | Type scale | Only the nine type scales appear; no text is below the smallest defined size; numeric columns right-align with tabular figures. | `DESIGN.md` § Typography |

## Color and status

| ID | Rule | Pass condition | Spec |
| :--- | :--- | :--- | :--- |
| R13 | Seven status roles | Every status maps to exactly one of neutral, info, progress, success, warning, danger, or disabled; no local state colors exist. | `DESIGN.md` § Colors; § Status badges |
| R14 | Status is text, not color alone | Every badge and status has a text label and a role style; removing color leaves the meaning readable. Color alone never signals success, warning, danger, or disabled. | `DESIGN.md` § Status badges; § Theme mapping |
| R15 | Interactive boundaries | Every interactive control boundary uses the control border token, and structural dividers use the structural rule tokens; no interactive control relies on a structural rule. | `DESIGN.md` § Shapes |
| R16 | Accent scarcity | One primary action per view; the accent is reserved for focus rings and selection edges and is not spread across decoration. | `DESIGN.md` § Do's and Don'ts |
| R17 | Light theme | The default light theme renders every surface, text, border, focus ring, and status from the light palette; no dark value leaks in. | `DESIGN.md` § Light palette; § Theme mapping |
| R18 | Dark theme | With `data-theme="dark"` and again with `prefers-color-scheme: dark` and no explicit attribute, all surfaces, text, borders, focus rings, and statuses render with parity and readable contrast. | `DESIGN.md` § Dark palette; § Theme mapping |
| R19 | No invented colors | Every color traces to a front-matter token; no hard-coded color, gradient, or local palette exists in the view's CSS. | `DESIGN.md` § Colors |

## Forms and controls

| ID | Rule | Pass condition | Spec |
| :--- | :--- | :--- | :--- |
| R20 | Visible labels | Every input has a persistent visible label; a `placeholder` may show an example but never replaces the label; icon-only controls have an accessible name. | `DESIGN.md` § Inputs and fields |
| R21 | Native dialog | Overlays use a native dialog with a visible edge and a clear focus target; no backdrop blur or shadow; focus returns to the trigger on close. | `DESIGN.md` § Elevation & Depth; § Components |
| R22 | Control geometry and focus | Controls match their component token geometry and keep a visible focus indicator in both themes; disabled controls keep their label visible. | `DESIGN.md` § Buttons; § Inputs and fields |
| R23 | Accessible names | Every icon-only control has an accessible name, a target of adequate size, and an icon from the approved set; decorative icons are hidden from assistive technology. | `DESIGN.md` § Iconography |

## Keyboard and accessibility

| ID | Rule | Pass condition | Spec |
| :--- | :--- | :--- | :--- |
| R24 | Keyboard order | Keyboard order and tab order follow visual and reading order; a skip link reaches main content; every control is reachable and operable without a pointer; dialogs trap focus only while open. | `DESIGN.md` § Do's and Don'ts |
| R25 | Visible focus | A visible focus indicator appears on every interactive element in both themes and is never removed by a reset. | `DESIGN.md` § Do's and Don'ts |
| R26 | 200% zoom | At 200% zoom no text clips, overlaps, disappears, or forces horizontal page scroll; every action remains reachable. | `DESIGN.md` § Interface Integrity; § Do's and Don'ts |
| R27 | Table semantics | Tables have scoped headers, a caption or accessible name, a stable identifier column, and `aria-sort` that reflects the real current sort; sorting changes row order. | `DESIGN.md` § Tables |
| R28 | Contrast | Text pairs meet AA contrast in both themes; muted ink is used only for secondary content; control edges remain distinguishable from their surfaces. | `DESIGN.md` § Colors; § Shapes |

## Content and states

| ID | Rule | Pass condition | Spec |
| :--- | :--- | :--- | :--- |
| R29 | Real content | Fixtures include 40-character names, long numbers, missing values, and 0, 1, and many rows; nothing clips, overlaps, or collapses. | `DESIGN.md` § Interface Integrity |
| R30 | Explicit states | Empty, loading, partial failure, and server-error states are explicit, labelled, and actionable; no view shows a blank region without a state. | `DESIGN.md` § Do's and Don'ts; § Components |
