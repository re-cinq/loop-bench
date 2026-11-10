# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` and `OrchestratorHooks.afterModelResponse` already expose the exact seam; a scripted `AIProvider` and a registered tool drive multi-round turns through `processMessage` and observe the `usage` argument directly.

## Done when these pass

- [ ] **reports the sum of three provider calls when a turn runs two tool rounds** — drives a turn through two tool calls (three provider rounds with distinct `inputTokens`, `outputTokens`, and `totalTokens`) and asserts `afterModelResponse` receives their sum rather than the last round's numbers alone
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — asserts that a turn where a middle round omits `usage` still sums the reporting rounds without `undefined` or `NaN`, and a multi-round turn where no round reports usage passes `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `UsageMetadata` (`inputTokens`, `outputTokens`, `totalTokens`) across every round in `src/orchestration/chatOrchestrator.ts` instead of overwriting `lastUsage = outcome.usage ?? lastUsage`, keeping `undefined` when no round reports usage and leaving single-round turns and the existing `receives collected response text and usage` test (`src/orchestration/chatOrchestrator.test.ts#L236`) unchanged
- [ ] Make the hook signature / type in `src/orchestration/chatOrchestrator.ts` (and `src/types/ai.ts` if needed) unambiguous about the reported `usage` being the turn's accumulated total across rounds (and if a per-round breakdown is also exposed, expose it as an additional parameter rather than altering the 3rd `usage` argument's `UsageMetadata` shape)
- [ ] Add a `CHANGELOG.md` entry noting the behaviour change in what an existing `afterModelResponse` consumer records on multi-round tool turns

## Out of scope

- Building an audit entry or billing record (consumer concern)
- Token accounting for anything other than the provider calls the orchestrator makes
- Changing the `stop` chunk's own per-round `usage` shape emitted by providers
- Removing the `error instanceof Error` gate on `onError` in `chatOrchestrator.ts`