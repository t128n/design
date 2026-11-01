# UI design instructions for agents

Before designing or reviewing UI with `@t128n/ui`, read the packaged
[`docs/design-language.mdx`](./docs/design-language.mdx), especially Design
intent, Identity and differentiation, Voice and tone, and the subtraction review.
Read the packaged [component reference](./docs/components.mdx), not just tokens
and individual APIs.
The rendered reference is also available in [Storybook](https://t128n.github.io/design/?path=/docs/foundations-design-language--docs).
The design language is the source of truth; apply its accessibility and task
completion precedence before visual restraint.

## Screen design and review

- Give every visible element a distinct job at that point in the workflow:
  action, decision, orientation, or necessary feedback. Annotate these jobs during
  design, including text, labels, badges, icons, dividers, containers, and metadata.
  Remove elements without a distinct job.
- For every state, perform a subtraction pass: remove each element in turn and
  identify the concrete capability or understanding lost. Keep necessary labels,
  accessible names, orientation, constraints, and feedback; do not sacrifice
  accessibility or correct task completion for brevity.
- State each fact once where it matters. Check duplication across the entire
  screen, not only within components. Do not repeat the page title in a section,
  the selected value beside its control, or an outcome already visible. Keep
  workflow explanations out of persistent application chrome.
- Supporting copy must answer a likely question or explain a constraint that
  changes the next action. Remove generic reassurance, feature narration,
  implementation details, and filler.
- Review real composed screens and their states, not only isolated component
  stories. Individually valid components can still form a cluttered screen.
  Compare the negative and subtracted composed-screen example in the design
  language before approving a composition.

## Composed-screen review — completion requirement

Before marking an application UI complete:

1. Read the current design language and component reference.
2. Inspect the complete workflow in its initial, configured, pending, error,
   and success states, where applicable.
3. For each state identify the subject, current state, next action,
   consequential constraints, and recovery path. Existing UI may answer these;
   do not repeat an answer just to satisfy the checklist.
4. Annotate the distinct job of each visible element. Remove decorative,
   generic, repeated, or implementation-centric content without a purpose.
   Improve or replace a necessary cue that works poorly rather than deleting it.
5. When removing chrome, preserve useful grouping and orientation through
   headings, alignment, spacing, or a justified boundary.
6. Verify keyboard use, focus, responsive behavior, and actual task completion.
7. Report what was tested and what was not. Passing builds, screenshots, and
   component tests alone do not prove the workflow is intuitive.

### Functional minimalism review template

- [ ] Each state identifies the subject, state, and next action.
- [ ] Important constraints appear where they affect a decision.
- [ ] Errors provide a correction or say the cause is unknown.
- [ ] No heading, value, status, or instruction repeats without a reason.
- [ ] Removed containers have not disconnected related controls or actions.
- [ ] Keyboard, narrow viewport, and the complete task flow were checked.
- [ ] Untested usability assumptions are stated explicitly.
