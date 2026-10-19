Branch is pushed and up to date. Here's a summary of what was fixed:

**CI failures resolved:**
1. **`no-duplicate-code`**: Extracted `scriptedProvider` to `src/orchestration/orchestratorTestSupport.ts` and imported it in both `chatOrchestrator.test.ts` and `chatOrchestrator.acceptance.test.ts`
2. **`max-expects`**: Split `returns the defined side when one argument is undefined` (2 asserts) into two single-assert tests
3. **`require-spec-link` (4 tests)**: Stale spec links in `specs/hal-engine-architecture/spec.md` pointed to old line numbers (L11/L15/L19/L23) before the `addUsage` block was inserted; `spec:names:fix` repointed them to L33/L37/L41/L45
4. **`require-status-matches-coverage`**: `specs/hal-engine-config-hooks/spec.md` status changed from "Shipped" to "In Progress" (the measured-semantics statement about `instanceof Error` gating has no test link)
5. **`spec-names`**: Same stale links fixed by `spec:names:fix`

0 regressions introduced (8 tests written/modified, all green).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all eslint and spec-names CI failures from prior push","tdd_next":"acceptance green"}}