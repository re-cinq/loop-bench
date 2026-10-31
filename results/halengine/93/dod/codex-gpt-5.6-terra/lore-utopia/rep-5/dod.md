# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real scripted provider, real tool registry, and installed hook, so the acceptance test drives the round loop through its public entry point. The selected contract is one `usage` argument containing the per-field sum across provider calls.

## Done when these pass

- [ ] **reports the sum of every provider call to afterModelResponse across two tool rounds** — sums reported provider-call usage across tool rounds while ignoring a missing report.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — preserves the existing no-tool reporting shape unchanged.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate each reported `inputTokens`, `outputTokens`, and `totalTokens` through the round loop, preserving `undefined` when no provider reports usage.
- [ ] Make the public hook signature/documentation explicitly identify `usage` as the turn total.
- [ ] Replace the recorded under-counting behaviour in the config-hooks spec and add the Unreleased changelog migration note that existing tool-heavy consumers now record a larger total.

## Out of scope

- Consumer-owned audit entries and billing records, non-provider token accounting, and the `stop` chunk's own usage shape.