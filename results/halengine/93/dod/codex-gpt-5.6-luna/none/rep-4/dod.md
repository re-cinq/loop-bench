# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget.

**Strategy: `direct`** — The existing `afterModelResponse` hook is a real seam at the orchestrator entry point. The acceptance tests drive `processMessage` with a scripted provider and a real tool registry, so they fail on the reported usage semantics rather than on a test double or source inspection.

## Done when these pass

- [ ] **reports usage covering every provider call in a two-round tool turn** — the hook receives the summed input, output, and total tokens from both provider calls
      `src/orchestration/usageReporting.acceptance.test.ts`

- [ ] **counts reported rounds while leaving a turn with no reported usage undefined** — omitted round usage does not erase reported rounds, and no reported round does not become `undefined` or `NaN`
      `src/orchestration/usageReporting.acceptance.test.ts`

## Facets

- [ ] Aggregate usage metadata across every provider round before invoking `afterModelResponse`.
- [ ] Preserve the no-tool usage result and define the public hook type so the aggregate is unambiguous.
- [ ] Replace the under-counting spec statement and add a CHANGELOG migration note for existing consumers.
- [ ] Keep the public API free of `any` and pass the repository's required CI checks.

## Out of scope

- The audit entry or billing record created by a deployer.
- Token accounting for anything other than provider calls made by the orchestrator.
- The `stop` chunk's existing `usage` shape.