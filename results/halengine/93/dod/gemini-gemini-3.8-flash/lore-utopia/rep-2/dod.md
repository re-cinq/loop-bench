# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — The `afterModelResponse` hook seam already exists on `OrchestratorHooks` and receives usage from `createChatOrchestrator`. Acceptance tests drive multi-round tool turns through `processMessage` using scripted providers and observe the aggregated usage passed to `afterModelResponse`.

## Done when these pass

- [ ] **reports the sum of three provider calls when a turn runs two tool rounds** — A turn driven through two tool rounds reports usage covering every provider call in that turn, asserted against a scripted provider whose rounds report known, different token counts.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — A provider that reports no usage on some rounds does not make the total undefined or NaN, and a turn where nothing reported still reports nothing.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate usage metadata across rounds in `chatOrchestrator.ts` by summing inputTokens, outputTokens, and totalTokens whenever a round reports usage.
- [ ] Keep reported usage undefined when no round reported usage across the entire turn.
- [ ] Ensure existing single-turn and zero-tool tests remain unedited and green.
- [ ] Document the usage accumulation behavior in `specs/hal-engine-config-hooks/spec.md` and add a CHANGELOG entry for the minor behavior change.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate and this issue only aggregates.