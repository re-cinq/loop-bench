# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider, tool registry, and `afterModelResponse` hook. The existing single-call test pins the unchanged common path; new acceptance tests drive the tool loop through that entry point.

## Done when these pass

- [ ] **reports the sum of every provider call across two tool rounds** — three distinct provider usage reports become one turn total.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **counts reported rounds when another round omits usage and leaves all-missing usage undefined** — missing reports contribute nothing, and an entirely unreported turn passes no usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing no-tool-call test remains unedited and green.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate each provider call's input, output, and total tokens across the turn, preserving `undefined` when none report usage.
- [ ] Make the hook parameter's summed-turn semantics explicit in its public type documentation, without `any`.
- [ ] Replace the recorded under-counting behavior in the spec and add a CHANGELOG entry explaining the larger number existing consumers record for tool turns; record why a per-round breakdown was not chosen.
- [ ] Give the behavior change a MINOR version bump and pass the repository's CI gates.

## Out of scope

- Consumer audit or billing records, non-provider token accounting, and providers' existing `stop` chunk usage shape.
- The separate non-`Error` rejection behavior recorded in this spec.