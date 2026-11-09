# Definition of Done

> "`chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone."

**Strategy: `direct`** — the seam exists: `createChatOrchestrator` runs the real tool loop against a scripted provider, and the `afterModelResponse` hook observes what the turn reports. The acceptance tests call that real entry point and fail today on the last-round-only value.

The red bar was shown in this pod, not left to CI: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestratorUsage.acceptance.test.ts` — two tests fail on the under-count, the third passes (it pins a requirement that already holds and must survive the change).

The ticket asks the implementer to decide the shape. Its own criteria force the answer: criterion 2 pins a no-tool turn to deep-equal the provider's bare `UsageMetadata` object via an existing, unedited test, so wrapping the hook's third argument in a `{total, rounds}` object is excluded. The contract is therefore the first shape — accumulate across rounds and pass the sum through the existing `usage` argument — and the per-round breakdown is the rejected alternative; record that rejection on issue #93 when the PR opens.

## Done when these pass

- [ ] **reports the usage of every provider call in a two-round tool turn, not only the last** — a turn driven through two tool rounds whose stops carry known, different token counts reports the field-wise sum of both calls, not the final call's usage
  `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when a round in between reports none** — a silent middle round contributes nothing rather than making the total `undefined` or `NaN`; the rounds that reported are summed
  `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **still reports nothing when no round in the turn reported usage** — a turn whose rounds all stayed silent reports `undefined`, never a zero or `NaN` (green today; it must survive the change)
  `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (EXISTING — must stay green and unedited) — a turn with no tool calls reports exactly what it reports today, the ticket's own pin for the common path
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate usage across the rounds that reported one in `chatOrchestrator.ts`, field-wise (`inputTokens`/`outputTokens`/`totalTokens`), `undefined` when none reported — turns the two red tests green, keeps the third green and the existing pin green
- [ ] Make the declared type self-describing: the `afterModelResponse` signature carries a named, one-line-documented type (`re-lint/max-comment-lines` caps the doc) saying it is the turn's total across every provider call, so a reader never opens the orchestrator to learn it is a sum. Runtime shape stays the bare usage object; no `any`. Judged by CI's `typecheck`/`eslint` and review — not testable red from here
- [ ] `specs/hal-engine-config-hooks/spec.md` now carries the behaviour under "Usage reported to `afterModelResponse`" with citations at #L56/#L81/#L107; adjust the wording if the shipped behaviour differs from it
- [ ] CHANGELOG entry under `## [Unreleased]` → `### Changed`, stating the change in what an existing consumer will record: the number grows for tool-heavy turns. It is a behaviour change, so a MINOR bump is owed at release
- [ ] CI judges the gates this pod must not run (`eslint` and `tsc` OOM near the 1Gi pod limit; a build is never needed — tests resolve packages from source)

## Out of scope

- The audit entry or billing record itself — a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape — providers already populate it; this issue only aggregates
- The per-round breakdown argument — the rejected second shape, unless a consumer asks for it
- The version bump itself — release mechanics; the changelog line is owed now, the bump at release