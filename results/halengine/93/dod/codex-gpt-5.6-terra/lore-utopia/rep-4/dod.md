# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted `AIProvider` and exposes the reported usage through `afterModelResponse`, so the real turn loop can be exercised without a new seam.

## Done when these pass

- [ ] **reports the sum of every provider call after two tool rounds** — usage reported to `afterModelResponse` covers all three provider calls in a two-tool-round turn.
      `src/orchestration/usageAggregation.acceptance.test.ts`
- [ ] **counts reported rounds despite missing usage, and leaves an unreported turn undefined** — absent per-round usage neither erases reported totals nor creates a numeric value for a wholly unreported turn.
      `src/orchestration/usageAggregation.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the unchanged no-tool path still reports its provider usage exactly.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate the `inputTokens`, `outputTokens`, and `totalTokens` reported by every provider call before invoking `afterModelResponse`.
- [ ] Preserve `undefined` when no provider call reports usage, and make the hook API and documentation explicitly identify its usage argument as the turn total.
- [ ] Replace the recorded under-counting semantics in the config-hooks spec and add the consumer-facing migration note to the changelog.

## Out of scope

- Audit or billing records written by hook consumers, non-provider token accounting, and changes to the `stop` chunk's usage shape.