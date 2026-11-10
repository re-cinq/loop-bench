# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `hooks.afterModelResponse` and accepts an `AIProvider` and `ToolRegistry`, so the acceptance tests drive a scripted multi-round tool turn directly through `processMessage` and observe the `usage` argument passed to the hook.

## Done when these pass

- [ ] **ChatOrchestrator usage reporting across tool rounds › reports the sum of three provider calls when a turn runs two tool rounds** — `afterModelResponse` receives the summed `inputTokens`, `outputTokens`, and `totalTokens` across all three provider calls in a two-tool-round turn (`{inputTokens: 600, outputTokens: 60, totalTokens: 660}`), rather than only the final call's `{inputTokens: 300, outputTokens: 30, totalTokens: 330}`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **ChatOrchestrator usage reporting across tool rounds › counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — rounds that omit `usage` do not zero out, `NaN`, or drop the rounds that did report (`{inputTokens: 12, outputTokens: 3, totalTokens: 15}` across two reporting rounds and one silent round), and a turn where no round reports usage passes `undefined`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `UsageMetadata` across every round in `src/orchestration/chatOrchestrator.ts` instead of overwriting `lastUsage = outcome.usage ?? lastUsage`, keeping `undefined` when no round reports usage and leaving the existing single-round test (`src/orchestration/chatOrchestrator.test.ts` `receives collected response text and usage`) unedited and green
- [ ] Make the type and/or JSDoc on `OrchestratorHooks.afterModelResponse` (and `UsageMetadata` in `src/types/ai.ts` if appropriate) state unambiguously that the hook receives the turn's summed usage across all provider calls (and, if a per-round breakdown is also exposed, expose it as an additional parameter rather than altering the third `usage` parameter shape expected by the unedited single-round test)
- [ ] Record the change in `CHANGELOG.md` (noting what existing consumers of `afterModelResponse` will now record on tool-using turns) and ensure `specs/hal-engine-config-hooks/spec.md` matches the chosen signature

## Out of scope

- The audit entry or billing record itself (consumer concern)
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own per-round `usage` shape emitted by providers