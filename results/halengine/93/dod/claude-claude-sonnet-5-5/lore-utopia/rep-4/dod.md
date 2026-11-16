# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a scripted provider and an `afterModelResponse` hook is a real seam today. The tests pin the single-argument summed shape (the ticket's first option); the second option (total plus per-round breakdown) would need these assertions revised.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn with two tool rounds** — the hook's usage covers all three provider calls (red now: receives only the last round's usage).
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **still counts the rounds that reported when another round reports no usage** — no `undefined`/`NaN`; reporting rounds are summed (red now).
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **reports nothing when no round reported usage** — guard; passes today and must stay green.
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] Existing no-tools usage test in `src/orchestration/chatOrchestrator.test.ts` stays unedited and green.

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts`, undefined when nothing reported.
- [ ] Make the hook's type say it is a turn total (doc comment/name on `OrchestratorHooks.afterModelResponse`).
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` with the new behaviour and link these tests.
- [ ] CHANGELOG entry stating the change in what existing consumers record; MINOR bump.

## Out of scope

- Audit or billing records, token accounting beyond the orchestrator's provider calls, the `stop` chunk's usage shape.