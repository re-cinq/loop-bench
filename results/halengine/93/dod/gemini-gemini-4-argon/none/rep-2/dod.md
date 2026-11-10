# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts an `AIProvider`, a `ToolRegistry` and `OrchestratorHooks`, and `orchestrator.processMessage` drives the full tool-round loop and calls `afterModelResponse` at the end of the turn. An acceptance test can pass a multi-round provider today and fail directly on the `usage` argument received by `afterModelResponse`.

## Done when these pass

- [ ] **sums inputTokens, outputTokens and totalTokens across two tool rounds and the answering round** — `afterModelResponse` receives `{inputTokens: 75, outputTokens: 22, totalTokens: 97}`, the sum across all three provider calls (`10+25+40`, `4+6+12`, `14+31+52`), rather than only the last round's `{inputTokens: 40, outputTokens: 12, totalTokens: 52}`
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

- [ ] **counts the rounds that reported when a middle round reports no usage, and reports undefined when no round reported** — when round 1 reports `{11, 3, 14}`, round 2 omits `usage`, and round 3 reports `{19, 7, 26}`, `afterModelResponse` receives `{inputTokens: 30, outputTokens: 10, totalTokens: 40}` (neither `undefined` nor `NaN`), and when no round in a multi-round turn reports usage it receives `undefined`
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Replace the overwrite in `src/orchestration/chatOrchestrator.ts` (`lastUsage = outcome.usage ?? lastUsage`) with accumulation across every round in the turn that reported `UsageMetadata` (`inputTokens`, `outputTokens`, `totalTokens`), keeping the result `undefined` when no round reported usage.
- [ ] Confirm single-round turns and turns where a later round omits `usage` keep their existing behaviour (`chatOrchestrator.test.ts`).
- [ ] Update `specs/hal-engine-config-hooks/spec.md`, the `OrchestratorHooks` TSDoc in `src/orchestration/chatOrchestrator.ts` (and `specs/hal-engine-architecture/spec.md` if its `doc-block` reflects `OrchestratorHooks`), and `CHANGELOG.md` to state whether `afterModelResponse` is per-turn or per-call and what `usage` represents, including a migration note for consumers whose `afterModelResponse` hook already compensated for the single-round value.

## Out of scope

- Automatic `UsageStore.record` wiring inside the orchestrator (`UsageStore` remains consumer-driven via hooks).
- Per-round or per-provider-call hook invocations (`afterModelResponse` continues to fire once per user message after the round loop exits).
- Provider-specific usage fields beyond `{inputTokens, outputTokens, totalTokens}` on `UsageMetadata`.
- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`.