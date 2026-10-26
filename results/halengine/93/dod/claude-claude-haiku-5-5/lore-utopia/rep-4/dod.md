# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes a scripted `AIProvider` and an `afterModelResponse` hook, so the acceptance tests drive the real orchestrator through two tool rounds and read the usage the hook receives. The tests pin one `usage` argument carrying the sum across rounds; a "pass both" shape would change them.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — a scripted provider reports 100/20/120, 300/50/350 and 700/80/780 across three calls; the hook must receive 1100/150/1250, not the final call's 700/80/780
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **sums only the rounds that reported usage, and reports nothing when no round did** — a round that reports nothing is skipped rather than making the total `undefined` or `NaN`; a turn where no round reports still delivers `undefined`
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Sum the usage of every provider call in the turn in `chatOrchestrator.ts`, skipping rounds that reported none, and pass `undefined` only when no round reported
- [ ] Make the hook's `usage` type say it is a turn total in `src/types/ai.ts` and `OrchestratorHooks`
- [ ] Keep the no-tool turn reporting exactly what it reports today, pinned by the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts`
- [ ] Replace the under-counting sentence and its "out of scope" heading in `specs/hal-engine-config-hooks/spec.md`
- [ ] Add the CHANGELOG entry as a MINOR change stating what an existing consumer will now record

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate and this ticket only aggregates
- The `onError` gate on `error instanceof Error` recorded in the same spec section, a separate change