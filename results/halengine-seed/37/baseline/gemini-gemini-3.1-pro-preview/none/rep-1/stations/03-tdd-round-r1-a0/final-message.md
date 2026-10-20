Completed the TDD round for evaluating tool input against the compiled schema in `ToolRegistry.execute` and returning a rejection `ToolResponse` on failure without invoking the executor.

- Red tests: 0 of ours, 0 regressions (all tests in `src/orchestration/tools/registry.test.ts` pass).
- Unrelated smells noticed (not touched per rules): `src/orchestration/chatOrchestrator.acceptance.test.ts` and `src/orchestration/tools/registry.acceptance.test.ts` have ESLint violations (`re-lint/max-expects`, `re-lint/prefer-early-return`, `camelcase`, `re-lint/no-nested-if`, `re-lint/max-member-chain`, `@typescript-eslint/no-unused-vars`, `@typescript-eslint/no-explicit-any`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Evaluate input against compiled schema in execute early exit with ToolResponse","tdd_next":"Implement robust error message extraction per Ajv failure formatting without reflecting values"}}