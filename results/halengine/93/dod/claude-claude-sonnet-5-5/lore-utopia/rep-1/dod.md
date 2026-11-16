# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is a real entry point today. The tests assume the "accumulate and pass the sum, one `usage` argument" shape (the ticket's first option); choosing the other shape means revisiting them.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn with two tool rounds** — three rounds with different known counts; the hook receives their sum.
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **still counts the rounds that reported when others report no usage** — a silent middle round neither voids nor NaNs the total.
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **reports nothing when no round reported usage** — stays `undefined` (green today; guards the fix).
  `src/orchestration/turnUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts` and pass the sum to `afterModelResponse`.
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` (and link these tests), add a CHANGELOG line, and record why the per-round breakdown was rejected.
- [ ] Make the hook's parameter type/doc say it is the turn total. Existing no-tools tests stay unedited; the `toolBudget.test.ts` usage test must still pass.

## Out of scope

- The audit/billing record, token accounting beyond the orchestrator's provider calls, and the `stop` chunk's `usage` shape.