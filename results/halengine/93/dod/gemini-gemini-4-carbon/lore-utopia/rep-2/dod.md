# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a scripted `AIProvider`, a `ToolRegistry`, and `OrchestratorHooks.afterModelResponse`, so acceptance tests can drive multi-round tool turns through `processMessage` today and fail directly on the under-counted usage.

## Done when these pass

- [ ] **reports the sum of every provider call across two tool rounds** — drives a turn through two tool rounds (three provider calls with distinct `inputTokens`, `outputTokens`, and `totalTokens`) and asserts `afterModelResponse` receives their sum rather than only the final call's counts
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **sums the rounds that reported usage when another omits it, and reports undefined when none did** — drives a three-call turn where one round omits `usage` and asserts the reporting rounds are summed without `undefined` or `NaN`, and drives a multi-round turn where no round reports `usage` and asserts `undefined` is still passed
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every provider call in `src/orchestration/chatOrchestrator.ts` that reports `usage`, keeping the reported value `undefined` when no round reports usage and leaving `src/orchestration/chatOrchestrator.test.ts` (`receives collected response text and usage` at `#L236` and `keeps the usage an earlier round reported when a later round reports none` at `#L527`) green unedited.
- [ ] Decide between passing the summed total alone or the summed total plus a per-round breakdown (keeping the third `afterModelResponse` argument structurally compatible with `UsageMetadata | undefined`), make the public hook type/signature unambiguous without reading the orchestrator (with no `any` in the public API, exported from `src/index.ts` if a new type is introduced), and regenerate synced doc blocks (`npm run docs:fix`) if `OrchestratorHooks` changes.
- [ ] Record the chosen shape and why the alternative was rejected in `specs/hal-engine-config-hooks/spec.md` (preserving valid test citations) and add an entry under `## [Unreleased]` in `CHANGELOG.md` stating how recorded usage changes for existing consumers on multi-round tool turns.

## Out of scope

- The audit entry or billing record itself, which belongs to the consumer.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate.
- The `error instanceof Error` gate on `onError` recorded in `specs/hal-engine-config-hooks/spec.md`.