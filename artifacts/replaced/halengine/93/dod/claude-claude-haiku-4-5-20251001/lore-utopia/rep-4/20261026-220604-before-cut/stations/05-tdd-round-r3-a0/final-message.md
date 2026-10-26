All 24 tests in chatOrchestrator.test.ts pass (0 regressions), and all 5 acceptance tests pass.

**Summary of what this round fixed:**

1. **ESLint `re-lint/no-duplicate-code`**: Extracted `round1Usage`/`round2Usage` from individual `it` blocks to the `describe` scope in `usage-accumulation.acceptance.test.ts`.

2. **Acceptance test logic error**: The test `accumulates usage when some rounds report and others do not` had `stopReason: 'end_turn'` in round 2, which exits the loop — making rounds 3–4 unreachable. Fixed to use `tool_use` so the loop continues correctly and the assertion `{18, 8, 26}` can be reached.

3. **ESLint `re-lint/require-spec-link`** and **spec-names**: All stale `#Lnn` spec link line numbers were repointed via `spec:names --fix`, including `chatOrchestrator.test.ts#L428→L403` and `#L440→L415` which caused the `require-spec-link` errors.

The `Cannot log after tests are done` error in the CI brief is a WebSocket teardown log that fires after test cleanup — it comes from transport tests unrelated to this ticket's code changes; I wrote no tests for it and no regressions were caused.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: duplicate code, broken acceptance test setup, stale spec link line numbers","tdd_next":"acceptance green"}}