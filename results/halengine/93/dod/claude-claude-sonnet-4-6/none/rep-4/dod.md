# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — The seam already exists: `afterModelResponse` accepts a `usage` argument, and `createChatOrchestrator` accumulates rounds via the `lastUsage` local in `chatOrchestrator.ts`. The acceptance tests call `createChatOrchestrator` with a scripted multi-round provider and assert on what the hook receives.

## Done when these pass

- [ ] **reports the sum of usage across all tool rounds, not just the last** — a turn that ran one tool round (round 1 usage + round 2 usage) reports their combined tokens to `afterModelResponse`, not only the last round's
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts only the rounds that reported usage when some rounds have none** — when an intermediate round emits no usage, the rounds that did report are still summed; the total is not `undefined` or `NaN`
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Change `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` to accumulate across rounds (sum all three token fields, treating `undefined` as zero for addition but preserving `undefined` when no round reported)
- [ ] Update the `afterModelResponse` signature or its JSDoc so the third argument reads as a total, not `lastUsage` — the type acceptance criterion (AC 4) is a documentation / naming concern resolved at the same commit
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to record the new behaviour (the under-counting line in "Measured semantics — out of scope" is already removed by this DoD commit; the two new spec statements now cite the acceptance tests)
- [ ] Add a CHANGELOG entry under `[Unreleased]` noting that `afterModelResponse` now receives the total usage across all rounds, and that the number will be larger for tool-heavy turns (MINOR bump trigger)
- [ ] Verify the existing no-tool test (`'receives collected response text and usage'` in `chatOrchestrator.test.ts`) stays green — a turn with no tool calls must report exactly what it reports today

## Out of scope

- Audit entry or billing record implementation — that is the consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate
- The `onError` gate on `error instanceof Error` (the other measured-semantics bullet) — no issue owns it