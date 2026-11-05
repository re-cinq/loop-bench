# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and a registered tool is a real seam; the hook's `usage` argument is observable today and is wrong. The tests assume the "accumulate and pass the sum, keep one `usage` argument" shape; if the other shape (total plus per-round breakdown) is chosen, the total must still arrive as the third argument.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn with two tool rounds** — three rounds with different known counts; the hook receives their sum.
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts the rounds that reported usage, and reports nothing when none did** — a round without usage neither voids nor NaNs the total; no usage anywhere stays `undefined`.
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts`, skipping rounds with none.
- [ ] Make the hook's type say it is a turn total; existing no-tool test stays unedited and green.
- [ ] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md`; add the CHANGELOG line (MINOR).

## Out of scope

- Audit or billing records, token accounting beyond the orchestrator's provider calls, the `stop` chunk's `usage` shape.