# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — `createChatOrchestrator` is an importable function that accepts a scripted provider and hooks; the `afterModelResponse` hook receives usage as a plain value, so a two-round turn with known per-round counts can assert the hook receives their sum rather than the last round's figure alone.

## Done when these pass

- [ ] **reports summed token counts when both tool rounds reported usage** — drives a scripted provider through one tool round (round 1 usage: 10 in / 5 out / 15 total) and one final round (round 2 usage: 20 in / 8 out / 28 total); asserts the hook receives `{inputTokens: 30, outputTokens: 13, totalTokens: 43}`.
  `src/orchestration/usage-accumulation.acceptance.test.ts`

## Facets

- [ ] Change `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` to accumulate: add each round's tokens to a running total rather than replacing.
- [ ] Ensure a round that reports no usage contributes nothing (not NaN) to the running total, and a turn where no round reported any usage still passes `undefined` to the hook.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` — replace the recorded under-counting bullet in "Measured semantics" with the new summed-usage behaviour and add its `([validated by ...])` citation.
- [ ] Add a CHANGELOG entry under the next MINOR version noting that `afterModelResponse` now receives the total across all provider calls in a turn (a behaviour change for existing consumers of tool-heavy turns).
- [ ] Verify the existing test "keeps the usage an earlier round reported when a later round reports none" (`src/orchestration/chatOrchestrator.test.ts`) still passes — its assertion is compatible with accumulation and must not be edited.

## Out of scope

- Audit entries or billing records — those are consumers' concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape — providers already populate this; the ticket only aggregates it.
- The `catch` gate on `error instanceof Error` and the `onError` path — separate issue, recorded as out-of-scope in the same spec.