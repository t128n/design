---
name: t128n-ui
description: "Build or audit any t128n interface: admin consoles, record browsers, audit views, internal dashboards, register tables, record detail screens, forms, and dialogs. Use for building or changing a view — new pages, added columns, filters, sorting, status badges, empty or error states, or a request to match the app, make a screen consistent, or restyle a view, even when t128n is not named. Also use for design conformance audits, consistency checks across screens, accessibility passes, and sign-off: open the rendered view, run the CSS audit helper, check each rule against observed evidence, and report findings with severity and spec pointers."
---

# t128n UI

A t128n view is a working surface for dense operational data. Build it by
deciding, in order: what kind of screen this is, which layout selector carries
it, how records and statuses read, and how input and overlays behave. This file
is the procedure. The references carry the detail for the decision in front of
you. `references/DESIGN.md` carries the norm.

Link the generated stylesheets and name their tokens. Never copy a value out of
a source into the app: a second copy is a second source. If a value is missing,
change `references/DESIGN.md` and rebuild rather than improvising a local
colour, size, or radius.

This skill has two modes. Building or changing a view is the procedure below.
Auditing a view that already exists is the review route at the end of this file.

## Sources

| File | What it is | Open it when |
| :--- | :--- | :--- |
| `references/DESIGN.md` | Normative tokens, rules, layout definitions | Any disagreement about a value or rule |
| `assets/tokens.css` | Generated variables for both themes | Linking a page, naming a token |
| `assets/layouts.css` | Generated page skeletons | Building any page frame |
| `preview/pages/` | Bare skeleton for every standard layout | Checking the expected structure |
| `preview/src/pages/` | Working examples with real controls | Copying a pattern, not its values |
| `references/layouts.md` | Skeleton decision table | Step 2 |
| `references/records.md` | Registers, records, status, states | Step 3 |
| `references/forms-and-dialogs.md` | Fields, validation, overlays | Step 4 |

## Procedure

1. **Classify the screen.** Write one sentence: "This is a <register | record
   detail | list + detail | form | dashboard | audit log> for <operator>." If
   the request needs two kinds, name the primary one; the other becomes a
   region inside it. This sentence decides everything after it.
2. **Choose the skeleton.** Open `references/layouts.md`, take the row that
   matches the sentence, and write down the selector it names before writing
   markup. No row matches means the page is a composition of two rows, not a
   new skeleton.
3. **Compose the records.** Open `references/records.md`. Decide the identifier
   column, the column order, which columns are numeric, where status sits, and
   which states the collection can be in.
4. **Add input and overlays.** Open `references/forms-and-dialogs.md` for any
   field, validation message, confirmation, or dialog. Forms are part of the
   record, not a separate screen style.
5. **Cover the states.** Every collection gets empty, loading, error, and
   many-row fixtures. Every record gets missing and overlong values. Every
   form gets invalid and server-rejected input.
6. **Prove it.** Walk the view by keyboard, toggle both themes, zoom to 200%,
   and run the checks in the rules below. Record the result in the change
   description.

## Rules

### R1 Link only the generated stylesheets

Load `assets/tokens.css`, then `assets/layouts.css`, and no local palette, theme,
or type scale. **Because** the artifacts are generated from
`references/DESIGN.md`; a local copy drifts silently and defeats every later
audit. **Verify** the page head names exactly those two stylesheets and the
view's own CSS declares no colours, font stacks, spacing scale, or radii.

### R2 Keep one accent action per view

Give the primary action the accent and make every other action secondary or a
plain control. **Because** a view with several equal-weight primaries has no
primary; operators cannot tell what finishes the task. **Verify** count the
accented controls in the rendered view; there is one, and it matches the verb
in the screen sentence.

### R3 Build structure from rules and tints

Separate layers with dividers, surface tints, and spacing. **Because** the
system is flat by design; depth is done with contrast, so shadows, blur, glass,
glow, and gradient borders read as a different product. **Verify** the view's
CSS contains no shadow, filter, backdrop, or gradient declaration, and text
stays legible at 200% zoom.

### R4 Status is text plus one role

Render a status as a text label plus exactly one of the seven roles: `neutral`,
`info`, `progress`, `success`, `warning`, `danger`, `disabled`. **Because** an
operator must be able to read state without perceiving colour, and seven roles
are the whole vocabulary. **Verify** every status element contains readable
text, carries one role class, and still makes sense in greyscale.

### R5 A record table stays a table

Keep the identifier column and let the table scroll horizontally at narrow
widths; never swap it for a card grid. **Because** a card grid destroys column
comparison and hides the record identity that operators scan by.
**Verify** resize to the narrowest supported width: the header row, identifier
column, and alignment survive.

### R6 Align numbers by meaning

Right-align quantities and use the numeric typography so digits line up; keep
identifiers left-aligned and monospaced where the spec says so.
**Because** misaligned digits slow comparison, which is the main job of a
register. **Verify** scan every numeric column: all values share one alignment
and one figure style, and units or currency appear once in the header, not per
cell.

### R7 Every control does what it says

Sort arrows sort, chevrons open, filters filter, pagination pages. Static text
must not look interactive. **Because** a dead control teaches operators to
distrust the whole view. **Verify** activate each control once with the pointer
and once with the keyboard, and confirm the visible result changed.

### R8 Design every state, not the happy path

Provide empty, loading, partial failure, error, and 0/1/many-row states, plus
overlong names and missing values. **Because** operational data is rarely clean
and a view that clips or collapses under real values is broken in production.
**Verify** load the fixtures named in the change description and check for
clipping, overlap, and layout collapse at every supported width.

### R9 Label every field

Every control has a visible label; a placeholder may only repeat an example.
Errors attach to the field they describe and name the fix. **Because** a
placeholder disappears exactly when the operator needs it, and an unlabelled
error cannot be acted on. **Verify** clear every placeholder in devtools: the
field is still identifiable, and each error message names its field.

### R10 Overlays are native dialogs

Use a native dialog element, give it a visible edge, and return focus to the
control that opened it when it closes. **Because** a native dialog carries focus
trapping, escape handling, and screen-reader semantics that a positioned div
does not. **Verify** open and close by keyboard: focus enters the dialog, stays
inside, Escape closes it, and focus lands back on the trigger.

### R11 Keyboard order and zoom are part of the layout

Tab order follows reading order, focus is always visible, and the layout
survives 200% zoom. **Because** density tempts you to shrink or reorder things
that keyboard and low-vision operators depend on. **Verify** tab through the
whole view without a pointer, then repeat at 200% zoom; nothing is skipped,
hidden, or overlapped.

### R12 Both themes are the same view

Test light and dark before shipping. Use theme-mapped tokens only, never
theme-specific values. **Because** the generated stylesheet maps dark values
onto the same token names, so a view that branches on theme will drift from
the system. **Verify** toggle `data-theme` and compare: same hierarchy, same
status meanings, and no unreadable text in either.

## Reviewing an existing view

Use this route when the request is a conformance audit, a consistency check
across screens, an accessibility pass, or a sign-off, rather than building a
new view. Open `references/review.md` and follow its eight ordered steps; it
names the evidence rules, the stable report format, and the hard stops. The
checklist that the report is scored against is `references/checklist.md`
(R1–R30). Run the static scan with:

```sh
bun scripts/audit-css.mjs path/to/app.css
```

The review mode does not restate the design system and does not accept a
description of a view as evidence: every rule is a test against the rendered
interface, and `references/DESIGN.md` is the authority, cited rather than
copied. If the view cannot be rendered or inspected, stop and report BLOCKED.

## Done

- The screen sentence, chosen selector, and states are in the change
  description.
- The view uses only the two generated stylesheets and named tokens.
- Every status is text plus one role.
- Empty, loading, error, and long-value fixtures were rendered.
- Keyboard, 200% zoom, and both themes were checked.
