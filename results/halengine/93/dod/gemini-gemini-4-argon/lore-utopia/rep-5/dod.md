# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` and `OrchestratorHooks.afterModelResponse` already exist as the public entry point and hook seam, and can be driven directly with a scripted `AIProvider` and `ToolRegistry` to fail on the under-counted usage today.

## Done when these pass

- [ ] **ChatOrchestrator usage across tool rounds > reports the sum of three provider calls when a turn runs two tool rounds** — A turn driven through two tool rounds reports cumulative `inputTokens`, `outputTokens`, and `totalTokens` across all three provider calls rather than only the last round's usage.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **ChatOrchestrator usage across tool rounds > counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — Rounds that omit `usage` do not erase or `NaN`-poison the sum of rounds that reported usage, and a turn where no round reported usage still passes `undefined`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every round in `chatOrchestrator.ts` instead of overwriting `lastUsage = outcome.usage ?? lastUsage`, keeping `undefined` when no round reported usage and keeping the existing single-round test (`src/orchestration/chatOrchestrator.test.ts` `receives collected response text and usage`) green unedited.
- [ ] Make the `afterModelResponse` signature / type unambiguous about what `usage` represents (and if a per-round breakdown is also exposed, pass it as an additional parameter or surface so existing 3-argument consumers and the unedited single-round test keep receiving the summed `UsageMetadata`).
- [ ] Update `specs/hal-engine-config-hooks/spec.md` (and any synced doc-blocks such as `specs/hal-engine-architecture/spec.md` / `CLAUDE.md` if `OrchestratorHooks` changes) and record the behaviour change in `CHANGELOG.md` under `## [Unreleased]`.

## Out of scope

- Audit entry or billing record persistence (consumer's concern).
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own per-round `usage` shape emitted by providers.
- The `error instanceof Error` gate on `onError` in `chatOrchestrator.ts`.