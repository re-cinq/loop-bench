# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it. The current behaviour is recorded in `specs/hal-engine-config-hooks/spec.md` so it is at least discoverable, but documenting a surprising number is weaker than not producing one.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` returns an orchestrator whose `processMessage` drives tool rounds and calls the installed `OrchestratorHooks.afterModelResponse` with usage. A test can install an `afterModelResponse` hook, drive a multi-round tool turn with scripted per-round usages, and observe that earlier rounds' usages are dropped today.

## Done when these pass

- [ ] **reports usage covering every provider call in a turn driven through two tool rounds** — a turn driven through two tool rounds sums input, output, and total tokens across all three provider calls into the usage passed to `afterModelResponse`. Fails today because `chatOrchestrator.ts` overwrites `lastUsage` on each round, passing only the final provider call's usage (`{inputTokens: 30, outputTokens: 6, totalTokens: 36}` instead of `{inputTokens: 60, outputTokens: 12, totalTokens: 72}`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **accumulates usage when some rounds omit usage, and reports undefined when no round reported usage** — when some rounds omit usage, the rounds that reported are still accumulated without yielding `NaN` or `undefined`; when no round reported usage, `afterModelResponse` receives `undefined`. Fails today because an intermediate round omitting usage does not prevent a later round from overwriting earlier reported usage (`{inputTokens: 25, outputTokens: 10, totalTokens: 35}` instead of `{inputTokens: 40, outputTokens: 15, totalTokens: 55}`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate `outcome.usage` into a cumulative usage object across every round of the tool loop in `src/orchestration/chatOrchestrator.ts` rather than overwriting `lastUsage`.
- [ ] Handle partial usage reporting so rounds reporting usage add tokens while rounds omitting usage do not cause `NaN` or `undefined`, and leave total usage `undefined` if no round reported usage.
- [ ] Clarify the typing of `afterModelResponse` in `OrchestratorHooks` (e.g. naming the parameter `totalUsage?: UsageMetadata`) so callers know it is an accumulated sum without reading the implementation.
- [ ] Confirm a turn with no tool calls reports unchanged usage, pinned by existing test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` remaining unedited.
- [ ] Add CHANGELOG entry for the behaviour change in what an existing consumer will record.

## Out of scope

- Audit entries, billing records, or usage storage (consumer concerns).
- Token accounting for anything other than provider calls made by the orchestrator.
- The `stop` chunk's own `usage` shape (already populated by providers).
- Non-Error rejection handling in `onError` (separate issue).