# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the `OrchestratorHooks.afterModelResponse` seam on `processMessage` and `processMessageStream`, so acceptance tests can drive multi-round tool turns through the real orchestrator entry point today and fail on the under-counted usage.

## Done when these pass

- [ ] **sums usage across every provider call when a turn runs two tool rounds** — drives a turn through two tool rounds (three provider calls with distinct token counts) and asserts that `afterModelResponse` receives the summed `inputTokens`, `outputTokens`, and `totalTokens` across all three calls rather than only the final call's usage.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts only the rounds that reported usage, and reports undefined when none did** — drives a multi-round turn where some rounds omit `usage` on `stop` and asserts the reported rounds are summed without `NaN` or `undefined`, while a multi-round turn where no round reports usage still passes `undefined`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Sum reported round usage (`inputTokens`, `outputTokens`, `totalTokens`) across every provider call in `src/orchestration/chatOrchestrator.ts`, skipping rounds whose `stop` chunk omits `usage` and passing `undefined` when no round reported usage.
- [ ] Keep single-round (no-tool) usage reporting identical to today, with the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` remaining unedited and green.
- [ ] Decide between a single summed usage parameter and summed total plus per-round breakdown, make the `OrchestratorHooks.afterModelResponse` signature and exported types unambiguous without `any` in the public API, and sync generated doc-blocks (`npm run docs:fix`).
- [ ] Update `specs/hal-engine-config-hooks/spec.md` if the chosen signature adds per-round detail, record why the rejected shape was not chosen, and add a `CHANGELOG.md` entry stating the change in what an existing consumer records.

## Out of scope

- Audit entries or billing records themselves, which belong to the consumer.
- Token accounting for anything other than the provider calls `chatOrchestrator` makes.
- Changing the `stop` chunk's own `usage` shape populated by providers.
- The `error instanceof Error` gate on `onError` recorded in `specs/hal-engine-config-hooks/spec.md`.