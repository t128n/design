# Application Profile

One page per application. This record states how the app adopts the t128n design
system: which records it presents, how statuses map, how tables work on mobile,
and every approved deviation. Keep it current; review it whenever the record set
or status vocabulary changes. Copy this template, replace the angle-bracket
placeholders, and commit the filled copy beside the app.

## Header

| Field | Value |
| :--- | :--- |
| Application | `<application name>` |
| Owner | `<team or role accountable for this profile>` |
| Profile version | `<version of this profile record>` |
| Review date | `<YYYY-MM-DD>` |
| Design-system version | `<commit or version of the design system this app pins>` |
| Stack | `<framework, rendering model, and table/UI approach>` |

## Records

List the primary records the app presents. Every one needs a stable identifier
that survives renames and is safe to use in URLs, logs, and audit entries.

| Record | Stable identifier | Primary view | Key fields | Lifecycle owner |
| :--- | :--- | :--- | :--- | :--- |
| `<record name>` | `<immutable id field>` | `<default view>` | `<fields shown in the table>` | `<role that owns the record's lifecycle>` |

## Status vocabulary

Map every local status to exactly one of the seven semantic roles. The role
decides the badge colors and the meaning users read; the local status is only
the app's name for it. No local status may map to more than one role.

| Local status | Semantic role | Meaning | Allowed next states | Actor | Audit entry |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `<local status>` | `neutral` | `<what the status means>` | `<local statuses it may move to>` | `<who may make the change>` | `<audit action recorded>` |
| `<local status>` | `info` | `<what the status means>` | `<local statuses it may move to>` | `<who may make the change>` | `<audit action recorded>` |
| `<local status>` | `progress` | `<what the status means>` | `<local statuses it may move to>` | `<who may make the change>` | `<audit action recorded>` |
| `<local status>` | `success` | `<what the status means>` | `<local statuses it may move to>` | `<who may make the change>` | `<audit action recorded>` |
| `<local status>` | `warning` | `<what the status means>` | `<local statuses it may move to>` | `<who may make the change>` | `<audit action recorded>` |
| `<local status>` | `danger` | `<what the status means>` | `<local statuses it may move to>` | `<who may make the change>` | `<audit action recorded>` |
| `<local status>` | `disabled` | `<what the status means>` | `<local statuses it may move to>` | `<who may make the change>` | `<audit action recorded>` |

Roles in use: `neutral`, `info`, `progress`, `success`, `warning`, `danger`,
`disabled`. If the app has no local status for a role, delete that row and say
so in Exceptions.

## Transitions

Every mutation is a named transition with an actor and an audit entry. Do not
offer a transition that this table does not list.

| From | Action | To | Actor | Audit entry |
| :--- | :--- | :--- | :--- | :--- |
| `<local status>` | `<action name>` | `<local status>` | `<who may perform it>` | `<audit action recorded>` |

## Mobile table strategy

Pick one strategy per view and record it. Record tables stay tables; never
replace them with a card grid.

- **Strategy 1 — Sticky identifier, horizontal scroll.** Keep the record's
  stable identifier column pinned at the left and scroll the remaining columns
  horizontally. Use for wide, comparison-heavy tables.
- **Strategy 2 — Priority columns.** Show the identifier plus the two or three
  most important columns, and reveal the remaining fields in a record detail
  view. Use when most reads need only a few columns.
- **Strategy 3 — Stacked record rows.** Present each record as a labelled stack
  of field/value pairs, with the identifier first. Use for narrow views where
  comparison across rows is not the primary task.

| View | Strategy 1 / 2 / 3 | Sticky identifier column | Notes |
| :--- | :--- | :--- | :--- |
| `<view name>` | `<1, 2, or 3>` | `<yes/no and which column>` | `<constraints, e.g. minimum width>` |

## Exceptions

Any departure from this design system needs a row here before it ships. An
exception without an owner and a review date is not approved.

| Rule | Reason | Scope | Owner | Review date |
| :--- | :--- | :--- | :--- | :--- |
| `<rule being waived>` | `<why the exception is needed>` | `<screens, components, or records affected>` | `<person or role accountable>` | `<YYYY-MM-DD>` |

## Conformance checklist

- [ ] `DESIGN.md` adopted: tokens from the pinned design-system version, no
      forked or overridden values.
- [ ] All statuses mapped: every local status appears in Status vocabulary and
      maps to exactly one semantic role.
- [ ] All mutations audited: every transition in Transitions records an actor
      and an audit entry.
- [ ] Keyboard and 200% zoom verified: every flow works by keyboard alone and at
      200% browser zoom without loss of content or function.
- [ ] Exceptions documented: every deviation has a row with a rule, reason,
      scope, owner, and review date.
