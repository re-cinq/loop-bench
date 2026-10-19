# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `afterModelResponse` hook seam, and a real `ToolRegistry` can drive the provider through multiple rounds. The acceptance tests use a scripted `AIProvider` at that seam, with no production changes or test doubles for the orchestrator or registry.

## Done when these pass

- [ ] **reports the usage from every provider call across two tool rounds** — the hook receives one `UsageMetadata` total for both tool rounds and the final provider call.
      `src/orchestration/usageAggregation.acceptance.test.ts`
- [ ] **counts reported rounds without producing undefined or NaN when usage is absent** — reported rounds are summed, absent rounds are ignored, and an all-absent turn reports no usage.
      `src/orchestration/usageAggregation.acceptance.test.ts`

## Facets

- [x] Accumulate each provider call's reported usage into the hook's single total.
- [x] Preserve the existing no-tool behavior pinned by `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`.
- [x] Add the required changelog entry describing the aggregate behavior change.
- [x] Make the public hook type unambiguous (type name or spec language makes it clear it is an aggregate, not the last call).
- [x] Replace the historical under-counting statement in `specs/hal-engine-config-hooks/spec.md` with the aggregate behavior.

## Out of scope

- Audit entries, billing records, or usage budgets built by consumers.
- Usage accounting for anything other than provider calls made by the orchestrator.
- The `stop` chunk's provider usage shape and provider-specific token accounting.