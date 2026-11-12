# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the `OrchestratorHooks.afterModelResponse` seam and accepts an `AIProvider` and `ToolRegistry`, so acceptance tests can drive multi-round tool turns through `processMessage` and observe the reported usage directly.

## Done when these pass

- [x] **reports usage summed across every provider call when a turn runs through two tool rounds** — drives a turn across three provider calls (two tool rounds plus the closing turn) with distinct token counts (`10/4/14`, `25/8/33`, `40/12/52`) and asserts that `afterModelResponse` receives their sum (`75/24/99`) rather than only the last round (`40/12/52`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [x] **counts the rounds that reported usage when some omit it, and reports undefined when none did** — drives a three-round turn where the middle round reports no `usage` and asserts `afterModelResponse` receives the sum of the two rounds that reported (`32/12/44`, not `undefined`, `NaN`, or only the final round's `20/7/27`), while a turn where no round reports usage still passes `undefined`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every provider call in the round loop in `src/orchestration/chatOrchestrator.ts` instead of overwriting `lastUsage`, keeping the result `undefined` when no round reported usage.
- [x] Make the `afterModelResponse` signature in `src/orchestration/chatOrchestrator.ts` (and any synced doc-blocks in `CLAUDE.md` / `specs/hal-engine-architecture/spec.md`) unambiguously express that the hook receives cumulative turn usage while keeping single-round turns identical so existing tests in `src/orchestration/chatOrchestrator.test.ts` pass unedited.
- [x] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing the behaviour change in what an existing `afterModelResponse` consumer records on multi-round tool turns.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own per-round `usage` shape, which providers already populate and the orchestrator only aggregates.
- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`.