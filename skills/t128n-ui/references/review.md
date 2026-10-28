# t128n UI review

This skill audits a view that already exists. It does not restate the design system
and it does not accept a description of a view as evidence. Every rule is a test
against the rendered interface; `references/DESIGN.md` is the authority and is
cited, never copied.

Read `references/checklist.md` before starting. It holds every rule, its pass
condition, and the `references/DESIGN.md` section that governs it.

## Inputs

- The view: a URL or route, plus the source that renders it.
- The generated CSS the view loads: `assets/tokens.css` and `assets/layouts.css`.
- The spec: `references/DESIGN.md`. The audit runs against the rendered view and
  the skill's references only; there are no worked examples to lean on.

If you cannot render or inspect the view, stop and report BLOCKED. Reviewing from
memory, from a screenshot alone, or from the request text is not a review.

## Workflow

Run the steps in this order. Do not skip, merge, or reorder them.

### Step 1 — Scope and evidence

Name the view and route, the files that render it, the themes and widths you will
exercise, and the fixture data present. Record a baseline of what you observed
before changing anything: URL, build or dev command, viewport, theme, and the
fixture rows or records on screen.

Evidence for this step is a list of viewable targets plus the exact command or URL
used to reach them.

### Step 2 — Run the audit helper

Run the static scan against every stylesheet the view loads:

```sh
bun scripts/audit-css.mjs path/to/app.css
```

The helper prints a JSON array of findings with `rule`, `line`, `severity`, and
`message`. Exits `1` when any error is present. Keep the raw output with the
evidence. Treat each result as a candidate, not a verdict: the scan cannot see
what the rendered view actually does.

### Step 3 — Verify the helper findings by hand

Take each candidate in order. Open the cited line, find the selector in the
running view, and confirm the effect. Record a confirmed finding with the file and
line plus what you saw. Record a false positive in the report with the reason it
does not apply. Do not repair anything yet.

### Step 4 — Audit integrity and layout (R1–R12)

Check the six integrity tells and the layout rules against the live view. Render
at a wide width and at a narrow width; for a register, narrow means the table must
keep its identifier column and scroll rather than become a card grid. Compare the
skeleton with the classes defined in `assets/layouts.css`.

### Step 5 — Audit status, color, and both themes (R13–R19)

Exercise every status present and confirm each maps to one of the seven roles and
carries a text label. Check the light theme, then `data-theme="dark"`, then the
media-query dark path with no explicit attribute. Confirm no local state color,
hard-coded color, or invented role survives in either theme.

### Step 6 — Audit forms, keyboard, and access (R20–R28)

Tab from the top of the page and record the order. Focus every control, activate
every control from the keyboard, and confirm each does what it advertises. Check
labels, accessible names, table semantics, and focus return from dialogs. Then set
browser zoom to 200% and repeat the checks that can fail at that scale: clipping,
overlap, hidden actions, and horizontal page scroll.

### Step 7 — Audit content and states (R29–R30)

Render 40-character names, long numbers, missing values, empty collections,
loading, partial failure, and a server error, plus 0, 1, and many rows. Watch for
clipping, overlap, collapsed layout, and unlabeled states.

### Step 8 — Report

Produce the fixed report below. Do not interleave fixes with findings. After fixes,
re-enter the step that owns each failed row, rerun the helper and the affected
rows, and add a re-test section. A row is cleared only by observed evidence.

## Rules of evidence

- Every finding names its severity, evidence, and the governing `references/DESIGN.md` section.
- Severity is `error`, `warning`, or `info`. Use `error` for a rule broken in the
  rendered view, `warning` for drift that will break under real content or the
  other theme, and `info` for a permitted choice worth noting.
- Evidence is a file and line plus an observation, or a helper rule and line. A
  selector, a screenshot path, a key sequence, or a fixture value counts. "Looks
  off" does not.
- Cite the section instead of paraphrasing it. If `references/DESIGN.md` is silent,
  report `info` and propose a spec change; do not invent a rule.
- Report only rules in `references/checklist.md`. Do not turn personal preference
  into a finding when the spec permits the choice.
- Do not certify a row you did not exercise. Mark it skipped with the reason.

## Report format (stable)

**Verdict:** `pass`, `pass with warnings`, or `fail`.

**Scope:** view and route, files, command or URL, themes, widths, zoom, fixture
data.

**Findings:** ordered by severity, then rule ID.

| ID | Severity | Evidence | Rule | DESIGN.md | Fix |
| :--- | :--- | :--- | :--- | :--- | :--- |
| R4 | error | `records-table.svelte:41` click leaves row order unchanged | Dead sort control | § Tables | Wire the sort handler or remove the arrow |

The `ID` is the checklist rule or the helper rule. Every row carries all six
columns; an empty `Fix` column means the finding is informational.

**Coverage:** rows run, and rows skipped with the reason.

**Re-test:** helper command, checklist rows rerun, and the result of each.

## Hard stops

- The view cannot be rendered or interacted with: report BLOCKED, not a review.
- The helper cannot run: report that as an `error` finding and continue the manual
  pass; never substitute a guess for its output.
- A skill file, token dump, or copied layout block is used as the design source:
  report an `error` against the source-of-truth constraint.
- A status is communicated by color alone, or a control has no advertised action:
  the verdict is `fail` even when every other row passes.
