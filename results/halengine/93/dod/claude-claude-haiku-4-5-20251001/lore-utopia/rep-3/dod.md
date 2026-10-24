# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns.

**Strategy: `direct`** — The `afterModelResponse` hook call site in `chatOrchestrator.ts` is a direct seam. The hook currently receives `lastUsage` (line 148), which holds only the final provider call's usage. The acceptance tests directly invoke the orchestrator and assert on what the hook receives.

## Done when these pass

- [ ] **accumulates usage across all rounds and passes the total to afterModelResponse** — A turn with multiple tool rounds reports the sum of usage across every provider call
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **passes the single round usage unchanged when there are no tool calls** — A turn with no tool calls maintains backward compatibility
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts rounds that reported and skips those that did not** — Rounds without usage are skipped; the total is not NaN or undefined
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports undefined if no rounds reported usage** — When nothing reports usage, the hook receives undefined
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Change `lastUsage` accumulation in `chatOrchestrator.ts` to sum usage across rounds instead of keeping only the last one
- [x] Ensure the type signature of `afterModelResponse` and `UsageMetadata` makes the summing semantics unambiguous
- [x] Update `specs/hal-engine-config-hooks/spec.md` to replace the recorded under-counting note with the new behavior
- [x] Update CHANGELOG to document the behavior change for existing consumers

## Out of scope

- Token accounting for anything other than the provider calls the orchestrator makes
- The audit entry or billing record itself (consumer concern)
- The `stop` chunk's own `usage` shape