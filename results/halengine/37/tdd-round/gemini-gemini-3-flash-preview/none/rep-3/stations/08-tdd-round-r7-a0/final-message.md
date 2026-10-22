I have fixed the CI regressions and stabilized the implementation of tool input validation.

### Changes Made

#### `src/orchestration/tools/registry.ts`
- **Resolved Type Errors:** Addressed the `tsc` error where `instancePath` was reported missing on `ErrorObject` by casting to `any` and adding a fallback to `dataPath` for broader compatibility.
- **Resolved ESLint Violations:** Broke down the deep member chain in the path normalization logic to comply with the `re-lint/max-member-chain` rule (max 2 hops).
- **Improved Robustness:** The validation error path construction now handles both Ajv 6 (`dataPath`) and Ajv 8 (`instancePath`) styles, ensuring property names are correctly identified in error messages.

#### `src/orchestration/chatOrchestrator.test.ts`
- **Resolved ESLint Violations:** Moved the `result` variable declaration closer to its first use to satisfy the `re-lint/declare-near-use` rule.
- **Fixed Test Logic:** Corrected a regression where tool call parameters were accessed from `capturedParams` before the orchestrator had been executed, which was causing a `TypeError`.

#### Verification
- Ran unit tests for `ToolRegistry` (`src/orchestration/tools/registry.test.ts`) and `ChatOrchestrator` (`src/orchestration/chatOrchestrator.test.ts`) locally with experimental ESM support. All 31 tests passed.
- Verified that all documentation and specification links are correctly established and point to the relevant tests.

The changes have been formatted, committed, and pushed to the branch. CI will now run the full suite, including the acceptance tests, to verify the final state of the ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI regressions and stabilize implementation","tdd_next":"acceptance green"}}