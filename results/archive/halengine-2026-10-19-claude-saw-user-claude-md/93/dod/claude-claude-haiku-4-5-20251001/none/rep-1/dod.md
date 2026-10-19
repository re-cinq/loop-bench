# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The hook seam already exists and is called with usage. The change is to accumulate usage across all rounds instead of just keeping the final round's usage, making the signature unambiguous about what is being reported.

## Done when these pass

- [ ] **accumulates usage from multiple tool rounds into a single total** — two provider calls each reporting usage have their token counts summed before being passed to afterModelResponse
  `src/orchestration/reportUsageAcrossRounds.acceptance.test.ts`

- [ ] **turn with no tool calls reports the same usage as before** — existing behavior for turns without tool execution is unchanged
  `src/orchestration/reportUsageAcrossRounds.acceptance.test.ts`

- [ ] **accumulates reported usage when some rounds report none** — usage from rounds that do report is accumulated, rounds with undefined usage are skipped without breaking the sum
  `src/orchestration/reportUsageAcrossRounds.acceptance.test.ts`

- [ ] **turn with no usage reported on any round passes undefined to hook** — when no round reports usage, the hook still receives undefined, not NaN or 0
  `src/orchestration/reportUsageAcrossRounds.acceptance.test.ts`

## Facets

- [x] Accumulate usage on each round instead of replacing it, summing input/output/total tokens
- [x] Verify the type of what afterModelResponse receives makes the behavior unambiguous
- [x] Update specs/hal-engine-config-hooks/spec.md to document the new accumulated behavior
- [x] Add CHANGELOG entry explaining the behaviour change for existing consumers

## Out of scope

- Audit or billing record implementation
- Token accounting for provider calls other than those the orchestrator makes
- Changes to the `stop` chunk's own `usage` shape