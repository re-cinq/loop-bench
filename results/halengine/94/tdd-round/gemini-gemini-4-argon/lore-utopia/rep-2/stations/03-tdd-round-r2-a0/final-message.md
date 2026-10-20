Fixed the `re-lint/no-duplicate-code` ESLint failure between `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and `src/orchestration/chatOrchestrator.test.ts` by reusing `answering` and `writeSignalPromptBuilder` from `src/infrastructure/writeSignalTestSupport.ts` and updating the spec citation line in `specs/hal-engine-config-hooks/spec.md`.

- Red tests written this round: 0 (0 regressions; CI reported 2 ESLint `re-lint/no-duplicate-code` findings on the acceptance test file)
- Tests run locally this round: none (acceptance test execution is delegated to CI per instructions)

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix re-lint/no-duplicate-code error in chatOrchestrator.beforeSession.acceptance.test.ts and update spec anchor","tdd_next":"acceptance green"}}