# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider, a real tool registry, and the public hook, so the complete multi-round turn is observable through the supported entry point without a new seam.

## Done when these pass

- [ ] **reports the sum of every provider call while ignoring rounds with no usage** — a two-tool-round turn totals every provider call, omits rounds without usage, and preserves `undefined` when no call reports usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Replace last-round tracking with whole-turn usage accumulation while preserving the no-usage case.
- [ ] Give the hook's public usage parameter a type/name that states it is the whole-turn sum, with no `any`.
- [ ] Keep the existing direct-response hook test unedited and green so a no-tool turn reports exactly its provider usage.
- [ ] Replace the spec's under-counting statement with the summed semantics and record the consumer-visible change in `CHANGELOG.md` for a MINOR release.
- [ ] Record in the issue why summed usage was chosen instead of exposing a per-round breakdown.

## Out of scope

- Audit or billing storage, accounting outside orchestrator provider calls, and changes to providers' stop-chunk usage shape.