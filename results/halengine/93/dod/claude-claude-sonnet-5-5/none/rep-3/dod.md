# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and a registered tool is the real entry point and already exposes the hook. The tests pin the first shape the ticket weighs: the hook keeps one `usage` argument, now the sum across the turn's provider calls (the per-round breakdown is rejected as a wider surface). A round that picks the other shape must revisit the tests.

## Done when these pass

- [ ] **sums the usage of every provider call in a turn with two tool rounds** — three calls with different token counts are summed field by field.
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **still counts the rounds that reported when others reported nothing** — a round with no usage neither blanks nor NaNs the total.
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **reports nothing when no round reported usage** — stays `undefined` (green today; guards the aggregation).
      `src/orchestration/turnUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts` and pass the sum to `afterModelResponse`.
- [ ] Document the hook's usage parameter as a turn total in its type; no `any`.
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` and add a CHANGELOG entry (MINOR) stating consumers will record larger numbers for tool turns.
- [ ] Existing no-tool-turn tests (`chatOrchestrator.test.ts`, `toolBudget.test.ts`) stay unedited and green.

## Out of scope

- The audit or billing record itself; token accounting beyond the orchestrator's provider calls; the `stop` chunk's own `usage` shape.