# Definition of Done

> `afterModelResponse` is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The orchestrator seam already exists. The acceptance tests execute `processMessage` directly with a scripted provider emitting multi-round usage.

## Done when these pass

- [ ] **reports usage covering every provider call in that turn when driven through two tool rounds** — asserts the reported usage is the sum of every provider call in the turn, not just the last round
  `src/orchestration/afterModelResponse-usage.acceptance.test.ts`
- [ ] **a provider that reports no usage on some rounds does not make the total undefined or NaN** — asserts rounds with undefined usage are skipped during accumulation
  `src/orchestration/afterModelResponse-usage.acceptance.test.ts`
- [ ] **a turn where nothing reported still reports nothing** — asserts turns with no usage across all rounds report undefined
  `src/orchestration/afterModelResponse-usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — existing test pinning the current behaviour for a turn with no tool calls
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Add the appropriate usage structure to unambiguously convey it as a sum in the hook signature
- [x] Accumulate usage across rounds in `chatOrchestrator.ts` instead of taking the latest
- [x] Update `specs/hal-engine-config-hooks/spec.md` with the new behaviour replacing the under-counting line
- [x] Document the change in the `CHANGELOG.md` for consumers reading existing records

## Out of scope

- The audit entry or billing record itself
- Token accounting for anything other than provider calls
- The stop chunk's own usage shape