# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` and `OrchestratorHooks.afterModelResponse` already exist and accept a scripted `AIProvider` and `ToolRegistry`, so the acceptance tests drive multi-round turns through `processMessage` today and fail directly on the under-counted `usage` value handed to `afterModelResponse`.

## Done when these pass

- [ ] **reports the sum of three provider calls when a turn runs two tool rounds** — drives a turn through two tool rounds (three provider calls reporting `{100,10,110}`, `{200,20,220}`, and `{300,30,330}`) and asserts `afterModelResponse` receives `{inputTokens: 600, outputTokens: 60, totalTokens: 660}` rather than only the last round's `{300,30,330}`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — drives a three-round turn where round 1 reports `{7,2,9}`, round 2 omits `usage`, and round 3 reports `{5,1,6}`, asserting the hook receives `{inputTokens: 12, outputTokens: 3, totalTokens: 15}` without `undefined` or `NaN`, and drives a two-round turn where no round reports usage, asserting the hook receives `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every round that reports `outcome.usage` in `src/orchestration/chatOrchestrator.ts` (instead of overwriting `lastUsage = outcome.usage ?? lastUsage`), keeping the result `undefined` when no round in the turn reported usage, and leaving the existing single-round test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited and green
- [ ] Make the `afterModelResponse` signature in `src/orchestration/chatOrchestrator.ts` (and any type alias in `src/types/ai.ts` if introduced, plus the `doc-block` in `specs/hal-engine-architecture/spec.md`) unambiguously express that the usage covers the whole turn across rounds
- [ ] Record the behaviour change under `## [Unreleased]` in `CHANGELOG.md` so existing consumers know multi-round turns now report summed usage across all provider calls in the turn

## Out of scope

- The audit entry or billing record a consumer writes from `afterModelResponse`
- Token accounting for anything other than the `sendMessage` provider calls the orchestrator makes during a turn
- Changing the `stop` chunk's own per-round `usage` shape emitted by providers
- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`