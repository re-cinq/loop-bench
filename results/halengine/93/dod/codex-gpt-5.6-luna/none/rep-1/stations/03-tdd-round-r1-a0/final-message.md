Branch is pushed and clean. Here's what this round fixed:

**`spec-names` failures (4)**: Updated stale line numbers in `specs/hal-engine-architecture/spec.md` for the `shouldContinueToolLoop` tests (L11/L15/L19/L23 → L33/L37/L41/L45), which had shifted when the previous round prepended `accumulateUsage` tests. The `spec:names --fix` script also cascaded updates to `chatOrchestrator.test.ts` references (8 links) and `hal-engine-tool-input-validation/spec.md` (1 link) after I removed the duplicate helper functions.

**`eslint` failures (7)**:
- `re-lint/no-duplicate-code`: Extracted `scriptedProvider` and `registryReturning` into a new `orchestratorTestSupport.ts`, imported by both `chatOrchestrator.test.ts` and `usageAcrossRounds.acceptance.test.ts`
- `re-lint/require-spec-link` (×4): Fixed by updating the stale line numbers in `specs/hal-engine-architecture/spec.md` so the `require-spec-link` rule can resolve the tests
- `re-lint/require-spec-link` (×1, L27): Added `[validated by: returns undefined when both are undefined]` link to `specs/hal-engine-config-hooks/spec.md`
- `re-lint/require-status-matches-coverage`: Changed spec status from "Shipped" to "In Progress" (2 statements still lack test citations — the catch/Error bypass behavior on spec L27 has no unit test)

**Unrelated smells noticed** (not acted on):
- `specs/hal-engine-config-hooks/spec.md` line 27 (catch/Error bypass) still has no validated-by test link — writing a test for it would close the remaining gap and let the spec return to "Shipped"

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix eslint and spec-names CI failures from previous push","tdd_next":"acceptance green"}}