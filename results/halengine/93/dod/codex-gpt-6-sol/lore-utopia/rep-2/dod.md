# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real scripted provider and a hook, so the test can observe the usage handed to `afterModelResponse` after two tool rounds.

## Done when these pass

- [ ] **sums usage from every provider call across two tool rounds** — the hook receives each reported round's token counts summed, ignores missing usage, and receives `undefined` when no round reports usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate input, output, and total token counts across provider calls, preserving `undefined` when none reports usage.
- [ ] Make the hook's usage type or parameter name explicitly describe the turn total, while preserving the existing no-tool behavior and test.
- [ ] Replace the spec's recorded undercounting statement and explain the chosen sum shape versus per-round breakdown.
- [ ] Add a changelog entry for the larger number existing consumers will record and the required minor version bump.
- [ ] Pass the repository's CI build, test, typecheck, lint, and format gates.

## Out of scope

- Consumer billing or audit records, accounting beyond orchestrator provider calls, and the provider stop chunk's usage shape.