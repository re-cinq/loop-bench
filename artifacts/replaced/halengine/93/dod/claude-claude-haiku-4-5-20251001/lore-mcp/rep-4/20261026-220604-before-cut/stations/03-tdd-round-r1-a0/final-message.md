The branch is pushed and up to date. Here's a summary of what this round fixed:

**CI failures resolved:**

1. **ESLint `re-lint/no-duplicate-code`**: Extracted `scriptedProvider` into a new `chatOrchestratorTestSupport.ts` shared file, imported by both `chatOrchestrator.test.ts` and the acceptance test. Added `captureUsage()` helper inside the acceptance test to eliminate the within-file duplicate hooks-setup pattern.

2. **ESLint `re-lint/require-spec-link`**: Added spec citations in `specs/hal-engine-config-hooks/spec.md` for all 4 acceptance tests and all 4 `accumulateUsage` unit tests in `orchestratorHelpers.test.ts`. The old "under-counting" statement (line 28) was replaced with statements describing the new accumulated-sum behavior.

3. **`spec-names` failure**: Fixed `orchestratorHelpers.test.ts` citation line numbers in the architecture spec (shifted from #L11/#L15/#L19/#L23 to #L32/#L36/#L40/#L44 after the `accumulateUsage` tests were added). Ran `spec:names --fix` to repoint all other citations shifted by the new import in `chatOrchestrator.test.ts` (596 citations verified, 25 repointed).

4. **`changelog` failure**: Added a CHANGELOG entry documenting that `afterModelResponse` now receives accumulated usage across all tool rounds.

**DoD facets ticked:** "Update specs/hal-engine-config-hooks/spec.md" and "Add CHANGELOG entry". Remaining open facet: "Add or update type signature for `afterModelResponse` to make the accumulated sum unambiguous".

**Unrelated smells noticed but not acted on:** `TOOL_CALL`/`STOP_FOR_TOOL`/`STOP_DONE` constants are still defined identically in both `chatOrchestrator.test.ts` and the acceptance test; the 3-line block appears to be below the jscpd duplicate threshold.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ESLint duplicate-code, require-spec-link, spec-names, and changelog CI failures","tdd_next":"Add or update type signature for afterModelResponse to make the accumulated sum unambiguous"}}