# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — The seam already exists; `afterModelResponse` is called at line 148 of `chatOrchestrator.ts`. The orchestrator accumulates `lastUsage` by overwriting it each round (line 117), so the acceptance tests can call the real entry point today and observe it reporting only the final round's usage.

## Done when these pass

- [ ] **reports accumulated usage from every provider call across two tool rounds** — a turn with two rounds reports the sum of usage from both, not just the last
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **reports usage across three tool rounds** — a turn with three rounds accumulates usage across all of them
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **reports correct accumulated usage when some rounds report no usage** — rounds without usage are skipped; those with it are summed
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **reports undefined when no rounds report any usage** — a turn where nothing reported usage still reports nothing
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **reports the same single usage for a turn with no tool calls** — the common case (no tools) is unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Decide between accumulating usage into one parameter vs passing both sum and per-round breakdown
- [ ] Update `OrchestratorHooks.afterModelResponse` signature to reflect the chosen shape
- [ ] Change line 117 of `chatOrchestrator.ts` to accumulate usage instead of overwriting
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to document the new behaviour instead of the under-counting
- [ ] Add a CHANGELOG entry documenting the usage reporting change as a MINOR bump

## Out of scope

- Audit entry or billing record implementation (consumer's concern)
- Token accounting for anything other than provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape (already populated by providers)