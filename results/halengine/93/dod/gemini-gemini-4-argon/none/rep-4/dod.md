# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` and `OrchestratorHooks.afterModelResponse` already exist and can be driven through `processMessage` with a multi-round tool-calling provider today; the tests fail on behaviour because `chatOrchestrator` overwrites `lastUsage` on each round instead of summing `inputTokens`, `outputTokens`, and `totalTokens` across rounds.

**Chosen shape: accumulate across rounds into one `usage?: UsageMetadata` parameter (annotated in `OrchestratorHooks` JSDoc as the turn's summed total across every provider round).** Passing a separate per-round breakdown parameter or changing `UsageMetadata` into a wrapper object was rejected because per-round usage already flows on each round's `{type: 'stop', usage}` stream chunk for consumers that need provider-call granularity, whereas `afterModelResponse` fires once per turn with the turn's joined `responseText` and therefore naturally pairs with the turn's summed `UsageMetadata` without breaking existing hook signatures or the single-round test (`receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`).

## Done when these pass

- [ ] **sums inputTokens, outputTokens, and totalTokens across every provider round that reported usage during the turn** — runs a 3-round tool turn where round 1 reports `{inputTokens: 100, outputTokens: 25, totalTokens: 125}`, round 2 omits usage, and round 3 reports `{inputTokens: 160, outputTokens: 40, totalTokens: 200}`, and asserts `afterModelResponse` receives `{inputTokens: 260, outputTokens: 65, totalTokens: 325}`. Fails today because `lastUsage` is overwritten rather than accumulated, so `afterModelResponse` receives `{inputTokens: 160, outputTokens: 40, totalTokens: 200}` (only the final round).
      `src/orchestration/toolRoundUsage.acceptance.test.ts`

- [ ] **reports undefined when no round in a multi-round tool turn reported usage, and sums the rounds that did when another round reported** — runs a 2-round tool turn where neither round reports usage (asserting `undefined`) and a 2-round tool turn where round 1 reports `{inputTokens: 110, outputTokens: 15, totalTokens: 125}` and round 2 reports `{inputTokens: 140, outputTokens: 35, totalTokens: 175}` (asserting `{inputTokens: 250, outputTokens: 50, totalTokens: 300}`). Fails today because round 2's usage overwrites round 1's usage instead of summing with it.
      `src/orchestration/toolRoundUsage.acceptance.test.ts`

## Facets

- [ ] Sum `inputTokens`, `outputTokens`, and `totalTokens` across every provider round that reported `UsageMetadata` in `src/orchestration/chatOrchestrator.ts` before passing usage to `afterModelResponse`, keeping `undefined` when no round reported usage.
- [ ] Document on `OrchestratorHooks.afterModelResponse` (e.g. JSDoc / parameter description) that `usage` is the turn's summed `UsageMetadata` across all provider rounds in the turn, or `undefined` if no round reported usage, so a reader of the type signature does not have to open the orchestrator to learn whether it is a sum.
- [ ] Leave the existing single-round test (`receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`) unedited and green, and add unit tests in `src/orchestration/chatOrchestrator.test.ts` if needed.
- [ ] Add a `CHANGELOG.md` entry under `### Changed` stating the behaviour change in what an existing `afterModelResponse` consumer will record on multi-round tool turns (sum across all provider rounds in the turn instead of the final round only).

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate per round and this issue only aggregates for `afterModelResponse`.