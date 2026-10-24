# Definition of Done

> afterModelResponse is called once per user message after the round loop exits, and is passed the lastUsage local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — A seam already exists: the `lastUsage` local variable in `chatOrchestrator.ts` is assigned once per round. The change accumulates across rounds instead of overwriting, passing the sum to `afterModelResponse`.

## Done when these pass

- [ ] **accumulates usage across two tool rounds and reports the sum to afterModelResponse** — Verifies that two tool rounds with different token counts are summed correctly before being passed to the hook
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **reports usage from a single round (no tool calls) without modification, preserving backward compatibility** — Ensures existing behavior for non-tool turns is preserved
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **handles rounds with missing usage gracefully** — Verifies that rounds with no usage (first or subsequent) do not produce undefined, NaN, or incorrect totals
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **accumulates usage across three tool rounds** — Tests accumulation with more than two rounds to verify the logic scales
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Accumulate usage in a new variable (e.g., `totalUsage`) across rounds instead of overwriting `lastUsage`
- [x] Handle missing usage gracefully by tracking which rounds reported (e.g., accumulating only defined values)
- [x] Pass the accumulated usage (sum of all rounds) to `afterModelResponse` instead of `lastUsage`
- [x] Update `specs/hal-engine-config-hooks/spec.md` line 28 to describe the new behavior
- [x] Add CHANGELOG entry under Unreleased → Changed describing the behaviour change for existing consumers

## Out of scope

- The audit entry or billing record implementation (consumer's concern)
- Token accounting for anything other than provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape
- Changing the signature to pass both sum and breakdown; the decision in the issue should record why any rejected approach was not chosen