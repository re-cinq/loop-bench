# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real provider loop and `afterModelResponse` hook, so scripted provider rounds and a real `ToolRegistry` can observe the reported usage without a replacement boundary.

## Done when these pass

- [ ] **reports the sum of every provider call across two tool rounds** — the hook receives totals covering each provider call in a tool-driven turn.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **counts reported rounds without making missing usage a number** — missing rounds are ignored and a wholly unreported turn remains `undefined`.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing no-tool-call behavior remains unchanged.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate each round's reported usage into the unambiguous hook value while preserving the one-provider-call value.
- [ ] Leave missing usage out of the aggregate and retain `undefined` when every provider call omits it.
- [ ] Update the public hook type, config-hooks spec, and CHANGELOG to describe the chosen aggregate semantics.

## Out of scope

- Consumer audit or billing records, non-provider token accounting, and the `stop` chunk's existing usage shape.