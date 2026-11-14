# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the `OrchestratorHooks.afterModelResponse` seam and accepts an `AIProvider` and `ToolRegistry`. An acceptance test can drive `processMessage` across multiple tool rounds with scripted per-round `UsageMetadata` today and observe `afterModelResponse` under-counting to the final round alone.

## Done when these pass

- [ ] **sums usage across every provider call in a multi-round tool turn** — drives a turn through two tool rounds (three provider calls reporting `{10, 4, 14}`, `{25, 6, 31}`, and `{40, 12, 52}`) and asserts `afterModelResponse` receives `{inputTokens: 75, outputTokens: 22, totalTokens: 97}`; fails today because it receives `{40, 12, 52}` from the final round alone.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **sums the rounds that reported usage and keeps undefined when no round reported any** — drives a multi-round turn where leading and trailing rounds omit `usage` while middle rounds report `{12, 5, 17}` and `{30, 8, 38}` (expecting `{42, 13, 55}`, never `undefined` or `NaN`), plus a multi-round turn where no round reports usage (expecting `undefined`); fails today because the partial run reports `{30, 8, 38}` instead of `{42, 13, 55}`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every provider round that reports `outcome.usage` in `src/orchestration/chatOrchestrator.ts`, leaving the accumulated total `undefined` when no round in the turn reported usage.
- [ ] Leave `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited and green so a single-round turn with no tool calls continues to report the exact `{inputTokens, outputTokens, totalTokens}` value it reports today.
- [ ] Make the `afterModelResponse` signature and public type unambiguously state that the reported usage is the turn total (keeping the third parameter assignable to `UsageMetadata | undefined` with no extra keys, and if a per-round breakdown is also exposed, passing it as a fourth parameter), and record in `specs/hal-engine-config-hooks/spec.md` which shape was chosen and why the alternative was rejected.
- [ ] Sync any generated `OrchestratorHooks` doc-blocks (`npm run docs:fix` if `src/orchestration/chatOrchestrator.ts#OrchestratorHooks` changes) and add an entry under `## [Unreleased]` in `CHANGELOG.md` stating the change in what an existing `afterModelResponse` consumer will record on tool-using turns.

## Out of scope

- Per-provider fields beyond `inputTokens`, `outputTokens`, and `totalTokens` (such as cache-read or thinking token counts), which `UsageMetadata` does not currently carry.
- Automatic persistence to `UsageStore` inside the orchestrator.
- The `error instanceof Error` gate on `onError` recorded under `## Measured semantics — out of scope` in `specs/hal-engine-config-hooks/spec.md`.