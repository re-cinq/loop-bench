# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` with an `afterModelResponse` hook is the real seam: a scripted `AIProvider` whose rounds report known, different usage drives a tool turn, and the hook's `usage` argument is observed. Today it receives the last round's usage (`lastUsage = outcome.usage ?? lastUsage`). Decision recorded here: keep one `usage` argument and pass the field-by-field sum across rounds. Rejected: passing a per-round breakdown too, because it widens the public surface for a granularity no consumer has asked for. Note that this changes what existing consumers record (MINOR bump plus a CHANGELOG line).

## Done when these pass

- [ ] **reports the sum of every provider call in a turn driven through two tool rounds** — rounds that report 110/220/330 total tokens hand the hook 600/60/660
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when others did not, and reports nothing when none did** — a silent middle round adds nothing (sum 440), and an all-silent turn still hands `undefined`, never zeros or `NaN`
      `src/orchestration/turnUsage.acceptance.test.ts`

The no-tool path is pinned by the EXISTING `chatOrchestrator.test.ts` › `afterModelResponse` › `receives collected response text and usage`, which must stay green and unedited. So must `keeps the usage an earlier round reported when a later round reports none` in the same file, and `toolBudget.test.ts` › `hands afterModelResponse text ending in the sentence, and the usage of a run without the hook`.

## Facets

- [ ] Replace the `lastUsage` local in `chatOrchestrator.ts` with a running sum that stays `undefined` until a round reports usage (helper beside `extractUsage` in `orchestratorHelpers.ts`)
- [ ] Make the hook's type say it is a sum: e.g. export `type TurnUsage = UsageMetadata` with a one-line doc saying it sums every provider call in the turn, and use it on `afterModelResponse`'s `usage` parameter (no `any`). Regenerate the CLAUDE.md hooks block if it is generated from the declaration
- [ ] CHANGELOG `[Unreleased]` › `Changed`: `afterModelResponse` now receives usage summed across every tool round, so tool-heavy turns report larger numbers than before. Bump MINOR
- [ ] The spec's under-counting line is already replaced by the "Turn usage" section, which cites these tests. Keep its `Status` unchanged

## Out of scope

- The audit entry or billing record itself (that is the consumer's job)
- Token accounting for anything other than the orchestrator's provider calls (e.g. `generateStructured`)
- The `stop` chunk's own `usage` shape, and the `onError` non-`Error` gating that the spec still records