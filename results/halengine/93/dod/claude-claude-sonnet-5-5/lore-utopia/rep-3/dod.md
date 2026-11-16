# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local ... so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is a real seam today. The tests chose the first option from the ticket: the hook's existing third `usage` argument becomes the sum across rounds (no per-round breakdown).

## Done when these pass

- [ ] **reports the sum of every provider call in a turn with two tool rounds** — rounds report 10/2, 20/5, 30/7 tokens; the hook receives 60/14/74.
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts the rounds that reported when others did not, never NaN or undefined** — a round without usage is skipped, the rest are summed.
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts` instead of `lastUsage = outcome.usage ?? lastUsage`; stay `undefined` when no round reported.
- [ ] Existing tests stay unedited and green: the no-tool turn in `chatOrchestrator.test.ts`, "keeps the usage an earlier round reported", and toolBudget's usage test.
- [ ] Make the hook's parameter type/doc say it is the turn total.
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md`, link it to these tests, and add a CHANGELOG line (MINOR) saying recorded usage grows for tool turns.

## Out of scope

- Per-round breakdown, the audit/billing record itself, and the `stop` chunk's `usage` shape.
- The type-clarity criterion (not observable at runtime; review judges it).