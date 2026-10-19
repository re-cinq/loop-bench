Branch is clean and pushed. Here's what this round fixed:

**All 3 CI failures addressed:**

1. **eslint/no-duplicate-code** — Extracted `scriptedProvider` and `registryReturning` into `chatOrchestrator.testFixtures.ts`, imported in both test files. Removed now-unused `ToolResponse` import from both.

2. **eslint/max-expects** (`orchestratorHelpers.test.ts:15`) — Combined the two `addUsage(undefined, x)` assertions into a single `toEqual` with an object shape.

3. **eslint/require-spec-link** — Added spec statements in `specs/hal-engine-config-hooks/spec.md` with citations for all 5 new tests (3 `addUsage` unit tests + 2 acceptance tests). Updated `specs/hal-engine-architecture/spec.md` shouldContinueToolLoop citations via `spec:names --fix`.

4. **spec-names** — Ran `spec:names --fix` which repointed 18 shifted citations across 3 spec files (orchestratorHelpers line shifts, chatOrchestrator line shifts from removed block, tool-input-validation cross-reference).

5. **changelog** — Added entry describing the `afterModelResponse` behaviour change for tool-heavy turns.

0 regressions caused. The round wrote no new acceptance test (the previous round wrote those; this round fixed CI gate failures).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix eslint/spec-names/changelog CI failures from previous round","tdd_next":"Make the hook's usage argument type reflect turn total (src/types/ai.ts, OrchestratorHooks)"}}