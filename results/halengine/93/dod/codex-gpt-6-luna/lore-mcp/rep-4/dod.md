# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real scripted provider, tool registry, and `afterModelResponse` hook, so the test drives the caller path through two actual tool rounds.

## Done when these pass

- [ ] **Usage across tool rounds** — the hook reports the sum of all provider call usage in a turn with two tool rounds.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [ ] Add a scripted provider acceptance test that fails on last-round-only usage.
- [ ] Aggregate usage across rounds while preserving the existing no-tool behavior.
- [ ] Make the public hook usage semantics explicit in its type and changelog.

## Out of scope

- Provider-call granularity beyond the chosen aggregate, and billing or audit consumers.