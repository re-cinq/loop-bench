# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the tool-execution loop and `OrchestratorHooks.afterModelResponse` seam: a scripted `AIProvider` and `ToolRegistry` can drive `processMessage` through multiple tool rounds today and observe that `afterModelResponse` receives only the final round's usage rather than the turn's sum.

## Done when these pass

- [ ] **sums usage across every provider call in a turn driven through two tool rounds** — drives a turn through two tool rounds (three provider calls reporting `{inputTokens: 10, outputTokens: 4, totalTokens: 14}`, `{inputTokens: 25, outputTokens: 6, totalTokens: 31}`, and `{inputTokens: 40, outputTokens: 9, totalTokens: 49}`) and expects `afterModelResponse` to receive `{inputTokens: 75, outputTokens: 19, totalTokens: 94}`; fails today with `{inputTokens: 40, outputTokens: 9, totalTokens: 49}`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when another round reports none, and reports undefined when no round reports usage** — drives a three-call turn whose middle round omits `usage` (expecting `{inputTokens: 42, outputTokens: 13, totalTokens: 55}`) alongside a two-call turn where no round reports `usage` (expecting `undefined`); fails today because `sparse` receives `{inputTokens: 30, outputTokens: 8, totalTokens: 38}`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `UsageMetadata` (`inputTokens`, `outputTokens`, `totalTokens`) across every provider call in `src/orchestration/chatOrchestrator.ts` instead of keeping only `lastUsage`, ignoring rounds that report `undefined` and passing `undefined` when no round in the turn reported usage.
- [ ] Make the `OrchestratorHooks.afterModelResponse` signature in `src/orchestration/chatOrchestrator.ts` unambiguous that the value is the turn's summed usage (e.g. `totalUsage?: UsageMetadata`, recording the single-sum vs per-round trade-off) and run `npm run docs:fix` so `specs/hal-engine-architecture/spec.md`'s generated `OrchestratorHooks` block stays in sync.
- [ ] Keep the single-round behaviour unchanged, with the existing `receives collected response text and usage` test in `src/orchestration/chatOrchestrator.test.ts` staying green and unedited.
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` stating the behaviour change in what an existing `afterModelResponse` consumer records on tool-using turns.

## Out of scope

- Persist-side audit entries or billing records (consumer concern).
- Token accounting for anything other than the provider calls `chatOrchestrator` makes.
- Changing the `stop` chunk's own per-round `usage` shape emitted by providers.
- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`.