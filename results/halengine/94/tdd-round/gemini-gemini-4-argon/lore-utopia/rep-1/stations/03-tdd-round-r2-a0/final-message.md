Resolved the `re-lint/no-duplicate-code` ESLint findings between `src/orchestration/chatOrchestrator.test.ts` and `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` by reusing `answering` and `writeSignalPromptBuilder` from `src/infrastructure/writeSignalTestSupport.ts` and simplifying the test helpers in `src/orchestration/chatOrchestrator.test.ts` while preserving all spec anchor line numbers.

Red tests: 0 yours, 0 regressions (CI failure was an ESLint duplicate-code check on the test files).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix re-lint/no-duplicate-code ESLint failure in chatOrchestrator.test.ts","tdd_next":"acceptance green"}}