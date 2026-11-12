# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it. The current behaviour is recorded in `specs/hal-engine-config-hooks/spec.md` so it is at least discoverable, but documenting a surprising number is weaker than not producing one.

**Strategy: `direct`** — A seam already exists in `createChatOrchestrator` and `processMessage`, which take an `afterModelResponse` hook and drive the round loop over a configured `AIProvider` and `ToolRegistry`. The acceptance test executes this real orchestrator entry point with a scripted multi-round provider and fails directly on behavior because only the last round's usage is delivered to the hook.

## Done when these pass

- [ ] **reports usage covering every provider call in a turn driven through two tool rounds** — asserts that `afterModelResponse` receives usage totaling every provider call across multiple tool rounds, rather than only the final provider round's token counts
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts` instead of overwriting `lastUsage` with the latest round
- [ ] Count usage from rounds that reported without producing `undefined` or `NaN` when intermediate rounds report no usage, preserving `undefined` when no rounds reported
- [ ] Clarify the `afterModelResponse` hook signature/type in `src/orchestration/chatOrchestrator.ts` to make total usage unambiguous
- [ ] Replace the under-counting out-of-scope note in `specs/hal-engine-config-hooks/spec.md` with the new accumulated usage behavior
- [ ] Add a CHANGELOG entry documenting the accumulated usage behavior change for existing consumers
- [ ] Verify existing single-round test remains unedited and all verification checks pass

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape from providers