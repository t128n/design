# Layout skeletons

`@t128n/ui/layouts.css` contains the page-level skeletons from `DESIGN.md`
sections 2.7, 6.6 and 8. They set structure only: surfaces, borders, spacing and
widths come from semantic tokens, and every skeleton is a container-query
container where it needs to collapse.

Use a skeleton for the outer composition of a view. Keep component styles in
their own `.svelte` files; do not re-implement these grids or widths there.
Load the file once with:

```js
import "@t128n/ui/layouts.css";
```

## Page and shell

| Selector | When to use |
|---|---|
| `.t128n-app-shell` | The outermost app frame. Places the sidebar on `--surface-app` and content in a rounded `--surface-panel` with a hairline and `--space-2` margin. Use once per view, around the navigation and the main pane. |
| `.t128n-app-shell__nav` | The navigation column inside `.t128n-app-shell`. Holds `Sidebar` or another vertical nav. Hides below the 760px container width. |
| `.t128n-app-shell__main` | The content panel inside `.t128n-app-shell`. Holds a `Header` and the page body. Loses its margin, border and radius below 760px. |
| `.t128n-page` | A normal scrolling content page with `--page-inset` and `--space-6` vertical rhythm. Use for settings, overviews and other pages that are not split, register or reading layouts. |

## Split and reading layouts

| Selector | When to use |
|---|---|
| `.t128n-split` | Two-pane master and detail views such as Issues. The detail pane disappears below the 1060px container width and the list takes the full width. |
| `.t128n-split__list` | The scrolling list pane inside `.t128n-split`. Give it the row list or grouped list. |
| `.t128n-split__detail` | The fixed `--width-detail` pane inside `.t128n-split`. Holds the selected record. Never render it separately from the split. |
| `.t128n-record` | A single long-form record, capped at `--width-reading` and centred with `--page-inset`. Use for documents and record pages, not for data tables. |

## Register and data views

| Selector | When to use |
|---|---|
| `.t128n-register` | A data view that fills its pane: header and toolbar above, a scrolling table body, a footer count. Use for Table database views. |
| `.t128n-register__body` | The scrolling region inside `.t128n-register`. Put the `Table` here so the header and footer stay put. |
| `.t128n-register__footer` | The `--row-h-sm` footer inside `.t128n-register` with a top hairline. Use for row counts, selection summaries and pagination. |

## Grids, stacks and clusters

| Selector | When to use |
|---|---|
| `.t128n-grid` | A twelve-column grid on the `--space-4` rhythm. Use when children span columns explicitly. It collapses to one column below 760px. |
| `.t128n-grid--2` | Two equal columns for paired panels or stat cards. Collapses to one column below 760px. |
| `.t128n-grid--3` | Three equal columns, the stat-card row in Overview. Collapses to one column below 760px. |
| `.t128n-grid--4` | Four equal columns for dense card summaries. Collapses to one column below 760px. |
| `.t128n-stack` | Vertical flex with `--space-4` gap. Use for page sections and form groups. |
| `.t128n-stack--tight` | The same stack with `--space-2` gap. Use inside cards and compact forms. |
| `.t128n-cluster` | Wrapping horizontal group on `--space-2` gap. Use for toolbars, tag rows and action groups. |

## Collapse behaviour

The skeletons respond to their own container, not the viewport:

| Container width | Behaviour |
|---|---|
| ≤ 66.1875rem (1060px) | `.t128n-split__detail` hides. |
| ≤ 47.5rem (760px) | `.t128n-app-shell__nav` hides, `.t128n-app-shell__main` goes full-bleed, and all grid variants become one column. |

A view that nests a split inside a panel inherits the panel's width. Give the
interactive content a keyboard path at both widths, and keep the row heights
from the active density.
