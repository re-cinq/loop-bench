# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `OrchestratorHooks.afterModelResponse` and runs the tool round loop through `processMessage`, so acceptance tests can drive multi-round turns through the real entry point today and fail because earlier provider calls' token counts are discarded.

## Done when these pass

- [ ] **sums usage across every provider call when a turn runs two tool rounds** — drives a turn through two tool rounds (three provider calls with distinct token counts) and expects `afterModelResponse` to receive `{inputTokens: 740, outputTokens: 105, totalTokens: 845}` rather than only the final call's `{inputTokens: 410, outputTokens: 50, totalTokens: 460}`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts rounds that reported usage when other rounds omit it, and reports undefined when none did** — sums the reporting rounds across a partial-usage turn without producing `undefined` or `NaN` (`{inputTokens: 410, outputTokens: 65, totalTokens: 475}` rather than `{inputTokens: 310, outputTokens: 45, totalTokens: 355}`), while keeping a multi-round turn where nothing reported usage as `undefined`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every provider call in `src/orchestration/chatOrchestrator.ts` that reported usage, leaving the reported value `undefined` when no round reported usage.
- [ ] Keep a single-round turn with no tool calls reporting the exact value it reports today, with the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` remaining unedited and green.
- [ ] Decide between the ticket's two signature shapes (summed `usage` alone vs summed total plus per-round breakdown), make the hook parameter's public type unambiguous with no `any`, export any new type from `src/index.ts`, and sync doc-blocks with `npm run docs:fix`.
- [ ] Record the chosen shape and why the alternative was rejected in `specs/hal-engine-config-hooks/spec.md`, and add a `CHANGELOG.md` entry under `## [Unreleased]` stating the change in what an existing consumer records.

## Out of scope

- Building an audit entry, billing record, or cost budget enforcement (consumer concerns).
- Token accounting for anything other than the provider calls `chatOrchestrator` makes.
- Changing the `stop` chunk's own per-round `usage` shape emitted by providers.
- Changing the `error instanceof Error` gate on `onError` recorded in `specs/hal-engine-config-hooks/spec.md`.