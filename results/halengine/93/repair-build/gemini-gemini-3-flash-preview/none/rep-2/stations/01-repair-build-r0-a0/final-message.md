I have fixed the lint errors and clarified the usage reporting API as requested.

### Changes Made:

1.  **Fixed Lint Errors in Tests**:
    *   Split the test case in `src/orchestration/orchestratorHelpers.test.ts` that had multiple expectations to satisfy the `re-lint/max-expects` rule.
    *   Added validation links (`[validated by: ...](...)`) to `specs/hal-engine-config-hooks/spec.md` for all tests in `src/orchestration/orchestratorHelpers.test.ts`, satisfying the `re-lint/require-spec-link` rule.

2.  **API Unambiguity and Consistency**:
    *   Renamed the `usage` parameter to `totalUsage` in the `afterModelResponse` hook signature within `OrchestratorHooks` and its call site in `src/orchestration/chatOrchestrator.ts`.
    *   Updated all occurrences of `usage` to `totalUsage` in documented signatures across `specs/hal-engine-architecture/spec.md`, `CLAUDE.md`, and `specs/hal-engine-tool-budget/spec.md`.
    *   Updated examples (`example/server.ts`, `example/full-config.ts`), `README.md`, and `docs/getting-started.md` to use the new `totalUsage` parameter name.
    *   Updated the `CHANGELOG.md` to reflect the parameter rename for clarity.

3.  **Verification**:
    *   Ran `npm test` for the affected suites (`chatOrchestrator.test.ts`, `chatOrchestrator.acceptance.test.ts`, `orchestratorHelpers.test.ts`, and `toolBudget.test.ts`), and all 50 tests passed.
    *   Verified that `scripts/check-spec-links.mjs` reports 0 misplaced links.
    *   Ensured the branch is up to date with `origin/main` and pushed the changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed lint errors in orchestratorHelpers.test.ts and clarified afterModelResponse API by renaming usage to totalUsage."}}