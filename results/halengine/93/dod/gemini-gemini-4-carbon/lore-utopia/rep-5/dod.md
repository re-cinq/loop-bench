# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `hooks.afterModelResponse` and accepts a real `AIProvider` and `ToolRegistry`, so the acceptance tests drive multi-round turns through `processMessage` today and fail directly on the under-counted usage passed to the hook.

## Done when these pass

- [ ] **afterModelResponse usage across tool rounds > sums usage across every provider call when a turn runs two tool rounds** — Drives a scripted provider through two tool rounds (three provider calls with distinct token counts) and asserts `afterModelResponse` receives the summed `inputTokens`, `outputTokens`, and `totalTokens` across all three calls.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **afterModelResponse usage across tool rounds > counts the rounds that reported usage when some omit it, and reports undefined when none did** — Drives one multi-round turn where an intermediate round omits `usage` (asserting the reporting rounds are summed without `undefined` or `NaN`) and a second multi-round turn where no round reports `usage` (asserting `undefined` is still reported).
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every round that reports usage in `src/orchestration/chatOrchestrator.ts`, leaving turns where no round reports usage as `undefined` and keeping the existing single-round test (`receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`) green and unedited.
- [ ] Make the `afterModelResponse` hook signature and public type in `src/orchestration/chatOrchestrator.ts` / `src/types/ai.ts` (and `src/index.ts` exports if adding a named type) unambiguous about turn-level aggregation, and regenerate `doc-block` fences (`npm run docs:fix`) if `OrchestratorHooks` changes.
- [ ] Record the chosen hook shape (and why the alternative was rejected), refine `specs/hal-engine-config-hooks/spec.md` if an additional breakdown parameter is added, re-anchor any shifted line citations in `specs/` (`node scripts/repoint-spec-anchors.mjs` and `npm run spec:names:fix`), and add a `CHANGELOG.md` entry under `## [Unreleased]` stating the change in what an existing consumer records.

## Out of scope

- Building an audit entry, billing record, or usage-budget enforcement mechanism (consumer concerns).
- Token accounting for anything other than the provider calls `chatOrchestrator` makes.
- Changing the per-round `stop` chunk's `usage` shape emitted by providers.
- Changing the `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`.