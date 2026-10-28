# Records and status

A record is a row plus the detail that explains it. The register lists records;
the record view opens one. Everything visible here comes from the Tables,
Status badges, and Components sections of `references/DESIGN.md` and from the
variables in `assets/tokens.css`. This file orders the decisions and names
their checks.

## Register anatomy

Top to bottom, the register is header, toolbar, table, footer. Keep that order;
operators learn it once and reuse it across tools.

Columns, left to right:

1. The identifier — the stable, unique value the operator will say aloud.
   Never hide it, never let it truncate to nothing, never move it behind an
   expander.
2. The fields that answer the question the screen sentence asks. A column that
   no decision depends on is decoration.
3. Quantities, right-aligned and set in the numeric typography so digits line
   up. A unit or currency appears in the header once, not in every cell.
4. Status, near the end, so the eye lands on the outcome after reading the
   record.
5. Row actions, last, with text or an accessible name on every control.

Selection is a state, not a hover: the selected row stays visibly selected and
the detail region keeps showing it. Sorting, filtering, and paging are real
operations with visible results, never static arrows or dots.

## Status

Seven roles: `neutral`, `info`, `progress`, `success`, `warning`, `danger`, `disabled`.

Map the application's vocabulary onto those roles; do not invent a local role
or a local status colour.

| Local examples | Role | Meaning it must carry |
| :--- | :--- | :--- |
| Draft, Not started, Archived | `neutral` | No judgement yet; nothing is wrong. |
| New, Scheduled, Note | `info` | Context the operator should notice. |
| Running, Syncing, Queued | `progress` | Work is in flight; completion is expected. |
| Passed, Complete, Active | `success` | The expected outcome happened. |
| Needs review, Expiring, Partial | `warning` | Attention is required; work can continue. |
| Failed, Rejected, Blocked | `danger` | The outcome is wrong and someone must act. |
| Suspended, Paused, Retired | `disabled` | The record exists but cannot act. |

Every status is a text label first. The role supplies the surface, ink, and
border; an icon may supplement the label but never replace it. A badge with no
words is a defect even when its colour is correct.

## States

Design the collection, not the happy path:

- **Empty** — say what would appear here and offer the action that creates it.
- **Loading** — keep the table frame so the layout does not jump.
- **Error** — state what failed, keep the rest of the page usable, and offer a
  retry.
- **Partial failure** — mark the affected rows or cells instead of blanking the
  page.
- **0/1/many** — check all three; a one-row table and a many-row table reveal
  different alignment faults.
- **Long and missing values** — a long name, a huge number, an absent value.
  None may clip, overlap, or collapse a column.

## Rules

### RC1 The identifier stays first and stable

Give every record a stable identifier column and keep it visible.
**Because** operators navigate by identifier, and a list whose key moves or
disappears cannot be discussed or cross-checked. **Verify** read the first
column aloud for three rows; each value is unique, readable, and still present
at the narrowest width.

### RC2 Every column earns its place

Add a column only when a decision depends on it. **Because** each extra column
steals width from the identifier and the answer, and density without purpose is
noise. **Verify** name the decision each column supports; remove the ones you
cannot name.

### RC3 Numbers align as numbers

Right-align quantities and use the numeric typography; keep identifiers in the
text or monospaced style that `references/DESIGN.md` assigns. **Because**
comparison by magnitude is the register's main job and mixed alignment breaks
it. **Verify** scan the numeric columns: one alignment, one figure style, units
in the header only.

### RC4 Status is text plus one role

Render the text label and exactly one of the seven roles. **Because** colour
alone is unreadable for some operators and ambiguous for everyone in greyscale.
**Verify** view the page in greyscale: every status still reads, and each
status element contains words and one role class.

### RC5 Selection is visible and persistent

Show the selected row and keep the detail region bound to it. **Because** a
list-detail view where selection disappears forces the operator to re-find the
record after every action. **Verify** select a row, act in the detail region,
and confirm the same row is still marked.

### RC6 Every control performs its action

Sort arrows sort, filters narrow the set, pagination pages, row actions open
what they name. **Because** one dead control makes the rest untrustworthy.
**Verify** activate each control by pointer and keyboard and observe the change
in rows, order, or view.

### RC7 The collection has four visible states

Ship empty, loading, error, and populated views of the same collection.
**Because** an unhandled state is where clipping and dead ends appear.
**Verify** render each state from a fixture and check the page keeps its frame
and its next action.

### RC8 Values survive real data

Test overlong names, large numbers, null values, and mixed types.
**Because** idealised fixtures hide the faults that reach production.
**Verify** load the long and missing fixtures at every supported width and
confirm nothing clips, overlaps, or collapses.

### RC9 Downstream views inherit the record

When a register, a detail view, and an audit view show the same record, keep
the identifier formatting and status vocabulary identical. **Because** a
renamed status or reformatted identifier between views makes operators think
they are looking at two records. **Verify** open the same record in each view
and compare the identifier string and status label character for character.
