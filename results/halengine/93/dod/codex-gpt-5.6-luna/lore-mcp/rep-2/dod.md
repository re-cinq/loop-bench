# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `afterModelResponse` seam. A scripted `AIProvider` and real `ToolRegistry` can drive provider calls through the production tool loop without mocks or stubs.

## Done when these pass

- [ ] **reports usage covering every provider call in a two-tool-round turn** — sums the usage metadata from all provider calls into the hook’s existing `UsageMetadata` argument.
      `src/orchestration/usageReporting.acceptance.test.ts`

- [ ] **counts reported rounds without producing NaN, and reports nothing when no round reports usage** — counts rounds that provide usage, skips missing usage safely, and passes `undefined` when no round reports usage.
      `src/orchestration/usageReporting.acceptance.test.ts`

- [ ] **receives collected response text and usage** — existing no-tool single-provider-call coverage remains unedited and continues to pin the common path’s unchanged usage.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Decide and implement the additive usage aggregation shape, keeping the existing `UsageMetadata` hook argument.
- [ ] Preserve exact usage for a turn with no tool calls.
- [ ] Handle missing usage on individual rounds and all rounds without `undefined` arithmetic or `NaN`.
- [ ] Replace the spec’s under-counting statement and add the migration note to the changelog.
- [ ] Keep the public API free of `any` and update the minor-version release documentation.

## Out of scope

- Audit entries, billing records, or usage-budget consumers.
- Token accounting outside provider calls made by the orchestrator.
- The `stop` chunk’s provider-populated usage shape.
- Per-round usage breakdowns beyond the chosen public hook shape.