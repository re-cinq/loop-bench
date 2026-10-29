# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider and an `afterModelResponse` hook today. The test drives two real tool executions and reads the hook's usage after three provider calls.

## Done when these pass

- [ ] **reports usage across every provider call in two tool rounds, including when a round omits usage** — Sums distinct provider reports, skips an absent report, and preserves `undefined` when no call reports usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Sum `inputTokens`, `outputTokens`, and `totalTokens` across reported provider calls; retain `undefined` if none report usage.
- [ ] Keep the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` unedited; it pins the no-tool path.
- [ ] Make the hook's public argument name or type explicitly mean turn-total usage, without `any`.
- [ ] Record why the one-total argument was chosen over a per-round breakdown in issue #93.
- [ ] Replace the spec's old under-counting rule with the implemented rule and add a CHANGELOG entry explaining that existing consumers record larger totals on tool-heavy turns and that this requires a MINOR bump.
- [ ] Run the named acceptance test, existing no-tool test, and CI's build, test, typecheck, lint, and format checks.

## Out of scope

- The consumer's billing or audit record, accounting outside orchestrator provider calls, and the provider's `stop` chunk usage shape.