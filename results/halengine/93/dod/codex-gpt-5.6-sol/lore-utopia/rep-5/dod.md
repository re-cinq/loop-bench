# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the real hook seam and accepts a scripted provider and real tool registry, so the acceptance test can observe the usage reported after a multi-round turn directly.

## Done when these pass

- [ ] **reports summed usage across every provider call while preserving absent usage** — a two-tool-round turn sums every provider call, ignores individual missing reports without producing `undefined` or `NaN`, and reports `undefined` when no round reports usage
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing unedited no-tool path continues to report exactly its provider's usage
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Replace last-round retention with field-wise accumulation across all reported round usage.
- [ ] Make the public hook parameter's summed meaning unambiguous without introducing `any`.
- [ ] Replace the spec's recorded under-counting statement with the summed semantics and document the consumer-visible change in the changelog.

## Out of scope

- Audit or billing storage, accounting outside orchestrator provider calls, and changes to providers' stop-chunk usage shape.