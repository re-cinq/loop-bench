# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real caller seam, and a scripted provider plus registered tool can drive multiple rounds while the public hook records the reported usage.

## Done when these pass

- [ ] **sums every reported provider call across two tool rounds and preserves absent usage** — the hook receives field-wise totals from all reporting provider calls, ignores a missing middle round, and receives `undefined` when no call reports usage
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Replace last-round retention with field-wise usage accumulation across the whole turn.
- [ ] Keep a direct, no-tool turn's hook value unchanged, as pinned by the existing orchestrator hook test.
- [ ] Give the public hook argument an unambiguous total-usage type without introducing `any`.
- [ ] Record the aggregate semantics in the config-hooks spec and the consumer-visible change in the changelog.
- [ ] Pass the repository's CI verification gates.

## Out of scope

- Audit or billing storage, accounting outside orchestrator provider calls, and changes to provider stop-chunk usage.