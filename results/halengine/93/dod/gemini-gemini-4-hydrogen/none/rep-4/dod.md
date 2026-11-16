# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` accepts a scripted `AIProvider` and `OrchestratorHooks` directly, so acceptance tests can drive multi-round tool turns through `processMessage` and observe the usage handed to `afterModelResponse`. No new module or characterization layer is needed.

## Done when these pass

- [ ] **sums usage across every provider call when a turn runs two tool rounds** — a turn with two tool rounds (three provider calls reporting distinct token counts) hands `afterModelResponse` the summed `{inputTokens, outputTokens, totalTokens}` across all three calls, failing today because only the final call (`{inputTokens: 200, outputTokens: 40, totalTokens: 240}`) is reported instead of `{inputTokens: 450, outputTokens: 90, totalTokens: 540}`.
  `src/orchestration/afterModelResponseUsage.acceptance.test.ts`

- [ ] **counts rounds that reported usage when other rounds omit it, and passes undefined when none report** — when some rounds omit `usage`, the rounds that reported are summed without producing `undefined` or `NaN`, and when no round reports `usage`, `afterModelResponse` still receives `undefined`; fails today because only the last round that reported (`{inputTokens: 28, outputTokens: 9, totalTokens: 37}`) is handed over instead of `{inputTokens: 40, outputTokens: 13, totalTokens: 53}`.
  `src/orchestration/afterModelResponseUsage.acceptance.test.ts`

## Facets

- [ ] Replace `lastUsage = outcome.usage ?? lastUsage` in `src/orchestration/chatOrchestrator.ts` with turn-wide accumulation across every round so `inputTokens`, `outputTokens`, and `totalTokens` are summed for all rounds that report `usage`, and `undefined` is preserved when no round reports `usage`.
- [ ] Decide between keeping a single `usage` argument versus passing both the summed total (as the 3rd argument so existing single-round consumers/tests remain unchanged) and a per-round breakdown, make the `OrchestratorHooks['afterModelResponse']` signature/type unambiguously express that the 3rd argument is the turn sum, and record in the PR/issue why the alternative shape was rejected.
- [ ] Confirm existing single-round and partial-usage tests (`receives collected response text and usage` and `keeps the usage an earlier round reported when a later round reports none` in `src/orchestration/chatOrchestrator.test.ts`, plus `hands afterModelResponse text ending in the sentence, and the usage of a run without the hook` in `src/orchestration/toolBudget.test.ts`) pass unedited.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` (and `specs/hal-engine-architecture/spec.md` if `OrchestratorHooks` signature changes, keeping doc-block markers synced) and add a `CHANGELOG.md` entry explaining the behaviour change for existing consumers.

## Out of scope

- Audit entries or billing records themselves (the consumer's responsibility).
- Token accounting for anything other than the provider calls made by the orchestrator.
- Changing the `stop` chunk's per-call `UsageMetadata` shape populated by providers.
- The `instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (separate issue in `specs/hal-engine-config-hooks/spec.md`).