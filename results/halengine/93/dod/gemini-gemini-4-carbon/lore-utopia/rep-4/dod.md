# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `hooks.afterModelResponse` and accepts any `AIProvider` and `ToolRegistry`, so the acceptance tests drive the real orchestrator through multi-round tool calls today and fail directly on the under-counted usage.

## Done when these pass

- [ ] **reports summed usage across three provider calls in a two-tool-round turn** — drives a turn through two tool rounds (three provider calls reporting 100/10/110, 200/20/220, and 300/30/330 tokens) and asserts `afterModelResponse` receives `{inputTokens: 600, outputTokens: 60, totalTokens: 660}` rather than only the final call's `{inputTokens: 300, outputTokens: 30, totalTokens: 330}`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **sums reporting rounds when one omits usage and reports undefined when none did** — asserts that a multi-round turn where some rounds omit `usage` sums the rounds that reported (`7/2/9` + `5/1/6` = `12/3/15`, never `undefined` or `NaN`) and that a multi-round turn where no round reports usage still passes `undefined` to `afterModelResponse`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every reporting provider call in `src/orchestration/chatOrchestrator.ts` instead of overwriting `lastUsage`, keeping the result `undefined` when no round reported usage and leaving the existing single-round test in `src/orchestration/chatOrchestrator.test.ts` unedited and green.
- [ ] Make the `afterModelResponse` hook signature and type unambiguously express that the reported usage is the turn total (weighing a single summed argument vs summed total plus per-round breakdown while keeping the third parameter compatible with existing no-tool callers), and regenerate any `doc-block` fences (`npm run docs:fix`) if `OrchestratorHooks` or `src/types/ai.ts` declarations change.
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` stating the change in what an existing `afterModelResponse` consumer will record on tool-using turns, and ensure `specs/hal-engine-config-hooks/spec.md` citations and `npm run verify` pass cleanly.

## Out of scope

- Building audit entries, billing records, or usage budget persistence (consumer concerns).
- Token accounting for anything other than the provider calls `chatOrchestrator` makes.
- Changing the `stop` chunk's per-round `usage` shape emitted by providers.
- Changing the `error instanceof Error` gate on `onError` recorded in `specs/hal-engine-config-hooks/spec.md`.