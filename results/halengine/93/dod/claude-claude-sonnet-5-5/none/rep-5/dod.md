# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is a real seam today; the tests fail on the behaviour (last round only).

## Done when these pass

- [ ] **sums the usage of every provider call in a turn with two tool rounds** — three rounds reporting 100/200/300 input tokens yield 600/60/660.
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **still counts the rounds that reported when another round reports no usage** — a round with no usage does not zero, `NaN` or drop the others.
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **reports nothing when no round reported usage** — stays `undefined` (green today; guards the fix against returning zeros).
      `src/orchestration/turnUsage.acceptance.test.ts`

The tests accept either shape the ticket allows: a summed `UsageMetadata` as the third argument, or an object whose `total` field is that sum (plus any per-round breakdown). The no-tool-call criterion is pinned by the existing, unedited tests in `chatOrchestrator.test.ts` and `toolBudget.test.ts`.

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts`, skipping rounds without usage.
- [ ] Make the hook's type say it is a turn total (and record why the other shape was rejected).
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` (link it to these tests) and add a CHANGELOG entry (MINOR).

## Out of scope

- The audit or billing record itself, token accounting other than the orchestrator's provider calls, and the `stop` chunk's own `usage` shape.