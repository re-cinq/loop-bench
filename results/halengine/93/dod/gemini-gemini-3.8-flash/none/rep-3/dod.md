# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — The `afterModelResponse` orchestrator hook seam already exists in `createChatOrchestrator`. Acceptance tests call the orchestrator with a scripted multi-round provider and assert that the hook receives accumulated usage across every round.

## Done when these pass

- [ ] **reports usage covering every provider call in a turn driven through two tool rounds** — asserts that `afterModelResponse` receives usage summed across all tool rounds and the final response.
      `src/orchestration/reportUsageAcrossToolRounds.acceptance.test.ts`

- [ ] **accumulates usage from reporting rounds when some rounds report no usage** — asserts that rounds omitting usage do not corrupt the total with `undefined` or `NaN`, and every round that reported is counted.
      `src/orchestration/reportUsageAcrossToolRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate `UsageMetadata` across provider calls in `src/orchestration/chatOrchestrator.ts` instead of overwriting with `lastUsage`.
- [ ] Ensure missing round usage defaults safely without producing `undefined` or `NaN` when other rounds report usage, while preserving `undefined` when no round reports usage.
- [ ] Clarify the type and JSDoc on `afterModelResponse` so consumers know the usage parameter is the turn total.
- [ ] Replace the recorded under-counting line in `specs/hal-engine-config-hooks/spec.md` with the new accumulated behaviour and link to acceptance tests.
- [ ] Add a CHANGELOG entry noting the behaviour change for consumers of `afterModelResponse`.

## Out of scope

- The audit entry or billing record itself (consumer concern).
- Token accounting for anything other than provider calls made by the orchestrator.
- The `stop` chunk's own `usage` shape.