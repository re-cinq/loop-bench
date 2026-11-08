# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it. The current behaviour is recorded in `specs/hal-engine-config-hooks/spec.md` so it is at least discoverable, but documenting a surprising number is weaker than not producing one.

**Strategy: `direct`** — The lifecycle hook seam already exists. `createChatOrchestrator` accepts `hooks.afterModelResponse` and passes `lastUsage` to it when `processMessage` completes. Acceptance tests can drive multi-round tool execution through the real orchestrator entry point and observe that usage from earlier rounds is missing today.

## Done when these pass

- [ ] **reports usage covering every provider call in a turn driven through two tool rounds** — asserts that `afterModelResponse` receives token counts accumulated across all three provider calls in a two-tool-round turn, rather than only the final call's usage. Fails today because `lastUsage` retains only the final round's usage (30/6/36 instead of 60/12/72).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **accumulates usage across rounds when some rounds report no usage** — asserts that when an intermediate tool round provides no usage metadata, the total is neither `undefined` nor `NaN` and continues to accumulate the usage from rounds that did report. Fails today because the final round overwrites earlier rounds rather than summing them (20/4/24 instead of 30/6/36).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across all provider rounds during `processMessageStream` in `src/orchestration/chatOrchestrator.ts`.
- [ ] Ensure turns where no provider calls report usage pass `undefined` rather than zeros or `NaN`, while turns where some rounds report usage aggregate only the reporting rounds.
- [ ] Preserve existing behavior for single-round turns without tool calls, keeping `src/orchestration/chatOrchestrator.test.ts` green without edits.
- [ ] Clarify the hook signature or type in `src/orchestration/chatOrchestrator.ts` so callers unambiguously know `usage` represents accumulated turn usage.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the recorded under-counting out-of-scope line with the new accumulated usage guarantee and citation, and document the change in `CHANGELOG.md`.

## Out of scope

- Token accounting for anything other than provider calls made by the orchestrator.
- The `stop` chunk's own `usage` metadata shape emitted by individual AI providers.
- External billing or audit storage implementations consuming `afterModelResponse`.