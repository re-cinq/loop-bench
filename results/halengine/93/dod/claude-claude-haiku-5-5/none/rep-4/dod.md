# Definition of Done

> so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam exists: `createChatOrchestrator` takes a scripted `AIProvider` and an `afterModelResponse` hook, so a multi-round turn can be driven through `processMessage` today. The tests fail on the reported value, not on a missing seam.

Decision recorded for the implementer: sum the usage of every provider call in the turn and keep the single `usage` argument (field-wise sum of `inputTokens`, `outputTokens`, `totalTokens`; `undefined` only when no round reported). Passing both a total and a per-round breakdown was weighed and not chosen: it widens the hook surface for a consumer that has not asked for per-call granularity, and the sum is what the existing consumer's billing line needs.

## Done when these pass

- [ ] **reports usage covering every provider call in a turn driven through two tool rounds** — a scripted provider reports 14, 36 and 58 total tokens across three provider calls; the hook must receive the field-wise sum, 108.
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **still counts the rounds that reported when a middle round reports no usage** — rounds reporting 7 and 4 with a silent round between must sum to 11, not `undefined`, `NaN`, or the last round alone.
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

Existing tests that must stay green (no-tool path, unchanged):

- `afterModelResponse receives collected response text and usage` — a single-round turn reports exactly the usage it reports today.
  `src/orchestration/chatOrchestrator.test.ts`
- `afterModelResponse keeps the usage an earlier round reported when a later round reports none` — still passes under the sum, since only one round reports.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Sum usage across all provider calls in `processMessageStream` in `src/orchestration/chatOrchestrator.ts` instead of `lastUsage = outcome.usage ?? lastUsage`, keeping `undefined` when no round reported.
- [ ] Make the hook's usage type say it is a turn total: document the `afterModelResponse` usage parameter in `src/orchestration/chatOrchestrator.ts` (and `src/types/ai.ts` if a named alias is cleaner) as the sum over every provider call in the turn.
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` (the "Measured semantics — out of scope" bullet about `afterModelResponse`) with the new behaviour.
- [ ] Add a CHANGELOG entry stating that an existing `afterModelResponse` consumer will now record larger totals for tool-using turns, with a MINOR bump.

## Out of scope

- The audit entry or billing record itself; that is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape; this ticket only aggregates it.
- The `catch` that gates `onError` on `instanceof Error`, which the config-hooks spec also records as out of scope.
- "A turn where nothing reported still reports nothing" has no acceptance test here: it passes today, and an acceptance test must fail, so the implementer must keep it by hand.