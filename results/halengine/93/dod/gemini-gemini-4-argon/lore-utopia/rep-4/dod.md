# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` and `OrchestratorHooks.afterModelResponse` already expose the hook seam and accept a scripted `AIProvider` and `ToolRegistry`, so the acceptance tests drive multi-round turns through `processMessage` directly and fail on the under-counted `usage` argument today.

## Done when these pass

- [ ] **ChatOrchestrator afterModelResponse usage across tool rounds reports the sum of three provider calls when a turn runs two tool rounds** — drives a turn through two tool calls (three provider calls reporting 100/10/110, 200/20/220, and 300/30/330 tokens) and asserts `afterModelResponse` receives `{inputTokens: 600, outputTokens: 60, totalTokens: 660}` rather than only the last round's `{inputTokens: 300, outputTokens: 30, totalTokens: 330}`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **ChatOrchestrator afterModelResponse usage across tool rounds counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — asserts that a turn where rounds 1 and 3 report usage and round 2 omits it reports their sum `{inputTokens: 12, outputTokens: 3, totalTokens: 15}` without `undefined` or `NaN`, and a turn where no round reports usage still passes `undefined`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `UsageMetadata` across every round in `src/orchestration/chatOrchestrator.ts` (`inputTokens`, `outputTokens`, `totalTokens`) instead of overwriting `lastUsage = outcome.usage ?? lastUsage`, keeping `undefined` when no round reported usage and keeping the existing single-round test (`receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`) passing unedited
- [ ] Make the type/signature received by `afterModelResponse` (and `src/types/ai.ts` / `src/orchestration/chatOrchestrator.ts`, plus any synced doc-blocks in `specs/`) unambiguous about the turn-level sum, and record why the alternative shape was not chosen
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` stating the behaviour change in what an existing `afterModelResponse` consumer records on multi-round turns

## Out of scope

- The audit entry or billing record itself (consumer concern)
- Token accounting for anything other than the provider calls the orchestrator makes
- Changing the per-round `stop` chunk's own `usage` shape emitted by providers
- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`