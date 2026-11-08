# Definition of Done

> `afterModelResponse` ... is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — I will write a new acceptance test file that uses `createChatOrchestrator` with a scripted provider reporting usage across multiple tool rounds. The test will verify that the `afterModelResponse` hook receives the cumulative usage and that the usage type is unambiguous.

## Done when these pass

- [ ] **reports cumulative usage across multiple tool rounds** — A turn with two tool rounds (three provider calls) reports the sum of all input, output, and total tokens in `afterModelResponse`.
      `src/orchestration/usage-reporting.acceptance.test.ts`
- [ ] **reports usage for turns with no tool calls** — A simple turn with one provider call continues to report usage correctly, ensuring no regression for the common case.
      `src/orchestration/usage-reporting.acceptance.test.ts`
- [ ] **handles partial usage reporting** — A turn where only some provider calls report usage still sums the reported values correctly without producing NaN or undefined.
      `src/orchestration/usage-reporting.acceptance.test.ts`
- [ ] **usage type is unambiguous** — The type received by the hook makes it clear it's a turn-level aggregate (e.g. by renaming the type or adding a field like `roundCount`).
      `src/orchestration/usage-reporting.acceptance.test.ts`

## Facets

- [ ] Define a new `TurnUsage` or `AggregateUsage` type that includes `UsageMetadata` plus a `roundCount`.
- [ ] Update `OrchestratorHooks['afterModelResponse']` signature to use this new type.
- [ ] Update `chatOrchestrator.ts` to accumulate usage across rounds.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new behavior.

## Out of scope

- Token accounting for anything other than the provider calls.
- Changes to the `UsageMetadata` structure itself beyond aggregation.