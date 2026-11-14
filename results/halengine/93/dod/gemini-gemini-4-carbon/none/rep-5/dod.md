# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `OrchestratorHooks.afterModelResponse` and drives the tool loop through `processMessage`, so acceptance tests can run multi-round turns through the real entry point today and fail directly on the under-counted usage.

## Done when these pass

- [ ] **sums usage across two tool rounds and the final answer** — drives a turn through two tool rounds (three provider calls with distinct token counts) and asserts `afterModelResponse` receives the summed `inputTokens`, `outputTokens`, and `totalTokens` (`750`, `105`, `855`) across every provider call rather than the final round alone (`400`, `50`, `450`).
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts only rounds that reported usage and reports undefined when none did** — drives a multi-round turn where middle and final rounds omit `usage` and asserts the rounds that reported are summed (`340`, `40`, `380`) without `undefined` or `NaN` rather than keeping only the last reporting round (`230`, `25`, `255`), while a multi-round turn where no round reported usage still hands `undefined` to `afterModelResponse`.
  `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every provider call in `src/orchestration/chatOrchestrator.ts` that reported `usage`, leaving the reported value `undefined` when no round reported usage.
- [ ] Keep the single-round path unchanged so existing tests in `src/orchestration/chatOrchestrator.test.ts` (`receives collected response text and usage` and `keeps the usage an earlier round reported when a later round reports none`) stay green without edits.
- [ ] Make the `afterModelResponse` hook type/signature unambiguously express whole-turn usage (exporting any new public type from `src/index.ts` with no `any`), record why the alternative shape from the issue was rejected in `specs/hal-engine-config-hooks/spec.md`, sync documented code blocks via `npm run docs:fix`, and re-anchor shifted spec citations via `node scripts/repoint-spec-anchors.mjs`.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` stating the behaviour change in what an existing `afterModelResponse` consumer will record on tool-using turns.

## Out of scope

- Audit entries, billing records, or `UsageStore` persistence built on top of `afterModelResponse` (consumer concerns).
- Token accounting for anything other than the provider calls `chatOrchestrator` makes.
- Changing the `stop` chunk's own `usage` shape emitted by providers.
- The `error instanceof Error` gate on `onError` recorded in `specs/hal-engine-config-hooks/spec.md`.