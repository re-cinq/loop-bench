# Definition of Done

> `afterModelResponse` is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real scripted provider, a `ToolRegistry`, and installed hooks, so the acceptance test drives the production tool loop through its public orchestrator seam. The chosen contract is one clearly named turn-level aggregate rather than a wider per-round breakdown.

## Done when these pass

- [ ] **sums reported provider usage across two tool rounds, while absent reports remain absent** — the hook receives the sum across all provider calls, counts only reports that exist, and stays absent when no round reports usage.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Replace `lastUsage` with turn-level accumulation that sums each `UsageMetadata` field without creating `NaN`.
- [ ] Expose the aggregate as a clearly named public `TurnUsageMetadata` hook argument; retain the existing no-tool result unchanged.
- [ ] Update the hooks spec and Unreleased changelog with the aggregate semantics and the MINOR-version migration note.

## Out of scope

- Consumer-owned audit entries and billing records, non-provider token accounting, and the `stop` chunk's existing usage shape.