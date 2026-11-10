# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts an `AIProvider`, `ToolRegistry`, and `OrchestratorHooks`; calling `processMessage` on a multi-round tool turn drives the real loop and invokes `afterModelResponse` with the resulting `UsageMetadata`.

## Done when these pass

- [ ] **sums inputTokens, outputTokens, and totalTokens across every round that reported usage** — across a three-round turn (two tool-call rounds + final answer round) where every round reports known, different `UsageMetadata` counts, `afterModelResponse` receives the sum of `inputTokens`, `outputTokens`, and `totalTokens` across all three rounds rather than only the final round's usage.
      `src/orchestration/usageAccounting.acceptance.test.ts`
- [ ] **includes rounds that reported usage, skips rounds that omitted it, and reports undefined when none did** — across a multi-round turn where some rounds report `UsageMetadata` and another omits it, `afterModelResponse` receives the sum of the reporting rounds rather than overwriting earlier usage with the last reporting round, and a turn where no round reported usage still reports `undefined`.
      `src/orchestration/usageAccounting.acceptance.test.ts`

## Facets

- [ ] Accumulate `UsageMetadata` (`inputTokens`, `outputTokens`, `totalTokens`) across every round in `src/orchestration/chatOrchestrator.ts` (and/or `src/orchestration/orchestratorHelpers.ts`), keeping `undefined` when no round in the turn reported usage and returning a single-round turn's usage unchanged.
- [ ] Make the `afterModelResponse` usage type/parameter in `src/orchestration/chatOrchestrator.ts` (and/or `src/types/ai.ts`) unambiguous that the hook receives cumulative turn usage across rounds.
- [ ] Confirm the existing no-tool and partial-usage orchestrator tests in `src/orchestration/chatOrchestrator.test.ts` and `src/orchestration/toolBudget.test.ts` remain unedited and green.
- [ ] Add a `CHANGELOG.md` entry under `[Unreleased]` stating the behaviour change in what an existing `afterModelResponse` consumer will record.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- Changing the `stop` chunk's own per-round `usage` shape populated by providers.