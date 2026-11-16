# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `afterModelResponse` hook today; calling it with a scripted multi-round provider that returns known, different token counts per round lets us assert on the usage value the hook receives. The seam exists and no new code structure is needed to reach it.

## Done when these pass

- [ ] **reports the sum of every round when two tool rounds each return known token counts** — `afterModelResponse` receives `{inputTokens: 30, outputTokens: 13, totalTokens: 43}` when round 1 reports `{10, 5, 15}` and round 2 reports `{20, 8, 28}`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **accumulates only the rounds that reported usage when some rounds report none** — `afterModelResponse` receives `{inputTokens: 30, outputTokens: 13, totalTokens: 43}` when round 1 reports `{10, 5, 15}`, round 2 reports nothing, and round 3 reports `{20, 8, 28}` (no NaN, no undefined)
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Change `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` to accumulate across rounds (sum each field, treating missing usage as zero contribution)
- [ ] Update the `afterModelResponse` signature or its JSDoc so the type or name makes "this is a sum" unambiguous (e.g., rename the parameter `totalUsage`, or change the type to carry a `total` field)
- [ ] Update `specs/hal-engine-config-hooks/spec.md` "Measured semantics" section: replace the under-counting statement with the new accumulated-sum behaviour and add a `([validated by ...])` link to the acceptance test
- [ ] Add a CHANGELOG entry under a MINOR bump stating that `afterModelResponse` now receives the sum of all provider-call usage for the turn, and that existing consumers recording this value will see larger numbers for tool-heavy turns
- [ ] Verify the existing test "receives collected response text and usage" in `chatOrchestrator.test.ts` still passes (single-round turn: sum equals the single round's value)

## Out of scope

- The audit entry or billing record itself — that is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The shape of the `stop` chunk's `usage` field, which providers already populate
- Choosing which of the two shapes (accumulated sum vs. sum + per-round breakdown) the ticket mentions — the acceptance tests assert on accumulated sum, the simplest choice; the implementer may adapt the test if the richer shape is chosen