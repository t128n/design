# Layout choice

Choose exactly one skeleton per page and name its selector before writing
markup. The grid definitions live in the Layout section of
`references/DESIGN.md`; the shipped skeleton stylesheet is `assets/layouts.css`.
Skeletons compose: a page frame holds a shell, a shell holds a register, a
register holds a table.

## Decision table

| If the request is | Use | Because |
| :--- | :--- | :--- |
| A tool with navigation and one working area | `.t128n-app-shell` with `.t128n-app-shell__header`, `__nav`, `__main` | Navigation must stay stable while the working area changes; the shell owns that frame. |
| A filterable list of records you sort and open | `.t128n-register` inside the shell main | A register is header, toolbar, table, footer; the operators' loop starts in the toolbar. |
| A list beside the selected record | `.t128n-split` | Side-by-side comparison needs a bounded list pane and a fluid detail pane. |
| One record, read-only, with metadata | `.t128n-record` with `.t128n-record__meta` and `__body` | The record is the object; metadata supports it and must not compete with it. |
| One record being edited | `.t128n-record` wrapping `.t128n-form-grid` | Editing keeps the record identity visible while fields change. |
| A short settings or create page | `.t128n-page` wrapping `.t128n-form-grid` | A single reading column keeps a short form from stretching across a wide screen. |
| A summary above a working register | `.t128n-grid` with `.t128n-grid--3` above `.t128n-register` | Summary and detail are one screen when the summary explains the register below it. |
| Two related panels of equal weight | `.t128n-grid` with `.t128n-grid--2` | Two comparable regions need equal columns and one shared reading order. |
| Three related panels of equal weight | `.t128n-grid` with `.t128n-grid--3` | Three regions that are genuinely parallel. |
| A stack of states or sections | `.t128n-stack` | One column, one gap, so empty, loading, and error panels read in sequence. |
| A row of actions, filters, or badges | `.t128n-cluster` | A wrapping row keeps controls together when the viewport narrows. |

## Composition

Wrap every page in `.t128n-page` unless a shell already provides the frame.
Put `.t128n-page` inside `.t128n-app-shell__main`, never around the shell.

Span a full-width row inside any grid with `.t128n-grid__full`. This is how a
toolbar or a table sits under an equal-column summary without breaking the
column count.

Collapse behaviour belongs to `assets/layouts.css` and is described in
`references/DESIGN.md`: equal-column grids step down, split and record layouts
stack, and the shell moves navigation below the main region. Do not add your own
breakpoints or widths to reproduce those steps.

Use `preview/pages/` to see the bare skeleton for every row above before you
write markup. Use `preview/src/pages/` to see the same skeletons carrying real
controls; copy the structure, never the values.

## Rules

### L1 One skeleton per page

Name one primary skeleton and let the others be regions inside it.
**Because** two competing frames produce two scroll containers and two
hierarchies, and operators lose their place. **Verify** the outermost element
of the view is the selector you named, and no nested element re-declares a page
frame.

### L2 Write the selector down before markup

State the chosen selector in the plan or change description.
**Because** the choice is the design decision; naming it makes a wrong choice
reviewable before it is built. **Verify** the change description names a
selector from the decision table, and the diff uses that selector.

### L3 Compose skeletons, do not re-implement them

Override only the grid custom properties that `references/DESIGN.md` documents
for a one-off composition. Do not restate grid templates in app CSS.
**Because** re-declaring a skeleton copies the system into the app and the
copy stops tracking the generated stylesheet. **Verify** the app stylesheet
contains no grid template or page width of its own, only the documented
overrides.

### L4 Tables survive narrow widths

Keep a record table as a table and scroll it horizontally instead of turning
rows into cards. **Because** the identifier column and aligned columns are how
operators scan; cards remove both. **Verify** shrink the viewport to the
narrowest supported width and confirm the header row and identifier column are
still present.

### L5 No decorative grids

Use an equal-column grid only for regions that are genuinely parallel and each
has its own content. **Because** a bento grid of unrelated tiles fabricates
equal importance and hides what the operator should read first.
**Verify** remove the grid: if the regions are no longer comparable, the grid
was decoration and the content was not parallel.
