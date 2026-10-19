# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `afterModelResponse` hook and accepts a real provider and tool registry, so the acceptance tests can drive the multi-round behavior directly.

## Done when these pass

- [ ] **reports the sum of usage from every provider call in a tool turn** — a two-round tool turn passes the aggregate input, output, and total token counts to `afterModelResponse`.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts reported rounds without producing undefined or NaN when usage is missing** — reported rounds are summed while missing rounds are ignored, and an all-missing turn still passes `undefined`.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing no-tool test remains unedited and pins the common path's current usage value.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Aggregate each provider round's reported usage and preserve `undefined` when no round reports it.
- [x] Make the hook's public type and documentation state that its usage argument is the per-turn sum.
- [x] Update the changelog with the MINOR behavior change for existing consumers.
- [x] Run the existing no-tool hook test unchanged alongside the new acceptance tests.

## Out of scope

- Audit entries, billing records, and budgets built by consumers of the hook.
- Usage from anything other than provider calls made by the orchestrator, including the stop chunk's own shape.