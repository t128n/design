# t128n skill evals

Five prompts check whether the skills change real work: three build tasks and
two review tasks. Each entry in `evals.json` has an `id`, a `kind` (`build` or
`review`), the prompt to paste, and `expected_output` — the checks a reviewer
uses to grade the result.

| Id | Kind | Context |
| :--- | :--- | :--- |
| `build-deployment-register` | build | Deployments register with filters, sorting, and real-data edge cases. |
| `build-record-detail-dialog` | build | API-key record detail with a native revoke dialog. |
| `build-service-settings-form` | build | Settings form with long, missing, and invalid values. |
| `review-deployments-audit` | review | Audit a shipping register page against the spec. |
| `review-broken-page-conformance` | review | Find the planted violations in the broken-page fixture. |

## Before you run

Install the skill as described in `README.md` so the agent can discover
`t128n-ui`. Run the prompts from the repository root so the canonical files
(`skills/t128n-ui/references/DESIGN.md`, `skills/t128n-ui/assets/`, and `preview/`) are available.

Create a workspace outside the repository for every run. Do not write generated
pages or reports into the checkout:

```sh
mkdir -p /tmp/opencode/t128n-evals/<eval-id>/<condition>
```

`<condition>` is `with-skill` or `baseline`.

## With the skill

1. Start a fresh agent session in the repository with the skill installed.
2. Paste the prompt from `evals.json` unchanged. For a review prompt, keep the
   named target path; the fixture lives at `evals/fixtures/broken-page.html`.
3. Tell the agent to write its page or report to
   `/tmp/opencode/t128n-evals/<eval-id>/with-skill/`.
4. Save the transcript and the output. Do not coach or revise the prompt.

The skill should trigger on the build prompts and route to review on the review
prompts. Record whether the expected mode actually loaded; a run where it did
not is a triggering failure, not a design failure.

## Baseline

Repeat the same prompt, model, and workspace layout in a fresh session with the
skill unavailable — uninstall or hide it for the run. Do not point the agent
at `skills/t128n-ui/references/DESIGN.md`, `skills/t128n-ui/assets/`, `preview/`, or this eval set, and do not
add design hints. Write the result to the `baseline` condition directory.

Compare the two outputs against the same `expected_output` checks. The point is
not that the baseline is bad everywhere; it is that the with-skill output clears
the checks the baseline misses without regressing the rest. One revision pass is
enough to confirm a fix; record anything else as a follow-up.

## Grading

Grade each condition against every bullet in `expected_output`:

- `pass` — the check is met and the evidence is visible in the output.
- `fail` — the check is missed, or the output only claims it without evidence.
- `n/a` — the check does not apply, with a one-line reason.

For review prompts, grade the report rather than the page: a finding must carry
severity, evidence, the smallest fix, and the `skills/t128n-ui/references/DESIGN.md` rule it
breaks. These are the primary checks: a report that lists findings without a `skills/t128n-ui/references/DESIGN.md` rule
and a smallest fix for each one fails, however many
it lists. The broken-page fixture contains exactly seven findings, so the count
is necessary but not sufficient — seven findings with no rule citations still
fail.

## The broken-page fixture

`evals/fixtures/broken-page.html` is a small standalone deployments page, not a copy
of the preview. Each planted violation is preceded by a marker comment. CSS
violations use `/* t128n-eval: name */`; markup violations use
`<!-- t128n-eval: name -->`. The test matches the substring `t128n-eval: <name>`
in either form, so the comment delimiters are not part of the marker:

| Marker | Violation |
| :--- | :--- |
| `shadow` | Drop shadow on the register panel. |
| `card-grid-collapse` | Table becomes a two-column card grid below the narrow breakpoint. |
| `color-only-status` | A status dot with no text label. |
| `oversized-radius` | Eight-pixel radius on a record row. |
| `hardcoded-color` | An invented accent color in the toolbar. |
| `placeholder-only-label` | Search input with a placeholder but no label. |
| `dead-sort` | Sort header with `aria-sort` and a button that never sorts. |

Use `grep -n "t128n-eval:" evals/fixtures/broken-page.html` to list the markers when
checking a review run. The fixture is intentionally unrepaired: do not use it as
a build example.
