# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted `AIProvider` and real tool registry, so its public hook is directly observable through actual tool rounds. The existing no-tool hook test remains the common-path regression coverage.

## Done when these pass

- [ ] **reports the summed usage of every provider call in a turn with two tool rounds** — the hook receives totals across all three provider calls.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts reported rounds while preserving no-usage turns as undefined** — missing per-round usage neither discards reported totals nor creates an artificial total.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing no-tool path reports its one provider-call usage unchanged.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Accumulate each defined provider-call usage before invoking `afterModelResponse`.
- [x] Preserve `undefined` when no provider call supplies usage.
- [x] State the aggregate hook contract in the config-hooks spec and changelog, including its migration impact.

## Out of scope

- Billing or audit persistence by hook consumers, non-provider token accounting, and changes to the streamed `stop` chunk usage shape.