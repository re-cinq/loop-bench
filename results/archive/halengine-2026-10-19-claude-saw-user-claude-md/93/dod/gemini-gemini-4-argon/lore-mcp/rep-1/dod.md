# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a scripted `AIProvider`, a `ToolRegistry`, and `OrchestratorHooks.afterModelResponse`, so acceptance tests can drive multi-round tool turns through the real entry point today and observe the reported usage directly.

## Done when these pass

- [ ] **afterModelResponse usage across tool rounds sums the usage of every round across two tool rounds, not only the last** — A turn driven through two tool rounds (three provider calls with distinct token counts) hands `afterModelResponse` the summed `inputTokens`, `outputTokens`, and `totalTokens` across all three calls rather than only the final call's usage.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **afterModelResponse usage across tool rounds counts every reporting round when a round between them reports none, and reports undefined when no round reports usage** — A round that reports no usage drops out of the sum without making the total `undefined` or `NaN` or erasing earlier reporting rounds when a later round reports, and a turn where no round reports usage passes `undefined`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Accumulate `UsageMetadata` across tool rounds in `src/orchestration/chatOrchestrator.ts` (and helper in `src/orchestration/orchestratorHelpers.ts` if appropriate) so `afterModelResponse` receives `totalUsage` summed across every reporting round, or `undefined` when no round reported usage.
- [x] Rename the `afterModelResponse` parameter in `OrchestratorHooks` (`src/orchestration/chatOrchestrator.ts`, and synced doc-blocks in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`) from `usage` to `totalUsage` so the signature makes it unambiguous that the hook receives the turn total.
- [x] Update `specs/hal-engine-architecture/spec.md` and `CHANGELOG.md` under `## [Unreleased]` to document that `afterModelResponse` now receives the summed usage across all tool rounds in the turn.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate and this issue only aggregates.