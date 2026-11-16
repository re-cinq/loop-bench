# Definition of Done

> `afterModelResponse` ... is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` with a scripted provider and an `afterModelResponse` hook is a real seam today. The tests assume the "accumulate and pass the sum, one `usage` argument" shape (third hook argument stays `UsageMetadata`); if the implementer picks the per-round breakdown, the sum must still be that argument.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn with two tool rounds** — three provider calls with known different counts; the hook receives their sum.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts the rounds that reported, and reports nothing for a turn where none did** — a round with no usage does not make the total undefined/NaN; no usage anywhere gives `undefined`.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts`, skipping rounds without usage.
- [ ] Make the hook's type say it is a turn total; replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` (a new bullet already cites the tests) and add a CHANGELOG entry (MINOR).
- [ ] Existing no-tool usage tests stay unedited and green.

## Out of scope

- Audit/billing records, accounting beyond orchestrator provider calls, the `stop` chunk's `usage` shape.