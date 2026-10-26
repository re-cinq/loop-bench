# Definition of Done

> what the hook receives is the usage of the final provider call alone... A deployer billing or budgeting from this hook under-counts exactly the expensive turns

**Strategy: `direct`** — `afterModelResponse` is a real, callable hook seam. A test can install it, drive `createChatOrchestrator` through a scripted multi-round provider with known per-round token counts, and assert the usage the hook receives equals the sum — no seam work needed.

## Done when these pass

- [ ] **reports the sum of usage across two tool rounds, not only the last** — `afterModelResponse` receives the sum of all round usages for a two-tool-round turn; currently receives only the last round's usage
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

- [ ] **sums only the rounds that reported usage, treating absent rounds as zero contribution** — when a middle round reports no usage, the total is the sum of the rounds that did report; currently the last reporting round overwrites all prior ones
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Replace `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` with an accumulator that sums `inputTokens`, `outputTokens`, and `totalTokens` across rounds, treating an absent round as contributing zero to each field
- [ ] Update `specs/hal-engine-config-hooks/spec.md` line 28: replace the "under-counting" out-of-scope statement with the new behaviour, and add the `([validated by ...])` traceability link to the acceptance test
- [ ] Add a CHANGELOG entry noting that existing `afterModelResponse` consumers will now receive a larger number for tool-heavy turns (MINOR bump per the ticket)
- [ ] Confirm the existing `chatOrchestrator.test.ts` test "keeps the usage an earlier round reported when a later round reports none" still passes (its assertion is still correct under summing: R1 + no-op = R1)

## Out of scope

- The audit entry or billing record itself — that is the deployer's consumer concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The shape of the `stop` chunk's own `usage` field — providers already populate it; this ticket only aggregates
- Changing the `afterModelResponse` signature's third parameter name or type beyond what is needed to convey "sum" semantics (the ticket defers the "wider surface" two-argument shape to a separate decision)