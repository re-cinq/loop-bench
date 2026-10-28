# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a scripted provider and a real tool registry, so the acceptance test can drive the public turn path and observe `afterModelResponse` directly. Use a summed `usage` argument for the common case.

## Done when these pass

- [ ] **reports total usage from every provider call in a tool turn, including when a round omits usage** — Two executed tool rounds produce three provider calls; the hook receives their token totals, ignores rounds with no usage, and receives `undefined` if none report usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate input, output, and total tokens across every provider call in one user turn, preserving `undefined` when no call reports usage.
- [ ] Make the hook's public parameter type or name explicitly say that it is the turn total, without `any`.
- [ ] Keep the existing single-call test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited and green.
- [ ] Keep the spec's summed-usage statement and its test citation accurate; add a CHANGELOG entry saying an existing consumer records a larger number for tool turns and document the choice of a sum over a per-call breakdown.
- [ ] Make the repository's build, tests, typecheck, eslint, and prettier checks pass in CI.

## Out of scope

- Audit or billing records made by a consumer, usage outside orchestrator provider calls, the stop chunk's usage shape, and the separate non-`Error` rejection path.