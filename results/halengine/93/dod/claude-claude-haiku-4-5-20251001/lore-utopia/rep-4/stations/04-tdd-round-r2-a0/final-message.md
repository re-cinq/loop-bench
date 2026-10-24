Pushed cleanly. Summary of what this round fixed from the CI failures:

- **`re-lint/no-duplicate-code`**: Extracted `scriptedProvider`, `registryReturning`, and `TOOL_CALL` into `src/orchestration/testProviderHelpers.ts`; both `chatOrchestrator.test.ts` and `usage-accumulation.acceptance.test.ts` now import from there.
- **`@typescript-eslint/no-unused-vars`**: Removed unused `SendMessageParams` (and `AIProvider`, `ToolRegistry`, `ToolResponse`) from the acceptance test's imports.
- **`re-lint/require-spec-link`**: Added four new validated-by links in the spec for the `accumulateUsage` unit tests (lines 32, 36, 40, 44 in `orchestratorHelpers.test.ts`).
- **`re-lint/require-status-matches-coverage`**: Changed spec status from "Shipped" to "In Progress" and updated the five acceptance-test line anchors to their post-refactor positions (L38, L53, L66, L86, L98).

0 regressions introduced, 0 new tests written (this was a CI-fix round).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all CI failures from previous push (duplicate code, unused imports, missing spec links, stale line anchors)","tdd_next":"acceptance green"}}