# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a scripted provider and an `afterModelResponse` hook already exposes the number the hook receives, so the tests call the real entry point and fail on the value.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn with two tool rounds** — the hook's third argument is the sum of the usage of all three provider calls (100/200/300 input tokens give 600).
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when others reported none** — a round without usage neither voids nor NaNs the total.
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts` and pass the sum as the existing `usage` argument (chosen shape; a per-round breakdown, if wanted, goes in an extra argument so the third stays the sum).
- [ ] Keep the no-tools turn and the all-rounds-unreported turn (still `undefined`) unchanged; existing `chatOrchestrator.test.ts` and `toolBudget.test.ts` stay green and unedited.
- [ ] Document the argument as a sum in the `OrchestratorHooks` type, replace the under-counting line in `specs/hal-engine-config-hooks/spec.md`, add a CHANGELOG line (MINOR) saying recorded usage grows for tool turns, and record why the breakdown shape was rejected.

## Out of scope

- The audit or billing record itself, token accounting beyond the orchestrator's provider calls, and the `stop` chunk's `usage` shape.