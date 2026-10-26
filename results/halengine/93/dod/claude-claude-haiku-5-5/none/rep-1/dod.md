# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes an `AIProvider` and `OrchestratorHooks`, so a scripted provider with known per-round usage can drive a real two-round turn and the `afterModelResponse` hook observes the usage it is handed. Nothing needs a double of the orchestrator.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — three provider calls report 100/20, 300/40 and 500/60 tokens; the hook must receive 900/120/1020, not the last round's 500/60/560
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **leaves out a round that reported nothing, and reports nothing when no round did** — a silent middle round is skipped (10/5 + 1/2 gives 11/7, not 1/2), and a turn where no round reported still hands the hook `undefined`, not a zero object or `NaN`
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing single-round test must stay green and unedited, pinning that a turn with no tool calls reports exactly what it reports today
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Choose the shape and record the rejected one on the issue: either the summed total as the existing `usage` argument, or the total plus a per-round breakdown. Either satisfies the tests above, since both pin the summed total in the `usage` position.
- [ ] Accumulate usage across every provider call in `processMessageStream`, skipping rounds that report nothing, so the first two tests go green.
- [ ] Make the hook's type say the value is a turn sum (a named type or a doc comment on `afterModelResponse`), with no `any` in the public API.
- [ ] Rewrite the under-counting bullet in `specs/hal-engine-config-hooks/spec.md` to the new behaviour, and add a `validated by` link to the acceptance test there once the statement is rewritten.
- [ ] CHANGELOG entry as a MINOR bump, stating that an existing `afterModelResponse` consumer will now record larger totals for turns that ran tools.

## Out of scope

- The audit entry or billing record itself; that is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape; providers already populate it and this ticket only aggregates it.
- The `onError` gate on `error instanceof Error`, and other measured semantics recorded in the spec's out-of-scope section.