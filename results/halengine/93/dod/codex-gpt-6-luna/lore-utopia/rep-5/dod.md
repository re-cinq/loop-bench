# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a provider, tool registry and hooks directly. A scripted provider drives the real tool loop and exposes the usage delivered to `afterModelResponse`.

## Done when these pass

- [ ] **sums every reported provider call and leaves wholly unreported usage undefined** — usage seen by `afterModelResponse` covers every provider round, skips rounds without usage, and remains undefined when no round reports usage.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate usage from all provider calls in a tool turn while leaving a no-tool turn's usage unchanged.
- [ ] Define the hook's public usage type so consumers can tell it represents the whole turn.
- [ ] Replace the spec's under-counting note and add a changelog entry describing the changed value existing consumers record.

## Out of scope

- Usage accounting outside the provider calls made by the orchestrator.
- Changes to the `stop` chunk's usage shape or consumer audit and billing records.