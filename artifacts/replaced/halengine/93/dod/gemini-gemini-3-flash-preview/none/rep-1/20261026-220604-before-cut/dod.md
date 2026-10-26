# Definition of Done

> `afterModelResponse` is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The orchestrator already has an `afterModelResponse` hook that receives usage; the tests provide a scripted provider and assert that the hook receives the summed usage of all rounds.

## Done when these pass

- [ ] **reports summed usage across multiple tool rounds** — A turn driven through two tool rounds reports usage covering every provider call in that turn.
      `src/orchestration/usage-reporting.acceptance.test.ts`
- [ ] **reports exact usage for a turn with no tool calls** — A turn with no tool calls reports exactly what it reports today.
      `src/orchestration/usage-reporting.acceptance.test.ts`
- [ ] **handles rounds with no usage reported** — A provider that reports no usage on some rounds does not make the total undefined or NaN: the rounds that reported are still counted.
      `src/orchestration/usage-reporting.acceptance.test.ts`

## Facets

- [x] Sum `UsageMetadata` across rounds in `chatOrchestrator.ts`
- [x] Handle `undefined` rounds by treating them as zero or skipping
- [ ] Update `afterModelResponse` hook signature to be unambiguous (e.g. rename `usage` to `totalUsage`)
- [x] Update `CHANGELOG.md` with the behavior change
- [x] Update `specs/hal-engine-config-hooks/spec.md` with new behavior (citations for all three tests added and repointed)

## Out of scope

- Token accounting for anything other than the provider calls.
- The audit entry or billing record itself.